import { createContext, useContext, useEffect, useState } from "react"

interface NewsArticle {
  // id: string
  title: string
  source: { id: string; name: string }
  description: string
  publishedAt: string
  sentiment: "bullish" | "bearish" | "neutral"
  sentimentScore: number
  impact: "high" | "medium" | "low"
}

interface NewsContextType {
  news: NewsArticle[]
  isLoading: boolean
}

const NewsContext = createContext<NewsContextType | undefined>(undefined)

export function NewsProvider({ children }: { children: React.ReactNode }) {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("/api/news")
        const { articles } = await response.json()
        articles.map(async (article: NewsArticle) => {
          const sentiment = await fetch("/api/sentiment/hf", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: article.title }),
          })
          const sentimentResult = await sentiment.json()
          if (sentimentResult.label === "positive") {
            article.sentiment = "bullish"
            article.sentimentScore = sentimentResult.score
          } else if (sentimentResult.label === "negative") {
            article.sentiment = "bearish"
            article.sentimentScore = -sentimentResult.score
          } else {
            article.sentiment = "neutral"
            article.sentimentScore = 0
          }
          if (Math.abs(article.sentimentScore) > 0.6) {
            article.impact = "high"
          } else if (Math.abs(article.sentimentScore) > 0.2) {
            article.impact = "medium"
          } else {
            article.impact = "low"
          }
          return article
        })

        setNews(articles)
      } catch (error) {
        console.error("Failed to fetch news:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchNews()
  }, [])

  return (
    <NewsContext.Provider value={{ news, isLoading }}>
      {children}
    </NewsContext.Provider>
  )
}

export function useNews() {
  const context = useContext(NewsContext)
  if (!context) {
    throw new Error("useNews must be used within a NewsProvider")
  }
  return context
}

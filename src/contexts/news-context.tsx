import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react"

interface NewsArticle {
  title: string
  source: { id: string; name: string }
  description: string
  publishedAt: string
  url: string
  urlToImage?: string
  content?: string
  sentiment: "bullish" | "bearish" | "neutral"
  sentimentScore: number
  impact: "high" | "medium" | "low"
  category?: string
  breaking?: boolean
  relatedStocks?: string[]
}

interface NewsContextType {
  news: NewsArticle[]
  isLoading: boolean
  currentCategory: string
  setCategory: (category: string) => void
  query: string
  setQueryWithCategoryReset: (query: string) => void
  refreshNews: () => void
}

const NewsContext = createContext<NewsContextType | undefined>(undefined)

export function NewsProvider({ children }: { children: React.ReactNode }) {
  const [news, setNews] = useState<NewsArticle[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentCategory, setCurrentCategory] = useState("all")
  const [query, setQuery] = useState("stocks")

  const analyzeSentiment = async (
    article: NewsArticle
  ): Promise<NewsArticle> => {
    try {
      const response = await fetch("/api/sentiment/hf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: article.title }),
      })
      const sentimentResult = await response.json()

      if (sentimentResult.label === "positive") {
        article.sentiment = "bullish"
        article.sentimentScore = sentimentResult.score
      } else if (sentimentResult.label === "negative") {
        article.sentiment = "bearish"
        article.sentimentScore = -sentimentResult.score
      } else {
        article.sentiment = "neutral"
        article.sentimentScore = sentimentResult.score
      }

      // Determine impact based on sentiment score
      const absScore = Math.abs(sentimentResult.score)
      if (absScore > 0.6) {
        article.impact = "high"
      } else if (absScore > 0.2 && absScore <= 0.6) {
        article.impact = "medium"
      } else {
        article.impact = "low"
      }

      return article
    } catch (error) {
      console.error("Failed to analyze sentiment for article:", error)
      // Return article with default neutral sentiment if analysis fails
      return {
        ...article,
        sentiment: "neutral",
        sentimentScore: 0,
        impact: "low",
      }
    }
  }

  const fetchNews = useCallback(
    async (category: string = "all", queryString: string = "stocks") => {
      setIsLoading(true)
      try {
        const url =
          category === "all"
            ? `/api/news?q=${queryString}`
            : `/api/news?category=${category}`

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.statusText}`)
        }

        const articles = await response.json()
        console.log(
          `Fetched ${articles.length} articles for category: ${category}`
        )

        // Process sentiment analysis for all articles in parallel
        const articlesWithSentiment = await Promise.all(
          articles.map((article: NewsArticle) => analyzeSentiment(article))
        )

        setNews(articlesWithSentiment)
      } catch (error) {
        console.error("Failed to fetch news:", error)
        setNews([]) // Clear news on error
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  // Fetch news when category or query changes
  useEffect(() => {
    fetchNews(currentCategory, query)
  }, [currentCategory, fetchNews, query])

  const setCategory = useCallback((category: string) => {
    setCurrentCategory(category)
    setQuery("")
  }, [])

  const setQueryWithCategoryReset = useCallback((newQuery: string) => {
    setQuery(newQuery)
    // When user searches, automatically switch to "all" category to show results across all categories
    if (newQuery.trim() !== "" && newQuery !== "stocks") {
      setCurrentCategory("all")
    }
  }, [])

  const refreshNews = useCallback(() => {
    fetchNews(currentCategory)
  }, [currentCategory, fetchNews])

  const value = {
    news,
    isLoading,
    currentCategory,
    setCategory,
    query,
    setQueryWithCategoryReset,
    refreshNews,
  }

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>
}

export function useNews() {
  const context = useContext(NewsContext)
  if (!context) {
    throw new Error("useNews must be used within a NewsProvider")
  }
  return context
}

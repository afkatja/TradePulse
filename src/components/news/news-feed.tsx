"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface NewsFeedProps {
  filter: string
  searchQuery: string
}

const mockNewsArticles = [
  {
    id: "1",
    headline:
      "Federal Reserve Signals Potential Interest Rate Cuts in Second Quarter",
    summary:
      "Fed officials hint at monetary policy easing as inflation shows signs of cooling...",
    source: "Reuters",
    timestamp: "2 hours ago",
    sentiment: "bullish" as const,
    sentimentScore: 0.75,
    impact: "high",
    category: "monetary-policy",
    relatedStocks: ["SPY", "QQQ", "IWM"],
    breaking: true,
  },
  {
    id: "2",
    headline: "Apple Reports Record Q4 Revenue Despite Supply Chain Challenges",
    summary:
      "Tech giant exceeds analyst expectations with strong iPhone and services growth...",
    source: "Bloomberg",
    timestamp: "3 hours ago",
    sentiment: "bullish" as const,
    sentimentScore: 0.68,
    impact: "medium",
    category: "earnings",
    relatedStocks: ["AAPL"],
    breaking: false,
  },
  {
    id: "3",
    headline: "Energy Sector Faces Headwinds as Oil Prices Decline",
    summary:
      "Crude oil futures drop 3% following unexpected inventory build and demand concerns...",
    source: "MarketWatch",
    timestamp: "4 hours ago",
    sentiment: "bearish" as const,
    sentimentScore: -0.55,
    impact: "medium",
    category: "commodities",
    relatedStocks: ["XOM", "CVX", "COP"],
    breaking: false,
  },
  {
    id: "4",
    headline: "Congressional Committee Advances Tech Regulation Bill",
    summary:
      "New legislation targeting big tech companies moves forward in House committee...",
    source: "The Wall Street Journal",
    timestamp: "5 hours ago",
    sentiment: "bearish" as const,
    sentimentScore: -0.42,
    impact: "high",
    category: "political",
    relatedStocks: ["GOOGL", "META", "AMZN"],
    breaking: false,
  },
  {
    id: "5",
    headline: "Electric Vehicle Sales Surge 45% Year-over-Year",
    summary:
      "EV adoption accelerates as charging infrastructure expands nationwide...",
    source: "TechCrunch",
    timestamp: "6 hours ago",
    sentiment: "bullish" as const,
    sentimentScore: 0.62,
    impact: "medium",
    category: "technology",
    relatedStocks: ["TSLA", "RIVN", "LCID"],
    breaking: false,
  },
]

export function NewsFeed({ filter, searchQuery }: NewsFeedProps) {
  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "bullish":
        return <TrendingUp className="h-3 w-3" />
      case "bearish":
        return <TrendingDown className="h-3 w-3" />
      default:
        return <Minus className="h-3 w-3" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "bullish":
        return "text-green-500 border-green-500"
      case "bearish":
        return "text-red-500 border-red-500"
      default:
        return "text-gray-500 border-gray-500"
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      default:
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    }
  }

  const filteredArticles = mockNewsArticles.filter(article => {
    const matchesSearch =
      article.headline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase())

    if (filter === "all") return matchesSearch
    if (filter === "breaking") return matchesSearch && article.breaking
    if (filter === "political")
      return matchesSearch && article.category === "political"
    if (filter === "earnings")
      return matchesSearch && article.category === "earnings"

    return matchesSearch
  })

  return (
    <div className="space-y-4">
      {filteredArticles.map(article => (
        <Card
          key={article.id}
          className="hover:shadow-md transition-all duration-200"
        >
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    {article.breaking && (
                      <Badge className="bg-red-500 text-white animate-pulse">
                        BREAKING
                      </Badge>
                    )}
                    <Badge
                      variant="outline"
                      className={cn("text-xs", getImpactColor(article.impact))}
                    >
                      {article.impact.toUpperCase()} IMPACT
                    </Badge>
                  </div>

                  <h3 className="text-lg font-semibold leading-tight">
                    {article.headline}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-4 flex-shrink-0"
                >
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>

              {/* Metadata */}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>
                      {article.source} • {article.timestamp}
                    </span>
                  </div>

                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs",
                      getSentimentColor(article.sentiment)
                    )}
                  >
                    {getSentimentIcon(article.sentiment)}
                    <span className="ml-1 capitalize">{article.sentiment}</span>
                    <span className="ml-1">
                      ({(article.sentimentScore * 100).toFixed(0)})
                    </span>
                  </Badge>
                </div>

                {/* Related Stocks */}
                <div className="flex items-center space-x-1">
                  {article.relatedStocks.slice(0, 3).map(stock => (
                    <Badge key={stock} variant="secondary" className="text-xs">
                      {stock}
                    </Badge>
                  ))}
                  {article.relatedStocks.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{article.relatedStocks.length - 3}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

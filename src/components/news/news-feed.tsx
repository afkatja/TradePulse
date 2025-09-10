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
import Image from "next/image"
import { useNews } from "../../contexts/news-context"

export function NewsFeed() {
  const { news, isLoading, query, currentCategory } = useNews()

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

  if (isLoading) {
    return (
      <div className="space-y-4 transition-opacity duration-500">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="animate-pulse duration-1500">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                <div className="h-3 bg-gray-400 rounded w-full"></div>
                <div className="h-3 bg-gray-400 rounded w-2/3"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (news.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No articles found matching your criteria.
      </div>
    )
  }

  return (
    <div className="space-y-4 transition-opacity duration-500">
      {news.map((article, index) => (
        <Card
          key={`${article.source.id ?? article.source.name}-${index}`}
          className="hover:shadow-md transition-all duration-200"
        >
          <CardContent className="p-6 relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4"
            >
              <ExternalLink to={article.url} className="h-4 w-4" />
            </Button>
            <div className="w-full space-y-4 flex items-center">
              {article.urlToImage && (
                <Image
                  src={article.urlToImage}
                  alt={article.source.name}
                  width={150}
                  height={150}
                  className="mr-4 object-cover"
                />
              )}
              <div>
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
                        className={cn(
                          "text-xs",
                          getImpactColor(article.impact)
                        )}
                      >
                        {article.impact.toUpperCase()} IMPACT
                      </Badge>
                    </div>

                    <h3 className="text-lg font-semibold leading-tight">
                      {article.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {article.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Metadata */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>
                    {article.source.name} • {article.publishedAt}
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
              {article.relatedStocks && article.relatedStocks.length > 0 && (
                <div className="flex items-center space-x-1">
                  {article.relatedStocks
                    .slice(0, 3)
                    .map((stock, stockIndex) => (
                      <Badge
                        key={`${stock}-${stockIndex}`}
                        variant="secondary"
                        className="text-xs"
                      >
                        {stock}
                      </Badge>
                    ))}
                  {article.relatedStocks.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{article.relatedStocks.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

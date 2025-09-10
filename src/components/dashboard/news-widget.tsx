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
import { ExternalLink, TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"
import { useContext } from "react"
import { SidebarContext, Tab } from "../../contexts/sidebar-context"
import { useNews } from "../../contexts/news-context"

export function NewsWidget() {
  const { setActiveTab } = useContext(SidebarContext)
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

  const { news } = useNews()

  return (
    <Card className="h-fit">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Market News</CardTitle>
            <CardDescription>Latest sentiment analysis</CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setActiveTab(Tab.News)}
          >
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {news.map(article => (
          <div
            key={article.source.id ?? article.source.name}
            className="space-y-2 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <h4 className="text-sm font-medium leading-tight line-clamp-2">
                {article.title}
              </h4>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6 ml-2 flex-shrink-0"
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-muted-foreground">
                  {article.source.name}
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">
                  {article.publishedAt}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <Badge
                  variant="outline"
                  className={cn(
                    "text-xs",
                    getSentimentColor(article.sentiment)
                  )}
                >
                  {getSentimentIcon(article.sentiment)}
                  <span className="ml-1 capitalize">{article.sentiment}</span>
                </Badge>
              </div>
            </div>
          </div>
        ))}

        <div className="pt-2 border-t border-border">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Overall Sentiment</span>
            <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
              <TrendingUp className="h-3 w-3 mr-1" />
              Bullish
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

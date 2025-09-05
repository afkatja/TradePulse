"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity, Users } from "lucide-react"

export function SentimentOverview() {
  const sentimentData = {
    overall: 65, // Overall bullish sentiment percentage
    bullish: 45,
    neutral: 35,
    bearish: 20,
    change24h: +5.2,
    volume: 1250000,
    sources: 847,
  }

  return (
    <div className="grid gap-4 md:grid-cols-4">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Market Sentiment</span>
          </CardTitle>
          <CardDescription>
            Overall market sentiment based on news analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">Bullish</span>
            <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
              <TrendingUp className="h-3 w-3 mr-1" />+
              {sentimentData.change24h.toFixed(1)}% (24h)
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-green-500">Bullish</span>
                <span>{sentimentData.bullish}%</span>
              </div>
              <Progress
                value={sentimentData.bullish}
                className="h-2 bg-gray-200"
              >
                <div className="h-full bg-green-500 rounded-full transition-all" />
              </Progress>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Neutral</span>
                <span>{sentimentData.neutral}%</span>
              </div>
              <Progress value={sentimentData.neutral} className="h-2" />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-red-500">Bearish</span>
                <span>{sentimentData.bearish}%</span>
              </div>
              <Progress
                value={sentimentData.bearish}
                className="h-2 bg-gray-200"
              >
                <div className="h-full bg-red-500 rounded-full transition-all" />
              </Progress>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">News Volume</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {(sentimentData.volume / 1000).toFixed(0)}K
          </div>
          <p className="text-xs text-muted-foreground">
            Articles analyzed (24h)
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Data Sources</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{sentimentData.sources}</div>
          <p className="text-xs text-muted-foreground">Active news sources</p>
        </CardContent>
      </Card>
    </div>
  )
}

"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Plus, TrendingUp, TrendingDown } from "lucide-react"
import { useMarketData } from "@/contexts/market-data-context"
import { cn } from "@/lib/utils"

export function WatchlistWidget() {
  const { watchlist, removeFromWatchlist } = useMarketData()

  return (
    <Card className="h-fit">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-lg">Watchlist</CardTitle>
          <CardDescription>Your tracked stocks</CardDescription>
        </div>
        <Button size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-1" />
          Add Stock
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {watchlist.map(stock => {
          const isPositive = stock.change >= 0

          return (
            <div
              key={stock.symbol}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-sm">{stock.symbol}</span>
                  {stock.sentiment && (
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs",
                        stock.sentiment === "bullish" &&
                          "border-green-500 text-green-500",
                        stock.sentiment === "bearish" &&
                          "border-red-500 text-red-500"
                      )}
                    >
                      {stock.sentiment}
                    </Badge>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stock.name}
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">${stock.price.toFixed(2)}</div>
                <div
                  className={cn(
                    "text-xs flex items-center",
                    isPositive ? "text-green-500" : "text-red-500"
                  )}
                >
                  {isPositive ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {isPositive ? "+" : ""}
                  {stock.changePercent.toFixed(2)}%
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Plus, TrendingUp, TrendingDown } from "lucide-react"
import { useMarketData } from "@/contexts/market-data-context"
import { cn } from "@/lib/utils"

interface StockListProps {
  searchQuery: string
  selectedStock: string
  onSelectStock: (symbol: string) => void
}

export function StockList({
  searchQuery,
  selectedStock,
  onSelectStock,
}: StockListProps) {
  const { watchlist, addToWatchlist, removeFromWatchlist } = useMarketData()

  const filteredStocks = watchlist.filter(
    stock =>
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg">Stock List</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {filteredStocks.map(stock => {
          const isSelected = selectedStock === stock.symbol
          const isPositive = stock.change >= 0
          const isInWatchlist = watchlist.some(w => w.symbol === stock.symbol)

          return (
            <div
              key={stock.symbol}
              className={cn(
                "p-3 rounded-lg border cursor-pointer transition-all duration-200",
                isSelected
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50 hover:bg-muted/50"
              )}
              onClick={() => onSelectStock(stock.symbol)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-sm">
                      {stock.symbol}
                    </span>
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
                  <div className="text-xs text-muted-foreground line-clamp-1">
                    {stock.name}
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="text-right">
                    <div className="font-semibold text-sm">
                      ${stock.price.toFixed(2)}
                    </div>
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

                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={e => {
                      e.stopPropagation()
                      if (isInWatchlist) {
                        removeFromWatchlist(stock.symbol)
                      } else {
                        addToWatchlist(stock.symbol)
                      }
                    }}
                  >
                    {isInWatchlist ? (
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                    ) : (
                      <Plus className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

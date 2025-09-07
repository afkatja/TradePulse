"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, TrendingDown, Star, Plus } from "lucide-react"
import { useMarketData } from "@/contexts/market-data-context"
import { cn } from "@/lib/utils"

interface StockChartProps {
  symbol: string
}

// Mock price data
const generateMockPriceData = (symbol: string) => {
  const basePrice = 185 // Base price for demo
  const data = []

  for (let i = 0; i < 30; i++) {
    const price = basePrice + Math.sin(i * 0.3) * 10 + (Math.random() - 0.5) * 5
    data.push({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString(),
      price: parseFloat(price.toFixed(2)),
      volume: Math.floor(Math.random() * 10000000) + 1000000,
    })
  }

  return data
}

export function StockChart({ symbol }: StockChartProps) {
  const [timeframe, setTimeframe] = useState("1D")
  const { watchlist, addToWatchlist, removeFromWatchlist } = useMarketData()

  const stockData = watchlist.find(stock => stock.symbol === symbol)
  const priceData = generateMockPriceData(symbol)
  const isInWatchlist = watchlist.some(stock => stock.symbol === symbol)
  const isPositive = stockData ? stockData.change >= 0 : true

  const timeframes = ["1D", "5D", "1M", "3M", "6M", "1Y"]

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <div>
              <CardTitle className="text-xl">{symbol}</CardTitle>
              <CardDescription>
                {stockData?.name || "Stock Chart"}
              </CardDescription>
            </div>
            {stockData && (
              <div className="text-right">
                <div className="text-2xl font-bold">
                  ${stockData.price.toFixed(2)}
                </div>
                <div
                  className={cn(
                    "text-sm flex items-center",
                    isPositive ? "text-green-500" : "text-red-500"
                  )}
                >
                  {isPositive ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {isPositive ? "+" : ""}${stockData.change.toFixed(2)} (
                  {isPositive ? "+" : ""}
                  {stockData.changePercent.toFixed(2)}%)
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant={isInWatchlist ? "default" : "outline"}
              size="sm"
              onClick={() => {
                if (isInWatchlist) {
                  removeFromWatchlist(symbol)
                } else {
                  addToWatchlist(symbol)
                }
              }}
            >
              {isInWatchlist ? (
                <Star className="h-4 w-4 mr-1 fill-current" />
              ) : (
                <Plus className="h-4 w-4 mr-1" />
              )}
              {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
            </Button>
          </div>
        </div>

        {/* Timeframe Selector */}
        <div className="flex space-x-1">
          {timeframes.map(tf => (
            <Button
              key={tf}
              variant={timeframe === tf ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </Button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="date"
                className="text-xs"
                tickFormatter={value =>
                  new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })
                }
              />
              <YAxis
                className="text-xs"
                domain={["dataMin - 1", "dataMax + 1"]}
                tickFormatter={value => `$${value.toFixed(0)}`}
              />
              <Tooltip
                formatter={(value: number) => [`$${value.toFixed(2)}`, "Price"]}
                labelFormatter={label => new Date(label).toLocaleDateString()}
                contentStyle={{
                  backgroundColor: "oklch(var(--card))",
                  border: "1px solid oklch(var(--border))",
                  borderRadius: "8px",
                  color: "oklch(var(--card-foreground))",
                  fontSize: "0.875rem",
                }}
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke={
                  isPositive ? "oklch(var(--bullish))" : "oklch(var(--bearish))"
                }
                strokeWidth={2}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: isPositive
                    ? "oklch(var(--bullish))"
                    : "oklch(var(--bearish))",
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Quick Stats */}
        {stockData && (
          <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
            <div className="text-center">
              <div className="text-sm font-semibold">
                ${stockData.high.toFixed(2)}
              </div>
              <div className="text-xs text-muted-foreground">Day High</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold">
                ${stockData.low.toFixed(2)}
              </div>
              <div className="text-xs text-muted-foreground">Day Low</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold">
                {(stockData.volume / 1000000).toFixed(1)}M
              </div>
              <div className="text-xs text-muted-foreground">Volume</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-semibold">
                ${stockData.previousClose.toFixed(2)}
              </div>
              <div className="text-xs text-muted-foreground">Prev Close</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

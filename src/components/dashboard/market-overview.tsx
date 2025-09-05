"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Activity } from "lucide-react"
import { useMarketData } from "@/contexts/market-data-context"
import { cn } from "@/lib/utils"

export function MarketOverview() {
  const { marketIndices } = useMarketData()

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {marketIndices.map(index => {
        const isPositive = index.change >= 0

        return (
          <Card
            key={index.symbol}
            className="transition-all duration-200 hover:shadow-lg"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {index.name}
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {index.value.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="flex items-center space-x-2 mt-1">
                {isPositive ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span
                  className={cn(
                    "text-sm font-medium",
                    isPositive ? "text-green-500" : "text-red-500"
                  )}
                >
                  {isPositive ? "+" : ""}
                  {index.change.toFixed(2)} ({isPositive ? "+" : ""}
                  {index.changePercent.toFixed(2)}%)
                </span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

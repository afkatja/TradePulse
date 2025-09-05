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
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Target,
  AlertCircle,
} from "lucide-react"
import { useTradingJournal } from "@/contexts/trading-journal-context"
import { cn } from "@/lib/utils"

export function PortfolioSummary() {
  const { trades, getTotalPnL, getWinRate } = useTradingJournal()

  const totalPnL = getTotalPnL()
  const winRate = getWinRate()
  const openTrades = trades.filter(trade => trade.status === "open").length
  const closedTrades = trades.filter(trade => trade.status === "closed").length

  const portfolioValue = 50000 // Mock portfolio value
  const dayChange = 1250 // Mock day change
  const dayChangePercent = (dayChange / portfolioValue) * 100

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Portfolio Summary</span>
          <Badge
            variant={totalPnL >= 0 ? "default" : "destructive"}
            className="ml-2"
          >
            {totalPnL >= 0 ? "+" : ""}${totalPnL.toFixed(2)}
          </Badge>
        </CardTitle>
        <CardDescription>Your trading performance overview</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Portfolio Value */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Portfolio Value</span>
            </div>
            <div className="text-2xl font-bold">
              ${portfolioValue.toLocaleString()}
            </div>
            <div
              className={cn(
                "flex items-center text-sm",
                dayChange >= 0 ? "text-green-500" : "text-red-500"
              )}
            >
              {dayChange >= 0 ? (
                <TrendingUp className="h-4 w-4 mr-1" />
              ) : (
                <TrendingDown className="h-4 w-4 mr-1" />
              )}
              {dayChange >= 0 ? "+" : ""}${dayChange.toFixed(2)} (
              {dayChange >= 0 ? "+" : ""}
              {dayChangePercent.toFixed(2)}%) today
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Target className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Win Rate</span>
            </div>
            <div className="text-2xl font-bold">{winRate.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">
              {closedTrades} closed trades
            </div>
          </div>
        </div>

        {/* Win Rate Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Win Rate Progress</span>
            <span>{winRate.toFixed(1)}%</span>
          </div>
          <Progress value={winRate} className="h-2" />
        </div>

        {/* Trading Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-lg font-semibold">{openTrades}</div>
            <div className="text-xs text-muted-foreground">Open Trades</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">{closedTrades}</div>
            <div className="text-xs text-muted-foreground">Closed Trades</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">$2.5K</div>
            <div className="text-xs text-muted-foreground">Buying Power</div>
          </div>
        </div>

        {/* Risk Alert */}
        <div className="flex items-center space-x-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
          <AlertCircle className="h-4 w-4 text-yellow-500" />
          <div className="text-sm">
            <span className="font-medium">Risk Check:</span> Portfolio at 65% of
            risk limit
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

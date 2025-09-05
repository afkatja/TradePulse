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
import { TrendingUp, TrendingDown, Minus } from "lucide-react"
import { cn } from "@/lib/utils"

interface TechnicalIndicatorsProps {
  symbol: string
}

const mockIndicators = {
  rsi: {
    value: 58.5,
    signal: "neutral",
    description: "Relative Strength Index",
  },
  macd: {
    value: 0.85,
    signal: "bullish",
    description: "MACD Signal",
  },
  sma20: {
    value: 182.45,
    signal: "bullish",
    description: "20-day Simple Moving Average",
  },
  sma50: {
    value: 178.9,
    signal: "bullish",
    description: "50-day Simple Moving Average",
  },
  bollingerBands: {
    upper: 188.5,
    middle: 185.25,
    lower: 182.0,
    signal: "neutral",
    description: "Bollinger Bands",
  },
}

export function TechnicalIndicators({ symbol }: TechnicalIndicatorsProps) {
  const getSignalIcon = (signal: string) => {
    switch (signal) {
      case "bullish":
        return <TrendingUp className="h-3 w-3" />
      case "bearish":
        return <TrendingDown className="h-3 w-3" />
      default:
        return <Minus className="h-3 w-3" />
    }
  }

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case "bullish":
        return "text-green-500 border-green-500"
      case "bearish":
        return "text-red-500 border-red-500"
      default:
        return "text-gray-500 border-gray-500"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Technical Indicators</CardTitle>
        <CardDescription>Key technical signals for {symbol}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* RSI */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">RSI (14)</span>
            <div className="flex items-center space-x-2">
              <Badge
                variant="outline"
                className={cn(
                  "text-xs",
                  getSignalColor(mockIndicators.rsi.signal)
                )}
              >
                {getSignalIcon(mockIndicators.rsi.signal)}
                <span className="ml-1 capitalize">
                  {mockIndicators.rsi.signal}
                </span>
              </Badge>
              <span className="text-sm font-semibold">
                {mockIndicators.rsi.value}
              </span>
            </div>
          </div>
          <Progress value={mockIndicators.rsi.value} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Oversold (30)</span>
            <span>Overbought (70)</span>
          </div>
        </div>

        {/* Moving Averages */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Moving Averages</h4>

          <div className="flex items-center justify-between p-2 rounded bg-gray-700/30">
            <span className="text-sm">SMA 20</span>
            <div className="flex items-center space-x-2">
              <Badge
                variant="outline"
                className={cn(
                  "text-xs",
                  getSignalColor(mockIndicators.sma20.signal)
                )}
              >
                {getSignalIcon(mockIndicators.sma20.signal)}
              </Badge>
              <span className="text-sm font-semibold">
                ${mockIndicators.sma20.value.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between p-2 rounded bg-muted/30">
            <span className="text-sm">SMA 50</span>
            <div className="flex items-center space-x-2">
              <Badge
                variant="outline"
                className={cn(
                  "text-xs",
                  getSignalColor(mockIndicators.sma50.signal)
                )}
              >
                {getSignalIcon(mockIndicators.sma50.signal)}
              </Badge>
              <span className="text-sm font-semibold">
                ${mockIndicators.sma50.value.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* MACD */}
        <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
          <div>
            <span className="text-sm font-medium">MACD</span>
            <div className="text-xs text-muted-foreground">12, 26, 9</div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge
              variant="outline"
              className={cn(
                "text-xs",
                getSignalColor(mockIndicators.macd.signal)
              )}
            >
              {getSignalIcon(mockIndicators.macd.signal)}
              <span className="ml-1 capitalize">
                {mockIndicators.macd.signal}
              </span>
            </Badge>
            <span className="text-sm font-semibold">
              {mockIndicators.macd.value.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Bollinger Bands */}
        <div className="space-y-2">
          <span className="text-sm font-medium">Bollinger Bands (20, 2)</span>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Upper</span>
              <span className="font-semibold">
                ${mockIndicators.bollingerBands.upper.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Middle</span>
              <span className="font-semibold">
                ${mockIndicators.bollingerBands.middle.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Lower</span>
              <span className="font-semibold">
                ${mockIndicators.bollingerBands.lower.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

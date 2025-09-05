"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { TradingJournal } from "./trading-journal"
import { RiskAnalysis } from "./risk-analysis"
import { PerformanceAnalytics } from "./performance-analytics"
import { PositionCalculator } from "./position-calculator"
import { Plus, TrendingUp, Target, Shield } from "lucide-react"

const riskMetrics = {
  portfolioRisk: 65, // Percentage of risk limit used
  maxDrawdown: -8.5,
  sharpeRatio: 1.35,
  volatility: 18.2,
  beta: 1.12,
  varDaily: -2.8,
  diversificationScore: 72,
}

export type TRiskMetrics = typeof riskMetrics

const riskAlerts = [
  {
    type: "warning",
    message: "Portfolio concentration risk: 45% in technology sector",
    severity: "medium",
  },
  {
    type: "info",
    message: "Consider taking profits on AAPL position (+15.2%)",
    severity: "low",
  },
]
export type TRiskAlert = (typeof riskAlerts)[0]
export function PortfolioPage() {
  const [showAddTrade, setShowAddTrade] = useState(false)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Portfolio & Journal
            </h1>
            <p className="text-muted-foreground">
              Track trades, analyze performance, and manage risk
            </p>
          </div>

          <Button onClick={() => setShowAddTrade(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Add Trade
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="journal" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="journal" className="flex items-center space-x-2">
            <TrendingUp className="h-4 w-4" />
            <span>Journal</span>
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="flex items-center space-x-2"
          >
            <Target className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="risk" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Risk</span>
          </TabsTrigger>
          <TabsTrigger
            value="calculator"
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Calculator</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="journal" className="space-y-4">
          <TradingJournal
            showAddForm={showAddTrade}
            onCloseAddForm={() => setShowAddTrade(false)}
          />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <PerformanceAnalytics
            riskMetrics={riskMetrics}
            riskAlerts={riskAlerts}
          />
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <RiskAnalysis riskMetrics={riskMetrics} riskAlerts={riskAlerts} />
        </TabsContent>

        <TabsContent value="calculator" className="space-y-4">
          <PositionCalculator />
        </TabsContent>
      </Tabs>
    </div>
  )
}

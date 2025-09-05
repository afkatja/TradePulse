"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MarketOverview } from "./market-overview"
import { WatchlistWidget } from "./watchlist-widget"
import { NewsWidget } from "./news-widget"
import { PortfolioSummary } from "./portfolio-summary"
import { AlertsWidget } from "./alerts-widget"
import { PerformanceChart } from "./performance-chart"

export function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Trading Dashboard</h1>
        <p className="text-muted-foreground">
          Monitor markets, track performance, and stay informed with real-time
          insights.
        </p>
      </div>

      {/* Market Overview */}
      <MarketOverview />

      {/* Main Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Portfolio Summary */}
        <div className="lg:col-span-2">
          <PortfolioSummary />
        </div>

        {/* Alerts Widget */}
        <AlertsWidget />
      </div>

      {/* Secondary Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Watchlist */}
        <WatchlistWidget />

        {/* News Widget */}
        <NewsWidget />

        {/* Performance Chart */}
        <PerformanceChart />
      </div>
    </div>
  )
}

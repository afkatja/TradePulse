"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"
import { useTradingJournal } from "@/contexts/trading-journal-context"
import {
  TrendingUp,
  Target,
  DollarSign,
  Trophy,
  AlertTriangle,
} from "lucide-react"
import { TRiskAlert, TRiskMetrics } from "./portfolio-page"
import { Progress } from "../ui/progress"
import { Alert, AlertDescription } from "../ui/alert"
import { cn } from "../../lib/utils"

const mockPerformanceData = [
  { date: "2024-01-01", cumulative: 0, daily: 0 },
  { date: "2024-01-05", cumulative: 250, daily: 250 },
  { date: "2024-01-10", cumulative: -150, daily: -400 },
  { date: "2024-01-15", cumulative: 475, daily: 625 },
  { date: "2024-01-20", cumulative: 320, daily: -155 },
  { date: "2024-01-25", cumulative: 680, daily: 360 },
  { date: "2024-01-30", cumulative: 520, daily: -160 },
]

const mockMonthlyData = [
  { month: "Oct", pnl: 1250 },
  { month: "Nov", pnl: -450 },
  { month: "Dec", pnl: 2100 },
  { month: "Jan", pnl: 680 },
]

export function PerformanceAnalytics({
  riskMetrics,
  riskAlerts,
}: {
  riskMetrics: TRiskMetrics
  riskAlerts: TRiskAlert[]
}) {
  const { trades, getTotalPnL, getWinRate } = useTradingJournal()

  const totalPnL = getTotalPnL()
  const winRate = getWinRate()
  const totalTrades = trades.length
  const avgWin = 450 // Mock data
  const avgLoss = -280 // Mock data

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total P&L</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                totalPnL >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {totalPnL >= 0 ? "+" : ""}${totalPnL.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              All-time performance
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{winRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              {totalTrades} total trades
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Win</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">+${avgWin}</div>
            <p className="text-xs text-muted-foreground">per winning trade</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Loss</CardTitle>
            <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">${avgLoss}</div>
            <p className="text-xs text-muted-foreground">per losing trade</p>
          </CardContent>
        </Card>
      </div>

      {/* Performance Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Cumulative P&L</CardTitle>
            <CardDescription>
              Your trading performance over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockPerformanceData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
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
                    tickFormatter={value => `$${value}`}
                  />
                  <Tooltip
                    formatter={(value: number) => [
                      `$${value.toFixed(2)}`,
                      "P&L",
                    ]}
                    labelFormatter={label =>
                      new Date(label).toLocaleDateString()
                    }
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="cumulative"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Performance</CardTitle>
            <CardDescription>Monthly profit and loss breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockMonthlyData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis dataKey="month" className="text-xs" />
                  <YAxis
                    className="text-xs"
                    tickFormatter={value => `$${value}`}
                  />
                  <Tooltip
                    formatter={(value: number) => [
                      `$${value.toFixed(2)}`,
                      "P&L",
                    ]}
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar
                    dataKey="pnl"
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Risk Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Advanced Risk Metrics</CardTitle>
          <CardDescription>
            Comprehensive risk analysis and portfolio statistics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-sm font-medium">Portfolio Beta</span>
                <span className="font-semibold">{riskMetrics.beta}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-sm font-medium">Daily VaR (95%)</span>
                <span className="font-semibold text-red-500">
                  {riskMetrics.varDaily}%
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-sm font-medium">Volatility</span>
                <span className="font-semibold">{riskMetrics.volatility}%</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Diversification Score</span>
                  <span className="font-semibold">
                    {riskMetrics.diversificationScore}%
                  </span>
                </div>
                <Progress
                  value={riskMetrics.diversificationScore}
                  className="h-2"
                />
              </div>

              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                <div className="flex items-center space-x-2">
                  <Trophy className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">
                    Risk-Adjusted Performance
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Sharpe ratio of {riskMetrics.sharpeRatio} indicates good
                  risk-adjusted returns
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Recommendations</CardTitle>
          <CardDescription>
            Automated risk management suggestions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {riskAlerts.map((alert, index) => (
            <Alert
              key={index}
              className={cn(
                alert.severity === "medium" &&
                  "border-yellow-500/50 bg-yellow-500/10",
                alert.severity === "low" && "border-blue-500/50 bg-blue-500/10"
              )}
            >
              <AlertTriangle
                className={cn(
                  "h-4 w-4",
                  alert.severity === "medium" && "text-yellow-500",
                  alert.severity === "low" && "text-blue-500"
                )}
              />
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

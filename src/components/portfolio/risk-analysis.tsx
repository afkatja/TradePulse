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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, AlertTriangle, TrendingDown, PieChart } from "lucide-react"
import { TRiskAlert, TRiskMetrics } from "./portfolio-page"
import { cn } from "../../lib/utils"

export function RiskAnalysis({
  riskMetrics,
  riskAlerts,
}: {
  riskMetrics: TRiskMetrics
  riskAlerts: TRiskAlert[]
}) {
  return (
    <div className="space-y-6">
      {/* Risk Overview */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Portfolio Risk
            </CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {riskMetrics.portfolioRisk}%
            </div>
            <Progress value={riskMetrics.portfolioRisk} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-2">
              of risk limit used
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Max Drawdown</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {riskMetrics.maxDrawdown}%
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              30-day maximum loss
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sharpe Ratio</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">
              {riskMetrics.sharpeRatio}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              risk-adjusted returns
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Risk Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Metrics</CardTitle>
          <CardDescription>Detailed portfolio risk analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-sm font-medium">Volatility (30d)</span>
                <span className="font-semibold">{riskMetrics.volatility}%</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-sm font-medium">Beta</span>
                <span className="font-semibold">{riskMetrics.beta}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <span className="text-sm font-medium">Value at Risk (95%)</span>
                <span className="font-semibold text-red-500">
                  {riskMetrics.varDaily}%
                </span>
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
                <p className="text-xs text-muted-foreground">
                  Based on sector and position distribution
                </p>
              </div>

              <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">
                    Risk Status: Moderate
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Portfolio risk is within acceptable limits
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Alerts</CardTitle>
          <CardDescription>
            Important risk notifications and recommendations
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

      {/* Sector Allocation */}
      <Card>
        <CardHeader>
          <CardTitle>Sector Allocation</CardTitle>
          <CardDescription>Portfolio diversification by sector</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { sector: "Technology", percentage: 45, color: "bg-blue-500" },
              { sector: "Healthcare", percentage: 20, color: "bg-green-500" },
              { sector: "Financial", percentage: 15, color: "bg-purple-500" },
              { sector: "Consumer", percentage: 12, color: "bg-orange-500" },
              { sector: "Energy", percentage: 8, color: "bg-yellow-500" },
            ].map(allocation => (
              <div key={allocation.sector} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{allocation.sector}</span>
                  <span className="font-semibold">
                    {allocation.percentage}%
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${allocation.color} transition-all duration-500`}
                    style={{ width: `${allocation.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

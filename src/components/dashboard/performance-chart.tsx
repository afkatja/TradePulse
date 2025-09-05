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
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { useTradingJournal } from "@/contexts/trading-journal-context"

const mockPerformanceData = [
  { date: "2024-01-01", value: 50000 },
  { date: "2024-01-02", value: 50250 },
  { date: "2024-01-03", value: 49800 },
  { date: "2024-01-04", value: 51200 },
  { date: "2024-01-05", value: 51500 },
  { date: "2024-01-06", value: 50900 },
  { date: "2024-01-07", value: 52100 },
  { date: "2024-01-08", value: 51800 },
  { date: "2024-01-09", value: 52500 },
  { date: "2024-01-10", value: 52750 },
]

export function PerformanceChart() {
  const { getTotalPnL } = useTradingJournal()
  const totalPnL = getTotalPnL()

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle className="text-lg">Performance Chart</CardTitle>
        <CardDescription>30-day portfolio performance</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockPerformanceData}>
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
                tickFormatter={value => `$${(value / 1000).toFixed(0)}K`}
              />
              <Tooltip
                formatter={(value: number) => [
                  `$${value.toLocaleString()}`,
                  "Portfolio Value",
                ]}
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
                dataKey="value"
                stroke="oklch(var(--primary))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, fill: "oklch(var(--primary))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <span className="text-sm text-muted-foreground">Total P&L</span>
          <span
            className={`text-sm font-semibold ${
              totalPnL >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {totalPnL >= 0 ? "+" : ""}${totalPnL.toFixed(2)}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

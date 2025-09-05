"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, TrendingUp, Volume2, Target } from "lucide-react"
import { SidebarContext, Tab } from "../../contexts/sidebar-context"
import { useContext } from "react"

const mockAlerts = [
  {
    id: "1",
    type: "price",
    message: "AAPL broke above $185 resistance",
    timestamp: "5 min ago",
    priority: "high",
    icon: TrendingUp,
  },
  {
    id: "2",
    type: "volume",
    message: "TSLA volume spike detected",
    timestamp: "12 min ago",
    priority: "medium",
    icon: Volume2,
  },
  {
    id: "3",
    type: "target",
    message: "MSFT reached profit target",
    timestamp: "1 hour ago",
    priority: "low",
    icon: Target,
  },
]

export function AlertsWidget() {
  const { setActiveTab } = useContext(SidebarContext)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      default:
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    }
  }

  return (
    <Card className="h-fit">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle className="text-lg">Active Alerts</CardTitle>
          <CardDescription>Recent trading signals</CardDescription>
        </div>
        <Bell className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-3">
        {mockAlerts.map(alert => {
          const Icon = alert.icon

          return (
            <div
              key={alert.id}
              className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              <div className="flex-shrink-0">
                <div
                  className={`p-2 rounded-full ${getPriorityColor(
                    alert.priority
                  )}`}
                >
                  <Icon className="h-3 w-3" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-tight">
                  {alert.message}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {alert.timestamp}
                </p>
              </div>
            </div>
          )
        })}

        <Button
          variant="outline"
          className="w-full mt-4"
          size="sm"
          onClick={() => setActiveTab(Tab.Alerts)}
        >
          View All Alerts
        </Button>
      </CardContent>
    </Card>
  )
}

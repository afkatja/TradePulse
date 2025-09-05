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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import {
  Bell,
  Plus,
  TrendingUp,
  Volume2,
  Target,
  Trash2,
  Edit,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface Alert {
  id: string
  name: string
  symbol: string
  type: "price" | "volume" | "sentiment" | "technical"
  condition: string
  value: number
  isActive: boolean
  triggered: boolean
  createdAt: Date
  lastTriggered?: Date
}

const mockAlerts: Alert[] = [
  {
    id: "1",
    name: "AAPL Breakout",
    symbol: "AAPL",
    type: "price",
    condition: "above",
    value: 190,
    isActive: true,
    triggered: false,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "2",
    name: "TSLA Volume Spike",
    symbol: "TSLA",
    type: "volume",
    condition: "above",
    value: 50000000,
    isActive: true,
    triggered: true,
    createdAt: new Date("2024-01-14"),
    lastTriggered: new Date("2024-01-17"),
  },
  {
    id: "3",
    name: "NVDA RSI Oversold",
    symbol: "NVDA",
    type: "technical",
    condition: "below",
    value: 30,
    isActive: false,
    triggered: false,
    createdAt: new Date("2024-01-10"),
  },
]

export function AlertsPage() {
  const [alerts, setAlerts] = useState(mockAlerts)
  const [showCreateAlert, setShowCreateAlert] = useState(false)
  const [newAlert, setNewAlert] = useState({
    name: "",
    symbol: "",
    type: "price" as Alert["type"],
    condition: "above",
    value: "",
  })

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "price":
        return <TrendingUp className="h-4 w-4" />
      case "volume":
        return <Volume2 className="h-4 w-4" />
      case "technical":
        return <Target className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const handleCreateAlert = () => {
    if (!newAlert.name || !newAlert.symbol || !newAlert.value) return

    const alert: Alert = {
      id: Date.now().toString(),
      name: newAlert.name,
      symbol: newAlert.symbol.toUpperCase(),
      type: newAlert.type,
      condition: newAlert.condition,
      value: parseFloat(newAlert.value),
      isActive: true,
      triggered: false,
      createdAt: new Date(),
    }

    setAlerts(prev => [...prev, alert])
    setNewAlert({
      name: "",
      symbol: "",
      type: "price",
      condition: "above",
      value: "",
    })
    setShowCreateAlert(false)
  }

  const toggleAlert = (id: string) => {
    setAlerts(prev =>
      prev.map(alert =>
        alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
      )
    )
  }

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id))
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Trading Alerts
            </h1>
            <p className="text-muted-foreground">
              Automated notifications for trading opportunities and risk
              management
            </p>
          </div>

          <Dialog open={showCreateAlert} onOpenChange={setShowCreateAlert}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-1" />
                Create Alert
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Alert</DialogTitle>
                <DialogDescription>
                  Set up automated notifications for trading signals
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="alertName">Alert Name</Label>
                  <Input
                    id="alertName"
                    placeholder="AAPL Breakout Alert"
                    value={newAlert.name}
                    onChange={e =>
                      setNewAlert(prev => ({ ...prev, name: e.target.value }))
                    }
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="alertSymbol">Symbol</Label>
                    <Input
                      id="alertSymbol"
                      placeholder="AAPL"
                      value={newAlert.symbol}
                      onChange={e =>
                        setNewAlert(prev => ({
                          ...prev,
                          symbol: e.target.value.toUpperCase(),
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="alertType">Type</Label>
                    <Select
                      value={newAlert.type}
                      onValueChange={(value: Alert["type"]) =>
                        setNewAlert(prev => ({ ...prev, type: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="price">Price Alert</SelectItem>
                        <SelectItem value="volume">Volume Alert</SelectItem>
                        <SelectItem value="technical">
                          Technical Indicator
                        </SelectItem>
                        <SelectItem value="sentiment">
                          Sentiment Change
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="condition">Condition</Label>
                    <Select
                      value={newAlert.condition}
                      onValueChange={value =>
                        setNewAlert(prev => ({ ...prev, condition: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="above">Above</SelectItem>
                        <SelectItem value="below">Below</SelectItem>
                        <SelectItem value="equals">Equals</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="alertValue">Value</Label>
                    <Input
                      id="alertValue"
                      type="number"
                      step="0.01"
                      placeholder="185.50"
                      value={newAlert.value}
                      onChange={e =>
                        setNewAlert(prev => ({
                          ...prev,
                          value: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="flex space-x-2 pt-4">
                  <Button onClick={handleCreateAlert} className="flex-1">
                    Create Alert
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowCreateAlert(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Alert Statistics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{alerts.length}</div>
            <p className="text-xs text-muted-foreground">
              {alerts.filter(a => a.isActive).length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Triggered Today
            </CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">alerts triggered</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">78%</div>
            <p className="text-xs text-muted-foreground">profitable signals</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
            <Volume2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2m</div>
            <p className="text-xs text-muted-foreground">minutes to signal</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Table */}
      <Card>
        <CardHeader>
          <CardTitle>Active Alerts</CardTitle>
          <CardDescription>
            Manage your trading alerts and notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alert Name</TableHead>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {alerts.map(alert => (
                  <TableRow key={alert.id}>
                    <TableCell className="font-medium">{alert.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{alert.symbol}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getAlertIcon(alert.type)}
                        <span className="capitalize text-sm">{alert.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm">
                        {alert.condition} {alert.value.toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={alert.triggered ? "default" : "secondary"}
                        className={cn(
                          alert.triggered &&
                            "bg-green-500/10 text-green-500 border-green-500/20"
                        )}
                      >
                        {alert.triggered ? "Triggered" : "Waiting"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {alert.createdAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={alert.isActive}
                        onCheckedChange={() => toggleAlert(alert.id)}
                      />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => deleteAlert(alert.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Alert Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Templates</CardTitle>
          <CardDescription>
            Quick setup for common trading alerts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="font-medium text-sm">Breakout Alert</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Alert when price breaks above resistance level
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
              <div className="flex items-center space-x-2 mb-2">
                <Volume2 className="h-4 w-4 text-blue-500" />
                <span className="font-medium text-sm">Volume Spike</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Alert on unusual trading volume activity
              </p>
            </div>

            <div className="p-4 rounded-lg border border-border hover:border-primary/50 transition-colors cursor-pointer">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-4 w-4 text-purple-500" />
                <span className="font-medium text-sm">RSI Oversold</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Alert when RSI drops below 30 (oversold)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

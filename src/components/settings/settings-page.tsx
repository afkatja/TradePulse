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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import {
  User,
  Shield,
  Bell,
  Palette,
  Database,
  Key,
  AlertTriangle,
  Save,
  Download,
  Upload,
} from "lucide-react"
import { useTheme } from "next-themes"
import { toast } from "sonner"

export function SettingsPage() {
  const { user, updateRiskProfile } = useAuth()
  const { theme, setTheme } = useTheme()

  const [notifications, setNotifications] = useState({
    priceAlerts: true,
    newsAlerts: true,
    riskWarnings: true,
    tradingSignals: false,
    emailNotifications: false,
    pushNotifications: true,
  })

  const [riskSettings, setRiskSettings] = useState({
    maxDailyLoss: user?.riskProfile?.maxLoss || 2,
    maxPositionSize: 10,
    autoStopLoss: true,
    riskWarningThreshold: 75,
  })

  const [apiSettings, setApiSettings] = useState({
    alphaVantageKey: "",
    newsApiKey: "",
    financeApiKey: "",
    refreshInterval: 5,
  })

  const handleSaveProfile = () => {
    updateRiskProfile({
      experience: user?.riskProfile?.experience || "intermediate",
      tolerance: user?.riskProfile?.tolerance || "moderate",
      timeline: user?.riskProfile?.timeline || "day-trading",
      capital: user?.riskProfile?.capital || "$10,000 - $50,000",
      maxLoss: riskSettings.maxDailyLoss,
    })
    toast.success("Risk profile updated successfully")
  }

  const handleExportData = () => {
    // Mock export functionality
    toast.success("Trading data exported successfully")
  }

  const handleImportData = () => {
    // Mock import functionality
    toast.success("Trading data imported successfully")
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Customize your trading experience and manage account preferences
        </p>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="flex items-center space-x-2">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="risk" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span className="hidden sm:inline">Risk</span>
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center space-x-2"
          >
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Alerts</span>
          </TabsTrigger>
          <TabsTrigger
            value="appearance"
            className="flex items-center space-x-2"
          >
            <Palette className="h-4 w-4" />
            <span className="hidden sm:inline">Theme</span>
          </TabsTrigger>
          <TabsTrigger value="data" className="flex items-center space-x-2">
            <Database className="h-4 w-4" />
            <span className="hidden sm:inline">Data</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Manage your account details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    defaultValue={user?.name || ""}
                    placeholder="Enter your full name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={user?.email || ""}
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Trading Experience</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="experience">Experience Level</Label>
                    <Select
                      defaultValue={
                        user?.riskProfile?.experience || "intermediate"
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">
                          Beginner (less than 1 year)
                        </SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate (1-5 years)
                        </SelectItem>
                        <SelectItem value="advanced">
                          Advanced (5+ years)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeline">Trading Timeline</Label>
                    <Select
                      defaultValue={
                        user?.riskProfile?.timeline || "day-trading"
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="day-trading">Day Trading</SelectItem>
                        <SelectItem value="short-term">
                          Short-term (1-30 days)
                        </SelectItem>
                        <SelectItem value="mixed">Mixed Strategies</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <Button onClick={handleSaveProfile}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk Management Settings */}
        <TabsContent value="risk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Risk Management</CardTitle>
              <CardDescription>
                Configure your risk parameters and trading limits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="maxDailyLoss">Maximum Daily Loss (%)</Label>
                    <Input
                      id="maxDailyLoss"
                      type="number"
                      min="0.5"
                      max="10"
                      step="0.5"
                      value={riskSettings.maxDailyLoss}
                      onChange={e =>
                        setRiskSettings(prev => ({
                          ...prev,
                          maxDailyLoss: parseFloat(e.target.value),
                        }))
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Percentage of account that can be lost in a single day
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxPositionSize">
                      Maximum Position Size (%)
                    </Label>
                    <Input
                      id="maxPositionSize"
                      type="number"
                      min="1"
                      max="25"
                      value={riskSettings.maxPositionSize}
                      onChange={e =>
                        setRiskSettings(prev => ({
                          ...prev,
                          maxPositionSize: parseFloat(e.target.value),
                        }))
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Maximum percentage of portfolio in a single position
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Automatic Stop Loss</Label>
                      <p className="text-xs text-muted-foreground">
                        Automatically suggest stop losses for new trades
                      </p>
                    </div>
                    <Switch
                      checked={riskSettings.autoStopLoss}
                      onCheckedChange={checked =>
                        setRiskSettings(prev => ({
                          ...prev,
                          autoStopLoss: checked,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="riskWarning">
                      Risk Warning Threshold (%)
                    </Label>
                    <Input
                      id="riskWarning"
                      type="number"
                      min="50"
                      max="95"
                      value={riskSettings.riskWarningThreshold}
                      onChange={e =>
                        setRiskSettings(prev => ({
                          ...prev,
                          riskWarningThreshold: parseFloat(e.target.value),
                        }))
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Show warning when this percentage of risk limit is used
                    </p>
                  </div>
                </div>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Risk Disclaimer:</strong> Trading involves substantial
                  risk of loss. Never trade with money you cannot afford to
                  lose. Past performance does not guarantee future results.
                </AlertDescription>
              </Alert>

              <Button onClick={handleSaveProfile}>
                <Save className="h-4 w-4 mr-2" />
                Save Risk Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Configure alerts and notification settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Price Alerts</Label>
                    <p className="text-xs text-muted-foreground">
                      Notifications when stocks hit your price targets
                    </p>
                  </div>
                  <Switch
                    checked={notifications.priceAlerts}
                    onCheckedChange={checked =>
                      setNotifications(prev => ({
                        ...prev,
                        priceAlerts: checked,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>News Alerts</Label>
                    <p className="text-xs text-muted-foreground">
                      Breaking news and sentiment changes
                    </p>
                  </div>
                  <Switch
                    checked={notifications.newsAlerts}
                    onCheckedChange={checked =>
                      setNotifications(prev => ({
                        ...prev,
                        newsAlerts: checked,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Risk Warnings</Label>
                    <p className="text-xs text-muted-foreground">
                      Alerts when approaching risk limits
                    </p>
                  </div>
                  <Switch
                    checked={notifications.riskWarnings}
                    onCheckedChange={checked =>
                      setNotifications(prev => ({
                        ...prev,
                        riskWarnings: checked,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Trading Signals</Label>
                    <p className="text-xs text-muted-foreground">
                      Automated technical analysis signals
                    </p>
                  </div>
                  <Switch
                    checked={notifications.tradingSignals}
                    onCheckedChange={checked =>
                      setNotifications(prev => ({
                        ...prev,
                        tradingSignals: checked,
                      }))
                    }
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">
                      Receive alerts via email
                    </p>
                  </div>
                  <Switch
                    checked={notifications.emailNotifications}
                    onCheckedChange={checked =>
                      setNotifications(prev => ({
                        ...prev,
                        emailNotifications: checked,
                      }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Push Notifications</Label>
                    <p className="text-xs text-muted-foreground">
                      Browser notifications for real-time alerts
                    </p>
                  </div>
                  <Switch
                    checked={notifications.pushNotifications}
                    onCheckedChange={checked =>
                      setNotifications(prev => ({
                        ...prev,
                        pushNotifications: checked,
                      }))
                    }
                  />
                </div>
              </div>

              <Button
                onClick={() => toast.success("Notification settings saved")}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Notification Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance & Theme</CardTitle>
              <CardDescription>
                Customize the look and feel of your trading platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Theme Preference</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light Theme</SelectItem>
                      <SelectItem value="dark">Dark Theme</SelectItem>
                      <SelectItem value="system">System Default</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Display Preferences</h4>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="chartType">Default Chart Type</Label>
                      <Select defaultValue="candlestick">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="line">Line Chart</SelectItem>
                          <SelectItem value="candlestick">
                            Candlestick
                          </SelectItem>
                          <SelectItem value="area">Area Chart</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timeframe">Default Timeframe</Label>
                      <Select defaultValue="1D">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5M">5 Minutes</SelectItem>
                          <SelectItem value="15M">15 Minutes</SelectItem>
                          <SelectItem value="1H">1 Hour</SelectItem>
                          <SelectItem value="1D">1 Day</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Color Preferences</h4>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="p-3 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer">
                      <div className="w-full h-8 rounded bg-gradient-to-r from-green-500 to-red-500 mb-2"></div>
                      <div className="text-sm font-medium">Classic</div>
                      <div className="text-xs text-muted-foreground">
                        Green/Red
                      </div>
                    </div>

                    <div className="p-3 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer">
                      <div className="w-full h-8 rounded bg-gradient-to-r from-blue-500 to-orange-500 mb-2"></div>
                      <div className="text-sm font-medium">Professional</div>
                      <div className="text-xs text-muted-foreground">
                        Blue/Orange
                      </div>
                    </div>

                    <div className="p-3 rounded-lg border border-border hover:border-primary transition-colors cursor-pointer">
                      <div className="w-full h-8 rounded bg-gradient-to-r from-purple-500 to-pink-500 mb-2"></div>
                      <div className="text-sm font-medium">Modern</div>
                      <div className="text-xs text-muted-foreground">
                        Purple/Pink
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Button
                onClick={() => toast.success("Appearance settings saved")}
              >
                <Save className="h-4 w-4 mr-2" />
                Save Appearance Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Risk Settings */}
        <TabsContent value="risk" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Risk Management</CardTitle>
              <CardDescription>
                Configure automated risk controls and safety measures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="maxDailyLoss">Maximum Daily Loss (%)</Label>
                    <Input
                      id="maxDailyLoss"
                      type="number"
                      min="0.5"
                      max="10"
                      step="0.1"
                      value={riskSettings.maxDailyLoss}
                      onChange={e =>
                        setRiskSettings(prev => ({
                          ...prev,
                          maxDailyLoss: parseFloat(e.target.value),
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxPositionSize">
                      Maximum Position Size (%)
                    </Label>
                    <Input
                      id="maxPositionSize"
                      type="number"
                      min="1"
                      max="25"
                      value={riskSettings.maxPositionSize}
                      onChange={e =>
                        setRiskSettings(prev => ({
                          ...prev,
                          maxPositionSize: parseFloat(e.target.value),
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Automatic Stop Loss</Label>
                      <p className="text-xs text-muted-foreground">
                        Automatically suggest stop losses for new positions
                      </p>
                    </div>
                    <Switch
                      checked={riskSettings.autoStopLoss}
                      onCheckedChange={checked =>
                        setRiskSettings(prev => ({
                          ...prev,
                          autoStopLoss: checked,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="riskWarning">
                      Risk Warning Threshold (%)
                    </Label>
                    <Input
                      id="riskWarning"
                      type="number"
                      min="50"
                      max="95"
                      value={riskSettings.riskWarningThreshold}
                      onChange={e =>
                        setRiskSettings(prev => ({
                          ...prev,
                          riskWarningThreshold: parseFloat(e.target.value),
                        }))
                      }
                    />
                  </div>
                </div>
              </div>

              <Alert className="border-yellow-500/50 bg-yellow-500/10">
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
                <AlertDescription>
                  Current settings allow for{" "}
                  <strong>{riskSettings.maxDailyLoss}%</strong> daily loss and{" "}
                  <strong>{riskSettings.maxPositionSize}%</strong> maximum
                  position size.
                </AlertDescription>
              </Alert>

              <Button onClick={handleSaveProfile}>
                <Save className="h-4 w-4 mr-2" />
                Save Risk Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Data Management */}
        <TabsContent value="data" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Import, export, and manage your trading data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Export Data</h4>
                  <div className="space-y-2">
                    <Button
                      onClick={handleExportData}
                      variant="outline"
                      className="w-full"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export Trading Journal
                    </Button>
                    <Button
                      onClick={handleExportData}
                      variant="outline"
                      className="w-full"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export Watchlist
                    </Button>
                    <Button
                      onClick={handleExportData}
                      variant="outline"
                      className="w-full"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Export Settings
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Import Data</h4>
                  <div className="space-y-2">
                    <Button
                      onClick={handleImportData}
                      variant="outline"
                      className="w-full"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Import Trading Journal
                    </Button>
                    <Button
                      onClick={handleImportData}
                      variant="outline"
                      className="w-full"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Import Watchlist
                    </Button>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">API Configuration</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="alphaVantage">Alpha Vantage API Key</Label>
                    <Input
                      id="alphaVantage"
                      type="password"
                      placeholder="Enter API key"
                      value={apiSettings.alphaVantageKey}
                      onChange={e =>
                        setApiSettings(prev => ({
                          ...prev,
                          alphaVantageKey: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newsApi">News API Key</Label>
                    <Input
                      id="newsApi"
                      type="password"
                      placeholder="Enter API key"
                      value={apiSettings.newsApiKey}
                      onChange={e =>
                        setApiSettings(prev => ({
                          ...prev,
                          newsApiKey: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="refreshInterval">
                    Data Refresh Interval (seconds)
                  </Label>
                  <Select
                    value={apiSettings.refreshInterval.toString()}
                    onValueChange={value =>
                      setApiSettings(prev => ({
                        ...prev,
                        refreshInterval: parseInt(value),
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 second (Premium)</SelectItem>
                      <SelectItem value="5">5 seconds</SelectItem>
                      <SelectItem value="10">10 seconds</SelectItem>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="60">1 minute</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Alert>
                <Key className="h-4 w-4" />
                <AlertDescription>
                  API keys are stored securely and encrypted. They are only used
                  to fetch market data and news.
                </AlertDescription>
              </Alert>

              <Button onClick={() => toast.success("API settings saved")}>
                <Save className="h-4 w-4 mr-2" />
                Save API Settings
              </Button>
            </CardContent>
          </Card>

          {/* Data Usage Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Data Usage</CardTitle>
              <CardDescription>
                Monitor your API usage and limits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 rounded-lg bg-muted/30">
                  <div className="text-2xl font-bold">1,247</div>
                  <div className="text-xs text-muted-foreground">
                    API Calls Today
                  </div>
                  <Badge variant="outline" className="mt-1">
                    34% of limit
                  </Badge>
                </div>

                <div className="text-center p-4 rounded-lg bg-muted/30">
                  <div className="text-2xl font-bold">98.5%</div>
                  <div className="text-xs text-muted-foreground">Uptime</div>
                  <Badge
                    variant="outline"
                    className="mt-1 text-green-500 border-green-500"
                  >
                    Excellent
                  </Badge>
                </div>

                <div className="text-center p-4 rounded-lg bg-muted/30">
                  <div className="text-2xl font-bold">125ms</div>
                  <div className="text-xs text-muted-foreground">
                    Avg Response
                  </div>
                  <Badge
                    variant="outline"
                    className="mt-1 text-green-500 border-green-500"
                  >
                    Fast
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

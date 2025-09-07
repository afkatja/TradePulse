"use client"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StockChart } from "./stock-chart"
import { StockList } from "./stock-list"
import { TechnicalIndicators } from "./technical-indicators"
import { Search, Filter } from "lucide-react"
import Chat from "./chat"

export function MarketsPage() {
  const [selectedStock, setSelectedStock] = useState("AAPL")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Markets</h1>
            <p className="text-muted-foreground">
              Real-time market data and technical analysis
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search stocks..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Stock List */}
        <div className="lg:col-span-1">
          <StockList
            searchQuery={searchQuery}
            selectedStock={selectedStock}
            onSelectStock={setSelectedStock}
          />
          <Chat className="" />
        </div>

        {/* Chart and Analysis */}
        <div className="lg:col-span-2 space-y-6">
          <StockChart symbol={selectedStock} />

          <Tabs defaultValue="technical" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
              <TabsTrigger value="news">News</TabsTrigger>
            </TabsList>

            <TabsContent value="technical" className="space-y-4">
              <TechnicalIndicators symbol={selectedStock} />
            </TabsContent>

            <TabsContent value="fundamentals" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Fundamental Analysis</CardTitle>
                  <CardDescription>Key financial metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          P/E Ratio
                        </span>
                        <span className="text-sm font-medium">28.5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Market Cap
                        </span>
                        <span className="text-sm font-medium">$2.8T</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Beta
                        </span>
                        <span className="text-sm font-medium">1.25</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          EPS
                        </span>
                        <span className="text-sm font-medium">$6.50</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Revenue
                        </span>
                        <span className="text-sm font-medium">$394.3B</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Dividend Yield
                        </span>
                        <span className="text-sm font-medium">0.45%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="news" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Stock-Specific News</CardTitle>
                  <CardDescription>
                    Latest news for {selectedStock}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 rounded-lg bg-muted/30">
                      <h4 className="font-medium text-sm">
                        Apple Reports Strong Q4 Earnings
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        2 hours ago • MarketWatch
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/30">
                      <h4 className="font-medium text-sm">
                        New iPhone Sales Exceed Expectations
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        4 hours ago • TechCrunch
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

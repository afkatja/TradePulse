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
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SentimentOverview } from "./sentiment-overview"
import { NewsFeed } from "./news-feed"
import { PoliticalTracker } from "./political-tracker"
import { Search, Filter, Newspaper } from "lucide-react"

export function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              News & Sentiment
            </h1>
            <p className="text-muted-foreground">
              Real-time news analysis and market sentiment tracking
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search news..."
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

      {/* Sentiment Overview */}
      <SentimentOverview />

      {/* News Content */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All News</TabsTrigger>
          <TabsTrigger value="breaking">Breaking</TabsTrigger>
          <TabsTrigger value="political">Political</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <NewsFeed filter="all" searchQuery={searchQuery} />
        </TabsContent>

        <TabsContent value="breaking" className="space-y-4">
          <NewsFeed filter="breaking" searchQuery={searchQuery} />
        </TabsContent>

        <TabsContent value="political" className="space-y-4">
          <PoliticalTracker />
        </TabsContent>

        <TabsContent value="earnings" className="space-y-4">
          <NewsFeed filter="earnings" searchQuery={searchQuery} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

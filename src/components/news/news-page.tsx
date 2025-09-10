"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SentimentOverview } from "./sentiment-overview"
import { NewsFeed } from "./news-feed"
import { PoliticalTracker } from "./political-tracker"
import { Search, Filter } from "lucide-react"
import { useNews } from "../../contexts/news-context"

interface Category {
  id: string
  label: string
  icon: string
}

const categoriesMap: Record<string, Category> = {
  all: { id: "all", label: "All News", icon: "📰" },
  business: { id: "business", label: "Business", icon: "🚨" },
  general: { id: "general", label: "General", icon: "🏛️" },
  health: { id: "health", label: "Health", icon: "💰" },
  technology: { id: "technology", label: "Technology", icon: "💻" },
  science: { id: "science", label: "Science", icon: "📈" },
}

export function NewsPage() {
  const { currentCategory, setCategory, query, setQueryWithCategoryReset } =
    useNews()
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
                value={query}
                onChange={e => setQueryWithCategoryReset(e.target.value)}
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
      <Tabs
        value={currentCategory}
        defaultValue={categoriesMap.all.id}
        className="w-full"
      >
        <TabsList
          className={`grid w-full`}
          style={{
            gridTemplateColumns: `repeat(${
              Object.keys(categoriesMap).length
            }, minmax(0, 1fr))`,
          }}
        >
          {Object.entries(categoriesMap).map(([key, category]) => (
            <TabsTrigger
              key={key}
              value={category.id}
              onClick={() => setCategory(category.id)}
            >
              {category.icon} {category.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={currentCategory} className="space-y-4">
          <NewsFeed />
        </TabsContent>
      </Tabs>
    </div>
  )
}

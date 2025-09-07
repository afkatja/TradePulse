"use client"

import { useState, useEffect, use, useContext } from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { TopBar } from "@/components/layout/top-bar"
import { Dashboard } from "@/components/dashboard/dashboard"
import { MarketsPage } from "@/components/markets/markets-page"
import { NewsPage } from "@/components/news/news-page"
import { PortfolioPage } from "@/components/portfolio/portfolio-page"
import { AlertsPage } from "@/components/alerts/alerts-page"
import { SettingsPage } from "@/components/settings/settings-page"
import { AuthProvider } from "@/contexts/auth-context"
import { MarketDataProvider } from "@/contexts/market-data-context"
import { TradingJournalProvider } from "@/contexts/trading-journal-context"
import { SidebarContext, Tab } from "../contexts/sidebar-context"
import { NewsProvider } from "../contexts/news-context"

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const { activeTab } = useContext(SidebarContext)

  const renderActiveTab = () => {
    switch (activeTab) {
      case Tab.Dashboard:
        return <Dashboard />
      case Tab.Markets:
        return <MarketsPage />
      case Tab.News:
        return <NewsPage />
      case Tab.Portfolio:
        return <PortfolioPage />
      case Tab.Alerts:
        return <AlertsPage />
      case Tab.Settings:
        return <SettingsPage />
      default:
        return <Dashboard />
    }
  }

  return (
    <AuthProvider>
      <NewsProvider>
        <MarketDataProvider>
          <TradingJournalProvider>
            <div className="flex h-screen bg-background text-foreground">
              <Sidebar
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
              />
              <div className="flex-1 flex flex-col overflow-hidden">
                <TopBar
                  onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
                  sidebarOpen={sidebarOpen}
                />
                <main className="flex-1 overflow-auto bg-background">
                  {renderActiveTab()}
                </main>
              </div>
            </div>
          </TradingJournalProvider>
        </MarketDataProvider>
      </NewsProvider>
    </AuthProvider>
  )
}

"use client"
import { createContext, useState } from "react"

export enum Tab {
  Dashboard = "dashboard",
  Markets = "markets",
  News = "news",
  Portfolio = "portfolio",
  Alerts = "alerts",
  Settings = "settings",
}

export const SidebarContext = createContext<{
  activeTab: Tab
  setActiveTab: (tab: Tab) => void
}>({
  activeTab: Tab.Dashboard,
  setActiveTab: () => {},
})

export const SidebarProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [activeTab, setActiveTab] = useState(Tab.Dashboard)

  return (
    <SidebarContext.Provider
      value={{
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

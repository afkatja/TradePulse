"use client"

import { useContext } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  BarChart3,
  TrendingUp,
  Newspaper,
  Briefcase,
  Bell,
  Settings,
  Activity,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react"
import { SidebarContext, Tab } from "../../contexts/sidebar-context"

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

const navigationItems: Record<Tab, { id: Tab; label: string; icon: any }> = {
  [Tab.Dashboard]: {
    id: Tab.Dashboard,
    label: "Dashboard",
    icon: BarChart3,
  },
  [Tab.Markets]: {
    id: Tab.Markets,
    label: "Markets",
    icon: TrendingUp,
  },
  [Tab.News]: {
    id: Tab.News,
    label: "News & Sentiment",
    icon: Newspaper,
  },
  [Tab.Portfolio]: {
    id: Tab.Portfolio,
    label: "Portfolio",
    icon: Briefcase,
  },
  [Tab.Alerts]: {
    id: Tab.Alerts,
    label: "Alerts",
    icon: Bell,
  },
  [Tab.Settings]: {
    id: Tab.Settings,
    label: "Settings",
    icon: Settings,
  },
}

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const { activeTab, setActiveTab } = useContext(SidebarContext)
  console.log(Object.values(navigationItems))

  return (
    <div
      className={cn(
        "bg-card border-r border-border transition-all duration-300 ease-in-out",
        isOpen ? "w-64" : "w-16"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-border">
          {isOpen && (
            <div className="flex items-center space-x-2">
              <Activity className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
                TradePulse
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="h-9 w-9"
          >
            {isOpen ? (
              <PanelLeftClose className="h-4 w-4" />
            ) : (
              <PanelLeftOpen className="h-4 w-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-2">
            {Object.values(navigationItems).map(item => {
              const Icon = item.icon
              const isActive = activeTab === item.id

              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start transition-all duration-200 hover:cursor-pointer text-muted-foreground hover:text-foreground",
                    !isOpen && "justify-center px-2",
                    isActive && "bg-primary text-primary-foreground shadow-md"
                  )}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon className={cn("h-5 w-5", isOpen && "mr-3")} />
                  {isOpen && <span className="truncate">{item.label}</span>}
                </Button>
              )
            })}
          </nav>
        </ScrollArea>

        {/* Footer */}
        {isOpen && (
          <>
            <Separator />
            <div className="p-4">
              <div className="rounded-lg bg-muted p-3">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-muted-foreground">Market Open</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  Real-time data active
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

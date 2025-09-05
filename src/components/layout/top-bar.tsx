"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Moon, Sun, User, LogOut, Settings } from "lucide-react"
import { useTheme } from "next-themes"
import { useAuth } from "@/contexts/auth-context"

interface TopBarProps {
  onSidebarToggle: () => void
  sidebarOpen: boolean
}

export function TopBar({ onSidebarToggle, sidebarOpen }: TopBarProps) {
  const { theme, setTheme } = useTheme()
  const { user, logout } = useAuth()

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex items-center space-x-4 flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search stocks, ETFs..."
            className="pl-10 w-64"
          />
        </div>
      </div>

      {/* Market Status */}
      <div className="hidden md:flex items-center space-x-6">
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-sm font-medium">S&P 500</div>
            <div className="text-xs text-green-500">+1.2%</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium">NASDAQ</div>
            <div className="text-xs text-green-500">+0.8%</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-medium">DOW</div>
            <div className="text-xs text-red-500">-0.3%</div>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative">
          <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-red-500">
            3
          </Badge>
          <span className="sr-only">Notifications</span>
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-5.5-5.5L15 6l5.5 5.5z"
            />
          </svg>
        </Button>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatar.jpg" alt="User" />
                <AvatarFallback>
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {user?.name || "Trader"}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user?.email || "trader@example.com"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

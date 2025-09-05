import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { SidebarProvider } from "../contexts/sidebar-context"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TradePulse - Professional Day Trading Platform",
  description:
    "Advanced day trading platform with real-time market data, news sentiment analysis, and risk management tools",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`bg-background text-foreground border-border ${inter.className}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>{children}</SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

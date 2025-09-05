"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Vote, Users, TrendingUp, AlertTriangle } from "lucide-react"
import { cn } from "../../lib/utils"

const politicalEvents = [
  {
    id: "1",
    title: "Infrastructure Bill Vote Scheduled",
    description: "Senate to vote on $1.2T infrastructure package next week",
    impact: "high",
    sentiment: "bullish",
    probability: 75,
    affectedSectors: ["Infrastructure", "Materials", "Transportation"],
    timeline: "Next Week",
  },
  {
    id: "2",
    title: "Fed Chair Congressional Testimony",
    description: "Powell to testify before House Financial Services Committee",
    impact: "medium",
    sentiment: "neutral",
    probability: 100,
    affectedSectors: ["Banking", "Real Estate", "Technology"],
    timeline: "Tomorrow",
  },
  {
    id: "3",
    title: "Trade Policy Review",
    description: "Administration reviewing tariff policies on tech imports",
    impact: "high",
    sentiment: "bearish",
    probability: 60,
    affectedSectors: ["Technology", "Consumer Electronics"],
    timeline: "This Month",
  },
]

export function PoliticalTracker() {
  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      default:
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "bullish":
        return "text-green-500"
      case "bearish":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      {/* Political Sentiment Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Vote className="h-5 w-5" />
            <span>Political Impact Dashboard</span>
          </CardTitle>
          <CardDescription>
            Tracking policy changes and political events affecting markets
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 rounded-lg bg-muted/30">
              <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
              <div className="text-lg font-semibold">3</div>
              <div className="text-xs text-muted-foreground">
                Upcoming Events
              </div>
            </div>
            <div className="text-center p-4 rounded-lg bg-green-500/10">
              <TrendingUp className="h-6 w-6 mx-auto mb-2 text-green-500" />
              <div className="text-lg font-semibold">+12%</div>
              <div className="text-xs text-muted-foreground">
                Policy Bullishness
              </div>
            </div>
            <div className="text-center p-4 rounded-lg bg-yellow-500/10">
              <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-yellow-500" />
              <div className="text-lg font-semibold">2</div>
              <div className="text-xs text-muted-foreground">
                High Risk Events
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Political Events */}
      <div className="space-y-4">
        {politicalEvents.map(event => (
          <Card
            key={event.id}
            className="hover:shadow-md transition-all duration-200"
          >
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Badge
                        variant="outline"
                        className={cn("text-xs", getImpactColor(event.impact))}
                      >
                        {event.impact.toUpperCase()} IMPACT
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {event.timeline}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-semibold">{event.title}</h3>

                    <p className="text-sm text-muted-foreground">
                      {event.description}
                    </p>
                  </div>
                </div>

                {/* Probability */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Probability of Passage</span>
                    <span className="font-semibold">{event.probability}%</span>
                  </div>
                  <Progress value={event.probability} className="h-2" />
                </div>

                {/* Affected Sectors */}
                <div className="space-y-2">
                  <span className="text-sm font-medium">Affected Sectors:</span>
                  <div className="flex flex-wrap gap-1">
                    {event.affectedSectors.map(sector => (
                      <Badge key={sector} variant="outline" className="text-xs">
                        {sector}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Market Sentiment */}
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-sm text-muted-foreground">
                    Market Sentiment:
                  </span>
                  <span
                    className={cn(
                      "text-sm font-semibold capitalize",
                      getSentimentColor(event.sentiment)
                    )}
                  >
                    {event.sentiment}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

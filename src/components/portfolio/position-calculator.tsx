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
import { Badge } from "@/components/ui/badge"
import { Calculator, TrendingUp, Shield, AlertTriangle } from "lucide-react"

export function PositionCalculator() {
  const [calculation, setCalculation] = useState({
    accountSize: "50000",
    riskPercentage: "2",
    entryPrice: "",
    stopLoss: "",
    targetPrice: "",
    symbol: "",
  })

  const [results, setResults] = useState<any>(null)

  const calculatePosition = () => {
    const accountSize = parseFloat(calculation.accountSize)
    const riskPercentage = parseFloat(calculation.riskPercentage)
    const entryPrice = parseFloat(calculation.entryPrice)
    const stopLoss = parseFloat(calculation.stopLoss)
    const targetPrice = parseFloat(calculation.targetPrice)

    if (!entryPrice || !stopLoss || !accountSize || !riskPercentage) return

    const riskAmount = (accountSize * riskPercentage) / 100
    const riskPerShare = Math.abs(entryPrice - stopLoss)
    const positionSize = Math.floor(riskAmount / riskPerShare)
    const positionValue = positionSize * entryPrice
    const maxLoss = positionSize * riskPerShare

    let potentialGain = 0
    let riskRewardRatio = 0

    if (targetPrice) {
      potentialGain = positionSize * Math.abs(targetPrice - entryPrice)
      riskRewardRatio = potentialGain / maxLoss
    }

    setResults({
      positionSize,
      positionValue,
      maxLoss,
      potentialGain,
      riskRewardRatio,
      riskPercentage: (maxLoss / accountSize) * 100,
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5" />
            <span>Position Size Calculator</span>
          </CardTitle>
          <CardDescription>
            Calculate optimal position sizes based on your risk management rules
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="symbol">Stock Symbol</Label>
              <Input
                id="symbol"
                placeholder="AAPL"
                value={calculation.symbol}
                onChange={e =>
                  setCalculation(prev => ({
                    ...prev,
                    symbol: e.target.value.toUpperCase(),
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountSize">Account Size</Label>
              <Input
                id="accountSize"
                type="number"
                placeholder="50000"
                value={calculation.accountSize}
                onChange={e =>
                  setCalculation(prev => ({
                    ...prev,
                    accountSize: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="entryPrice">Entry Price</Label>
              <Input
                id="entryPrice"
                type="number"
                step="0.01"
                placeholder="185.50"
                value={calculation.entryPrice}
                onChange={e =>
                  setCalculation(prev => ({
                    ...prev,
                    entryPrice: e.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stopLoss">Stop Loss</Label>
              <Input
                id="stopLoss"
                type="number"
                step="0.01"
                placeholder="180.00"
                value={calculation.stopLoss}
                onChange={e =>
                  setCalculation(prev => ({
                    ...prev,
                    stopLoss: e.target.value,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="targetPrice">Target Price (Optional)</Label>
              <Input
                id="targetPrice"
                type="number"
                step="0.01"
                placeholder="195.00"
                value={calculation.targetPrice}
                onChange={e =>
                  setCalculation(prev => ({
                    ...prev,
                    targetPrice: e.target.value,
                  }))
                }
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="riskPercentage">Risk Percentage</Label>
            <Select
              value={calculation.riskPercentage}
              onValueChange={value =>
                setCalculation(prev => ({ ...prev, riskPercentage: value }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0.5">0.5% - Very Conservative</SelectItem>
                <SelectItem value="1">1% - Conservative</SelectItem>
                <SelectItem value="2">2% - Moderate</SelectItem>
                <SelectItem value="3">3% - Aggressive</SelectItem>
                <SelectItem value="5">5% - Very Aggressive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button onClick={calculatePosition} className="w-full">
            Calculate Position Size
          </Button>
        </CardContent>
      </Card>

      {/* Results */}
      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Calculation Results</CardTitle>
            <CardDescription>
              Recommended position size and risk analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="text-sm text-muted-foreground">
                    Recommended Position Size
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {results.positionSize} shares
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ${results.positionValue.toLocaleString()} position value
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-red-500/5 border border-red-500/20">
                  <div className="text-sm text-muted-foreground">
                    Maximum Loss
                  </div>
                  <div className="text-xl font-bold text-red-500">
                    -${results.maxLoss.toFixed(2)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {results.riskPercentage.toFixed(2)}% of account
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {results.potentialGain > 0 && (
                  <div className="p-4 rounded-lg bg-green-500/5 border border-green-500/20">
                    <div className="text-sm text-muted-foreground">
                      Potential Gain
                    </div>
                    <div className="text-xl font-bold text-green-500">
                      +${results.potentialGain.toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      if target is reached
                    </div>
                  </div>
                )}

                {results.riskRewardRatio > 0 && (
                  <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20">
                    <div className="text-sm text-muted-foreground">
                      Risk/Reward Ratio
                    </div>
                    <div className="text-xl font-bold text-blue-500">
                      1:{results.riskRewardRatio.toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {results.riskRewardRatio >= 2
                        ? "Excellent ratio"
                        : results.riskRewardRatio >= 1.5
                        ? "Good ratio"
                        : "Consider better target"}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Risk Assessment */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Risk Assessment</span>
              </div>

              <div className="grid gap-2 md:grid-cols-3">
                <Badge
                  variant="outline"
                  className={
                    results.riskPercentage <= 2
                      ? "border-green-500 text-green-500"
                      : results.riskPercentage <= 5
                      ? "border-yellow-500 text-yellow-500"
                      : "border-red-500 text-red-500"
                  }
                >
                  {results.riskPercentage <= 2
                    ? "Low Risk"
                    : results.riskPercentage <= 5
                    ? "Moderate Risk"
                    : "High Risk"}
                </Badge>

                {results.riskRewardRatio > 0 && (
                  <Badge
                    variant="outline"
                    className={
                      results.riskRewardRatio >= 2
                        ? "border-green-500 text-green-500"
                        : results.riskRewardRatio >= 1.5
                        ? "border-yellow-500 text-yellow-500"
                        : "border-red-500 text-red-500"
                    }
                  >
                    {results.riskRewardRatio >= 2
                      ? "Excellent R:R"
                      : results.riskRewardRatio >= 1.5
                      ? "Good R:R"
                      : "Poor R:R"}
                  </Badge>
                )}

                <Badge
                  variant="outline"
                  className={
                    results.positionValue /
                      parseFloat(calculation.accountSize) <=
                    0.1
                      ? "border-green-500 text-green-500"
                      : "border-yellow-500 text-yellow-500"
                  }
                >
                  {results.positionValue /
                    parseFloat(calculation.accountSize) <=
                  0.1
                    ? "Good Diversification"
                    : "High Concentration"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Risk Management Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Management Guidelines</CardTitle>
          <CardDescription>
            Best practices for position sizing and risk control
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-medium text-sm">Position Sizing Rules</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Never risk more than 2% of account on a single trade</li>
                <li>
                  • Keep individual positions under 10% of total portfolio
                </li>
                <li>• Use stop-losses on every trade</li>
                <li>• Maintain minimum 1:2 risk-reward ratio</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium text-sm">Portfolio Guidelines</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Diversify across at least 5 different sectors</li>
                <li>• Keep cash reserves for opportunities</li>
                <li>• Monitor correlation between positions</li>
                <li>• Review and rebalance regularly</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

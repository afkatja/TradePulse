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
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useTradingJournal } from "@/contexts/trading-journal-context"
import { TrendingUp, TrendingDown, Edit, Trash2, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Trade } from "@/contexts/trading-journal-context"

interface TradingJournalProps {
  showAddForm: boolean
  onCloseAddForm: () => void
}

export function TradingJournal({
  showAddForm,
  onCloseAddForm,
}: TradingJournalProps) {
  const { trades, addTrade, updateTrade, deleteTrade } = useTradingJournal()
  const [editingTrade, setEditingTrade] = useState<Trade | null>(null)

  const [newTrade, setNewTrade] = useState({
    symbol: "",
    type: "buy" as "buy" | "sell",
    quantity: "",
    entryPrice: "",
    exitPrice: "",
    notes: "",
    strategy: "",
    status: "open" as "open" | "closed",
  })

  const handleAddTrade = () => {
    if (!newTrade.symbol || !newTrade.quantity || !newTrade.entryPrice) return

    const trade: Omit<Trade, "id"> = {
      symbol: newTrade.symbol.toUpperCase(),
      type: newTrade.type,
      quantity: parseInt(newTrade.quantity),
      entryPrice: parseFloat(newTrade.entryPrice),
      exitPrice: newTrade.exitPrice
        ? parseFloat(newTrade.exitPrice)
        : undefined,
      entryDate: new Date(),
      exitDate: newTrade.status === "closed" ? new Date() : undefined,
      notes: newTrade.notes,
      strategy: newTrade.strategy,
      status: newTrade.status,
      pnl:
        newTrade.status === "closed" && newTrade.exitPrice
          ? (parseFloat(newTrade.exitPrice) - parseFloat(newTrade.entryPrice)) *
            parseInt(newTrade.quantity)
          : undefined,
    }

    addTrade(trade)
    setNewTrade({
      symbol: "",
      type: "buy",
      quantity: "",
      entryPrice: "",
      exitPrice: "",
      notes: "",
      strategy: "",
      status: "open",
    })
    onCloseAddForm()
  }

  const formatPnL = (pnl?: number) => {
    if (!pnl) return "-"
    return `${pnl >= 0 ? "+" : ""}$${pnl.toFixed(2)}`
  }

  return (
    <div className="space-y-6">
      {/* Add Trade Dialog */}
      <Dialog open={showAddForm} onOpenChange={onCloseAddForm}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Trade</DialogTitle>
            <DialogDescription>
              Record a new trade in your journal
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="symbol">Symbol</Label>
                <Input
                  id="symbol"
                  placeholder="AAPL"
                  value={newTrade.symbol}
                  onChange={e =>
                    setNewTrade(prev => ({ ...prev, symbol: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select
                  value={newTrade.type}
                  onValueChange={(value: "buy" | "sell") =>
                    setNewTrade(prev => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="buy">Buy</SelectItem>
                    <SelectItem value="sell">Sell</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="100"
                  value={newTrade.quantity}
                  onChange={e =>
                    setNewTrade(prev => ({ ...prev, quantity: e.target.value }))
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="entryPrice">Entry Price</Label>
                <Input
                  id="entryPrice"
                  type="number"
                  step="0.01"
                  placeholder="185.50"
                  value={newTrade.entryPrice}
                  onChange={e =>
                    setNewTrade(prev => ({
                      ...prev,
                      entryPrice: e.target.value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newTrade.status}
                  onValueChange={(value: "open" | "closed") =>
                    setNewTrade(prev => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {newTrade.status === "closed" && (
                <div className="space-y-2">
                  <Label htmlFor="exitPrice">Exit Price</Label>
                  <Input
                    id="exitPrice"
                    type="number"
                    step="0.01"
                    placeholder="190.00"
                    value={newTrade.exitPrice}
                    onChange={e =>
                      setNewTrade(prev => ({
                        ...prev,
                        exitPrice: e.target.value,
                      }))
                    }
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="strategy">Strategy</Label>
              <Input
                id="strategy"
                placeholder="Momentum, Breakout, Swing..."
                value={newTrade.strategy}
                onChange={e =>
                  setNewTrade(prev => ({ ...prev, strategy: e.target.value }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                placeholder="Reason for trade, market conditions..."
                value={newTrade.notes}
                onChange={e =>
                  setNewTrade(prev => ({ ...prev, notes: e.target.value }))
                }
              />
            </div>

            <div className="flex space-x-2 pt-4">
              <Button onClick={handleAddTrade} className="flex-1">
                Add Trade
              </Button>
              <Button variant="outline" onClick={onCloseAddForm}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Trades Table */}
      <Card>
        <CardHeader>
          <CardTitle>Trading Journal</CardTitle>
          <CardDescription>Your complete trading history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Symbol</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Entry Price</TableHead>
                  <TableHead>Exit Price</TableHead>
                  <TableHead>P&L</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trades.map(trade => (
                  <TableRow key={trade.id}>
                    <TableCell className="font-medium">
                      {trade.symbol}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={trade.type === "buy" ? "default" : "secondary"}
                      >
                        {trade.type.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>{trade.quantity}</TableCell>
                    <TableCell>${trade.entryPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      {trade.exitPrice ? `$${trade.exitPrice.toFixed(2)}` : "-"}
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "font-semibold",
                          trade.pnl && trade.pnl > 0
                            ? "text-green-500"
                            : trade.pnl && trade.pnl < 0
                            ? "text-red-500"
                            : ""
                        )}
                      >
                        {formatPnL(trade.pnl)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          trade.status === "open" ? "default" : "secondary"
                        }
                      >
                        {trade.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {trade.entryDate.toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center space-x-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => deleteTrade(trade.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

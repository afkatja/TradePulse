"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Trade {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  quantity: number;
  entryPrice: number;
  exitPrice?: number;
  entryDate: Date;
  exitDate?: Date;
  notes?: string;
  strategy?: string;
  pnl?: number;
  status: 'open' | 'closed';
}

interface TradingJournalContextType {
  trades: Trade[];
  addTrade: (trade: Omit<Trade, 'id'>) => void;
  updateTrade: (id: string, updates: Partial<Trade>) => void;
  deleteTrade: (id: string) => void;
  getTotalPnL: () => number;
  getWinRate: () => number;
  isLoading: boolean;
}

const TradingJournalContext = createContext<TradingJournalContextType | undefined>(undefined);

export function TradingJournalProvider({ children }: { children: React.ReactNode }) {
  const [trades, setTrades] = useState<Trade[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load trades from localStorage
    const savedTrades = localStorage.getItem('tradepulse_trades');
    if (savedTrades) {
      const parsedTrades = JSON.parse(savedTrades).map((trade: any) => ({
        ...trade,
        entryDate: new Date(trade.entryDate),
        exitDate: trade.exitDate ? new Date(trade.exitDate) : undefined
      }));
      setTrades(parsedTrades);
    } else {
      // Mock trades for demo
      const mockTrades: Trade[] = [
        {
          id: '1',
          symbol: 'AAPL',
          type: 'buy',
          quantity: 100,
          entryPrice: 180.50,
          exitPrice: 185.25,
          entryDate: new Date('2024-01-15'),
          exitDate: new Date('2024-01-16'),
          notes: 'Breakout above resistance',
          strategy: 'Momentum',
          pnl: 475,
          status: 'closed'
        },
        {
          id: '2',
          symbol: 'TSLA',
          type: 'buy',
          quantity: 50,
          entryPrice: 245.80,
          entryDate: new Date('2024-01-17'),
          notes: 'Strong volume, bullish sentiment',
          strategy: 'Swing',
          status: 'open'
        },
        {
          id: '3',
          symbol: 'MSFT',
          type: 'buy',
          quantity: 75,
          entryPrice: 382.15,
          exitPrice: 378.90,
          entryDate: new Date('2024-01-14'),
          exitDate: new Date('2024-01-15'),
          notes: 'Failed breakout, cut losses',
          strategy: 'Breakout',
          pnl: -243.75,
          status: 'closed'
        }
      ];
      setTrades(mockTrades);
    }
  }, []);

  const addTrade = (tradeData: Omit<Trade, 'id'>) => {
    const newTrade: Trade = {
      ...tradeData,
      id: Date.now().toString()
    };
    
    const updatedTrades = [...trades, newTrade];
    setTrades(updatedTrades);
    localStorage.setItem('tradepulse_trades', JSON.stringify(updatedTrades));
  };

  const updateTrade = (id: string, updates: Partial<Trade>) => {
    const updatedTrades = trades.map(trade => 
      trade.id === id ? { ...trade, ...updates } : trade
    );
    setTrades(updatedTrades);
    localStorage.setItem('tradepulse_trades', JSON.stringify(updatedTrades));
  };

  const deleteTrade = (id: string) => {
    const updatedTrades = trades.filter(trade => trade.id !== id);
    setTrades(updatedTrades);
    localStorage.setItem('tradepulse_trades', JSON.stringify(updatedTrades));
  };

  const getTotalPnL = () => {
    return trades.reduce((total, trade) => {
      if (trade.status === 'closed' && trade.pnl) {
        return total + trade.pnl;
      }
      return total;
    }, 0);
  };

  const getWinRate = () => {
    const closedTrades = trades.filter(trade => trade.status === 'closed');
    if (closedTrades.length === 0) return 0;
    
    const winningTrades = closedTrades.filter(trade => (trade.pnl || 0) > 0);
    return (winningTrades.length / closedTrades.length) * 100;
  };

  return (
    <TradingJournalContext.Provider value={{
      trades,
      addTrade,
      updateTrade,
      deleteTrade,
      getTotalPnL,
      getWinRate,
      isLoading
    }}>
      {children}
    </TradingJournalContext.Provider>
  );
}

export function useTradingJournal() {
  const context = useContext(TradingJournalContext);
  if (context === undefined) {
    throw new Error('useTradingJournal must be used within a TradingJournalProvider');
  }
  return context;
}
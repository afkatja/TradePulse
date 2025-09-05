"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
  marketCap?: number;
  pe?: number;
  sentiment?: 'bullish' | 'bearish' | 'neutral';
  sentimentScore?: number;
}

export interface MarketIndex {
  name: string;
  symbol: string;
  value: number;
  change: number;
  changePercent: number;
}

interface MarketDataContextType {
  watchlist: StockData[];
  marketIndices: MarketIndex[];
  addToWatchlist: (symbol: string) => void;
  removeFromWatchlist: (symbol: string) => void;
  getStockData: (symbol: string) => Promise<StockData | null>;
  searchStocks: (query: string) => Promise<StockData[]>;
  isLoading: boolean;
}

const MarketDataContext = createContext<MarketDataContextType | undefined>(undefined);

// Mock data
const mockStockData: StockData[] = [
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 185.25,
    change: 2.34,
    changePercent: 1.28,
    volume: 45123000,
    high: 186.50,
    low: 183.10,
    open: 184.00,
    previousClose: 182.91,
    marketCap: 2800000000000,
    pe: 28.5,
    sentiment: 'bullish',
    sentimentScore: 0.75
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 378.90,
    change: -1.45,
    changePercent: -0.38,
    volume: 28456000,
    high: 382.15,
    low: 376.80,
    open: 380.25,
    previousClose: 380.35,
    marketCap: 2750000000000,
    pe: 32.1,
    sentiment: 'neutral',
    sentimentScore: 0.12
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 248.75,
    change: 8.90,
    changePercent: 3.71,
    volume: 85234000,
    high: 252.30,
    low: 245.60,
    open: 246.20,
    previousClose: 239.85,
    marketCap: 780000000000,
    pe: 45.2,
    sentiment: 'bullish',
    sentimentScore: 0.65
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 875.30,
    change: 12.45,
    changePercent: 1.44,
    volume: 35678000,
    high: 880.90,
    low: 870.25,
    open: 872.10,
    previousClose: 862.85,
    marketCap: 2100000000000,
    pe: 68.5,
    sentiment: 'bullish',
    sentimentScore: 0.82
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com, Inc.',
    price: 142.15,
    change: -0.85,
    changePercent: -0.59,
    volume: 41235000,
    high: 143.80,
    low: 141.50,
    open: 143.20,
    previousClose: 143.00,
    marketCap: 1500000000000,
    pe: 42.8,
    sentiment: 'neutral',
    sentimentScore: -0.05
  }
];

const mockMarketIndices: MarketIndex[] = [
  {
    name: 'S&P 500',
    symbol: 'SPX',
    value: 4756.50,
    change: 28.75,
    changePercent: 0.61
  },
  {
    name: 'NASDAQ',
    symbol: 'IXIC',
    value: 14845.30,
    change: 85.20,
    changePercent: 0.58
  },
  {
    name: 'Dow Jones',
    symbol: 'DJI',
    value: 37248.90,
    change: -45.60,
    changePercent: -0.12
  }
];

export function MarketDataProvider({ children }: { children: React.ReactNode }) {
  const [watchlist, setWatchlist] = useState<StockData[]>([]);
  const [marketIndices, setMarketIndices] = useState<MarketIndex[]>(mockMarketIndices);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load watchlist from localStorage
    const savedWatchlist = localStorage.getItem('tradepulse_watchlist');
    if (savedWatchlist) {
      const symbols = JSON.parse(savedWatchlist);
      const watchlistData = symbols.map((symbol: string) => 
        mockStockData.find(stock => stock.symbol === symbol)
      ).filter(Boolean);
      setWatchlist(watchlistData);
    } else {
      // Default watchlist
      setWatchlist(mockStockData.slice(0, 3));
    }

    // Simulate real-time updates
    const interval = setInterval(() => {
      setWatchlist(prev => prev.map(stock => ({
        ...stock,
        price: stock.price + (Math.random() - 0.5) * 2,
        change: stock.change + (Math.random() - 0.5) * 0.5,
      })));

      setMarketIndices(prev => prev.map(index => ({
        ...index,
        value: index.value + (Math.random() - 0.5) * 10,
        change: index.change + (Math.random() - 0.5) * 2,
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const addToWatchlist = (symbol: string) => {
    const stockData = mockStockData.find(stock => stock.symbol === symbol);
    if (stockData && !watchlist.find(stock => stock.symbol === symbol)) {
      const newWatchlist = [...watchlist, stockData];
      setWatchlist(newWatchlist);
      localStorage.setItem('tradepulse_watchlist', JSON.stringify(newWatchlist.map(s => s.symbol)));
    }
  };

  const removeFromWatchlist = (symbol: string) => {
    const newWatchlist = watchlist.filter(stock => stock.symbol !== symbol);
    setWatchlist(newWatchlist);
    localStorage.setItem('tradepulse_watchlist', JSON.stringify(newWatchlist.map(s => s.symbol)));
  };

  const getStockData = async (symbol: string): Promise<StockData | null> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      const stock = mockStockData.find(s => s.symbol.toLowerCase() === symbol.toLowerCase());
      return stock || null;
    } finally {
      setIsLoading(false);
    }
  };

  const searchStocks = async (query: string): Promise<StockData[]> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      return mockStockData.filter(stock => 
        stock.symbol.toLowerCase().includes(query.toLowerCase()) ||
        stock.name.toLowerCase().includes(query.toLowerCase())
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <MarketDataContext.Provider value={{
      watchlist,
      marketIndices,
      addToWatchlist,
      removeFromWatchlist,
      getStockData,
      searchStocks,
      isLoading
    }}>
      {children}
    </MarketDataContext.Provider>
  );
}

export function useMarketData() {
  const context = useContext(MarketDataContext);
  if (context === undefined) {
    throw new Error('useMarketData must be used within a MarketDataProvider');
  }
  return context;
}
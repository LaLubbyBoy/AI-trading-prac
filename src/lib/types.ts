export interface Market {
  id: string;
  name: string;
  price: number;
  volatility: number;
  change24h?: number;
}

export interface NewsItem {
  id: number;
  title: string;
  category: string;
  time: string;
  impact: 'High' | 'Medium' | 'Low';
}

export interface TradingSignal {
  id: string;
  symbol: string;
  direction: 'LONG' | 'SHORT';
  confidence: number;
  entry: number;
  sl: number;
  tp: number;
  status: 'ACTIVE' | 'PENDING' | 'CLOSED';
  reasoning: string[];
  timestamp: string;
}

export type MarketRegime = "RANGE" | "TREND" | "VOLATILE_BREAKOUT" | "REVERSAL" | "ACCUMULATION" | "DISTRIBUTION";

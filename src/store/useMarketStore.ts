import { create } from 'zustand';
import { Market, TradingSignal } from '../lib/types';

interface MarketState {
  markets: Market[];
  activeMarketId: string | null;
  signals: TradingSignal[];
  setMarkets: (markets: Market[]) => void;
  setActiveMarketId: (id: string) => void;
  updateMarketPrice: (id: string, price: number) => void;
}

export const useMarketStore = create<MarketState>((set) => ({
  markets: [],
  activeMarketId: "EURUSD",
  signals: [
    {
      id: '1',
      symbol: 'EUR/USD',
      direction: 'LONG',
      confidence: 82,
      entry: 1.0825,
      sl: 1.0790,
      tp: 1.0890,
      status: 'ACTIVE',
      reasoning: ['Bullish BOS on 1H', 'Liquidity sweep at 1.0810', 'Positive Delta absorption'],
      timestamp: new Date().toISOString()
    },
    {
      id: '2',
      symbol: 'GBP/USD',
      direction: 'SHORT',
      confidence: 65,
      entry: 1.2680,
      sl: 1.2720,
      tp: 1.2600,
      status: 'ACTIVE',
      reasoning: ['Bearish FVG mitigation', 'RSI Divergence on 15m'],
      timestamp: new Date().toISOString()
    }
  ],
  setMarkets: (markets) => set({ markets }),
  setActiveMarketId: (id) => set({ activeMarketId: id }),
  updateMarketPrice: (id, price) => set((state) => ({
    markets: state.markets.map(m => m.id === id ? { ...m, price } : m)
  }))
}));

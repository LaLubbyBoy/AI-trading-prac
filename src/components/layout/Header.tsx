import React from 'react';
import { Search, Bell, User, ChevronDown, Command } from 'lucide-react';
import { useMarketStore } from '../../store/useMarketStore';

export function Header() {
  const markets = useMarketStore(state => state.markets);
  
  return (
    <header className="h-16 flex items-center justify-between px-8 border-b border-white/5 bg-[#080808]/80 backdrop-blur-xl">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold tracking-tight text-white">EdgeFlow <span className="text-orange-500">AI</span></h1>
        <div className="h-4 w-[1px] bg-white/10"></div>
        <div className="flex items-center space-x-3 text-xs uppercase tracking-widest text-white/40">
          <span>Session: London</span>
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-white/60">Live Data Feed Active</span>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <div className="flex items-center bg-white/5 px-4 py-2 rounded-full border border-white/10">
          <span className="text-xs text-white/40 mr-3">Global Risk:</span>
          <span className="text-xs font-semibold text-green-400">Balanced</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative flex h-9 w-9 items-center justify-center rounded-lg hover:bg-white/5 transition-colors">
            <Bell size={18} className="text-white/40" />
            <span className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-orange-500 border border-[#080808]" />
          </button>
          
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-[#050505] bg-orange-600"></div>
          </div>
        </div>
      </div>
    </header>
  );
}

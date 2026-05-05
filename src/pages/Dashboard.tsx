import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Zap, 
  Clock, 
  Shield, 
  ArrowUpRight,
  BrainCircuit,
  Layers,
  LineChart,
  Globe
} from 'lucide-react';
import { useMarketStore } from '../store/useMarketStore';
import { GlassCard } from '../components/ui/GlassCard';
import { useQuery } from '@tanstack/react-query';

export function Dashboard() {
  const { markets, signals } = useMarketStore();
  
  const { data: news } = useQuery({
    queryKey: ['news'],
    queryFn: async () => {
      const res = await fetch('/api/news');
      return res.json();
    }
  });

  const [isAnalyzing, setIsAnalyzing] = React.useState(false);
  const [analysisResult, setAnalysisResult] = React.useState<string | null>(null);

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult("HIGH PROBABILITY: Liquidity sweep identified at 1.0825. Structure remains bullish on 4H. Macro bias hawkish.");
    }, 2000);
  };

  return (
    <div className="flex-1 grid grid-cols-12 gap-0 overflow-hidden h-full">
      {/* Left Main Content */}
      <div className="col-span-9 flex flex-col border-r border-white/5 p-6 space-y-6 overflow-y-auto scrollbar-hide">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white tracking-tight">Intelligence Terminal</h2>
          <button 
            onClick={runAnalysis}
            disabled={isAnalyzing}
            className="px-6 py-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-black font-bold text-xs transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest"
          >
            {isAnalyzing ? <Activity className="animate-spin" size={14} /> : <Zap size={14} />}
            {isAnalyzing ? 'Processing...' : 'Analyze Market'}
          </button>
        </div>

        {analysisResult && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold flex items-center gap-3"
          >
            <BrainCircuit size={18} />
            {analysisResult}
          </motion.div>
        )}

        <div className="grid grid-cols-4 gap-4">
          {markets.slice(0, 4).map((m, i) => (
            <div key={m.id} className="bg-white/5 border border-white/10 rounded-2xl p-4 group cursor-pointer hover:bg-white/[0.08] transition-all">
              <p className="text-[10px] uppercase tracking-wider text-white/40 mb-1">{m.name}</p>
              <div className="flex justify-between items-end">
                <span className="text-xl font-mono font-bold text-white">
                  {m.price.toFixed(4)}<span className="text-sm opacity-60">{(Math.random() * 9).toFixed(0)}</span>
                </span>
                <span className="text-xs text-green-400 font-medium mb-1">+0.12%</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex-1 bg-[#0A0A0A] rounded-2xl border border-white/10 relative overflow-hidden flex flex-col min-h-[300px]">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-500 via-transparent to-transparent pointer-events-none"></div>
          <div className="p-4 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
            <div className="flex space-x-4 text-[10px] font-bold uppercase tracking-[0.2em]">
              <span className="text-orange-500 border-b-2 border-orange-500 pb-1">Technical</span>
              <span className="text-white/40">Liquidity</span>
              <span className="text-white/40">Order Flow</span>
            </div>
            <div className="flex space-x-2">
              <div className="px-2 py-1 bg-white/5 rounded text-[10px] text-white/60">1H</div>
              <div className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-[10px]">4H</div>
              <div className="px-2 py-1 bg-white/5 rounded text-[10px] text-white/60">1D</div>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center text-white/5">
            <LineChart className="w-24 h-24" />
            <span className="text-[10px] uppercase tracking-[0.3em] mt-4 font-bold text-white/20">Real-time intelligence engine active</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 h-48">
          <div className="bg-white/5 rounded-2xl border border-white/10 p-5 flex flex-col">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4">Active Opportunities</h3>
            <div className="flex flex-col space-y-3 overflow-y-auto scrollbar-hide">
              {signals.map(signal => (
                <div key={signal.id} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border-l-4 border-orange-500">
                  <div>
                    <span className="text-xs font-bold text-white">{signal.symbol} • {signal.direction}</span>
                    <p className="text-[10px] text-white/40">Confidence: {signal.confidence}% • Institutional Alignment</p>
                  </div>
                  <button className="px-4 py-1.5 bg-orange-500 text-black text-[10px] font-bold rounded-lg uppercase">Execute</button>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white/5 rounded-2xl border border-white/10 p-5 flex flex-col">
             <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4">Market Regime Classifier</h3>
             <div className="flex-1 flex items-center justify-center space-x-8">
               <div className="flex flex-col items-center">
                 <div className="text-3xl font-light text-orange-500 tracking-tighter">TRENDING</div>
                 <span className="text-[10px] text-white/40 uppercase mt-1 tracking-widest">Dominant State</span>
               </div>
               <div className="w-[1px] h-12 bg-white/10"></div>
               <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                 <div className="flex flex-col">
                   <span className="text-sm font-mono text-white">81%</span>
                   <span className="text-[9px] text-white/40 uppercase">Stability</span>
                 </div>
                 <div className="flex flex-col">
                   <span className="text-sm font-mono text-white">HIGH</span>
                   <span className="text-[9px] text-white/40 uppercase">Momentum</span>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar Intelligence Panel */}
      <div className="col-span-3 bg-[#080808] p-6 space-y-6 overflow-y-auto scrollbar-hide">
        <div className="flex flex-col bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 rounded-2xl p-5">
          <h2 className="text-[10px] font-bold uppercase tracking-widest text-orange-500 mb-6">Probability Core</h2>
          <div className="flex flex-col items-center relative mb-6">
            <div className="w-32 h-32 rounded-full border-[10px] border-white/5 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border-[10px] border-orange-500 border-t-transparent border-r-transparent absolute rotate-[135deg]"></div>
              <div className="flex flex-col items-center">
                <span className="text-4xl font-bold font-mono tracking-tighter text-white">84</span>
                <span className="text-[10px] uppercase text-white/40 tracking-widest font-bold">Edge %</span>
              </div>
            </div>
            <div className="mt-4 flex flex-col items-center">
              <span className="text-[10px] font-bold text-green-400 px-3 py-1 bg-green-400/10 rounded-full">Institutional Grade</span>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Technical Confluence', val: '0.88', width: '88%' },
              { label: 'Liquidity Profile', val: '0.74', width: '74%' },
              { label: 'Macro Surprise', val: '0.91', width: '91%' },
            ].map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between items-center text-[10px] font-bold">
                  <span className="text-white/40 uppercase">{stat.label}</span>
                  <span className="font-mono text-white">{stat.val}</span>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-orange-500" style={{ width: stat.width }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-4">Macro Pulse</h3>
          <div className="space-y-4">
            {news?.map((item: any) => (
              <div key={item.id} className="group p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-white/10">
                <p className="text-[10px] text-orange-500 font-bold mb-1 uppercase tracking-wider">{item.impact} IMPACT</p>
                <p className="text-xs leading-relaxed font-medium text-white/80">{item.title}</p>
                <div className="flex items-center mt-2 space-x-2">
                  <span className="text-[9px] text-white/20">{item.time}</span>
                  <span className="text-[9px] text-white/20 uppercase font-bold">{item.category}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-white/5">
           <div className="bg-orange-500/5 rounded-xl p-4 border border-orange-500/10">
              <div className="flex items-center gap-2 text-[10px] font-bold text-orange-400 uppercase mb-2">
                 <Shield size={12} />
                 Capital Protection
              </div>
              <p className="text-[10px] text-white/40 leading-relaxed uppercase">Conservative shield active. Risk per trade capped at 0.5% with mandatory SL.</p>
           </div>
        </div>
      </div>
    </div>
  );
}

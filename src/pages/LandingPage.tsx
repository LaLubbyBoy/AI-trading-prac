import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Shield, Zap, Globe, ArrowRight, BarChart3, Binary, Cpu } from 'lucide-react';

export function LandingPage({ onEnter }: { onEnter: () => void }) {
  return (
    <div className="min-h-screen bg-[#050505] text-[#E0E0E0] selection:bg-orange-500/30">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-linear-to-br from-orange-500 to-amber-200 flex items-center justify-center shadow-lg shadow-orange-500/20">
             <TrendingUp size={18} className="text-black" />
          </div>
          <span className="text-xl font-bold tracking-tight">EdgeFlow <span className="text-orange-500">AI</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-widest uppercase text-white/30">
           <a href="#features" className="hover:text-white transition-colors">Intelligence</a>
           <a href="#engine" className="hover:text-white transition-colors">Alpha Core</a>
           <a href="#pricing" className="hover:text-white transition-colors">Terminal</a>
        </div>
        <button 
          onClick={onEnter}
          className="px-6 py-2 rounded-xl bg-white text-black text-xs font-bold hover:bg-slate-200 transition-all cursor-pointer uppercase tracking-widest"
        >
          Launch Terminal
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative px-8 pt-20 pb-32 max-w-7xl mx-auto text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[400px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold tracking-[0.2em] text-orange-500 uppercase mb-8">
            <Zap size={12} />
            Institutional Market Visibility
          </div>
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 leading-[0.9]">
            Probability-Based <br />
            <span className="text-gradient">Alpha Engine</span>
          </h1>
          <p className="text-base md:text-lg text-white/40 max-w-2xl mx-auto mb-12 leading-relaxed font-medium uppercase tracking-wide">
            Powered by technical structure, 
            liquidity intelligence, and real-time order flow analysis.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onEnter}
              className="group h-14 px-10 rounded-2xl bg-orange-500 hover:bg-orange-400 text-black font-bold transition-all flex items-center gap-2 cursor-pointer uppercase tracking-widest text-xs"
            >
              Start Analysis
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </button>
            <button className="h-14 px-10 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold transition-all cursor-pointer uppercase tracking-widest text-xs">
              System Manual
            </button>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-40">
           {[
             { title: 'Liquidity Intelligence', desc: 'Identify institutional sweeps and order block mitigation with sub-50ms tick processing.', icon: Binary },
             { title: 'Confidence Scoring', desc: 'Dynamic probability matrix based on multi-confluence alignment across every timeframe.', icon: Cpu },
             { title: 'Fundamental Logic', desc: 'Real-time NLP processing of central bank rhetoric and high-impact macro headlines.', icon: Globe },
           ].map((feature, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 text-left group hover:border-white/10 transition-all"
             >
                <div className="h-12 w-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                   <feature.icon size={24} />
                </div>
                <h3 className="text-sm font-bold mb-3 uppercase tracking-widest text-white/80">{feature.title}</h3>
                <p className="text-white/30 text-xs leading-relaxed uppercase tracking-wider">{feature.desc}</p>
             </motion.div>
           ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-8 py-12">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-2 opacity-30">
              <TrendingUp size={16} />
              <span className="text-xs font-bold tracking-tight">EdgeFlow AI</span>
            </div>
            <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold">© 2026 EdgeFlow Intelligence • Private Institutional Tier</p>
            <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-white/20">
               <a href="#" className="hover:text-white">Privacy</a>
               <a href="#" className="hover:text-white">Security</a>
               <a href="#" className="hover:text-white">Terminal</a>
            </div>
         </div>
      </footer>
    </div>
  );
}

import React from 'react';
import { 
  LayoutDashboard, 
  BarChart3, 
  Globe, 
  Calendar, 
  Bell, 
  Settings, 
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { motion } from 'motion/react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
  { icon: BarChart3, label: 'Analysis', id: 'analysis' },
  { icon: Globe, label: 'Live News', id: 'news' },
  { icon: Calendar, label: 'Economic Calendar', id: 'calendar' },
  { icon: Bell, label: 'Alerts', id: 'alerts' },
];

export function Sidebar() {
  return (
    <aside className="w-16 flex flex-col items-center py-6 border-r border-white/10 bg-[#0A0A0A] space-y-8 z-20">
      <div className="w-8 h-8 bg-gradient-to-tr from-orange-500 to-amber-200 rounded-lg shadow-lg shadow-orange-500/20"></div>
      
      <nav className="flex flex-col space-y-6">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            whileHover={{ scale: 1.1 }}
            className={`p-2 rounded-xl transition-colors ${
              item.id === 'dashboard' 
                ? 'bg-white/5 text-orange-400' 
                : 'text-white/40 hover:text-white transition-colors'
            }`}
          >
            <item.icon size={24} />
          </motion.button>
        ))}
      </nav>

      <div className="mt-auto mb-2 text-white/20">
        <button className="p-2 hover:text-white transition-colors">
          <Settings size={24} />
        </button>
      </div>
    </aside>
  );
}

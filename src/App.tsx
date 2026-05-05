import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useMarketStore } from './store/useMarketStore';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './pages/Dashboard';
import { LandingPage } from './pages/LandingPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  const setMarkets = useMarketStore(state => state.setMarkets);
  const [isAppVisible, setIsAppVisible] = useState(false);

  useEffect(() => {
    const socket = io();
    
    socket.on('market_update', (data) => {
      setMarkets(data);
    });

    return () => {
      socket.disconnect();
    };
  }, [setMarkets]);

  if (!isAppVisible) {
    return <LandingPage onEnter={() => setIsAppVisible(true)} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex h-screen w-full overflow-hidden bg-[#020617]">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            <Dashboard />
          </main>
        </div>
      </div>
    </QueryClientProvider>
  );
}

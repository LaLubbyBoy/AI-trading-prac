import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  const PORT = 3000;

  // Market Simulation Data
  const markets = [
    { id: "EURUSD", name: "EUR/USD", price: 1.0845, volatility: 0.0001 },
    { id: "GBPUSD", name: "GBP/USD", price: 1.2650, volatility: 0.00015 },
    { id: "USDCHF", name: "USD/CHF", price: 0.8820, volatility: 0.00012 },
    { id: "AUDUSD", name: "AUD/USD", price: 0.6540, volatility: 0.00018 },
    { id: "SPX500", name: "S&P 500", price: 5120.50, volatility: 0.5 },
    { id: "NDX100", name: "Nasdaq 100", price: 18230.20, volatility: 1.2 },
    { id: "GER40", name: "DAX 40", price: 17850.50, volatility: 1.5 },
  ];

  // Simulated Market Tick Engine
  setInterval(() => {
    markets.forEach(m => {
      const change = (Math.random() - 0.5) * m.volatility;
      m.price += change;
    });
    io.emit("market_update", markets);
  }, 1000);

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/api/markets", (req, res) => {
    res.json(markets);
  });

  app.get("/api/news", (req, res) => {
    res.json([
      { id: 1, title: "Fed Maintains Hawkish Stance Amid Sticky Inflation", category: "Central Banks", time: "2m ago", impact: "High" },
      { id: 2, title: "ECB Signals Potential June Rate Cut", category: "Central Banks", time: "15m ago", impact: "Medium" },
      { id: 3, title: "S&P 500 Rallies as Tech Earnings Surprise", category: "Equities", time: "45m ago", impact: "High" },
      { id: 4, title: "Crude Oil Stalls Near $85 on Geopolitical Tensions", category: "Commodities", time: "1h ago", impact: "Medium" },
    ]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`EdgeFlow AI Server running on http://localhost:${PORT}`);
  });
}

startServer();

import { TrendingUp, ShieldCheck, Zap, ExternalLink, Activity, Sparkles } from "lucide-react";

interface TradeGoHeaderProps {
  activeSymbol: string;
  onSymbolSelect: (symbol: string) => void;
  onQuickAnalysis?: (prompt: string) => void;
}

export const TICKER_DATA = [
  { symbol: "NVDA", name: "NVIDIA Corp.", price: "$128.50", change: "+4.12%", isUp: true, vol: "42.8M" },
  { symbol: "AAPL", name: "Apple Inc.", price: "$234.85", change: "+1.85%", isUp: true, vol: "28.3M" },
  { symbol: "TSLA", name: "Tesla Inc.", price: "$218.20", change: "-2.14%", isUp: false, vol: "35.1M" },
  { symbol: "MSFT", name: "Microsoft", price: "$448.90", change: "+0.95%", isUp: true, vol: "18.4M" },
  { symbol: "SPY", name: "S&P 500 ETF", price: "$550.20", change: "+0.62%", isUp: true, vol: "51.2M" },
  { symbol: "QQQ", name: "Invesco QQQ", price: "$482.10", change: "+1.25%", isUp: true, vol: "31.9M" },
];

export function TradeGoHeader({ activeSymbol, onSymbolSelect, onQuickAnalysis }: TradeGoHeaderProps) {
  return (
    <div className="w-full space-y-6">
      {/* Marketplace Nav Bar & Status Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl md:rounded-[24px] border border-[#e2e8f0] shadow-[0_6px_22px_rgba(15,23,42,0.04)]">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold font-['Red_Hat_Display'] text-[#0f172a] tracking-tight">
                TradeGo <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-semibold font-['Inter']">AI AGENT v2.4</span>
              </h1>
            </div>
            <p className="text-xs text-[#475569] font-['Poppins']">
              Real-Time Stock Market Analysis & AI Swarm Intelligence
            </p>
          </div>
        </div>

        {/* Live Status Indicator & Marketplace Exit */}
        <div className="flex items-center flex-wrap gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#eff6ff] border border-blue-100 shadow-2xs">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-medium text-[#047857] font-['Inter']">
              Runs live on aiKart
            </span>
          </div>

          <button
            onClick={() => window.open("https://aikart.co", "_blank")}
            className="btn-pill-exit text-xs py-2 px-4 flex items-center gap-1.5"
            title="Return to aiKart Marketplace"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>aiKart Marketplace</span>
          </button>
        </div>
      </div>

      {/* Hero Title Card with Moving Gradient */}
      <div className="aikart-card relative overflow-hidden bg-gradient-to-br from-white via-[#f8fafc] to-[#eff6ff]/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-3 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="aikart-badge">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Institutional Grade Financial AI</span>
            </span>
            <span className="rounded-full px-3 py-1 text-xs font-medium bg-[#ecfdf5] text-[#047857] border border-emerald-100 flex items-center gap-1 font-['Inter']">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>aiKart Verified Security</span>
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold font-['Red_Hat_Display'] tracking-tight text-[#0f172a]">
            Vibe Trade Markets with{" "}
            <span className="aikart-moving-gradient">TradeGo AI Intelligence</span>
          </h2>

          <p className="text-sm md:text-base text-[#475569] font-['Poppins'] max-w-3xl leading-relaxed">
            Multi-agent swarm financial research, real-time stock price technicals, RSI & MACD divergence detection, automated portfolio VaR risk management, and live trading signals.
          </p>

          <div className="flex items-center flex-wrap gap-3 pt-2">
            <button
              onClick={() => onQuickAnalysis?.("Run a comprehensive multi-factor scan on top S&P 500 stocks")}
              className="btn-pill-primary text-sm"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>Run Full Market Audit</span>
            </button>

            <button
              onClick={() => onQuickAnalysis?.("Explain TradeGo's 4-agent swarm architecture & technical indicators")}
              className="btn-pill-secondary text-sm"
            >
              <Activity className="w-4 h-4 text-[#2563eb]" />
              <span>View Swarm Workflow</span>
            </button>
          </div>
        </div>
      </div>

      {/* Live Market Ticker Strip */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#475569] font-['Inter'] flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600"></span>
            Live Watchlist & Quotes
          </span>
          <span className="text-xs text-[#94a3b8] font-['Inter']">Click any ticker to analyze</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
          {TICKER_DATA.map((t) => {
            const isSelected = activeSymbol === t.symbol;
            return (
              <button
                key={t.symbol}
                onClick={() => onSymbolSelect(t.symbol)}
                className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "bg-[#eff6ff] border-[#2563eb] shadow-sm ring-2 ring-blue-500/20"
                    : "bg-white border-[#e2e8f0] hover:border-blue-300 hover:bg-gray-50/80"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm font-['Red_Hat_Display'] text-[#0f172a]">
                    {t.symbol}
                  </span>
                  <span
                    className={`text-xs font-semibold font-['Inter'] px-1.5 py-0.5 rounded ${
                      t.isUp ? "bg-[#ecfdf5] text-[#047857]" : "bg-[#fef2f2] text-[#dc2626]"
                    }`}
                  >
                    {t.change}
                  </span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-[#475569] font-medium font-['Poppins']">
                    {t.price}
                  </span>
                  <span className="text-[10px] text-[#94a3b8] font-['Inter']">
                    Vol: {t.vol}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

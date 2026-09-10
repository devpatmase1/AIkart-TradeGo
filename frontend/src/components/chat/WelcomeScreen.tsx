import { useState } from "react";
import { TradeGoHeader } from "@/components/tradego/TradeGoHeader";
import { TradeGoStockChart } from "@/components/tradego/TradeGoStockChart";
import { TradeGoSwarmTimeline } from "@/components/tradego/TradeGoSwarmTimeline";
import { TradeGoLiveSignals } from "@/components/tradego/TradeGoLiveSignals";
import { TradeGoComposer } from "@/components/chat/TradeGoComposer";
import { Activity, Flame, Sparkles, Users, Newspaper } from "lucide-react";

interface WelcomeScreenProps {
  onExample: (prompt: string) => void;
}

export function WelcomeScreen({ onExample }: WelcomeScreenProps) {
  const [selectedSymbol, setSelectedSymbol] = useState("NVDA");

  return (
    <div className="w-full max-w-[1240px] mx-auto space-y-6 pb-12 overflow-x-hidden">
      {/* 1. Header & Live Market Ticker */}
      <TradeGoHeader
        activeSymbol={selectedSymbol}
        onSymbolSelect={setSelectedSymbol}
        onQuickAnalysis={onExample}
      />

      {/* 2-Column Responsive Grid Layout (Desktop: 7 cols left, 5 cols right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Interactive ECharts Chart, Swarm Workflow & Prompt Input */}
        <div className="lg:col-span-7 space-y-6">
          {/* Real-Time Stock Chart */}
          <TradeGoStockChart
            symbol={selectedSymbol}
            onAnalyzeSymbol={(sym) => onExample(`Perform institutional-grade deep technical & fundamental audit for $${sym}`)}
          />

          {/* Quick Prompt Composer Input */}
          <div className="aikart-card space-y-3 bg-white">
            <div className="flex items-center justify-between pb-2 border-b border-[#f1f5f9]">
              <span className="text-xs font-bold text-[#0f172a] font-['Red_Hat_Display'] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
                Ask TradeGo AI Agent
              </span>
              <span className="text-[11px] text-[#94a3b8] font-['Inter']">
                Real-time stock queries & signals
              </span>
            </div>

            <TradeGoComposer
              activeSymbol={selectedSymbol}
              onSend={onExample}
            />
          </div>

          {/* Swarm Agent Execution Steps */}
          <TradeGoSwarmTimeline symbol={selectedSymbol} />
        </div>

        {/* RIGHT COLUMN: Live Trading Signals, Sentiment Meter & Simulated Orders */}
        <div className="lg:col-span-5 space-y-6">
          {/* Live Signals & Paper Trading Modal */}
          <TradeGoLiveSignals
            symbol={selectedSymbol}
            onExecuteSimulatedTrade={(order) => {
              onExample(`Execute paper trading simulation for ${order.quantity} shares of ${order.symbol} at ${order.price}`);
            }}
          />

          {/* Market Sentiment & Catalyst Heatmap */}
          <div className="aikart-card space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#f1f5f9]">
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500" />
                <h4 className="text-sm font-bold font-['Red_Hat_Display'] text-[#0f172a]">
                  Market Sentiment & Catalysts
                </h4>
              </div>
              <span className="text-xs font-bold text-[#047857] bg-[#ecfdf5] px-2 py-0.5 rounded-full font-['Inter']">
                78% Bullish
              </span>
            </div>

            {/* Fear & Greed Gauge Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-['Inter']">
                <span className="text-[#475569]">Fear & Greed Index</span>
                <span className="font-bold text-amber-600">68 (Greed)</span>
              </div>
              <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden flex">
                <div className="w-[68%] h-full bg-gradient-to-r from-amber-400 to-emerald-500 rounded-full" />
              </div>
            </div>

            {/* Catalyst Feed */}
            <div className="space-y-2 text-xs font-['Poppins']">
              <div className="p-2.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] flex items-start gap-2">
                <Newspaper className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#0f172a] block">Fed Rate Cut Expectations Rise</span>
                  <span className="text-[#475569]">Fed futures price 85% probability of 25bps cut next FOMC.</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] flex items-start gap-2">
                <Activity className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-[#0f172a] block">AI Infrastructure Surge</span>
                  <span className="text-[#475569]">Hyperscaler capex projections revised upward by +14%.</span>
                </div>
              </div>
            </div>
          </div>

          {/* TradeGo Swarm Agent Roster */}
          <div className="aikart-card space-y-3 bg-gradient-to-br from-[#eff6ff]/60 to-white">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              <h4 className="text-sm font-bold font-['Red_Hat_Display'] text-[#0f172a]">
                TradeGo Agent Swarm Roster
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-['Poppins']">
              <div className="p-2 rounded-lg bg-white border border-blue-100">
                <span className="font-bold text-[#0f172a] block">Data Scraper</span>
                <span className="text-[#475569]">Tick & Order Book</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-blue-100">
                <span className="font-bold text-[#0f172a] block">Quant Analyst</span>
                <span className="text-[#475569]">SMA, RSI & MACD</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-blue-100">
                <span className="font-bold text-[#0f172a] block">News Scraper</span>
                <span className="text-[#475569]">Earnings & Filings</span>
              </div>
              <div className="p-2 rounded-lg bg-white border border-blue-100">
                <span className="font-bold text-[#0f172a] block">Risk Dispatcher</span>
                <span className="text-[#475569]">VaR & Stop Loss</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

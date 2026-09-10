import React from "react";
import { CheckCircle2, Cpu, LineChart, Newspaper, ShieldCheck, Zap } from "lucide-react";

export interface SwarmAgentStep {
  id: string;
  name: string;
  role: string;
  status: "completed" | "running" | "pending";
  detail: string;
  icon: React.ReactNode;
  latency: string;
}

interface TradeGoSwarmTimelineProps {
  symbol: string;
  isStreaming?: boolean;
}

export function TradeGoSwarmTimeline({ symbol, isStreaming = false }: TradeGoSwarmTimelineProps) {
  const steps: SwarmAgentStep[] = [
    {
      id: "agent-1",
      name: "Market Data Agent",
      role: "Tick Feeds & Order Book",
      status: "completed",
      detail: `Fetched 2,400 order ticks for $${symbol}. Bid/Ask spread 0.02%.`,
      icon: <Cpu className="w-4 h-4 text-blue-600" />,
      latency: "14ms",
    },
    {
      id: "agent-2",
      name: "Technical Analysis Agent",
      role: "SMA, RSI & MACD Scraper",
      status: "completed",
      detail: "Detected RSI (14) bullish crossover at 62.4 with expanding Bollinger Bands.",
      icon: <LineChart className="w-4 h-4 text-indigo-600" />,
      latency: "28ms",
    },
    {
      id: "agent-3",
      name: "News & Sentiment Agent",
      role: "Earnings & SEC Filings Classifier",
      status: isStreaming ? "running" : "completed",
      detail: "Processed 18 latest financial news items. 82% Bullish sentiment score.",
      icon: <Newspaper className="w-4 h-4 text-amber-600" />,
      latency: "45ms",
    },
    {
      id: "agent-4",
      name: "Risk & Execution Agent",
      role: "VaR & Position Sizing Dispatcher",
      status: isStreaming ? "pending" : "completed",
      detail: "VaR 95% calculated at -1.45%. Recommending max 4.5% position allocation.",
      icon: <ShieldCheck className="w-4 h-4 text-emerald-600" />,
      latency: "18ms",
    },
  ];

  return (
    <div className="aikart-card space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold font-['Red_Hat_Display'] text-[#0f172a]">
              TradeGo Agent Swarm Execution
            </h4>
            <p className="text-xs text-[#475569] font-['Poppins']">
              Parallel multi-agent financial consensus for {symbol}
            </p>
          </div>
        </div>

        <span className="aikart-badge">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>4 Agents Active</span>
        </span>
      </div>

      <div className="space-y-3">
        {steps.map((step) => (
          <div
            key={step.id}
            className="flex items-start gap-3 p-3 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] hover:bg-white hover:border-blue-200 transition-all"
          >
            <div className="mt-0.5 p-2 rounded-lg bg-white border border-[#e2e8f0] shadow-2xs">
              {step.icon}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold font-['Red_Hat_Display'] text-[#0f172a]">
                  {step.name}
                </span>
                <span className="text-[11px] font-medium text-[#94a3b8] font-['Inter']">
                  {step.latency}
                </span>
              </div>
              <p className="text-xs text-[#475569] font-['Poppins']">{step.role}</p>
              <p className="text-xs text-[#0f172a] font-['Poppins'] mt-1 bg-white p-2 rounded-lg border border-[#f1f5f9]">
                {step.detail}
              </p>
            </div>

            <div className="self-center">
              {step.status === "completed" && (
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              )}
              {step.status === "running" && (
                <span className="w-3 h-3 rounded-full border-2 border-blue-600 border-t-transparent animate-spin inline-block"></span>
              )}
              {step.status === "pending" && (
                <span className="w-2.5 h-2.5 rounded-full bg-gray-300 inline-block"></span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

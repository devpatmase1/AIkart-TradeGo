import { useState } from "react";
import { ArrowUp, LineChart, Shield, Sparkles, Zap } from "lucide-react";

interface TradeGoComposerProps {
  onSend: (text: string) => void;
  disabled?: boolean;
  activeSymbol?: string;
}

export function TradeGoComposer({ onSend, disabled = false, activeSymbol = "NVDA" }: TradeGoComposerProps) {
  const [input, setInput] = useState("");

  const PROMPT_PRESETS = [
    {
      label: `Analyze ${activeSymbol} Q3 Earnings & Target`,
      icon: <LineChart className="w-3.5 h-3.5 text-blue-600" />,
      prompt: `Provide a detailed Q3 earnings breakdown, technical support/resistance levels, and 12-month price targets for ${activeSymbol}.`,
    },
    {
      label: "Scan SPY for RSI Divergence",
      icon: <Zap className="w-3.5 h-3.5 text-amber-500" />,
      prompt: "Scan SPY 1-hour and 4-hour charts for RSI bullish divergence and MACD crossover signals.",
    },
    {
      label: `Generate ${activeSymbol} Swing Signals`,
      icon: <Sparkles className="w-3.5 h-3.5 text-indigo-600" />,
      prompt: `Generate swing trading signals for ${activeSymbol} including entry zone, stop-loss price, and risk/reward ratio.`,
    },
    {
      label: "Portfolio VaR & Risk Metrics",
      icon: <Shield className="w-3.5 h-3.5 text-emerald-600" />,
      prompt: "Calculate Value at Risk (VaR 95%) and recommend downside hedge strategies for tech sector concentration.",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || disabled) return;
    onSend(input.trim());
    setInput("");
  };

  const handlePresetClick = (promptText: string) => {
    if (disabled) return;
    onSend(promptText);
  };

  return (
    <div className="w-full space-y-3">
      {/* Quick Action Prompt Chips (Pill Style) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {PROMPT_PRESETS.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handlePresetClick(preset.prompt)}
            disabled={disabled}
            className="rounded-full px-3.5 py-1.5 text-xs font-medium bg-[#eff6ff] text-[#2563eb] border border-blue-100 hover:border-blue-300 hover:bg-blue-100/70 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer font-['Inter']"
          >
            {preset.icon}
            <span>{preset.label}</span>
          </button>
        ))}
      </div>

      {/* Input Box Container */}
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
          placeholder={`Ask TradeGo for live stock analysis, technical indicators, or market signals for ${activeSymbol}…`}
          disabled={disabled}
          rows={2}
          className="w-full rounded-xl bg-[#f8fafc] border border-[#e2e8f0] pl-4 pr-16 py-3 text-sm text-[#0f172a] placeholder-[#94a3b8] focus:bg-white focus:outline-none focus:border-[#2563eb] focus:ring-3 focus:ring-blue-500/15 transition-all font-['Poppins'] resize-none"
        />

        <div className="absolute right-3 flex items-center gap-1.5">
          <button
            type="submit"
            disabled={!input.trim() || disabled}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              input.trim() && !disabled
                ? "bg-[#2563eb] text-white hover:bg-[#1d4ed8] active:scale-[0.98] shadow-sm cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            title="Send to TradeGo"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}

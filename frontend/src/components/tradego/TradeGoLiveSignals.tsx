import React, { useState } from "react";
import { Check, DollarSign, ShieldAlert, Sparkles, Target, TrendingUp, X } from "lucide-react";

interface TradeGoLiveSignalsProps {
  symbol: string;
  onExecuteSimulatedTrade?: (order: { symbol: string; action: string; price: string; quantity: number }) => void;
}

export function TradeGoLiveSignals({ symbol, onExecuteSimulatedTrade }: TradeGoLiveSignalsProps) {
  const [showModal, setShowModal] = useState(false);
  const [orderQty, setOrderQty] = useState(10);
  const [isSuccess, setIsSuccess] = useState(false);

  const signalDetails = {
    symbol,
    action: "STRONG BUY",
    confidence: "94.2%",
    currentPrice: symbol === "NVDA" ? "$128.50" : symbol === "AAPL" ? "$234.85" : "$218.20",
    entryZone: symbol === "NVDA" ? "$127.20 - $128.80" : "$232.00 - $235.00",
    targetPrice: symbol === "NVDA" ? "$145.00" : "$260.00",
    stopLoss: symbol === "NVDA" ? "$121.50" : "$224.00",
    riskReward: "1 : 3.4",
    timeframe: "Swing (3-10 Days)",
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onExecuteSimulatedTrade?.({
      symbol: signalDetails.symbol,
      action: signalDetails.action,
      price: signalDetails.currentPrice,
      quantity: orderQty,
    });
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setShowModal(false);
    }, 1800);
  };

  return (
    <div className="aikart-card space-y-5">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#f1f5f9]">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-base font-bold font-['Red_Hat_Display'] text-[#0f172a]">
              TradeGo Live Market Signals
            </h4>
            <p className="text-xs text-[#475569] font-['Poppins']">
              AI-generated entry, target & risk levels
            </p>
          </div>
        </div>

        <span className="rounded-full px-3 py-1 text-xs font-bold bg-[#ecfdf5] text-[#047857] border border-emerald-200 font-['Inter'] flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          {signalDetails.confidence} Match
        </span>
      </div>

      {/* Signal Verdict Box */}
      <div className="p-4 rounded-xl bg-gradient-to-r from-[#eff6ff] to-[#ecfdf5] border border-blue-100 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#475569] font-medium font-['Inter']">Consensus Rating</span>
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#10b981] text-white font-['Red_Hat_Display'] tracking-wide">
            {signalDetails.action}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-1">
          <div>
            <span className="text-[11px] text-[#94a3b8] font-['Inter'] block">Target Price</span>
            <span className="text-lg font-bold text-[#047857] font-['Red_Hat_Display'] flex items-center gap-1">
              <Target className="w-4 h-4" />
              {signalDetails.targetPrice}
            </span>
          </div>

          <div>
            <span className="text-[11px] text-[#94a3b8] font-['Inter'] block">Stop-Loss Level</span>
            <span className="text-lg font-bold text-[#dc2626] font-['Red_Hat_Display'] flex items-center gap-1">
              <ShieldAlert className="w-4 h-4" />
              {signalDetails.stopLoss}
            </span>
          </div>
        </div>
      </div>

      {/* Signal Breakdown Stats */}
      <div className="space-y-2 text-xs font-['Poppins']">
        <div className="flex items-center justify-between py-1.5 border-b border-[#f1f5f9]">
          <span className="text-[#475569]">Ideal Entry Zone</span>
          <span className="font-semibold text-[#0f172a] font-['Inter']">{signalDetails.entryZone}</span>
        </div>

        <div className="flex items-center justify-between py-1.5 border-b border-[#f1f5f9]">
          <span className="text-[#475569]">Risk / Reward Ratio</span>
          <span className="font-semibold text-[#047857] font-['Inter']">{signalDetails.riskReward}</span>
        </div>

        <div className="flex items-center justify-between py-1.5">
          <span className="text-[#475569]">Recommended Horizon</span>
          <span className="font-semibold text-[#0f172a] font-['Inter']">{signalDetails.timeframe}</span>
        </div>
      </div>

      {/* Simulated Order Execution Button */}
      <button
        onClick={() => setShowModal(true)}
        className="w-full btn-pill-primary text-sm py-3 shadow-md"
      >
        <DollarSign className="w-4 h-4" />
        <span>Test Signal with Virtual Execution</span>
      </button>

      {/* Simulated Order Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl md:rounded-[24px] p-6 shadow-2xl border border-[#e2e8f0] space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold font-['Red_Hat_Display'] text-[#0f172a]">
                    Simulated Order Dispatcher
                  </h3>
                  <p className="text-xs text-[#475569] font-['Poppins']">
                    Zero-risk paper trading simulation on aiKart
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-full text-[#94a3b8] hover:text-[#0f172a] hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSuccess ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold font-['Red_Hat_Display'] text-[#0f172a]">
                  Simulated Order Placed!
                </h4>
                <p className="text-xs text-[#475569] font-['Poppins']">
                  Executed {orderQty} shares of {symbol} at {signalDetails.currentPrice}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleOrderSubmit} className="space-y-4 font-['Poppins']">
                <div className="p-3 rounded-xl bg-[#f8fafc] border border-[#e2e8f0] space-y-2">
                  <div className="flex justify-between text-xs text-[#475569]">
                    <span>Symbol: <strong className="text-[#0f172a]">{symbol}</strong></span>
                    <span>Price: <strong className="text-[#0f172a]">{signalDetails.currentPrice}</strong></span>
                  </div>
                  <div className="flex justify-between text-xs text-[#475569]">
                    <span>Action: <strong className="text-[#047857]">{signalDetails.action}</strong></span>
                    <span>Target: <strong className="text-[#2563eb]">{signalDetails.targetPrice}</strong></span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0f172a] mb-1 font-['Inter']">
                    Order Shares Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={orderQty}
                    onChange={(e) => setOrderQty(Number(e.target.value))}
                    className="aikart-input w-full text-base font-semibold"
                  />
                </div>

                <div className="p-3 rounded-xl bg-[#eff6ff] border border-blue-100 text-xs text-[#2563eb] flex justify-between font-['Inter']">
                  <span>Estimated Total:</span>
                  <span className="font-bold">
                    ${(orderQty * parseFloat(signalDetails.currentPrice.replace("$", ""))).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="btn-pill-secondary flex-1 text-xs justify-center py-2.5"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-pill-primary flex-1 text-xs justify-center py-2.5"
                  >
                    Confirm Execution
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

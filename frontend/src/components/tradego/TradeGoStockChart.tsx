import { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { CandlestickChart as ChartIcon, TrendingUp } from "lucide-react";
import { TICKER_DATA } from "./TradeGoHeader";

interface TradeGoStockChartProps {
  symbol: string;
  onAnalyzeSymbol?: (symbol: string) => void;
}

// Generate realistic mock market data for ECharts
function generateChartData(symbol: string) {
  const basePrices: Record<string, number> = {
    NVDA: 128.5,
    AAPL: 234.85,
    TSLA: 218.2,
    MSFT: 448.9,
    SPY: 550.2,
    QQQ: 482.1,
  };

  const startPrice = basePrices[symbol] || 150.0;
  const categoryData: string[] = [];
  const values: number[][] = []; // [open, close, lowest, highest]
  const volumes: number[] = [];
  const rsi: number[] = [];
  const sma20: number[] = [];

  let currentPrice = startPrice * 0.88;
  const days = 30;

  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(date.getDate() - (days - i));
    const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
    categoryData.push(dateStr);

    const open = currentPrice;
    const variation = (Math.random() - 0.47) * (startPrice * 0.035);
    const close = open + variation;
    const high = Math.max(open, close) + Math.random() * (startPrice * 0.015);
    const low = Math.min(open, close) - Math.random() * (startPrice * 0.015);
    const vol = Math.floor(Math.random() * 20000000 + 10000000);

    values.push([
      Number(open.toFixed(2)),
      Number(close.toFixed(2)),
      Number(low.toFixed(2)),
      Number(high.toFixed(2)),
    ]);
    volumes.push(vol);
    currentPrice = close;

    // Calc simple moving avg
    const windowVals = values.slice(Math.max(0, i - 5), i + 1).map((v) => v[1]);
    const avg = windowVals.reduce((a, b) => a + b, 0) / windowVals.length;
    sma20.push(Number(avg.toFixed(2)));

    // Mock RSI range between 35 and 75
    const rsiVal = 45 + Math.sin(i * 0.5) * 20 + Math.random() * 8;
    rsi.push(Number(rsiVal.toFixed(1)));
  }

  return { categoryData, values, volumes, rsi, sma20 };
}

export function TradeGoStockChart({ symbol, onAnalyzeSymbol }: TradeGoStockChartProps) {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);
  const [timeframe, setTimeframe] = useState<"1D" | "1W" | "1M" | "1Y">("1M");
  const [showSMA, setShowSMA] = useState(true);

  const selectedTicker = TICKER_DATA.find((t) => t.symbol === symbol) || {
    symbol,
    name: `${symbol} Stock`,
    price: "$150.00",
    change: "+1.20%",
    isUp: true,
    vol: "25M",
  };

  useEffect(() => {
    if (!chartRef.current) return;

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const { categoryData, values, volumes, sma20 } = generateChartData(symbol);

    const option: echarts.EChartsOption = {
      animation: true,
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "cross" },
        backgroundColor: "rgba(15, 23, 42, 0.9)",
        borderColor: "#2563eb",
        textStyle: { color: "#ffffff", fontFamily: "Poppins" },
      },
      grid: [
        { left: "10%", right: "8%", top: "12%", height: "55%" },
        { left: "10%", right: "8%", top: "72%", height: "18%" },
      ],
      xAxis: [
        {
          type: "category",
          data: categoryData,
          boundaryGap: false,
          axisLine: { lineStyle: { color: "#cbd5e1" } },
          axisLabel: { color: "#475569", fontFamily: "Inter", fontSize: 11 },
        },
        {
          type: "category",
          gridIndex: 1,
          data: categoryData,
          boundaryGap: false,
          axisLine: { onZero: false },
          axisTick: { show: false },
          axisLabel: { show: false },
        },
      ],
      yAxis: [
        {
          scale: true,
          splitArea: { show: true, areaStyle: { color: ["rgba(248,250,252,0.5)", "rgba(255,255,255,1)"] } },
          axisLabel: { color: "#475569", fontFamily: "Inter", fontSize: 11, formatter: (val: number) => `$${val}` },
          splitLine: { lineStyle: { color: "#e2e8f0" } },
        },
        {
          scale: true,
          gridIndex: 1,
          splitNumber: 2,
          axisLabel: { show: false },
          axisLine: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
        },
      ],
      series: [
        {
          name: `${symbol} Price`,
          type: "candlestick",
          data: values,
          itemStyle: {
            color: "#10b981", // Bullish candle green
            color0: "#dc2626", // Bearish candle red
            borderColor: "#059669",
            borderColor0: "#b91c1c",
          },
        },
        {
          name: "SMA 20",
          type: "line",
          data: showSMA ? sma20 : [],
          smooth: true,
          showSymbol: false,
          lineStyle: { color: "#2563eb", width: 2 },
        },
        {
          name: "Volume",
          type: "bar",
          xAxisIndex: 1,
          yAxisIndex: 1,
          data: volumes,
          itemStyle: {
            color: (params: any) => {
              const i = params.dataIndex;
              return values[i] && values[i][1] >= values[i][0] ? "rgba(16, 185, 129, 0.4)" : "rgba(220, 38, 38, 0.4)";
            },
          },
        },
      ],
    };

    chartInstance.current.setOption(option);

    const handleResize = () => chartInstance.current?.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [symbol, showSMA, timeframe]);

  return (
    <div className="aikart-card space-y-4">
      {/* Chart Top Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#f1f5f9]">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-100">
            <ChartIcon className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold font-['Red_Hat_Display'] text-[#0f172a]">
                {selectedTicker.symbol}
              </h3>
              <span className="text-xs text-[#475569] font-['Poppins']">
                {selectedTicker.name}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold font-['Red_Hat_Display'] text-[#0f172a]">
                {selectedTicker.price}
              </span>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full font-['Inter'] ${
                  selectedTicker.isUp ? "bg-[#ecfdf5] text-[#047857]" : "bg-[#fef2f2] text-[#dc2626]"
                }`}
              >
                {selectedTicker.change}
              </span>
            </div>
          </div>
        </div>

        {/* Timeframe & Overlay Selectors */}
        <div className="flex items-center flex-wrap gap-2">
          <div className="flex items-center bg-[#f8fafc] border border-[#e2e8f0] rounded-full p-1">
            {(["1D", "1W", "1M", "1Y"] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 text-xs font-medium rounded-full transition-all font-['Inter'] ${
                  timeframe === tf
                    ? "bg-[#2563eb] text-white shadow-2xs"
                    : "text-[#475569] hover:text-[#0f172a]"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowSMA(!showSMA)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all font-['Inter'] ${
              showSMA
                ? "bg-[#eff6ff] text-[#2563eb] border-blue-200"
                : "bg-white text-[#475569] border-[#e2e8f0]"
            }`}
          >
            SMA (20)
          </button>

          <button
            onClick={() => onAnalyzeSymbol?.(symbol)}
            className="btn-pill-primary text-xs py-1.5 px-4"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>AI Deep Scan</span>
          </button>
        </div>
      </div>

      {/* ECharts Canvas Container */}
      <div className="w-full h-[320px] sm:h-[380px] relative">
        <div ref={chartRef} className="w-full h-full" />
      </div>

      {/* Indicator Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-[#f1f5f9]">
        <div className="p-2.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
          <span className="text-[11px] text-[#94a3b8] font-['Inter'] block">RSI (14-Period)</span>
          <span className="text-sm font-bold text-[#047857] font-['Red_Hat_Display']">62.4 (Bullish)</span>
        </div>
        <div className="p-2.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
          <span className="text-[11px] text-[#94a3b8] font-['Inter'] block">MACD Signal</span>
          <span className="text-sm font-bold text-[#2563eb] font-['Red_Hat_Display']">+1.84 Crossover</span>
        </div>
        <div className="p-2.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
          <span className="text-[11px] text-[#94a3b8] font-['Inter'] block">Bollinger Width</span>
          <span className="text-sm font-bold text-[#0f172a] font-['Red_Hat_Display']">Expansion 4.2%</span>
        </div>
        <div className="p-2.5 rounded-xl bg-[#f8fafc] border border-[#e2e8f0]">
          <span className="text-[11px] text-[#94a3b8] font-['Inter'] block">TradeGo AI Score</span>
          <span className="text-sm font-bold text-[#047857] font-['Red_Hat_Display']">88/100 (Strong Buy)</span>
        </div>
      </div>
    </div>
  );
}

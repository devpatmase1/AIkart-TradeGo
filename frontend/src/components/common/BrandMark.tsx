import { useState } from "react";
import { TrendingUp } from "lucide-react";

interface BrandMarkProps {
  className?: string;
  variant?: "icon" | "full";
  alt?: string;
}

export function BrandMark({
  className = "h-7 w-7",
  variant = "icon",
  alt = "aiKart TradeGo logo",
}: BrandMarkProps) {
  const [imgError, setImgError] = useState(false);
  const src = variant === "full" ? "/logo-full.png" : "/logo-icon.png";

  if (imgError) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 flex items-center justify-center text-white shadow-sm">
          <TrendingUp className="w-4 h-4" />
        </div>
        {variant === "full" && (
          <span className="font-extrabold font-['Red_Hat_Display'] text-lg text-[#0f172a] tracking-tight">
            aiKart <span className="aikart-moving-gradient">TradeGo</span>
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <img
        src={src}
        alt={alt}
        onError={() => setImgError(true)}
        className={className}
        style={{ objectFit: "contain" }}
      />
      {variant === "full" && (
        <span className="font-extrabold font-['Red_Hat_Display'] text-lg text-[#0f172a] tracking-tight">
          aiKart <span className="text-blue-600 font-bold">TradeGo</span>
        </span>
      )}
    </div>
  );
}

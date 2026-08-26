interface BrandMarkProps {
  className?: string;
  variant?: "icon" | "full";
  alt?: string;
}

export function BrandMark({
  className = "h-6 w-6",
  variant = "icon",
  alt = "aiKart logo",
}: BrandMarkProps) {
  const src = variant === "full" ? "/logo-full.png" : "/logo-icon.png";
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
}

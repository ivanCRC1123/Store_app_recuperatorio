import { useState } from "react";

interface ProductImageProps {
  url?: string;
  alt: string;
  /** Clases extra para la img */
  imgClassName?: string;
  /** Variante de diseño del fallback */
  variant?: "card" | "detail";
}

const FALLBACK_BY_VARIANT = {
  card: {
    container: "from-emerald-900/20 to-zinc-800/40",
    text: "SinIMG",
    textSize: "text-5xl",
  },
  detail: {
    container: "from-emerald-900/10 to-zinc-800/30",
    text: "sin img",
    textSize: "text-7xl",
  },
};

export function ProductImage({
  url,
  alt,
  imgClassName = "",
  variant = "card",
}: ProductImageProps) {
  const [failed, setFailed] = useState(false);
  const fallback = FALLBACK_BY_VARIANT[variant];

  if (!url || url === "string" || failed) {
    return (
      <div
        className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${fallback.container}`}
      >
        <span className={`${fallback.textSize} font-bold text-zinc-600`}>
          {fallback.text}
        </span>
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={alt}
      className={`h-full w-full object-cover ${imgClassName}`.trim()}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

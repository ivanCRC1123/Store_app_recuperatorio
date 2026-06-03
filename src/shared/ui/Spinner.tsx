interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SIZE_MAP = {
  sm: "h-5 w-5 border-2",
  md: "h-8 w-8 border-[3px]",
  lg: "h-10 w-10 border-4",
};

export function Spinner({ size = "lg", className = "" }: SpinnerProps) {
  return (
    <div
      className={`animate-spin rounded-full border-zinc-700 border-t-emerald-500 ${SIZE_MAP[size]} ${className}`.trim()}
    />
  );
}

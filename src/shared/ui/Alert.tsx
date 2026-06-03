import type { ReactNode } from "react";

type AlertVariant = "error" | "info" | "success";

interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: ReactNode;
  className?: string;
}

const VARIANT_CLASSES: Record<AlertVariant, string> = {
  error: "border-red-500/20 bg-red-500/10 text-red-400",
  info: "border-blue-500/20 bg-blue-500/10 text-blue-400",
  success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
};

export function Alert({
  variant = "error",
  title,
  children,
  className = "",
}: AlertProps) {
  return (
    <div
      className={`rounded-xl border p-4 text-sm ${VARIANT_CLASSES[variant]} ${className}`.trim()}
    >
      {title && <p className="mb-1 font-semibold">{title}</p>}
      {children}
    </div>
  );
}

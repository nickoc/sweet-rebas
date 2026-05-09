import type { HTMLAttributes, ReactNode } from "react";

type Tone = "default" | "tinted" | "accent";
type Padding = "none" | "sm" | "md" | "lg";

const TONES: Record<Tone, string> = {
  default: "bg-white border border-reba-border",
  tinted: "bg-reba-card border border-reba-border",
  accent: "bg-white border-2 border-reba-pink/30",
};

const PADDINGS: Record<Padding, string> = {
  none: "",
  sm: "p-4 sm:p-5",
  md: "p-6 sm:p-8",
  lg: "p-8 sm:p-10",
};

type CardProps = {
  tone?: Tone;
  padding?: Padding;
  hover?: boolean;
  className?: string;
  children: ReactNode;
} & Omit<HTMLAttributes<HTMLDivElement>, "className" | "children">;

export function Card({
  tone = "default",
  padding = "md",
  hover = false,
  className = "",
  children,
  ...rest
}: CardProps) {
  const hoverClasses = hover
    ? "transition-all hover:border-reba-pink/40 hover:shadow-lg"
    : "";
  return (
    <div
      {...rest}
      className={`rounded-2xl overflow-hidden ${TONES[tone]} ${PADDINGS[padding]} ${hoverClasses} ${className}`}
    >
      {children}
    </div>
  );
}

import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-reba-pink hover:bg-reba-pink-hover text-white shadow-md disabled:opacity-50",
  secondary:
    "bg-white border-2 border-reba-pink text-reba-pink hover:bg-reba-pink hover:text-white",
  ghost: "bg-transparent text-reba-pink hover:bg-reba-pink/10",
};

// All sizes meet or exceed Apple HIG 44pt + Material 48dp + WCAG 2.5.5 AAA touch targets.
const SIZES: Record<Size, string> = {
  sm: "min-h-12 px-5 py-2.5 text-base",
  md: "min-h-12 px-6 py-3 text-base",
  lg: "min-h-14 px-8 py-4 text-lg",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors disabled:cursor-not-allowed";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonOnly = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: ButtonOnly) {
  return (
    <button
      {...rest}
      className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
    >
      {children}
    </button>
  );
}

type AnchorOnly = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> & {
    href: string;
    external?: boolean;
  };

export function ButtonLink({
  variant = "primary",
  size = "md",
  className = "",
  external = false,
  href,
  children,
  ...rest
}: AnchorOnly) {
  const cls = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`;
  if (external) {
    return (
      <a
        {...rest}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cls}
      >
        {children}
      </a>
    );
  }
  return (
    <Link {...rest} href={href} className={cls}>
      {children}
    </Link>
  );
}

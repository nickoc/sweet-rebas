import Image from "next/image";
import type { ReactNode } from "react";

type Height = "sm" | "md" | "lg" | "full";

// dvh, not vh — iOS Safari dynamic toolbar would otherwise clip the bottom
// of the hero on iPhone 13/XR/17 every time the address bar collapsed.
const HEIGHTS: Record<Height, string> = {
  sm: "min-h-[40dvh]",
  md: "min-h-[60dvh]",
  lg: "min-h-[70dvh]",
  full: "min-h-[100dvh]",
};

type HeroProps = {
  src: string;
  alt: string;
  height?: Height;
  /** When true, image overlay gets a soft cream gradient at the bottom (legibility for overlay text). */
  gradient?: boolean;
  /** Object-position override, e.g. "center 30%". Defaults to "center". */
  position?: string;
  /** Optional overlay content rendered above the image. Use `<HeroTitle>` and friends. */
  children?: ReactNode;
  className?: string;
};

export function Hero({
  src,
  alt,
  height = "md",
  gradient = false,
  position = "center",
  children,
  className = "",
}: HeroProps) {
  return (
    <section
      className={`relative ${HEIGHTS[height]} overflow-hidden flex items-end justify-center ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        loading="eager"
        fetchPriority="high"
        className="object-cover"
        style={{ objectPosition: position }}
      />
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,248,240,0.55)] via-transparent to-transparent" />
      )}
      {children && (
        <div className="relative z-10 w-full max-w-5xl px-4 sm:px-6 lg:px-8 pb-10 sm:pb-16 text-center">
          {children}
        </div>
      )}
    </section>
  );
}

type TitleProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Fluid-type heading that scales smoothly across 320 → 1920px without breakpoint
 * cliffs. Replaces the old `text-7xl sm:text-9xl lg:text-[10rem]` pattern that
 * overflowed at 320-414px and looked undersized at 430+ on iPhone 17 Pro Max.
 */
export function HeroTitle({ children, className = "" }: TitleProps) {
  return (
    <h1
      className={`font-[family-name:var(--font-heading)] text-[clamp(2.75rem,8vw,7rem)] leading-[1.05] text-reba-pink drop-shadow-sm ${className}`}
    >
      {children}
    </h1>
  );
}

type SubtitleProps = {
  children: ReactNode;
  className?: string;
};

export function HeroSubtitle({ children, className = "" }: SubtitleProps) {
  return (
    <p
      className={`mt-3 text-[clamp(1.125rem,2.4vw,1.875rem)] font-bold text-reba-pink tracking-wide drop-shadow-sm ${className}`}
    >
      {children}
    </p>
  );
}

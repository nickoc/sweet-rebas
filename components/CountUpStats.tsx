"use client";

import { useState, useEffect, useRef } from "react";

const STATS = [
  { value: 22, suffix: "", label: "Years of Love" },
  { value: 4.8, suffix: "", label: "Star Rating", decimals: 1 },
  { value: 10, suffix: "", label: "Nextdoor Neighborhoods" },
  { value: 2, suffix: "", label: "Locations" },
];

function AnimatedNumber({
  target,
  decimals = 0,
  started,
}: {
  target: number;
  decimals?: number;
  started: boolean;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      if (step >= steps) {
        setCurrent(target);
        clearInterval(timer);
      } else {
        setCurrent(Math.min(increment * step, target));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [started, target]);

  return <>{decimals > 0 ? current.toFixed(decimals) : Math.round(current)}</>;
}

export default function CountUpStats() {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {STATS.map((stat) => (
        <div
          key={stat.label}
          className="flex flex-col items-center justify-center text-center"
        >
          <div className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl text-reba-pink mb-0.5">
            <AnimatedNumber
              target={stat.value}
              decimals={stat.decimals || 0}
              started={started}
            />
            {stat.suffix}
          </div>
          <p className="text-reba-muted text-base">{stat.label}</p>
        </div>
      ))}
    </div>
  );
}

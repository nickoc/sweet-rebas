"use client";

import { useEffect, useState } from "react";

export default function ClosingCountdown() {
  const [closingIn, setClosingIn] = useState("");

  useEffect(() => {
    function calc() {
      const now = new Date();
      const day = now.getDay();
      // Sun (0) and Mon (1) closed.
      if (day === 0 || day === 1) return "Closed";
      const close = new Date();
      close.setHours(17, 0, 0, 0);
      const diff = close.getTime() - now.getTime();
      if (diff <= 0) return "Closed";
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      return `${h}h ${m}m`;
    }
    setClosingIn(calc());
    const t = setInterval(() => setClosingIn(calc()), 60000);
    return () => clearInterval(t);
  }, []);

  const isOpen = closingIn !== "Closed" && closingIn !== "";
  return (
    <div className="flex items-center justify-center gap-3">
      <span
        className={`inline-flex items-center gap-1.5 text-lg font-medium ${
          isOpen ? "text-emerald-600" : "text-red-500"
        }`}
      >
        <span
          className={`w-3 h-3 rounded-full ${
            isOpen ? "bg-emerald-500" : "bg-red-500"
          }`}
        />
        {isOpen ? "Open Now" : closingIn === "Closed" ? "Closed" : ""}
      </span>
      {isOpen && (
        <span className="text-base text-reba-muted bg-white border border-reba-border rounded-full px-4 py-1.5">
          Closes in {closingIn}
        </span>
      )}
    </div>
  );
}

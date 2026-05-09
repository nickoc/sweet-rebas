"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

// The full ChatWidget is heavy — message state, streaming reader, decoder,
// 4 quick-reply buttons, animated typing indicator, error banner, etc. It
// renders on every page but the FAB is unused 99%+ of the time. So:
//   1. Render a tiny static FAB synchronously (no hydration tax).
//   2. Dynamic-import the full widget only when the user actually clicks
//      it — saves ~Nkb of JS + the useEffect / scroll-handler hydration
//      from blocking the main thread on every page load.
//
// `ssr: false` is correct here — the closed-state button has no content
// that benefits from SSR, and once `mounted=true` we want a client-only
// dynamic import.
const FullChatWidget = dynamic(() => import("./ChatWidget"), {
  ssr: false,
});

export default function ChatWidgetLazy() {
  const [mounted, setMounted] = useState(false);

  if (mounted) {
    return <FullChatWidget initialOpen />;
  }

  return (
    <button
      onClick={() => setMounted(true)}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-reba-pink text-white shadow-lg transition hover:bg-reba-pink-hover"
      aria-label="Open chat"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
        />
      </svg>
    </button>
  );
}

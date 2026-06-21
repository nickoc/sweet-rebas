"use client";

import { useEffect } from "react";

// Two-way bridge between the Bearing Website editor and this site, ACTIVE ONLY
// inside the editor's preview iframe (?preview=1). It does nothing on the real
// public site. Data attributes (`data-edit="<key>"`) on elements are inert
// otherwise.
//
//   editor → site:  { source:'pai', type:'highlight', key } → glow that element
//   site → editor:  click a [data-edit] element → { source:'pai-site', type:'locate', key }
//
// Keys match the editor field keys: `${page}.${section}.${field}` (e.g.
// "home.cards.baking_title").
function cssEscape(s: string): string {
  if (typeof window !== "undefined" && window.CSS && window.CSS.escape) {
    return window.CSS.escape(s);
  }
  return s.replace(/["\\]/g, "\\$&");
}

export default function PreviewBridge() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("preview") !== "1") return;

    document.documentElement.setAttribute("data-pai-preview", "1");
    let flashed: HTMLElement | null = null;
    const clear = () => {
      if (flashed) {
        flashed.style.outline = "";
        flashed.style.outlineOffset = "";
        flashed = null;
      }
    };

    function onMessage(e: MessageEvent) {
      const d = e.data;
      if (!d || d.source !== "pai" || d.type !== "highlight") return;
      clear();
      if (!d.key) return;
      const el = document.querySelector<HTMLElement>(
        `[data-edit="${cssEscape(String(d.key))}"]`,
      );
      if (!el) return;
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.style.outline = "3px solid #ec4899";
      el.style.outlineOffset = "3px";
      flashed = el;
    }

    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement)?.closest?.("[data-edit]");
      if (!el) return;
      const key = el.getAttribute("data-edit");
      if (!key) return;
      // In preview, intercept so clicking an element locates its editor field
      // instead of navigating away inside the iframe.
      e.preventDefault();
      window.parent.postMessage({ source: "pai-site", type: "locate", key }, "*");
    }

    function onOver(e: MouseEvent) {
      const el = (e.target as HTMLElement)?.closest?.("[data-edit]");
      if (el) (el as HTMLElement).style.cursor = "pointer";
    }

    window.addEventListener("message", onMessage);
    document.addEventListener("click", onClick, true);
    document.addEventListener("mouseover", onOver, true);
    return () => {
      window.removeEventListener("message", onMessage);
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("mouseover", onOver, true);
      clear();
    };
  }, []);

  return null;
}

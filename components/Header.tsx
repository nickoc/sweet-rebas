"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Our Menu", href: "/menu" },
  {
    label: "Our Cakes",
    href: "/cakes",
    sub: [
      { label: "Signature Cakes", href: "/cakes/signature" },
      { label: "Custom Cakes", href: "/cakes" },
      { label: "Wedding Cakes", href: "/wedding-cakes" },
    ],
  },
  { label: "What's Baking?", href: "/chalkboard" },
  { label: "Contact Us & Locations", href: "/contact" },
  { label: "Our Story", href: "/about" },
  { label: "Catering", href: "/catering" },
];

const DOORDASH_URL = "https://www.doordash.com/store/sweet-rebas-salinas-40954727/97268547/?srsltid=AfmBOor52NrSxODC2YxPVOzspFdcLefzNh-IezOa_tHxOLljG5Yxt8u-";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cakesOpen, setCakesOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <header
      className="sticky top-0 bg-reba-bg/95 backdrop-blur border-b border-reba-border"
      style={{
        zIndex: "var(--z-header)",
        paddingTop: "env(safe-area-inset-top)",
      }}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 sm:h-20 gap-4 sm:gap-6">
          {/* Logo + Wordmark */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <Link href="/" aria-label="Sweet Reba's home" className="flex-shrink-0">
              <Image
                src="/sweet-rebas-logo.png"
                alt="Sweet Reba's"
                width={96}
                height={96}
                priority
                className="w-12 h-12 sm:w-16 sm:h-16"
              />
            </Link>
            <div className="leading-tight min-w-0">
              <Link
                href="/"
                className="font-[family-name:var(--font-heading)] text-lg sm:text-2xl lg:text-3xl text-reba-ink block whitespace-nowrap"
              >
                Sweet Reba&apos;s
              </Link>
              <div className="text-xs sm:text-sm text-reba-muted hidden sm:flex items-center gap-1 mt-0.5 whitespace-nowrap">
                <a
                  href="https://maps.google.com/?q=Sweet+Rebas+206+Crossroads+Blvd+Carmel+CA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-reba-pink underline-offset-2 hover:underline transition-colors"
                  title="Get directions to Carmel location"
                >
                  Carmel
                </a>
                <span>&amp;</span>
                <a
                  href="https://maps.google.com/?q=Sweet+Rebas+268+S+Main+St+Salinas+CA+93901"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-reba-pink underline-offset-2 hover:underline transition-colors"
                  title="Get directions to Salinas location"
                >
                  Salinas
                </a>
              </div>
            </div>
          </div>

          {/* Desktop nav — inline flex, no magic numbers, no overlap with hero */}
          <nav className="hidden lg:flex items-center justify-end gap-3 ml-auto flex-shrink-0">
            <div ref={menuRef} className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex items-center justify-center gap-2 min-h-12 bg-reba-pink hover:bg-reba-pink-hover text-white px-5 py-3 rounded-full text-base font-bold transition-colors shadow-md whitespace-nowrap"
                aria-expanded={menuOpen}
                aria-haspopup="menu"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span>Menu</span>
                <svg
                  className={`w-4 h-4 transition-transform ${menuOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {menuOpen && (
                <div
                  className="absolute top-full right-0 mt-2 w-72 rounded-xl shadow-xl border border-reba-border bg-reba-card overflow-hidden"
                  style={{ zIndex: "var(--z-modal)" }}
                  role="menu"
                >
                  {navLinks.map((link) => (
                    <div key={link.href + link.label}>
                      {link.sub ? (
                        <div className="relative">
                          <button
                            onClick={() => setCakesOpen(!cakesOpen)}
                            className="w-full flex items-center justify-between px-5 py-3 text-base font-medium italic text-reba-pink hover:bg-reba-pink hover:text-white transition-colors min-h-12"
                            aria-expanded={cakesOpen}
                          >
                            <span>{link.label}</span>
                            <svg
                              className={`w-4 h-4 transition-transform ${cakesOpen ? "rotate-90" : ""}`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2.5}
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                          {cakesOpen && (
                            <div className="bg-reba-card">
                              {link.sub.map((sub) => (
                                <Link
                                  key={sub.href + sub.label}
                                  href={sub.href}
                                  onClick={() => {
                                    setMenuOpen(false);
                                    setCakesOpen(false);
                                  }}
                                  className="block pl-10 pr-5 py-3 text-sm font-medium italic text-reba-pink hover:bg-reba-pink hover:text-white transition-colors min-h-12 flex items-center"
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          href={link.href}
                          onClick={() => setMenuOpen(false)}
                          className="block px-5 py-3 text-base font-medium italic text-reba-pink hover:bg-reba-pink hover:text-white transition-colors border-b border-reba-border last:border-b-0 min-h-12 flex items-center"
                        >
                          {link.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/chalkboard"
              className="inline-flex items-center justify-center min-h-12 bg-reba-pink hover:bg-reba-pink-hover text-white px-5 py-3 rounded-full text-base font-bold transition-colors shadow-md whitespace-nowrap"
            >
              What&apos;s Baking?
            </Link>
            <a
              href={DOORDASH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center min-h-12 bg-reba-pink hover:bg-reba-pink-hover text-white px-5 py-3 rounded-full text-base font-bold transition-colors shadow-md whitespace-nowrap"
            >
              Order Now
            </a>
          </nav>

          {/* Mobile hamburger — 48px touch target */}
          <button
            className="lg:hidden ml-auto p-3 -mr-1 min-h-12 min-w-12 inline-flex items-center justify-center text-reba-soft hover:text-reba-ink"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="lg:hidden pb-4 border-t border-reba-border pt-2">
            <div className="flex flex-col">
              {navLinks.map((link) => (
                <div key={link.href + link.label}>
                  {link.sub ? (
                    <>
                      <button
                        onClick={() => setCakesOpen(!cakesOpen)}
                        className="text-reba-soft hover:text-reba-ink transition-colors py-3 text-base flex items-center justify-between w-full min-h-12"
                        aria-expanded={cakesOpen}
                      >
                        <span>{link.label}</span>
                        <svg
                          className={`w-4 h-4 transition-transform ${cakesOpen ? "rotate-180" : ""}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2.5}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {cakesOpen &&
                        link.sub.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => {
                              setMobileOpen(false);
                              setCakesOpen(false);
                            }}
                            className="text-reba-soft hover:text-reba-ink transition-colors py-3 text-base block pl-6 min-h-12 flex items-center"
                          >
                            {sub.label}
                          </Link>
                        ))}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-reba-soft hover:text-reba-ink transition-colors py-3 text-base block min-h-12 flex items-center"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="flex flex-col gap-2 mt-4">
                <Link
                  href="/chalkboard"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center min-h-12 bg-reba-pink hover:bg-reba-pink-hover text-white px-5 py-3 rounded-full text-base font-semibold transition-colors text-center"
                >
                  What&apos;s Baking?
                </Link>
                <a
                  href={DOORDASH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center justify-center min-h-12 bg-reba-pink hover:bg-reba-pink-hover text-white px-5 py-3 rounded-full text-base font-semibold text-center transition-colors"
                >
                  Order Now
                </a>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

"use client";

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
    <header className="relative z-50 bg-reba-dark/95 backdrop-blur border-b border-reba-border">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center h-20 sm:h-24 gap-6">
          {/* Logo + Locations (stacked under wordmark) */}
          <div className="flex items-center gap-4">
            <Link href="/" aria-label="Sweet Reba's home">
              <img src="/sweet-rebas-logo.png" alt="Sweet Reba's" className="w-20 h-20 sm:w-24 sm:h-24" />
            </Link>
            <div className="leading-tight">
              <Link href="/" className="font-[family-name:var(--font-heading)] text-2xl sm:text-3xl text-reba-cream block">
                Sweet Reba&apos;s
              </Link>
              <div className="text-sm text-reba-muted flex items-center gap-1 mt-0.5">
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
                  href="https://maps.google.com/?q=Sweet+Rebas+268+Main+St+Salinas+CA"
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

          {/* Desktop nav: three matching buttons, half-overlapping the hero */}
          <nav className="hidden md:flex items-stretch justify-center gap-4 absolute left-[calc(50%+4rem)] bottom-0 -translate-x-1/2 translate-y-1/2 z-10 w-full max-w-4xl px-4">
            {/* Explore Our Offers — dropdown menu */}
            <div ref={menuRef} className="relative flex-1 basis-0 min-w-0">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-full flex items-center justify-center gap-2.5 bg-reba-pink hover:bg-reba-pink-hover text-white px-8 py-4 rounded-full text-xl font-bold transition-colors shadow-lg whitespace-nowrap"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span>Menu</span>
                <svg className={`w-4 h-4 transition-transform ${menuOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {menuOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 rounded-xl shadow-xl border border-reba-border z-50" style={{ backgroundColor: "#fff5f5" }}>
                  {navLinks.map((link) => (
                    <div key={link.href + link.label}>
                      {link.sub ? (
                        <div className="relative">
                          <button
                            onClick={() => setCakesOpen(!cakesOpen)}
                            className="w-full flex items-center justify-between px-6 py-4 text-base font-medium italic text-reba-pink hover:bg-reba-pink hover:text-white transition-colors"
                          >
                            <span>{link.label}</span>
                            <svg className={`w-4 h-4 transition-transform ${cakesOpen ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                          {cakesOpen && (
                            <div className="absolute left-full top-0 ml-1 w-60 rounded-xl shadow-xl border border-reba-border overflow-hidden z-50" style={{ backgroundColor: "#fff5f5" }}>
                              {link.sub.map((sub) => (
                                <Link
                                  key={sub.href + sub.label}
                                  href={sub.href}
                                  onClick={() => { setMenuOpen(false); setCakesOpen(false); }}
                                  className="block px-6 py-4 text-base font-medium italic text-reba-pink hover:bg-reba-pink hover:text-white transition-colors border-b border-reba-border last:border-b-0"
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
                          className="block px-6 py-4 text-base font-medium italic text-reba-pink hover:bg-reba-pink hover:text-white transition-colors border-b border-reba-border last:border-b-0"
                        >
                          {link.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Kept-visible CTAs */}
            <Link
              href="/chalkboard"
              className="flex-1 basis-0 min-w-0 flex items-center justify-center bg-reba-pink hover:bg-reba-pink-hover text-white px-8 py-4 rounded-full text-xl font-bold transition-colors shadow-lg whitespace-nowrap"
            >
              What's Baking?
            </Link>
            <a
              href="https://www.doordash.com/store/sweet-rebas-salinas-40954727/97268547/?srsltid=AfmBOor52NrSxODC2YxPVOzspFdcLefzNh-IezOa_tHxOLljG5Yxt8u-"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 basis-0 min-w-0 flex items-center justify-center bg-reba-pink hover:bg-reba-pink-hover text-white px-8 py-4 rounded-full text-xl font-bold shadow-lg whitespace-nowrap transition-colors"
            >
              Order Now
            </a>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden ml-auto p-2 text-reba-soft hover:text-reba-cream"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
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
          <nav className="md:hidden pb-4 border-t border-reba-border pt-4">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <div key={link.href + link.label}>
                  {link.sub ? (
                    <>
                      <button
                        onClick={() => setCakesOpen(!cakesOpen)}
                        className="text-reba-soft hover:text-reba-cream transition-colors py-2 text-sm flex items-center gap-2 w-full"
                      >
                        {link.label}
                        <svg className={`w-3 h-3 transition-transform ${cakesOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                      {cakesOpen && link.sub.map((sub) => (
                        <Link
                          key={sub.href}
                          href={sub.href}
                          onClick={() => { setMobileOpen(false); setCakesOpen(false); }}
                          className="text-reba-soft hover:text-reba-cream transition-colors py-2 text-sm block pl-6"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-reba-soft hover:text-reba-cream transition-colors py-2 text-sm block"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <Link
                href="/chalkboard"
                onClick={() => setMobileOpen(false)}
                className="bg-reba-pink hover:bg-reba-pink-hover text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors text-center mt-2"
              >
                What's Baking?
              </Link>
              <a
                href="https://www.doordash.com/store/sweet-rebas-salinas-40954727/97268547/?srsltid=AfmBOor52NrSxODC2YxPVOzspFdcLefzNh-IezOa_tHxOLljG5Yxt8u-"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="bg-reba-pink hover:bg-reba-pink-hover text-white px-5 py-2.5 rounded-full text-sm font-medium text-center transition-colors"
              >
                Order Now
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

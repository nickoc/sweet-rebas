"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Custom Cakes", href: "/cakes" },
  { label: "Wedding Cakes", href: "/wedding-cakes" },
  { label: "Catering", href: "/catering" },
  { label: "Our Story", href: "/about" },
  { label: "Contact Us", href: "/contact" },
  { label: "Find What's Baking", href: "/whats-baking" },
  { label: "Order Now", href: "/box-builder" },
  { label: "Locations", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click or ESC
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setDropdownOpen(false);
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("keydown", handleKey);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [dropdownOpen]);

  return (
    <header className="sticky top-0 z-50 bg-reba-dark/95 backdrop-blur border-b border-reba-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-[auto_1fr_auto] md:grid-cols-3 items-center h-20 sm:h-24 gap-4">
          {/* Logo + Locations (stacked under wordmark) */}
          <div className="flex items-center gap-4">
            <Link href="/" aria-label="Sweet Reba's home">
              <img src="/sweet-rebas-logo.png" alt="Sweet Reba's" className="w-16 h-16 sm:w-20 sm:h-20" />
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

          {/* Desktop nav: dropdown + 2 highlight buttons (centered) */}
          <nav className="hidden md:flex items-center justify-center gap-4">
            {/* Navigation dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                className="flex items-center gap-2.5 bg-reba-pink hover:bg-reba-pink-hover text-white px-6 py-3 rounded-full text-base font-semibold transition-colors"
              >
                {/* Hamburger icon */}
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span>Explore What We&apos;ve Got to Offer</span>
                {/* Chevron */}
                <svg
                  className={`w-5 h-5 transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown panel */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-reba-dark border border-reba-border rounded-2xl shadow-2xl overflow-hidden">
                  <div className="px-5 pt-4 pb-3 border-b border-reba-border">
                    <p className="text-xs uppercase tracking-[0.15em] text-reba-pink font-semibold">
                      Explore What We&apos;ve Got to Offer
                    </p>
                  </div>
                  <ul className="py-2">
                    {navLinks.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          onClick={() => setDropdownOpen(false)}
                          className="block px-5 py-3 text-base text-reba-soft hover:text-reba-cream hover:bg-reba-pink/10 transition-colors"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Kept-visible CTAs */}
            <Link
              href="/whats-baking"
              className="bg-reba-pink hover:bg-reba-pink-hover text-white px-6 py-3 rounded-full text-base font-semibold transition-colors"
            >
              What&apos;s Baking This Week?
            </Link>
            <Link
              href="/box-builder"
              className="bg-reba-pink hover:bg-reba-pink-hover text-white px-6 py-3 rounded-full text-base font-semibold transition-colors"
            >
              Order Now
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-reba-soft hover:text-reba-cream"
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
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-reba-soft hover:text-reba-cream transition-colors py-2 text-sm"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/whats-baking"
                onClick={() => setMobileOpen(false)}
                className="bg-reba-pink hover:bg-reba-pink-hover text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors text-center mt-2"
              >
                What&apos;s Baking This Week?
              </Link>
              <Link
                href="/box-builder"
                onClick={() => setMobileOpen(false)}
                className="bg-reba-pink hover:bg-reba-pink-hover text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors text-center"
              >
                Order Now
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

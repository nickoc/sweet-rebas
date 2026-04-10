"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/menu" },
  { label: "Custom Cakes", href: "/cakes" },
  { label: "Catering", href: "/catering" },
  { label: "Our Story", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-reba-dark/95 backdrop-blur border-b border-reba-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img src="/sweet-rebas-logo.png" alt="Sweet Reba's" className="w-12 h-12 sm:w-14 sm:h-14" />
            <div>
              <div className="font-[family-name:var(--font-heading)] text-xl text-reba-cream leading-tight">
                Sweet Reba&apos;s
              </div>
              <div className="text-xs text-reba-muted">
                Carmel &amp; Salinas
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-reba-soft hover:text-reba-cream transition-colors text-sm tracking-wide"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/whats-baking"
              className="bg-reba-pink/20 hover:bg-reba-pink/30 text-reba-pink px-5 py-2 rounded-full text-sm font-medium transition-colors"
            >
              Find Out What&apos;s Baking?
            </Link>
            <Link
              href="/box-builder"
              className="bg-reba-pink hover:bg-reba-pink-hover text-white px-5 py-2 rounded-full text-sm font-medium transition-colors"
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
                className="bg-reba-pink/20 hover:bg-reba-pink/30 text-reba-pink px-5 py-2.5 rounded-full text-sm font-medium transition-colors text-center mt-2"
              >
                Find Out What&apos;s Baking?
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

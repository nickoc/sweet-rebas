"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="border-t border-reba-border" style={{ backgroundColor: "#fff5f5" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: About */}
          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-2xl text-reba-cream mb-3">
              Sweet Reba&apos;s
            </h3>
            <p className="text-reba-muted text-sm leading-relaxed">
              Artisan bakery serving Carmel &amp; Salinas since 2004. Every item
              is made from scratch with the freshest ingredients and a whole lot
              of love.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-reba-cream font-semibold mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Menu", href: "/menu" },
                { label: "Custom Cakes", href: "/cakes" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-reba-muted hover:text-reba-pink transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Locations */}
          <div>
            <h4 className="text-reba-cream font-semibold mb-4 text-sm uppercase tracking-wider">
              Locations
            </h4>
            <div className="space-y-4">
              <div>
                <p className="text-reba-cream text-sm font-medium">
                  Carmel Crossroads
                </p>
                <p className="text-reba-muted text-sm">206 Crossroads Blvd</p>
                <p className="text-reba-muted text-sm">(831) 601-4818</p>
                <p className="text-reba-pink text-xs mt-1 italic">
                  Temporarily closed for fire repairs
                </p>
              </div>
              <div>
                <p className="text-reba-cream text-sm font-medium">
                  Old Town Salinas
                </p>
                <p className="text-reba-muted text-sm">268 Main St</p>
                <p className="text-reba-muted text-sm">(831) 676-0628</p>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter & Social */}
          <div>
            <h4 className="text-reba-cream font-semibold mb-4 text-sm uppercase tracking-wider">
              Stay Connected
            </h4>
            <p className="text-reba-muted text-sm mb-3">
              Get updates on seasonal specials and new treats.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setEmail("");
              }}
              className="flex gap-2"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="flex-1 bg-reba-dark border border-reba-border rounded-lg px-3 py-2 text-sm text-reba-cream placeholder:text-reba-muted focus:outline-none focus:border-reba-pink"
              />
              <button
                type="submit"
                className="bg-reba-pink hover:bg-reba-pink-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              >
                Join
              </button>
            </form>
            <a
              href="https://instagram.com/sweetrebas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-reba-muted hover:text-reba-pink transition-colors text-sm mt-4"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              @sweetrebas
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-reba-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-reba-muted text-xs">
            &copy; 2026 Sweet Reba&apos;s Bakery. All rights reserved.
          </p>
          <p className="text-reba-muted text-xs">
            Crafted by{" "}
            <a
              href="https://getbearing.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-reba-pink hover:text-reba-pink-hover transition-colors"
            >
              Bearing Intelligence
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

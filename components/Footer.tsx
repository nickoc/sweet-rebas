"use client";

import { useState } from "react";
import Link from "next/link";

const DOORDASH_URL = "https://www.doordash.com/store/sweet-rebas-salinas-40954727/97268547/?srsltid=AfmBOopv3nAXQdH-_n6RfHiBu3WfDdYdxUyIU3WBPPv_7o5U_C8PecyU";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [doorDashOpen, setDoorDashOpen] = useState(false);
  const [doorDashEmail, setDoorDashEmail] = useState("");

  function handleDoorDashSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!doorDashEmail.trim()) return;
    // TODO: wire to actual email list (same service as newsletter)
    window.open(DOORDASH_URL, "_blank", "noopener,noreferrer");
    setDoorDashEmail("");
    setDoorDashOpen(false);
  }

  return (
    <footer className="border-t border-reba-border" style={{ backgroundColor: "#ffffff" }}>
      {/* Maps Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8">
        <h3 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-reba-cream text-center mb-14">
          Find Us
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Carmel Map */}
          <div>
            <div className="rounded-xl overflow-hidden shadow-md border border-reba-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3204.5!2d-121.9178!3d36.5465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808de45270b5fb23%3A0x386b7aaf900e1e08!2sSweet%20Reba&#39;s!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="440"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sweet Reba's Carmel Crossroads"
              />
            </div>
            <div className="mt-4 text-center">
              <a
                href="https://maps.google.com/?q=Sweet+Rebas+206+Crossroads+Blvd+Carmel+CA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-reba-cream text-lg font-medium hover:text-reba-pink transition-colors"
              >
                Carmel Crossroads
              </a>
              <p className="text-reba-muted text-base">206 Crossroads Blvd &middot; (831) 601-4818</p>
              <p className="text-reba-pink text-sm mt-1 italic">
                Reopening end of May 2026
              </p>
            </div>
          </div>

          {/* Salinas Map */}
          <div>
            <div className="rounded-xl overflow-hidden shadow-md border border-reba-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3204.5!2d-121.6558!3d36.6744!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808dfb5d7b0d2e6f%3A0x1c6b3e1f8a5e6d2a!2s268%20Main%20St%2C%20Salinas%2C%20CA!5e0!3m2!1sen!2sus!4v1"
                width="100%"
                height="440"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sweet Reba's Old Town Salinas"
              />
            </div>
            <div className="mt-4 text-center">
              <a
                href="https://maps.google.com/?q=Sweet+Rebas+268+Main+St+Salinas+CA"
                target="_blank"
                rel="noopener noreferrer"
                className="text-reba-cream text-lg font-medium hover:text-reba-pink transition-colors"
              >
                Old Town Salinas
              </a>
              <p className="text-reba-muted text-base">268 Main St &middot; (831) 676-0628</p>
            </div>
          </div>
        </div>
      </div>

      {/* Opening Hours */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="bg-reba-card border-2 border-reba-pink/30 rounded-2xl p-8 text-center max-w-2xl mx-auto">
          <h3 className="font-[family-name:var(--font-heading)] text-3xl sm:text-4xl text-reba-cream mb-4">
            Opening Hours
          </h3>
          <div className="flex flex-wrap justify-center gap-8 text-lg">
            <div><span className="text-reba-muted">Mon&ndash;Fri:</span> <span className="text-reba-cream font-semibold">7am &ndash; 3pm</span></div>
            <div><span className="text-reba-muted">Saturday:</span> <span className="text-reba-cream font-semibold">8am &ndash; 3pm</span></div>
            <div><span className="text-reba-muted">Sunday:</span> <span className="text-reba-cream font-semibold">8am &ndash; 2pm</span></div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-20">
          {/* Col 1: About */}
          <div>
            <h3 className="font-[family-name:var(--font-heading)] text-2xl text-reba-cream mb-3">
              Sweet Reba&apos;s
            </h3>
            <p className="text-reba-muted text-base leading-relaxed">
              Artisan bakery serving Carmel &amp; Salinas since 2004. Every item
              is made from scratch with the freshest ingredients and a whole lot
              of love.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-reba-cream font-semibold mb-4 text-base uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Menu", href: "/menu" },
                { label: "Custom Cakes", href: "/cakes" },
                { label: "Wedding Cakes", href: "/wedding-cakes" },
                { label: "Catering", href: "/catering" },
                { label: "About Us", href: "/about" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-reba-muted hover:text-reba-pink transition-colors text-base"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Newsletter & Social */}
          <div>
            <h4 className="text-reba-cream font-semibold mb-4 text-base uppercase tracking-wider">
              Stay Connected
            </h4>
            <p className="text-reba-muted text-base mb-3">
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
                className="flex-1 bg-white border border-reba-border rounded-lg px-3 py-2 text-sm text-reba-cream placeholder:text-reba-muted focus:outline-none focus:border-reba-pink"
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
              className="inline-flex items-center gap-2 text-reba-muted hover:text-reba-pink transition-colors text-base mt-4"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              @sweetrebas
            </a>

            {/* DoorDash button — gated on email capture */}
            <div className="mt-4">
              {!doorDashOpen ? (
                <button
                  onClick={() => setDoorDashOpen(true)}
                  className="inline-flex items-center gap-2 bg-reba-pink hover:bg-reba-pink-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 7h18l-2 13H5L3 7zm3-3h12l1 2H5l1-2z" />
                  </svg>
                  Order on DoorDash
                </button>
              ) : (
                <form
                  onSubmit={handleDoorDashSubmit}
                  className="border border-reba-border rounded-lg p-3 bg-white"
                >
                  <p className="text-reba-cream text-xs mb-2 font-medium">
                    Enter your email to continue to DoorDash
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={doorDashEmail}
                      onChange={(e) => setDoorDashEmail(e.target.value)}
                      placeholder="Your email"
                      required
                      autoFocus
                      className="flex-1 bg-white border border-reba-border rounded-lg px-3 py-2 text-sm text-reba-cream placeholder:text-reba-muted focus:outline-none focus:border-reba-pink"
                    />
                    <button
                      type="submit"
                      className="bg-reba-pink hover:bg-reba-pink-hover text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap"
                    >
                      Go &rarr;
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => setDoorDashOpen(false)}
                    className="text-reba-muted text-xs mt-2 hover:text-reba-pink transition-colors"
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-reba-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-reba-muted text-sm">
            &copy; 2026 Sweet Reba&apos;s Bakery. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-reba-muted text-sm">
            <Link href="/privacy" className="hover:text-reba-pink transition-colors">
              Privacy Policy
            </Link>
            <span>&middot;</span>
            <span>
              Crafted by{" "}
              <a href="https://getbearing.co" target="_blank" rel="noopener noreferrer" className="text-reba-pink hover:text-reba-pink-hover transition-colors">
                Bearing Intelligence
              </a>
              {" "}&amp;{" "}
              <span className="text-reba-pink">N&oslash;emso Designs</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

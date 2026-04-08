"use client";

import { useState } from "react";
import { bakeryHours } from "@/data/sample-data";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-reba-card to-reba-dark py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="font-[family-name:var(--font-heading)] text-5xl sm:text-7xl text-reba-cream mb-4">
            Contact Us
          </h1>
          <p className="text-reba-muted text-lg">
            We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Location Cards */}
          <div className="space-y-6">
            {/* Carmel */}
            <div className="bg-reba-card border border-reba-border rounded-2xl p-6">
              <h2 className="font-[family-name:var(--font-heading)] text-2xl text-reba-cream mb-3">
                Carmel Crossroads
              </h2>
              <div className="space-y-2 text-sm">
                <p className="text-reba-soft">206 Crossroads Blvd</p>
                <p className="text-reba-soft">Carmel, CA 93923</p>
                <a
                  href="tel:8316014818"
                  className="text-reba-pink hover:text-reba-pink-hover transition-colors block"
                >
                  (831) 601-4818
                </a>
              </div>
              <div className="mt-4 bg-reba-dark/50 border border-reba-pink/20 rounded-lg p-3">
                <p className="text-reba-pink text-sm italic">
                  Temporarily closed for fire repairs. We expect to reopen in
                  6-8 weeks. Thank you for your patience!
                </p>
              </div>
            </div>

            {/* Salinas */}
            <div className="bg-reba-card border border-reba-border rounded-2xl p-6">
              <h2 className="font-[family-name:var(--font-heading)] text-2xl text-reba-cream mb-3">
                Old Town Salinas
              </h2>
              <div className="space-y-2 text-sm">
                <p className="text-reba-soft">268 Main St</p>
                <p className="text-reba-soft">Salinas, CA 93901</p>
                <a
                  href="tel:8316760628"
                  className="text-reba-pink hover:text-reba-pink-hover transition-colors block"
                >
                  (831) 676-0628
                </a>
              </div>

              {/* Hours */}
              <div className="mt-4 border-t border-reba-border pt-4">
                <h3 className="text-reba-cream text-sm font-semibold mb-2">
                  Hours
                </h3>
                <div className="space-y-1">
                  {bakeryHours.map((h) => (
                    <div
                      key={h.day}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-reba-muted">{h.day}</span>
                      <span
                        className={
                          h.hours === "Closed"
                            ? "text-reba-pink/70"
                            : "text-reba-soft"
                        }
                      >
                        {h.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* DoorDash */}
              <div className="mt-4 border-t border-reba-border pt-4">
                <a
                  href="https://www.doordash.com/store/sweet-reba's-salinas-24453129/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-reba-pink hover:text-reba-pink-hover transition-colors text-sm font-medium"
                >
                  <span>🛵</span>
                  Order on DoorDash
                </a>
              </div>
            </div>

            {/* Social */}
            <div className="bg-reba-card border border-reba-border rounded-2xl p-6">
              <h2 className="text-reba-cream font-semibold mb-3">Follow Us</h2>
              <a
                href="https://instagram.com/sweetrebas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-reba-pink hover:text-reba-pink-hover transition-colors text-sm"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                @sweetrebas on Instagram
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <div className="bg-reba-card border border-reba-border rounded-2xl p-6 sm:p-8">
              <h2 className="font-[family-name:var(--font-heading)] text-2xl text-reba-cream mb-6">
                Send Us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-reba-soft mb-1.5"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    required
                    className="w-full bg-reba-dark border border-reba-border rounded-lg px-4 py-2.5 text-sm text-reba-cream placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-reba-soft mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    required
                    className="w-full bg-reba-dark border border-reba-border rounded-lg px-4 py-2.5 text-sm text-reba-cream placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm text-reba-soft mb-1.5"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={form.message}
                    onChange={(e) =>
                      setForm({ ...form, message: e.target.value })
                    }
                    required
                    rows={5}
                    className="w-full bg-reba-dark border border-reba-border rounded-lg px-4 py-2.5 text-sm text-reba-cream placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition-colors resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-reba-pink hover:bg-reba-pink-hover text-white py-3 rounded-full font-medium transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

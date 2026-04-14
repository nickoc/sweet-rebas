"use client";

import { useState } from "react";
import { bakeryHours } from "@/data/sample-data";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent(`Website message from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:reba@sweetrebas.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <div>
      {/* Hero */}
      <section className="py-16 sm:py-24" style={{ background: "linear-gradient(to bottom, #fff5f5, #ffffff)" }}>
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
            {/* Salinas — first */}
            <div className="border-2 border-reba-pink/30 rounded-2xl p-8" style={{ backgroundColor: "#fff5f5" }}>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl text-reba-cream mb-4">
                Old Town Salinas
              </h2>
              <div className="space-y-2 text-base">
                <p className="text-reba-soft">268 Main St</p>
                <p className="text-reba-soft">Salinas, CA 93901</p>
                <a
                  href="tel:8316760628"
                  className="text-reba-pink hover:text-reba-pink-hover transition-colors block font-semibold text-lg"
                >
                  (831) 676-0628
                </a>
              </div>

              {/* Hours */}
              <div className="mt-5 border-t border-reba-border pt-5">
                <h3 className="text-reba-cream text-base font-semibold mb-3">
                  Hours
                </h3>
                <div className="space-y-2">
                  {bakeryHours.map((h) => (
                    <div
                      key={h.day}
                      className="flex justify-between text-base"
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
              <div className="mt-5 border-t border-reba-border pt-5">
                <a
                  href="https://www.doordash.com/store/sweet-rebas-salinas-40954727/97268547/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-reba-pink hover:text-reba-pink-hover transition-colors text-base font-medium"
                >
                  <span className="text-xl">🛵</span>
                  Order on DoorDash
                </a>
              </div>
            </div>

            {/* Carmel — second */}
            <div className="border-2 border-reba-pink/30 rounded-2xl p-8" style={{ backgroundColor: "#fff5f5" }}>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl text-reba-cream mb-4">
                Carmel Crossroads
              </h2>
              <div className="space-y-2 text-base">
                <p className="text-reba-soft">206 Crossroads Blvd</p>
                <p className="text-reba-soft">Carmel, CA 93923</p>
                <a
                  href="tel:8316014818"
                  className="text-reba-pink hover:text-reba-pink-hover transition-colors block font-semibold text-lg"
                >
                  (831) 601-4818
                </a>
              </div>
              <div className="mt-5 border border-reba-pink/20 rounded-lg p-4">
                <p className="text-reba-pink text-base italic">
                  Reopening at the end of May 2026. We can&apos;t wait to
                  see you back at Crossroads!
                </p>
              </div>
            </div>

          </div>

          {/* Contact Form */}
          <div>
            <div className="border-2 border-reba-pink/30 rounded-2xl p-8 sm:p-10" style={{ backgroundColor: "#fff5f5" }}>
              <h2 className="font-[family-name:var(--font-heading)] text-3xl text-reba-cream mb-2">
                Send Us a Message
              </h2>
              <p className="text-reba-muted text-base mb-6">
                Your message will be sent to{" "}
                <a href="mailto:reba@sweetrebas.com" className="text-reba-pink font-semibold hover:text-reba-pink-hover transition-colors">
                  reba@sweetrebas.com
                </a>
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-base text-reba-soft mb-2"
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
                    className="w-full bg-white border border-reba-pink/20 rounded-lg px-5 py-3.5 text-base text-reba-cream placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-base text-reba-soft mb-2"
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
                    className="w-full bg-white border border-reba-pink/20 rounded-lg px-5 py-3.5 text-base text-reba-cream placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-base text-reba-soft mb-2"
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
                    className="w-full bg-white border border-reba-pink/20 rounded-lg px-5 py-3.5 text-base text-reba-cream placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition-colors resize-none"
                    placeholder="How can we help you?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-reba-pink hover:bg-reba-pink-hover text-white py-3.5 rounded-full text-base font-semibold transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Social — under the form */}
            <div className="border-2 border-reba-pink/30 rounded-2xl p-8 mt-6" style={{ backgroundColor: "#fff5f5" }}>
              <h2 className="text-reba-cream font-semibold text-xl mb-4">Follow Us</h2>
              <a
                href="https://instagram.com/sweetrebas"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-reba-pink hover:text-reba-pink-hover transition-colors text-base"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                @sweetrebas on Instagram
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

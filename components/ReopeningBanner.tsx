"use client";

import { useState } from "react";

export default function ReopeningBanner() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: Connect to actual email service
    setSubmitted(true);
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#f8f6f3" }}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Text */}
          <div className="p-10 sm:p-12 flex flex-col justify-between h-full">
            <h2 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-reba-pink mb-4">
              Exciting News!
            </h2>
            <p className="text-reba-muted text-xl leading-relaxed mb-3">
              Our Salinas store is now open!
            </p>
            <p className="text-reba-muted text-xl leading-relaxed mb-4">
              Our Carmel store is reopening at the end of May.
            </p>

            <div className="mt-auto pt-4">
            {submitted ? (
              <p className="text-reba-pink font-semibold text-lg">
                You&apos;re on the list! We&apos;ll let you know as soon as Carmel reopens.
              </p>
            ) : (
              <>
                <p className="text-reba-muted text-xl mb-3">
                  Be the first to know when Carmel reopens:
                </p>
                <form onSubmit={handleSubmit} className="flex gap-3 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="flex-1 bg-white border border-reba-border rounded-full px-5 py-2.5 text-base text-reba-cream placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition"
                  />
                  <button
                    type="submit"
                    className="bg-reba-pink hover:bg-reba-pink-hover text-white px-6 py-2.5 rounded-full text-base font-semibold transition-colors whitespace-nowrap"
                  >
                    Notify Me
                  </button>
                </form>
              </>
            )}
            </div>
          </div>

          {/* Right: Image */}
          <div className="hidden md:block max-h-[440px] overflow-hidden">
            <img
              src="/slideshow-soup.jpg"
              alt="Fresh soup at Sweet Reba's"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

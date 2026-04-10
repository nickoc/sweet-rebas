"use client";

import { useState } from "react";

export default function WeddingConsultation() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    // TODO: Connect to email service
    setSubmitted(true);
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-block bg-white border-2 border-reba-pink text-reba-pink hover:bg-reba-pink hover:text-white px-10 py-4 rounded-full text-lg font-medium transition-colors shadow-md hover:shadow-lg"
      >
        Schedule Your Wedding Cake Consultation {"\u{1F492}"}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}
        >
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-4 text-reba-muted hover:text-reba-cream text-2xl"
            >
              &times;
            </button>
            <div className="bg-reba-pink px-8 py-6 text-center">
              <div className="text-4xl mb-2">{"\u{1F492}"}</div>
              <h3 className="font-[family-name:var(--font-heading)] text-2xl text-white">
                Wedding Cake Consultation
              </h3>
            </div>
            <div className="px-8 py-8">
              {submitted ? (
                <div className="text-center">
                  <div className="text-4xl mb-3">{"\u2728"}</div>
                  <h4 className="font-[family-name:var(--font-heading)] text-xl text-reba-cream mb-2">
                    We&apos;ll be in touch!
                  </h4>
                  <p className="text-reba-muted text-sm">
                    Reba will reach out to schedule your wedding cake consultation. We can&apos;t wait to create something beautiful for your big day!
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-reba-soft text-sm leading-relaxed mb-6 text-center">
                    Leave your email and Reba will personally reach out to schedule a tasting and design consultation for your wedding cake.
                  </p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      className="w-full bg-reba-card border border-reba-border rounded-lg px-4 py-3 text-sm text-reba-cream placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition"
                    />
                    <button
                      type="submit"
                      className="w-full bg-reba-pink hover:bg-reba-pink-hover text-white py-3 rounded-full font-medium transition-colors"
                    >
                      Request Consultation
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

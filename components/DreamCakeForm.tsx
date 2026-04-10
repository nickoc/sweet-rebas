"use client";

import { useState } from "react";

export default function DreamCakeForm() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    contact: "",
    date: "",
    description: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.contact || !form.description) return;
    // TODO: Connect to email service
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center mt-6">
        <div className="bg-white border border-reba-pink/30 rounded-2xl p-8 max-w-lg mx-auto">
          <div className="text-4xl mb-3">{"\u2728"}</div>
          <h3 className="font-[family-name:var(--font-heading)] text-2xl text-reba-cream mb-2">
            We Got Your Dream Cake Idea!
          </h3>
          <p className="text-reba-muted text-sm">
            We&apos;ll be in touch soon to discuss your vision. Can&apos;t wait to create something amazing for you!
          </p>
        </div>
      </div>
    );
  }

  if (!open) {
    return (
      <div className="text-center mt-6">
        <button
          onClick={() => setOpen(true)}
          className="bg-reba-pink hover:bg-reba-pink-hover text-white px-10 py-4 rounded-full text-lg font-medium transition-colors shadow-md hover:shadow-lg"
        >
          Tell Us About Your Dream Cake {"\u2728"}
        </button>
      </div>
    );
  }

  return (
    <div className="mt-6 max-w-lg mx-auto">
      <div className="bg-white border border-reba-pink/30 rounded-2xl p-8">
        <h3 className="font-[family-name:var(--font-heading)] text-2xl text-reba-cream mb-1">
          Tell Us About Your Dream Cake
        </h3>
        <p className="text-reba-muted text-sm mb-6">
          Describe your vision and we&apos;ll make it happen!
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-reba-cream text-sm font-medium mb-1">Your Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Full name"
                className="w-full bg-reba-card border border-reba-border rounded-lg px-4 py-2.5 text-sm text-reba-cream placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition"
              />
            </div>
            <div>
              <label className="block text-reba-cream text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                required
                value={form.contact}
                onChange={(e) => setForm({ ...form, contact: e.target.value })}
                placeholder="Your email address"
                className="w-full bg-reba-card border border-reba-border rounded-lg px-4 py-2.5 text-sm text-reba-cream placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition"
              />
            </div>
          </div>
          <div>
            <label className="block text-reba-cream text-sm font-medium mb-1">Event Date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full bg-reba-card border border-reba-border rounded-lg px-4 py-2.5 text-sm text-reba-cream focus:outline-none focus:border-reba-pink transition"
            />
          </div>
          <div>
            <label className="block text-reba-cream text-sm font-medium mb-1">Tell Us About Your Dream Cake</label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe your vision — theme, colors, flavors, number of guests, anything that inspires you!"
              className="w-full bg-reba-card border border-reba-border rounded-lg px-4 py-2.5 text-sm text-reba-cream placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-reba-pink hover:bg-reba-pink-hover text-white py-3 rounded-full font-medium transition-colors"
          >
            Send My Dream Cake Idea {"\u2728"}
          </button>
        </form>
      </div>
    </div>
  );
}

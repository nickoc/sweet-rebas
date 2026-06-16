"use client";

import { useState, useRef } from "react";
import { submitWaitlist } from "@/lib/waitlist";

// Custom-cake order form for the /cakes page. Captures a full order brief and
// routes it to Reba via the proven submitWaitlist path with the wired
// "cake-callback-custom" context (→ SMS + email alert + inbox). Structured
// fields are packed into `notes` so Reba sees the whole request in one place.

const SIZE_OPTIONS = [
  "Not sure yet — help me pick",
  '6" Round (~10–12)',
  '8" Round (~15–20)',
  '9" Round (~20–25)',
  "1/4 Sheet (~30–35)",
  "Cupcakes (by the dozen)",
  "Larger / tiered (tell us below)",
];

export default function CustomCakeOrderForm() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    size: "",
    flavor: "",
    details: "",
  });
  // Synchronous in-flight guard — setLoading is async, so two submits in the
  // same tick could both pass the checks and double-POST (duplicate order +
  // double alert to Reba). A ref flips immediately.
  const submittingRef = useRef(false);

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submittingRef.current) return;
    const name = form.name.trim();
    const phone = form.phone.trim();
    const details = form.details.trim();
    if (!name || !phone || !details) return;
    if (phone.replace(/\D/g, "").length < 10) {
      setErrorMsg("Please enter a valid phone number so Reba can reach you.");
      return;
    }

    // Pack the structured brief into notes so Reba sees the full order at a glance.
    const notes = [
      "Custom cake order request.",
      `Need-by date: ${form.date || "not specified"}`,
      `Size/servings: ${form.size || "not specified"}`,
      `Flavor: ${form.flavor.trim() || "open to suggestions"}`,
      "",
      "Details:",
      details,
    ].join("\n");

    submittingRef.current = true;
    setLoading(true);
    setErrorMsg("");
    const result = await submitWaitlist({
      name,
      phone,
      ...(form.email.trim() ? { email: form.email.trim() } : {}),
      notes,
      source_context: "cake-callback-custom",
    });
    setLoading(false);
    submittingRef.current = false;
    if (result.ok) {
      setSubmitted(true);
    } else {
      setErrorMsg(result.error);
    }
  }

  if (submitted) {
    return (
      <div className="bg-white border-2 border-reba-pink/30 rounded-2xl p-10 max-w-lg mx-auto text-center">
        <div className="text-5xl mb-3">{"\u{1F382}"}</div>
        <h3 className="font-[family-name:var(--font-heading)] text-3xl text-reba-ink mb-2">
          Order request received!
        </h3>
        <p className="text-reba-muted text-base">
          Reba will reach out to finalize the details of your custom cake — we reply during business hours (Tue–Fri 8–5, Sat 9–5). Can&apos;t wait to make something special for you!
        </p>
      </div>
    );
  }

  if (!open) {
    return (
      <div className="text-center">
        <button
          onClick={() => setOpen(true)}
          className="bg-reba-pink hover:bg-reba-pink-hover text-white px-10 py-4 rounded-full text-lg font-semibold transition-colors shadow-md hover:shadow-lg"
        >
          Order Your Custom Cake {"\u{1F382}"}
        </button>
        <p className="text-reba-muted text-sm mt-3">Tell us what you&apos;re dreaming up and Reba will take it from there.</p>
      </div>
    );
  }

  const inputClass =
    "w-full bg-reba-card border border-reba-border rounded-lg px-4 py-2.5 text-sm text-reba-ink placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition";

  return (
    <div className="bg-white border-2 border-reba-pink/30 rounded-2xl p-8 max-w-lg mx-auto relative">
      <button
        onClick={() => setOpen(false)}
        className="absolute top-3 right-3 min-w-12 min-h-12 inline-flex items-center justify-center text-reba-muted hover:text-reba-pink transition-colors text-2xl leading-none"
        aria-label="Close"
      >
        &times;
      </button>
      <h3 className="font-[family-name:var(--font-heading)] text-3xl text-reba-ink mb-1">
        Order Your Custom Cake
      </h3>
      <p className="text-reba-pink text-sm font-semibold mb-6">Please allow 7 days for custom cake orders.</p>
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-reba-ink text-sm font-medium mb-1">Your name *</label>
            <input
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="Full name"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-reba-ink text-sm font-medium mb-1">Phone *</label>
            <input
              type="tel"
              required
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="Phone number"
              className={inputClass}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-reba-ink text-sm font-medium mb-1">Email (optional)</label>
            <input
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="Your email address"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-reba-ink text-sm font-medium mb-1">Need-by date</label>
            <input
              type="date"
              value={form.date}
              onChange={(e) => update("date", e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-reba-ink text-sm font-medium mb-1">Size / servings</label>
            <select
              value={form.size}
              onChange={(e) => update("size", e.target.value)}
              className={inputClass}
            >
              <option value="">Select a size…</option>
              {SIZE_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-reba-ink text-sm font-medium mb-1">Flavor (optional)</label>
            <input
              type="text"
              value={form.flavor}
              onChange={(e) => update("flavor", e.target.value)}
              placeholder="e.g. chocolate, carrot, lemon"
              className={inputClass}
            />
          </div>
        </div>
        <div>
          <label className="block text-reba-ink text-sm font-medium mb-1">Tell us about your cake *</label>
          <textarea
            required
            rows={4}
            value={form.details}
            onChange={(e) => update("details", e.target.value)}
            placeholder="Occasion, theme, colors, inscription, number of guests, anything that inspires you!"
            className={`${inputClass} resize-y`}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-reba-pink hover:bg-reba-pink-hover text-white py-3 rounded-full font-semibold transition-colors disabled:opacity-60"
        >
          {loading ? "Sending..." : `Send My Cake Order ${"\u{1F382}"}`}
        </button>
        {errorMsg && (
          <p className="text-reba-pink text-sm text-center">{errorMsg}</p>
        )}
      </form>
    </div>
  );
}

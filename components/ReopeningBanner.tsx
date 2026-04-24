"use client";

import { useState } from "react";
import { submitWaitlist } from "@/lib/waitlist";

const SMS_CONSENT_TEXT =
  "I agree to receive text messages from Sweet Reba's Bakery about the Carmel reopening and occasional updates. Msg frequency varies. Msg & data rates may apply. Reply STOP to unsubscribe, HELP for help.";

export default function ReopeningBanner() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [smsConsent, setSmsConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const emailTrim = email.trim();
    const phoneTrim = phone.trim();
    if (!emailTrim && !phoneTrim) {
      setErrorMsg("Please give us an email or phone number so we can reach you.");
      setStatus("error");
      return;
    }
    if (phoneTrim && !smsConsent) {
      setErrorMsg("To get SMS updates, please check the consent box below.");
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");

    const result = await submitWaitlist({
      name: name.trim() || undefined,
      email: emailTrim || undefined,
      phone: phoneTrim || undefined,
      source_context: "carmel-reopening",
    });
    if (result.ok) {
      setStatus("success");
    } else {
      setErrorMsg(result.error);
      setStatus("error");
    }
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
      <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#f8f6f3" }}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Text + form */}
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
              {status === "success" ? (
                <p className="text-reba-pink font-semibold text-lg">
                  You&apos;re on the list! We&apos;ll let you know as soon as Carmel reopens.
                </p>
              ) : (
                <>
                  <p className="text-reba-muted text-xl mb-3">
                    Be the first to know when Carmel reopens:
                  </p>
                  <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name (optional)"
                      autoComplete="name"
                      className="w-full bg-white border border-reba-border rounded-full px-5 py-2.5 text-base text-reba-cream placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Your email address"
                      autoComplete="email"
                      className="w-full bg-white border border-reba-border rounded-full px-5 py-2.5 text-base text-reba-cream placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition"
                    />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Mobile number (optional — for SMS)"
                      autoComplete="tel"
                      className="w-full bg-white border border-reba-border rounded-full px-5 py-2.5 text-base text-reba-cream placeholder:text-reba-muted focus:outline-none focus:border-reba-pink transition"
                    />
                    {phone.trim() && (
                      <label className="flex items-start gap-3 p-4 rounded-xl bg-white/70 border border-reba-border cursor-pointer">
                        <input
                          type="checkbox"
                          checked={smsConsent}
                          onChange={(e) => setSmsConsent(e.target.checked)}
                          className="mt-1 h-4 w-4 shrink-0 rounded border-reba-border text-reba-pink focus:ring-reba-pink cursor-pointer"
                        />
                        <span className="text-sm text-reba-muted leading-snug">
                          {SMS_CONSENT_TEXT}
                        </span>
                      </label>
                    )}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="bg-reba-pink hover:bg-reba-pink-hover text-white px-6 py-2.5 rounded-full text-base font-semibold transition-colors whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === "loading" ? "Adding you..." : "Notify Me"}
                    </button>
                  </form>
                  {status === "error" && (
                    <p className="text-reba-pink text-sm mt-3">{errorMsg}</p>
                  )}
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

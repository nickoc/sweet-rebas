"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

/* ── Question Data ─────────────────────────────────────── */

const QUESTIONS = [
  {
    question: "It\u2019s Saturday morning. You\u2019re reaching for\u2026",
    options: [
      { emoji: "\u2615", label: "A strong coffee", trait: "bold" },
      { emoji: "\u{1FAB5}", label: "A warm tea", trait: "cozy" },
      { emoji: "\u{1F9C3}", label: "Fresh juice", trait: "fresh" },
      { emoji: "\u{1F32A}\uFE0F", label: "Nothing. I\u2019m chaos.", trait: "wild" },
    ],
  },
  {
    question: "Your ideal dessert texture is\u2026",
    options: [
      { emoji: "\u{1F94C}", label: "Crispy golden edges", trait: "bold" },
      { emoji: "\u{1F36B}", label: "Soft gooey center", trait: "cozy" },
      { emoji: "\u{1F382}", label: "Beautiful layers", trait: "fresh" },
      { emoji: "\u{1F381}", label: "Surprise me", trait: "wild" },
    ],
  },
  {
    question: "Pick a weekend vibe\u2026",
    options: [
      { emoji: "\u{1F6CB}\uFE0F", label: "Cozy blanket", trait: "cozy" },
      { emoji: "\u{1F3D6}\uFE0F", label: "Beach walk", trait: "fresh" },
      { emoji: "\u{1F966}", label: "Farmers market", trait: "fresh" },
      { emoji: "\u{1F697}", label: "Road trip", trait: "wild" },
    ],
  },
  {
    question: "You bring something to a party. You want people to say\u2026",
    options: [
      { emoji: "\u{1F929}", label: "\u201CWhere did you GET this?\u201D", trait: "bold" },
      { emoji: "\u{1F4DD}", label: "\u201CCan I have the recipe?\u201D", trait: "cozy" },
      { emoji: "\u{1F60B}", label: "\u201CI need three more\u201D", trait: "fresh" },
      { emoji: "\u{1F3A8}", label: "\u201CThis is art\u201D", trait: "wild" },
    ],
  },
];

/* ── Results Data ──────────────────────────────────────── */

interface Result {
  emoji: string;
  title: string;
  tagline: string;
  description: string;
  product: string;
  price: string;
}

const RESULTS: Record<string, Result> = {
  bold: {
    emoji: "\u{1F36B}",
    title: "Double Chocolate Thunder",
    tagline: "Intense, unapologetic, unforgettable",
    description:
      "You go all in. Half measures aren\u2019t your thing. When you walk into a room, people notice \u2014 and when they bite into your energy, they never forget it.",
    product: "Double Chocolate Cookie",
    price: "$4.50",
  },
  cozy: {
    emoji: "\u{1F36A}",
    title: "Snickerdoodle Soul",
    tagline: "Warm, classic, impossible not to love",
    description:
      "You\u2019re the person everyone wants at the party. Reliable, comforting, and always just right. You don\u2019t need to be flashy \u2014 your warmth speaks for itself.",
    product: "Snickerdoodle Cookie",
    price: "$4.00",
  },
  fresh: {
    emoji: "\u{1F34B}",
    title: "Lemon Bar Dreamer",
    tagline: "Bright, optimistic, perfectly balanced",
    description:
      "You bring sunshine wherever you go. Sweet but never too much, tart but never bitter \u2014 you\u2019ve figured out the balance that most people spend their whole lives searching for.",
    product: "Lemon Bar",
    price: "$5.00",
  },
  wild: {
    emoji: "\u{1F32F}",
    title: "Breakfast Burrito Rebel",
    tagline: "Unpredictable, bold, secretly everyone\u2019s favorite",
    description:
      "Nobody expected you to show up at a bakery \u2014 and that\u2019s exactly why you\u2019re the most exciting thing on the menu. Rules are suggestions. Breakfast is all day.",
    product: "Breakfast Burrito",
    price: "$12.00",
  },
};

/* ── Component ─────────────────────────────────────────── */

export default function QuizPage() {
  const [stage, setStage] = useState<"intro" | "quiz" | "result">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const introRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && introRef.current) {
      introRef.current.style.opacity = "1";
      introRef.current.style.transform = "translateY(0)";
    }
  }, [mounted]);

  function startQuiz() {
    setStage("quiz");
    setCurrentQ(0);
    setAnswers([]);
  }

  function answer(trait: string) {
    const next = [...answers, trait];
    setAnswers(next);
    if (next.length >= QUESTIONS.length) {
      setStage("result");
    } else {
      setCurrentQ(currentQ + 1);
    }
  }

  function getResult(): Result {
    const counts: Record<string, number> = {};
    for (const a of answers) {
      counts[a] = (counts[a] || 0) + 1;
    }
    const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "cozy";
    return RESULTS[top];
  }

  /* ── Intro Screen ── */
  if (stage === "intro") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-xl w-full">
          <div
            ref={introRef}
            className="text-center"
            style={{
              opacity: 0,
              transform: "translateY(20px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }}
          >
            <div className="text-6xl mb-6">{"\u{1F36A}"}</div>
            <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-reba-cream mb-4">
              What Should I Try?
            </h1>
            <p className="text-reba-muted mb-8 max-w-md mx-auto">
              Answer 4 quick questions and we&apos;ll match you with your perfect
              Sweet Reba&apos;s treat.
            </p>
            <button
              onClick={startQuiz}
              className="group relative overflow-hidden px-8 py-3.5 text-lg font-medium text-white transition-all hover:scale-[1.02] active:scale-[0.98] rounded-full bg-reba-pink"
            >
              <div className="absolute inset-0 overflow-hidden rounded-full">
                <div
                  className="absolute inset-[-100%]"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                    animation: "shimmer 2s infinite",
                  }}
                />
              </div>
              <span className="relative z-10">Let&apos;s Go</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Quiz Screen ── */
  if (stage === "quiz") {
    const q = QUESTIONS[currentQ];
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-20">
        <div className="max-w-xl w-full">
          {/* Progress Bar */}
          <div className="flex gap-2 mb-8">
            {QUESTIONS.map((_, i) => (
              <div
                key={i}
                className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                  i <= currentQ ? "bg-reba-pink" : "bg-reba-border"
                }`}
              />
            ))}
          </div>

          <p className="text-xs text-reba-muted uppercase tracking-wider mb-2">
            Question {currentQ + 1} of {QUESTIONS.length}
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-reba-cream mb-8">
            {q.question}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {q.options.map((opt) => (
              <button
                key={opt.label}
                onClick={() => answer(opt.trait)}
                className="flex items-center gap-3 rounded-xl border border-reba-border bg-white p-5 text-left transition-all hover:border-reba-pink/30 hover:shadow-sm active:scale-[0.98]"
              >
                <span className="text-2xl">{opt.emoji}</span>
                <span className="text-reba-cream text-sm font-medium">
                  {opt.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Result Screen ── */
  const result = getResult();
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-xl w-full text-center">
        <div className="text-6xl mb-4">{result.emoji}</div>
        <p className="text-xs text-reba-pink uppercase tracking-wider font-semibold mb-2">
          Your Flavor Personality
        </p>
        <h1 className="font-[family-name:var(--font-heading)] text-4xl sm:text-5xl text-reba-cream mb-3">
          {result.title}
        </h1>
        <p className="text-reba-pink italic text-lg mb-8">{result.tagline}</p>

        <div className="bg-reba-card border border-reba-border rounded-2xl p-8 mb-8 text-center">
          <p className="text-reba-soft leading-relaxed mb-6">
            {result.description}
          </p>
          <div className="border-t border-reba-border pt-4">
            <p className="text-xs text-reba-muted uppercase tracking-wider mb-1">
              You Should Try
            </p>
            <p className="text-reba-cream font-bold text-lg">{result.product}</p>
            <p className="text-reba-pink font-medium">{result.price}</p>
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <Link
            href="/menu"
            className="bg-reba-pink hover:bg-reba-pink-hover text-white px-8 py-3.5 rounded-full text-lg font-medium transition-colors"
          >
            View Full Menu
          </Link>
          <button
            onClick={startQuiz}
            className="border border-reba-border text-reba-cream hover:border-reba-pink/30 px-8 py-3.5 rounded-full text-lg font-medium transition-colors"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

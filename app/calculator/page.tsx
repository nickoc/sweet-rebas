"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Agent {
  id: string;
  name: string;
  role: string;
  rate: number;
  hours: number;
  aiCost: number;
  on: boolean;
}

const INITIAL_AGENTS: Agent[] = [
  { id: "concierge", name: "AI Concierge", role: "Counter staff (after-hours/weekends)", rate: 18, hours: 8, aiCost: 75, on: true },
  { id: "content", name: "Content Engine", role: "Social media / newsletter writer", rate: 25, hours: 5, aiCost: 100, on: true },
  { id: "preorder", name: "Email & Pre-Orders", role: "Phone order coordinator", rate: 18, hours: 6, aiCost: 75, on: true },
  { id: "bake", name: "Bake Optimizer", role: "Production planner", rate: 22, hours: 3, aiCost: 75, on: true },
  { id: "review", name: "Review Responder", role: "Reputation manager", rate: 25, hours: 3, aiCost: 50, on: true },
  { id: "memory", name: "Customer Memory", role: "CRM / loyalty coordinator", rate: 22, hours: 3, aiCost: 50, on: true },
  { id: "wholesale", name: "Wholesale Agent", role: "B2B order coordinator", rate: 20, hours: 4, aiCost: 75, on: true },
  { id: "ops", name: "Ops Dashboard", role: "Morning prep / inventory check", rate: 22, hours: 2, aiCost: 50, on: true },
];

function fmt(n: number): string {
  if (Math.abs(n) >= 1e6) return "$" + (n / 1e6).toFixed(1) + "M";
  return "$" + Math.round(n).toLocaleString("en-US");
}

function getTier(totalAI: number) {
  if (totalAI <= 400) return { name: "Starter", price: 499 };
  if (totalAI <= 700) return { name: "Growth", price: 899 };
  return { name: "Enterprise", price: 1499 };
}

function AnimatedNumber({ value, prefix = "$", suffix = "", isDollar = true }: { value: number; prefix?: string; suffix?: string; isDollar?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const currentRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const start = currentRef.current;
    const diff = value - start;
    if (Math.abs(diff) < 1) {
      if (ref.current) ref.current.textContent = isDollar ? fmt(value) : prefix + Math.round(value).toLocaleString("en-US") + suffix;
      currentRef.current = value;
      return;
    }
    const duration = 400;
    const t0 = performance.now();
    function tick(now: number) {
      const p = Math.min((now - t0) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const v = start + diff * ease;
      currentRef.current = v;
      if (ref.current) {
        ref.current.textContent = isDollar ? fmt(v) : prefix + Math.round(v).toLocaleString("en-US") + suffix;
      }
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
      else {
        currentRef.current = value;
        if (ref.current) ref.current.textContent = isDollar ? fmt(value) : prefix + Math.round(value).toLocaleString("en-US") + suffix;
      }
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [value, prefix, suffix, isDollar]);

  return <span ref={ref}>{isDollar ? fmt(value) : prefix + Math.round(value).toLocaleString("en-US") + suffix}</span>;
}

export default function CalculatorPage() {
  const [bizName, setBizName] = useState("Sweet Reba's Bakery");
  const [revenue, setRevenue] = useState(130000);
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);

  const toggleAgent = useCallback((idx: number) => {
    setAgents(prev => prev.map((a, i) => i === idx ? { ...a, on: !a.on } : a));
  }, []);

  const updateRate = useCallback((idx: number, rate: number) => {
    setAgents(prev => prev.map((a, i) => i === idx ? { ...a, rate } : a));
  }, []);

  const updateHours = useCallback((idx: number, hours: number) => {
    setAgents(prev => prev.map((a, i) => i === idx ? { ...a, hours } : a));
  }, []);

  const active = agents.filter(a => a.on);
  const totalHumanMonthly = active.reduce((s, a) => s + a.rate * a.hours * 4.33, 0);
  const totalAICostRaw = active.reduce((s, a) => s + a.aiCost, 0);
  const tier = getTier(totalAICostRaw);
  const tierMonthly = tier.price;
  const monthlySavings = Math.max(0, totalHumanMonthly - tierMonthly);
  const annualSavings = monthlySavings * 12;
  const annualHuman = totalHumanMonthly * 12;
  const annualBearing = tierMonthly * 12;
  const roi = annualBearing > 0 ? ((annualHuman - annualBearing) / annualBearing) * 100 : 0;
  const dailyValue = annualSavings > 0 ? annualSavings / 365 : 0;
  const paybackDays = dailyValue > 0 ? Math.ceil(tierMonthly / dailyValue) : 0;
  const hoursFree = active.reduce((s, a) => s + a.hours, 0);
  const threeYear = annualSavings * (1.0 + 1.25 + 1.45);

  return (
    <div className="min-h-screen" style={{ background: "#1a1015", color: "#fef7f0", fontFamily: "'Lora', serif" }}>
      {/* Header */}
      <header className="text-center py-10" style={{ background: "linear-gradient(180deg, #251a1f 0%, #1a1015 100%)" }}>
        <span className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-3 uppercase tracking-widest" style={{ background: "#cb3d81", color: "#fff" }}>
          AI ROI Calculator
        </span>
        <h1 className="text-3xl font-extrabold mb-1" style={{ fontFamily: "'Dancing Script', cursive", fontSize: "2.5rem", color: "#cb3d81" }}>
          Sweet Reba&apos;s
        </h1>
        <p style={{ color: "#9a8a80" }}>AI Operating System — Bakery</p>
        <p style={{ color: "#9a8a80", fontSize: "0.85rem", marginTop: "0.25rem" }}>Built by Bearing Intelligence</p>
      </header>

      <div className="max-w-[960px] mx-auto px-5 pb-20">

        {/* Business Info */}
        <Section title="Business Information">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label>Business Name</Label>
              <input type="text" value={bizName} onChange={e => setBizName(e.target.value)} className="input-field" />
            </div>
            <div>
              <Label>Industry</Label>
              <select className="input-field" defaultValue="Bakery">
                <option>Bakery</option><option>Restaurant</option><option>Cafe</option><option>Other</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <div className="flex justify-between items-baseline mb-1">
                <Label>Annual Revenue</Label>
                <span className="text-base font-bold text-white">{fmt(revenue)}</span>
              </div>
              <input type="range" min={50000} max={500000} step={5000} value={revenue} onChange={e => setRevenue(+e.target.value)} className="w-full slider" />
            </div>
          </div>
        </Section>

        {/* Agent Selection */}
        <Section title="Your 8 AI Agents">
          <div className="space-y-3">
            {agents.map((a, i) => {
              const humanCost = a.rate * a.hours * 4.33;
              const saving = humanCost - a.aiCost;
              return (
                <div key={a.id} className={`rounded-xl border transition-all ${a.on ? "opacity-100" : "opacity-40 grayscale-[40%]"}`} style={{ background: "#251a1f", borderColor: "#3a2a30" }}>
                  <div className="flex items-center justify-between px-5 py-3 cursor-pointer" onClick={() => toggleAgent(i)}>
                    <div>
                      <h3 className="text-sm font-bold text-white">{a.name}</h3>
                      <span className="text-xs" style={{ color: "#9a8a80" }}>Replaces: {a.role}</span>
                    </div>
                    <label className="relative w-12 h-[26px] flex-shrink-0" onClick={e => e.stopPropagation()}>
                      <input type="checkbox" checked={a.on} onChange={() => toggleAgent(i)} className="sr-only peer" />
                      <div className="absolute inset-0 rounded-full peer-checked:bg-[#cb3d81] bg-[#3a2a30] border border-[#3a2a30] peer-checked:border-[#cb3d81] transition-colors cursor-pointer" />
                      <div className="absolute w-5 h-5 rounded-full bg-[#6a5a60] left-[3px] top-[3px] peer-checked:translate-x-[21px] peer-checked:bg-white transition-transform" />
                    </label>
                  </div>
                  {a.on && (
                    <div className="px-5 pb-4 space-y-3">
                      <SliderInput label="Hourly Rate" value={a.rate} min={10} max={60} step={1} suffix="/hr" prefix="$" onChange={v => updateRate(i, v)} />
                      <SliderInput label="Hours / Week" value={a.hours} min={0.5} max={40} step={0.5} suffix=" hrs" prefix="" onChange={v => updateHours(i, v)} />
                      <div className="flex justify-between items-center pt-2 border-t border-white/5 text-center text-sm">
                        <CostItem label="Human/mo" value={fmt(humanCost)} color="#f87171" />
                        <CostItem label="AI/mo" value={fmt(a.aiCost)} color="#4ade80" />
                        <CostItem label="Saved/mo" value={fmt(saving)} color="#fbbf24" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Section>

        {/* Tier */}
        <Section title="Your Investment">
          <div className="flex items-center justify-between flex-wrap gap-3 p-5 rounded-xl border" style={{ background: "linear-gradient(135deg, #2d1f28, #1a1015)", borderColor: "#cb3d81" }}>
            <div>
              <div className="text-xs" style={{ color: "#9a8a80" }}>Recommended Tier</div>
              <div className="text-2xl font-extrabold" style={{ color: "#cb3d81" }}>{tier.name}</div>
            </div>
            <div className="text-right">
              <span className="text-3xl font-extrabold text-white">{fmt(tierMonthly)}</span>
              <span className="text-sm" style={{ color: "#9a8a80" }}>/mo</span>
            </div>
          </div>
        </Section>

        {/* ROI Dashboard */}
        <Section title="ROI Dashboard">
          <div className="text-center p-8 rounded-xl border mb-6" style={{ background: "linear-gradient(135deg, #251a1f, #2d1f28)", borderColor: "#cb3d81", boxShadow: "0 0 40px rgba(203,61,129,0.15)" }}>
            <div className="text-xs uppercase tracking-widest mb-1" style={{ color: "#9a8a80" }}>Estimated Annual Savings</div>
            <div className="text-5xl font-black" style={{ color: "#4ade80", textShadow: "0 0 30px rgba(74,222,128,0.3)" }}>
              <AnimatedNumber value={annualSavings} />
            </div>
            <div className="text-sm mt-1" style={{ color: "#9a8a80" }}>vs. hiring humans for the same work</div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <StatCard label="Monthly Savings" color="#4ade80"><AnimatedNumber value={monthlySavings} /></StatCard>
            <StatCard label="Annual Savings" color="#4ade80"><AnimatedNumber value={annualSavings} /></StatCard>
            <StatCard label="ROI" color="#fbbf24"><AnimatedNumber value={Math.max(0, roi)} prefix="" suffix="%" isDollar={false} /></StatCard>
            <StatCard label="Payback Period" color="#9a8a80"><AnimatedNumber value={paybackDays} prefix="" suffix=" days" isDollar={false} /></StatCard>
            <StatCard label="Hours Freed / Week" color="#cb3d81"><AnimatedNumber value={hoursFree} prefix="" suffix=" hrs" isDollar={false} /></StatCard>
            <StatCard label="3-Year Value" color="#4ade80"><AnimatedNumber value={Math.max(0, threeYear)} /></StatCard>
          </div>
        </Section>

        {/* Cost Comparison */}
        <Section title="Cost Comparison">
          <div className="p-5 rounded-xl border space-y-4" style={{ background: "#251a1f", borderColor: "#3a2a30" }}>
            <CompBar label="DIY SaaS Stack" range="$2K - $8K/yr" pct={5} className="bg-gradient-to-r from-gray-500 to-gray-400" />
            <CompBar label="Freelancers" range="$18K - $60K/yr" pct={35} className="bg-gradient-to-r from-amber-500 to-amber-400" />
            <CompBar label="Agency" range="$36K - $120K/yr" pct={70} className="bg-gradient-to-r from-red-500 to-red-400" />
            <CompBar label="Full-time hire" range="$45K - $65K/yr" pct={100} className="bg-gradient-to-r from-red-600 to-red-500" />
            <CompBar label="Bearing AI" range={fmt(annualBearing) + "/yr"} pct={Math.max(2, (annualBearing / 65000) * 100)} className="bg-gradient-to-r from-green-500 to-green-400" isGreen />
          </div>
        </Section>

        {/* Per-Agent Payback */}
        <Section title="Per-Agent Payback (Days to ROI)">
          <div className="p-5 rounded-xl border space-y-3" style={{ background: "#251a1f", borderColor: "#3a2a30" }}>
            {active.length === 0 && <p className="text-center text-sm" style={{ color: "#9a8a80" }}>Select agents above to see payback.</p>}
            {active.map(a => {
              const humanMo = a.rate * a.hours * 4.33;
              const dailyHumanVal = humanMo / 30;
              const days = dailyHumanVal > 0 ? Math.ceil(a.aiCost / dailyHumanVal) : 30;
              const pct = Math.min(100, (days / 30) * 100);
              return (
                <div key={a.id}>
                  <div className="flex justify-between text-xs mb-1">
                    <span>{a.name}</span>
                    <span style={{ color: "#4ade80" }}>Day {days} of 30</span>
                  </div>
                  <div className="h-5 rounded-md overflow-hidden" style={{ background: "#1a1015" }}>
                    <div className="h-full rounded-md flex items-center justify-end pr-2 text-[10px] font-bold bg-gradient-to-r from-[#cb3d81] to-[#e04d93]" style={{ width: `${pct}%`, color: "#fff" }}>
                      Day {days}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* Print */}
        <button onClick={() => window.print()} className="w-full py-4 rounded-xl font-bold text-white text-base transition-all hover:-translate-y-0.5" style={{ background: "#cb3d81" }}>
          Download Report (PDF)
        </button>

        {/* Footer */}
        <footer className="text-center text-xs mt-10" style={{ color: "#6a5a60" }}>
          <p>Prepared with <strong>Bearing Intelligence</strong> — <a href="https://getbearing.co" target="_blank" rel="noopener noreferrer" style={{ color: "#cb3d81" }}>getbearing.co</a></p>
          <p className="mt-1">Estimates based on industry benchmarks. Actual results may vary.</p>
        </footer>
      </div>

      <style jsx global>{`
        .input-field {
          width: 100%; padding: 10px 14px; border-radius: 8px;
          border: 1px solid #3a2a30; background: #1a1015; color: #fef7f0;
          font-size: 1rem; outline: none; transition: border-color 0.2s;
          font-family: 'Lora', serif;
        }
        .input-field:focus { border-color: #cb3d81; }
        .slider { -webkit-appearance: none; height: 6px; background: #1a1015; border-radius: 3px; outline: none; }
        .slider::-webkit-slider-thumb {
          -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%;
          background: #cb3d81; cursor: pointer; border: 2px solid #e04d93;
          box-shadow: 0 0 8px rgba(203,61,129,0.5);
        }
        @media print {
          body { background: #fff !important; color: #111 !important; }
          .input-field, .slider { display: none; }
          button { display: none !important; }
        }
      `}</style>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-10">
      <div className="flex items-center gap-2.5 mb-4 text-sm font-bold uppercase tracking-widest" style={{ color: "#e8a0c0" }}>
        <div className="w-1 h-5 rounded-sm" style={{ background: "#cb3d81" }} />
        {title}
      </div>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-xs font-medium mb-1.5" style={{ color: "#9a8a80" }}>{children}</label>;
}

function SliderInput({ label, value, min, max, step, prefix, suffix, onChange }: { label: string; value: number; min: number; max: number; step: number; prefix: string; suffix: string; onChange: (v: number) => void }) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-1">
        <span className="text-xs" style={{ color: "#9a8a80" }}>{label}</span>
        <span className="text-sm font-bold text-white">{prefix}{value}{suffix}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(+e.target.value)} className="w-full slider" />
    </div>
  );
}

function CostItem({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex-1">
      <div className="text-lg font-bold" style={{ color }}>{value}</div>
      <div className="text-[10px] uppercase" style={{ color: "#9a8a80" }}>{label}</div>
    </div>
  );
}

function StatCard({ label, color, children }: { label: string; color: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border p-4 text-center" style={{ background: "#251a1f", borderColor: "#3a2a30" }}>
      <div className="text-2xl font-extrabold mb-0.5" style={{ color }}>{children}</div>
      <div className="text-[10px] uppercase tracking-wider" style={{ color: "#9a8a80" }}>{label}</div>
    </div>
  );
}

function CompBar({ label, range, pct, className, isGreen }: { label: string; range: string; pct: number; className: string; isGreen?: boolean }) {
  return (
    <div>
      <div className="flex justify-between text-xs mb-1">
        <span className={isGreen ? "font-bold text-green-400" : ""}>{label}</span>
        <span className={isGreen ? "font-bold text-green-400" : ""} style={isGreen ? {} : { color: "#9a8a80" }}>{range}</span>
      </div>
      <div className="h-7 rounded-md overflow-hidden" style={{ background: "#1a1015" }}>
        <div className={`h-full rounded-md ${className}`} style={{ width: `${pct}%`, transition: "width 0.8s ease" }} />
      </div>
    </div>
  );
}

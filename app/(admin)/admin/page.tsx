"use client";

import { useState } from "react";
import {
  bakePlan as initialBakePlan,
  salesForecast,
  inventoryAlerts,
  reviewQueue as initialReviews,
  contentQueue as initialContent,
  customerInsights,
  wholesaleAccounts as initialWholesale,
  staffSchedule,
} from "@/data/sample-data";

// ── Helper Components ──

function AgentPill({ emoji, name }: { emoji: string; name: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-reba-dark border border-reba-border px-3 py-1 text-xs text-reba-muted">
      <span>{emoji}</span>
      <span>{name}</span>
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    adjusted: "bg-blue-900/40 text-blue-300 border-blue-800/50",
    "on-track": "bg-emerald-900/40 text-emerald-300 border-emerald-800/50",
    reduced: "bg-amber-900/40 text-amber-300 border-amber-800/50",
    critical: "bg-red-900/40 text-red-300 border-red-800/50",
    warning: "bg-amber-900/40 text-amber-300 border-amber-800/50",
    ok: "bg-emerald-900/40 text-emerald-300 border-emerald-800/50",
    confirmed: "bg-emerald-900/40 text-emerald-300 border-emerald-800/50",
    "in-progress": "bg-blue-900/40 text-blue-300 border-blue-800/50",
    overdue: "bg-red-900/40 text-red-300 border-red-800/50",
    locked: "bg-reba-pink/20 text-reba-pink border-reba-pink/30",
  };
  return (
    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs ${styles[status] || "bg-reba-card text-reba-muted border-reba-border"}`}>
      {status}
    </span>
  );
}

function SectionCard({
  title,
  agent,
  children,
}: {
  title: string;
  agent: { emoji: string; name: string };
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-reba-border bg-reba-card p-5">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-reba-cream font-body">{title}</h2>
        <AgentPill emoji={agent.emoji} name={agent.name} />
      </div>
      {children}
    </div>
  );
}

// ── Main Dashboard ──

export default function AdminDashboard() {
  // Bake Plan state
  const [bakeItems, setBakeItems] = useState(
    initialBakePlan.map((b) => ({ ...b, adjustedQty: b.adjustedQty }))
  );
  const [planLocked, setPlanLocked] = useState(false);

  // Review state
  const [reviews, setReviews] = useState(
    initialReviews.map((r) => ({ ...r, approved: false, editing: false, editText: r.aiResponse }))
  );

  // Content state
  const [content, setContent] = useState(
    initialContent.map((c) => ({ ...c, approved: false, skipped: false }))
  );

  // Wholesale state
  const [wholesale, setWholesale] = useState(
    initialWholesale.map((w) => ({ ...w, reminderSent: false }))
  );

  // Customer state
  const [customers, setCustomers] = useState(
    customerInsights.map((c) => ({ ...c, messageSent: false }))
  );

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 17 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="min-h-screen bg-reba-dark">
      {/* Header */}
      <header className="border-b border-reba-border bg-reba-card/50 px-6 py-5">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <div>
            <h1 className="text-2xl text-reba-cream font-heading">{greeting}, Reba</h1>
            <p className="text-sm text-reba-muted mt-0.5">{today}</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-reba-border bg-reba-dark px-3 py-2 text-xs text-reba-muted">
              72&deg;F Sunny &mdash; Salinas
            </div>
          </div>
        </div>
      </header>

      {/* Agent Banner */}
      <div className="border-b border-reba-border bg-reba-card/30 px-6 py-3">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <p className="text-sm text-reba-cream font-body">
            Sweet Reba&apos;s AI Operating System &mdash;{" "}
            <span className="text-reba-pink font-semibold">8 Agents Active</span>
          </p>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="h-2 w-2 rounded-full bg-emerald-400" />
            ))}
          </div>
        </div>
      </div>

      {/* Dashboard Grid */}
      <main className="mx-auto max-w-7xl px-6 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* ── LEFT COLUMN ── */}
          <div className="space-y-6">
            {/* Bake Plan */}
            <SectionCard title="Bake Plan" agent={{ emoji: "\uD83E\uDD50", name: "Bake Optimizer" }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-reba-border text-left text-xs text-reba-muted">
                      <th className="pb-2 pr-3">Item</th>
                      <th className="pb-2 pr-3">Base</th>
                      <th className="pb-2 pr-3">Adjusted</th>
                      <th className="pb-2 pr-3">Reason</th>
                      <th className="pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bakeItems.map((item, i) => (
                      <tr key={item.item} className="border-b border-reba-border/50">
                        <td className="py-2.5 pr-3 text-reba-cream">{item.item}</td>
                        <td className="py-2.5 pr-3 text-reba-muted">{item.baseQty}</td>
                        <td className="py-2.5 pr-3">
                          {planLocked ? (
                            <span className="text-reba-cream">{item.adjustedQty}</span>
                          ) : (
                            <input
                              type="number"
                              value={item.adjustedQty}
                              onChange={(e) => {
                                const next = [...bakeItems];
                                next[i] = { ...next[i], adjustedQty: parseInt(e.target.value) || 0 };
                                setBakeItems(next);
                              }}
                              className="w-16 rounded border border-reba-border bg-reba-dark px-2 py-1 text-reba-cream text-sm outline-none focus:border-reba-pink"
                            />
                          )}
                        </td>
                        <td className="py-2.5 pr-3 text-xs text-reba-muted">{item.reason}</td>
                        <td className="py-2.5">
                          <StatusBadge status={planLocked ? "locked" : item.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={() => setPlanLocked(!planLocked)}
                className={`mt-4 rounded-lg px-4 py-2 text-sm font-medium transition ${
                  planLocked
                    ? "bg-reba-dark border border-reba-border text-reba-muted hover:text-reba-cream"
                    : "bg-reba-pink text-white hover:bg-reba-pink-hover"
                }`}
              >
                {planLocked ? "Unlock Plan" : "Lock Plan"}
              </button>
            </SectionCard>

            {/* Sales Forecast */}
            <SectionCard title="Sales Forecast" agent={{ emoji: "\uD83D\uDCCA", name: "Ops Dashboard" }}>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="rounded-lg bg-reba-dark border border-reba-border p-3 text-center">
                  <p className="text-xs text-reba-muted mb-1">Today (Projected)</p>
                  <p className="text-xl font-semibold text-reba-cream">${salesForecast.todayProjected.toLocaleString()}</p>
                </div>
                <div className="rounded-lg bg-reba-dark border border-reba-border p-3 text-center">
                  <p className="text-xs text-reba-muted mb-1">Yesterday</p>
                  <p className="text-xl font-semibold text-reba-cream">${salesForecast.yesterdayActual.toLocaleString()}</p>
                </div>
                <div className="rounded-lg bg-reba-dark border border-reba-border p-3 text-center">
                  <p className="text-xs text-reba-muted mb-1">WoW Change</p>
                  <p className="text-xl font-semibold text-emerald-400">+{salesForecast.weekOverWeek}%</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <p className="text-reba-muted">
                  Top Seller: <span className="text-reba-cream">{salesForecast.topSeller}</span>
                </p>
                <p className="text-reba-muted">
                  Pre-orders: <span className="text-reba-pink font-semibold">{salesForecast.preOrders}</span>
                </p>
              </div>
            </SectionCard>

            {/* Inventory Alerts */}
            <SectionCard title="Inventory Alerts" agent={{ emoji: "\uD83D\uDCCA", name: "Ops Dashboard" }}>
              <div className="space-y-2">
                {inventoryAlerts.map((alert) => (
                  <div
                    key={alert.item}
                    className={`flex items-center justify-between rounded-lg border p-3 ${
                      alert.level === "critical"
                        ? "border-red-800/50 bg-red-900/20"
                        : alert.level === "warning"
                        ? "border-amber-800/50 bg-amber-900/20"
                        : "border-emerald-800/50 bg-emerald-900/20"
                    }`}
                  >
                    <div>
                      <p className="text-sm text-reba-cream">{alert.item}</p>
                      <p className="text-xs text-reba-muted">
                        {alert.daysRemaining} days remaining — {alert.action}
                      </p>
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      alert.level === "critical" ? "bg-red-900/50 text-red-400"
                        : alert.level === "warning" ? "bg-amber-900/50 text-amber-400"
                        : "bg-emerald-900/50 text-emerald-400"
                    }`}>{alert.level}</span>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div className="space-y-6">
            {/* Review Queue */}
            <SectionCard title="Review Queue" agent={{ emoji: "\u2B50", name: "Review Responder" }}>
              <div className="space-y-4">
                {reviews.map((review, i) => (
                  <div key={review.id} className="rounded-lg border border-reba-border bg-reba-dark p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-reba-cream">{review.author}</span>
                        <span className="text-xs text-reba-muted">{review.platform}</span>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <span key={s} className={s < review.rating ? "text-amber-400" : "text-reba-border"}>
                            &#9733;
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-reba-soft mb-3 italic">&ldquo;{review.text}&rdquo;</p>

                    <div className="rounded-lg bg-reba-card border border-reba-border p-3 mb-3">
                      <p className="text-xs text-reba-muted mb-1">AI Draft Response:</p>
                      {review.editing ? (
                        <textarea
                          value={review.editText}
                          onChange={(e) => {
                            const next = [...reviews];
                            next[i] = { ...next[i], editText: e.target.value };
                            setReviews(next);
                          }}
                          className="w-full rounded border border-reba-border bg-reba-dark p-2 text-sm text-reba-cream outline-none focus:border-reba-pink resize-none"
                          rows={4}
                        />
                      ) : (
                        <p className="text-sm text-reba-cream">{review.editText}</p>
                      )}
                    </div>

                    {review.approved ? (
                      <span className="text-xs text-emerald-400">Approved and posted</span>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const next = [...reviews];
                            next[i] = { ...next[i], approved: true, editing: false };
                            setReviews(next);
                          }}
                          className="rounded-lg bg-reba-pink px-3 py-1.5 text-xs font-medium text-white hover:bg-reba-pink-hover transition"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => {
                            const next = [...reviews];
                            if (review.editing) {
                              next[i] = { ...next[i], editing: false, aiResponse: review.editText };
                            } else {
                              next[i] = { ...next[i], editing: true };
                            }
                            setReviews(next);
                          }}
                          className="rounded-lg border border-reba-border px-3 py-1.5 text-xs text-reba-muted hover:text-reba-cream transition"
                        >
                          {review.editing ? "Save" : "Edit"}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Content Queue */}
            <SectionCard title="Content Queue" agent={{ emoji: "\uD83D\uDCDD", name: "Content Engine" }}>
              <div className="space-y-4">
                {content.map((post, i) => (
                  <div key={post.id} className="rounded-lg border border-reba-border bg-reba-dark p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            post.platform === "instagram"
                              ? "bg-purple-900/40 text-purple-300 border border-purple-800/50"
                              : post.platform === "facebook"
                              ? "bg-blue-900/40 text-blue-300 border border-blue-800/50"
                              : "bg-reba-pink/20 text-reba-pink border border-reba-pink/30"
                          }`}
                        >
                          {post.platform}
                        </span>
                        <span className="text-sm font-medium text-reba-cream">{post.caption}</span>
                      </div>
                      <span className="text-xs text-reba-muted">{post.scheduledFor}</span>
                    </div>
                    <p className="text-sm text-reba-soft mb-3 whitespace-pre-line line-clamp-4">
                      {post.caption}
                    </p>

                    {post.approved ? (
                      <span className="text-xs text-emerald-400">Approved &amp; Scheduled</span>
                    ) : post.skipped ? (
                      <span className="text-xs text-reba-muted">Skipped</span>
                    ) : (
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            const next = [...content];
                            next[i] = { ...next[i], approved: true };
                            setContent(next);
                          }}
                          className="rounded-lg bg-reba-pink px-3 py-1.5 text-xs font-medium text-white hover:bg-reba-pink-hover transition"
                        >
                          Approve &amp; Schedule
                        </button>
                        <button
                          onClick={() => {
                            const next = [...content];
                            next[i] = { ...next[i], skipped: true };
                            setContent(next);
                          }}
                          className="rounded-lg border border-reba-border px-3 py-1.5 text-xs text-reba-muted hover:text-reba-cream transition"
                        >
                          Skip
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Customer Insights */}
            <SectionCard title="Customer Insights" agent={{ emoji: "\uD83E\uDDE0", name: "Customer Memory" }}>
              <div className="space-y-3">
                {customers.map((customer, i) => (
                  <div key={customer.id} className="rounded-lg border border-reba-border bg-reba-dark p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-reba-pink/20 text-reba-pink text-sm font-semibold">
                        {customer.initials}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-reba-cream">{customer.name}</span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs ${
                              customer.frequency === "daily"
                                ? "bg-emerald-900/40 text-emerald-300 border border-emerald-800/50"
                                : customer.frequency === "weekly"
                                ? "bg-blue-900/40 text-blue-300 border border-blue-800/50"
                                : "bg-amber-900/40 text-amber-300 border border-amber-800/50"
                            }`}
                          >
                            {customer.frequency}
                          </span>
                        </div>
                        <p className="text-xs text-reba-muted mb-1">
                          Favorites: {customer.favorites.join(", ")} &mdash; Last visit: {customer.lastVisit}
                        </p>
                        <p className="text-xs text-reba-soft italic">{customer.notes}</p>
                        <div className="mt-2">
                          {customer.messageSent ? (
                            <span className="text-xs text-emerald-400">Message sent</span>
                          ) : (
                            <button
                              onClick={() => {
                                const next = [...customers];
                                next[i] = { ...next[i], messageSent: true };
                                setCustomers(next);
                              }}
                              className="rounded-lg border border-reba-border px-3 py-1 text-xs text-reba-muted hover:text-reba-cream hover:border-reba-pink transition"
                            >
                              Send a personal note
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Wholesale Accounts */}
            <SectionCard title="Wholesale Accounts" agent={{ emoji: "\uD83D\uDE9A", name: "Wholesale Agent" }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-reba-border text-left text-xs text-reba-muted">
                      <th className="pb-2 pr-3">Business</th>
                      <th className="pb-2 pr-3">Order</th>
                      <th className="pb-2 pr-3">Delivery</th>
                      <th className="pb-2 pr-3">Status</th>
                      <th className="pb-2">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {wholesale.map((account, i) => (
                      <tr key={account.business} className="border-b border-reba-border/50">
                        <td className="py-2.5 pr-3 text-reba-cream">{account.business}</td>
                        <td className="py-2.5 pr-3 text-xs text-reba-muted">{account.order}</td>
                        <td className="py-2.5 pr-3 text-xs text-reba-muted">{account.nextDelivery}</td>
                        <td className="py-2.5 pr-3">
                          <StatusBadge status={account.status} />
                        </td>
                        <td className="py-2.5">
                          {account.status === "overdue" && (
                            <>
                              {account.reminderSent ? (
                                <span className="text-xs text-emerald-400">Sent</span>
                              ) : (
                                <button
                                  onClick={() => {
                                    const next = [...wholesale];
                                    next[i] = { ...next[i], reminderSent: true };
                                    setWholesale(next);
                                  }}
                                  className="rounded-lg bg-red-900/40 border border-red-800/50 px-2.5 py-1 text-xs text-red-300 hover:bg-red-900/60 transition"
                                >
                                  Send Reminder
                                </button>
                              )}
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </SectionCard>

            {/* Staff Schedule */}
            <SectionCard title="Staff Schedule" agent={{ emoji: "\uD83D\uDCCA", name: "Ops Dashboard" }}>
              <div className="space-y-2">
                {staffSchedule.map((person) => (
                  <div
                    key={person.name}
                    className="flex items-center justify-between rounded-lg border border-reba-border bg-reba-dark px-4 py-2.5"
                  >
                    <div>
                      <p className="text-sm text-reba-cream">{person.name}</p>
                      <p className="text-xs text-reba-muted">{person.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-reba-soft">{person.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      </main>
    </div>
  );
}

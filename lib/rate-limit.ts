/**
 * In-memory rate limiter for API routes.
 *
 * Direct port of the bearing repo pattern (src/lib/rate-limit.ts). Kept
 * in-memory so both surfaces share the same mental model. LIMITATION: this
 * store resets on Vercel cold starts and is not shared across serverless
 * instances. Per-instance protection only.
 *
 * Phase 2 — migrate both this and bearing's copy to @upstash/ratelimit +
 * @upstash/redis for distributed rate-limiting that survives cold starts.
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now > entry.resetAt) {
      store.delete(key);
    }
  }
}, 60_000);

export function checkRateLimit(
  key: string,
  { maxRequests = 10, windowMs = 60_000 } = {},
): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, resetIn: windowMs };
  }

  if (entry.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: entry.resetAt - now,
    };
  }

  entry.count++;
  return {
    allowed: true,
    remaining: maxRequests - entry.count,
    resetIn: entry.resetAt - now,
  };
}

export function getClientIp(request: Request): string {
  return (
    request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

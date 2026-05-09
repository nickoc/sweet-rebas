#!/usr/bin/env bun
/**
 * Cross-device visual QA — captures screenshots at every viewport in the
 * test matrix (docs/device-test-matrix.md) for every route, against either
 * a local dev server or a remote (Vercel preview) URL.
 *
 * Usage:
 *   bun run scripts/qa-screenshots.ts                       # local http://localhost:3001
 *   QA_BASE_URL=https://...vercel.app bun run qa:screenshots # CI / Vercel preview
 *
 * Outputs: ./test-results/qa/<viewport-slug>/<route-slug>.png
 *
 * Failure modes captured:
 *   - Page returns non-2xx → recorded in qa-report.json, exit 1
 *   - Console error → recorded in qa-report.json, exit 1 only if --strict
 *   - Render timeout → exit 1
 */
import { chromium, devices, type Page } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

type Viewport = {
  slug: string;
  label: string;
  width: number;
  height: number;
  isMobile: boolean;
  hasTouch: boolean;
  /** Use a Playwright device descriptor when available — covers UA + DPR + touch model. */
  deviceDescriptor?: keyof typeof devices;
};

// Matrix mirrors docs/device-test-matrix.md exactly. Update both together.
const VIEWPORTS: Viewport[] = [
  {
    slug: "iphone-17-pro-max",
    label: "iPhone 17 Pro Max — Reba",
    width: 430,
    height: 932,
    isMobile: true,
    hasTouch: true,
  },
  {
    slug: "iphone-13",
    label: "iPhone 13 — Mike",
    width: 390,
    height: 844,
    isMobile: true,
    hasTouch: true,
    deviceDescriptor: "iPhone 13",
  },
  {
    slug: "iphone-xr",
    label: "iPhone XR — Nick",
    width: 414,
    height: 896,
    isMobile: true,
    hasTouch: true,
    deviceDescriptor: "iPhone XR",
  },
  {
    slug: "iphone-se",
    label: "iPhone SE 2/3",
    width: 375,
    height: 667,
    isMobile: true,
    hasTouch: true,
    deviceDescriptor: "iPhone SE (3rd gen)",
  },
  {
    slug: "pixel-7",
    label: "Pixel 7 (Android)",
    width: 412,
    height: 915,
    isMobile: true,
    hasTouch: true,
    deviceDescriptor: "Pixel 7",
  },
  {
    slug: "ipad-mini-portrait",
    label: "iPad mini portrait",
    width: 744,
    height: 1133,
    isMobile: true,
    hasTouch: true,
  },
  {
    slug: "ipad-mini-landscape",
    label: "iPad mini landscape",
    width: 1133,
    height: 744,
    isMobile: true,
    hasTouch: true,
  },
  {
    slug: "desktop",
    label: "Desktop laptop 1280×800",
    width: 1280,
    height: 800,
    isMobile: false,
    hasTouch: false,
  },
  {
    slug: "wide-desktop",
    label: "Wide desktop 1920×1080",
    width: 1920,
    height: 1080,
    isMobile: false,
    hasTouch: false,
  },
];

const ROUTES = [
  "/",
  "/menu",
  "/cakes",
  "/cakes/signature",
  "/wedding-cakes",
  "/about",
  "/contact",
  "/catering",
  "/chalkboard",
  "/box-builder",
  "/quiz",
  "/dream-cake",
];

const BASE_URL = process.env.QA_BASE_URL ?? "http://localhost:3001";
const OUT_DIR = join(process.cwd(), "test-results", "qa");
const STRICT = process.argv.includes("--strict");

type RouteResult = {
  route: string;
  viewport: string;
  path: string;
  status: number;
  consoleErrors: string[];
  ok: boolean;
};

function slugify(route: string): string {
  return route === "/" ? "home" : route.replace(/^\//, "").replace(/\//g, "_");
}

async function shootRoute(
  page: Page,
  viewport: Viewport,
  route: string,
): Promise<RouteResult> {
  const consoleErrors: string[] = [];
  const consoleListener = (msg: import("playwright").ConsoleMessage) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  };
  page.on("console", consoleListener);

  const dir = join(OUT_DIR, viewport.slug);
  await mkdir(dir, { recursive: true });
  const filePath = join(dir, `${slugify(route)}.png`);

  // Retry once on transient navigation failure (HTTP 0 from cold-start, network blips).
  // Real 4xx/5xx don't get retried — those are real bugs and should surface.
  const MAX_ATTEMPTS = 2;
  let status = 0;
  let ok = false;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const resp = await page.goto(`${BASE_URL}${route}`, {
        waitUntil: "networkidle",
        timeout: 30_000,
      });
      status = resp?.status() ?? 0;
      await page.waitForTimeout(500);
      await page.screenshot({ path: filePath, fullPage: true });
      ok = status >= 200 && status < 400;
      // If we got any HTTP response (even 5xx) don't retry — that's a real signal.
      if (status > 0) break;
    } catch (err) {
      consoleErrors.push(
        `navigation error (attempt ${attempt}/${MAX_ATTEMPTS}): ${(err as Error).message}`,
      );
      ok = false;
      if (attempt < MAX_ATTEMPTS) await page.waitForTimeout(1000);
    }
  }
  page.off("console", consoleListener);

  return {
    route,
    viewport: viewport.slug,
    path: filePath,
    status,
    consoleErrors,
    ok,
  };
}

async function main() {
  console.log(`[qa] base URL: ${BASE_URL}`);
  console.log(`[qa] viewports: ${VIEWPORTS.length}, routes: ${ROUTES.length}`);
  console.log(`[qa] total shots: ${VIEWPORTS.length * ROUTES.length}`);
  console.log(`[qa] output: ${OUT_DIR}`);

  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const results: RouteResult[] = [];

  try {
    for (const viewport of VIEWPORTS) {
      const deviceContext = viewport.deviceDescriptor
        ? devices[viewport.deviceDescriptor]
        : undefined;
      const context = await browser.newContext({
        ...deviceContext,
        viewport: { width: viewport.width, height: viewport.height },
        deviceScaleFactor: deviceContext?.deviceScaleFactor ?? 2,
        isMobile: viewport.isMobile,
        hasTouch: viewport.hasTouch,
      });
      const page = await context.newPage();

      for (const route of ROUTES) {
        const result = await shootRoute(page, viewport, route);
        results.push(result);
        const flag = result.ok ? "✓" : "✗";
        console.log(
          `[qa] ${flag} ${viewport.slug.padEnd(22)} ${route.padEnd(22)} HTTP ${result.status}${result.consoleErrors.length ? ` · ${result.consoleErrors.length} console errors` : ""}`,
        );
      }
      await context.close();
    }
  } finally {
    await browser.close();
  }

  const reportPath = join(OUT_DIR, "qa-report.json");
  await writeFile(reportPath, JSON.stringify(results, null, 2));

  const failed = results.filter((r) => !r.ok);
  const errored = results.filter(
    (r) => r.consoleErrors.length > 0 && (STRICT || !r.ok),
  );

  console.log(`\n[qa] summary: ${results.length - failed.length}/${results.length} passed`);
  if (failed.length) {
    console.log(`[qa] failed:`);
    for (const r of failed) {
      console.log(`  ${r.viewport} ${r.route} HTTP ${r.status}`);
    }
  }
  if (STRICT && errored.length) {
    console.log(`[qa] strict mode: ${errored.length} routes had console errors`);
  }

  process.exit(failed.length || (STRICT && errored.length) ? 1 : 0);
}

main().catch((err) => {
  console.error("[qa] fatal:", err);
  process.exit(1);
});

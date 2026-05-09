# Device Test Matrix

> "World-class on any device" — the minimum requirement going forward.
>
> **No PR may merge without passing this matrix.** Visual diffs against this matrix run automatically on every Vercel preview deploy via the Playwright workflow at `.github/workflows/visual-qa.yml` — see [Playwright QA setup](#playwright-qa-setup) below.

## Why this exists

Three real-world reports of cross-device divergence (Mike on iPhone 13, Nick on iPhone XR, Reba on iPhone 17 Pro Max — viewport range 390-430 logical pixels) revealed that the site lacked a deliberate cross-device strategy. This matrix is the structural fix: every PR's preview deploy gets screenshotted at every viewport in P0, the diffs vs. main are surfaced as a PR check, and the merge button is gated on a pass.

## Viewports under test

| # | Device | Viewport (logical px) | DPR | Audience | Priority |
|---|--------|------------------------|-----|----------|----------|
| 1 | iPhone 17 Pro Max — Reba's device | 430 × 932 | 3 | Owner; current Apple flagship | **P0 must-pass** |
| 2 | iPhone 13 — Mike's device | 390 × 844 | 3 | Real customer; common iPhone size | **P0 must-pass** |
| 3 | iPhone XR — Nick's device | 414 × 896 | 2 | Older notch iPhone, still in active use | **P0 must-pass** |
| 4 | iPhone SE 2/3 | 375 × 667 | 2 | Smallest common modern iPhone — Reba's older customers | **P0 must-pass** |
| 5 | Pixel 7 (Android baseline) | 412 × 915 | 2.625 | Android coverage | P1 |
| 6 | iPad mini portrait | 744 × 1133 | 2 | Wholesale buyers, catering inquiries | P1 |
| 7 | iPad mini landscape | 1133 × 744 | 2 | Tablet horizontal | P1 |
| 8 | Desktop laptop | 1280 × 800 | 1 | Press, partners, Vercel preview default | P1 |
| 9 | Wide desktop | 1920 × 1080 | 1 | Stretch test — large monitors | P2 |

**P0 viewports gate the PR.** P1/P2 viewports are captured for review but don't block merge unless the diff is severe.

## Routes under test

Each viewport above runs against this route list:

| Route | What to verify |
|-------|----------------|
| `/` | Hero loads ≤2.5s LCP, no horizontal scroll, feature cards readable, locations CTA visible |
| `/menu` | Hero, "Choose Size & Order" CTA renders pink (not gray), category sections scroll |
| `/cakes` | Hero with gradient, carousels animate, callback CTA visible |
| `/cakes/signature` | Cake grid 1-col mobile / 3-col tablet+, zoom modal opens |
| `/wedding-cakes` | Hero with gradient, carousel, callback form |
| `/about` | Hero, all 5 story cards render, Reba/Michael portraits circular |
| `/contact` | Form inputs DO NOT trigger iOS zoom on focus |
| `/catering` | Hero, inquiry form inputs DO NOT trigger iOS zoom |
| `/chalkboard` | Today's specials grid, no fallback art if image_url present |
| `/box-builder` | Category tabs scrollable on mobile, product cards 1-col mobile / 2-col tablet+ |
| `/quiz` | 4 option buttons each ≥48px tall, easy to tap |
| `/dream-cake` | Chat input ≥48px, 16px font |

## Smoke checks per route

- **No horizontal scroll** at any viewport. Body width = viewport width.
- **All hero overlays render** above the fold (no empty face-only heroes — this is the Designer #6 anti-pattern that P1's `<Hero>` enables fixing per page when copy is added).
- **All interactive elements ≥48×48 CSS px** — Apple HIG 44pt + Material 48dp + WCAG 2.5.5 AAA. The `<Button>`, `<Input>`, and AddToCartButton primitives all bake this in; this check exists to catch any inline `<button>` that slipped past the primitive layer.
- **All `<input>` and `<textarea>` elements at `font-size: 16px`+** — iOS Safari auto-zooms anything smaller. The `<Input>` primitive enforces this; the check catches drift.
- **Header sticky on scroll**, top-aligned, doesn't cover content unless intended.
- **Sticky CartSummary doesn't cover ChatWidget FAB** at any viewport (the z-index fix from P1 — `--z-cart:40` < `--z-chat:50`).
- **Hero containers use `min-h-[Ndvh]` not `100vh`** — iOS Safari dynamic toolbar would otherwise clip the bottom. The `<Hero>` primitive bakes this in.
- **Text doesn't break out of containers** — fluid `clamp()` titles via `<HeroTitle>` scale 320 → 1920 without overflow.

## Manual real-device pass

Before any major release, test these ON THE REAL DEVICE — emulators don't catch:

- **iPhone 13 (Mike's)** — soft-launch any P-tier ship to him before main merge.
- **iPhone XR (Nick's)** — local dev, every change.
- **iPhone 17 Pro Max (Reba's)** — quarterly walkthrough with Reba.

Reba's customers are heavily biased toward older iPhones in the SE 2/3 → 13 range. The default iOS text-size setting may be increased ("Larger Text" accessibility) — verify hero heroes don't break with `Settings → Display & Brightness → Text Size` at maximum.

## Playwright QA setup

The structural enforcement is at `.github/workflows/visual-qa.yml` and `scripts/qa-screenshots.ts`:

- Triggers on every Vercel preview `deployment_status: success`.
- Loops the matrix: 9 viewports × all routes → ~108 screenshots per PR.
- Diff against `main` baseline; threshold ≤ 0.1% pixel diff per route per viewport.
- Failure surfaces as a `Visual QA / mobile` GitHub check next to the Vercel preview link.
- Baselines updated by re-running with `Approve baseline` on merge.

To run locally before pushing:

```bash
bun run qa:screenshots
# Outputs to ./test-results/qa/<viewport>/<route>.png
```

To approve a new baseline (e.g., after a deliberate visual change):

```bash
bun run qa:approve
# Promotes ./test-results/qa/* to ./test-results/qa-baseline/*
git add test-results/qa-baseline/
git commit -m "qa: approve visual baseline after <change>"
```

## Updating this matrix

The matrix is a living document. Update when:

- A new device meaningfully changes the audience (a customer reports an issue, a new iPhone size ships).
- A route is added that needs verification.
- A breakpoint changes that the matrix should test.

Edit this file and the corresponding viewport entries in `scripts/qa-screenshots.ts` together — they MUST agree.

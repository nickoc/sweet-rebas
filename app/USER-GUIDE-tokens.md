# Color Tokens — Semantic Intent

> If you are an AI agent or a future contributor adding pages or components: read this first.

The Tailwind v4 `@theme` block in `app/globals.css` defines the project's color tokens. As of `feat/responsive-foundations` (May 2026), tokens are named after their **semantic role**, not the color they happened to render on a since-inverted theme.

## Token map

| Token | Hex | Semantic role | Used for |
|-------|-----|---------------|----------|
| `--color-reba-bg` | `#ffffff` | Page / surface background | `<body>`, full-bleed sections |
| `--color-reba-card` | `#fff5f5` | Card / elevated-surface tint | Card backgrounds, hover-zone shading |
| `--color-reba-ink` | `#2d1810` | Primary text on light backgrounds | Headings, body copy, input text |
| `--color-reba-soft` | `#5c3d2e` | Secondary text | Long-form prose body |
| `--color-reba-muted` | `#8b6b5a` | Tertiary / metadata text | Labels, captions, "(831)…" tag lines |
| `--color-reba-border` | `#e0dcd7` | Hairline borders | `<input>` borders, card outlines, dividers |
| `--color-reba-pink` | `#cb3d81` | Brand accent | All CTAs, links on hover, brand emphasis |
| `--color-reba-pink-hover` | `#b5336f` | Brand accent — hover | `:hover` on pink CTAs |
| `--color-reba-warm` | `#f5e6d8` | Warm accent | Decorative warm-tone backgrounds |

## Conventions

1. **Never invert again.** If the brand visual direction changes, change the **hex value** of the token, not its **name**. The token name describes its job; the hex describes its current visual treatment.
2. **CTAs are always `bg-reba-pink`** unless they are explicitly secondary (then `border` + transparent `bg`).
3. **Inputs/textareas use `text-reba-ink`** + `border-reba-border`. Always `text-base` (16px) minimum or iOS Safari will auto-zoom on focus.
4. **Don't introduce new color tokens without updating this file.** Drift is the single biggest threat to the design system's integrity.
5. **All tokens are exposed as both Tailwind utilities (`bg-reba-bg`, `text-reba-ink`) and CSS vars (`var(--color-reba-bg)`).** Prefer Tailwind utilities in component code; use CSS vars only inside `globals.css`.

## Migration history

- **2026-05-08:** Renamed `reba-dark` → `reba-bg` and `reba-cream` → `reba-ink` after a theme inversion left the original names semantically misleading. 189 call sites codemodded.

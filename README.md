# 0x000B10G

A minimal personal site. One page, one test page, no blog engine.

Built with [Astro](https://astro.build) as a static site: no client-side framework,
no CSS framework, no CDN, no tracking. Fonts are self-hosted in `public/fonts/`.

## Design language

Derived from [getartcraft.com](https://getartcraft.com), reduced to the essentials:

- **Surfaces** — warm off-white `#f2f1ee`, ink `#101014`, one inverted pair
- **Rules** — 1px hairlines only. No radius, no shadows, no gradients anywhere
- **Frame** — a centered 1040px column with hairline walls and crosshair ticks
- **Type** — Archivo at tight tracking for display, Instrument Serif italic for the
  subtitle, JetBrains Mono uppercase for HUD labels (`0.6875rem` / `.15em`)
- **Chrome** — `01 / SECTION` eyebrow strips, sticky nav, invert-on-hover cells

All tokens live at the top of `src/styles/global.css`. Change `--bg`, `--ink`,
`--line`, `--invert-*` and the whole site follows, light and dark.

## Commands

```bash
npm install     # once
npm run dev     # local dev server
npm run build   # static output to dist/
npm run preview # serve the built output
```

## Structure

```
src/
  layouts/Base.astro     nav, eyebrow, footer, theme bootstrap
  pages/index.astro      the homepage
  pages/test.astro       design verification page
  styles/global.css      design tokens + every primitive
  styles/test.css        test-page-only layout
public/
  fonts/                 self-hosted woff2 (Archivo, Instrument Serif, JetBrains Mono)
  favicon.svg
.github/workflows/
  deploy.yml             build + deploy to GitHub Pages on push to main
```

## Theme

The theme resolves before first paint from `localStorage`, falling back to
`prefers-color-scheme`. The nav toggle writes the choice and sets `data-theme`
on `<html>`; every color is a CSS variable scoped to that attribute.

## Notes

- `/test` runs live assertions in the browser: no rounded corners, no horizontal
  overflow, fonts actually loaded, theme resolved. It reports `ok` or `fail` per row.
- Reduced-motion is respected: the entrance animation and transitions collapse.
- Deploys to <https://xnye.github.io> from `main` via GitHub Actions.

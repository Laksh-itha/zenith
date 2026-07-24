# ZenithAI — Premium AI Startup Landing Page

A production-quality, fully responsive landing page built with Next.js 15 (App Router),
TypeScript, Tailwind CSS, and Framer Motion. Inspired by the brief for "Zenith India"
but designed from scratch with an original visual identity — not a clone.

## Tech Stack

- **Next.js 15** (App Router, React 19)
- **TypeScript**
- **Tailwind CSS** (custom design tokens for color, radius, shadows, animation)
- **Framer Motion** (scroll reveals, hover states, the animated hero illustration)
- **Lucide React** (icon set)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

To build for production:

```bash
npm run build
npm run start
```

> Note: `npm run build` fetches font files from Google Fonts at build time via
> `next/font/google`. This requires normal internet access — if you're building in a
> network-restricted sandbox, temporarily swap the font imports in `app/layout.tsx`
> for system fonts.

## Project Structure

```
app/
  layout.tsx        Root layout — fonts, metadata, theme script, structured data
  page.tsx           Assembles all sections
  globals.css        Tailwind layers, design utilities, custom cursor CSS
  robots.ts          robots.txt generation
  sitemap.ts         sitemap.xml generation
  icon.svg           Favicon

components/
  sections/          One component per page section (Navbar, Hero, Products, Contact, ...)
  ui/                Reusable primitives (Button, SectionHeading, ProductCard, TiltCard,
                      CustomCursor, DecorativeBackground, SplashScreen, BackToTop, Spotlight, ...)

hooks/
  useCountUp.ts       Animated number counters for the stats section
  useTheme.tsx        Dark mode context + toggle, no-flash on load
  useActiveSection.ts Scrollspy for navbar active-link highlighting
  useMousePosition.ts Pointer tracking for cursor/spotlight effects

lib/
  data.ts             All copy/content lives here — edit this file to change text
  utils.ts            `cn()` class-merging helper
```

## Design Notes

- **Palette**: Dark Navy `#0F172A`, Indigo `#4F46E5`, Cyan `#06B6D4`, Emerald for
  success states, white/near-white backgrounds — all defined as Tailwind tokens in
  `tailwind.config.ts`.
- **Typography**: Manrope for display/headings, Inter for body copy, JetBrains Mono
  for data-flavored details (stat chips, timeline step numbers).
- **Signature element**: the hero illustration is an original animated "neural
  constellation" (`components/sections/NeuralIllustration.tsx`) built in SVG +
  Framer Motion — nodes representing individual products, connected to a central
  core, with data packets animating along the edges. Not a stock asset.
- **Dark mode**: class-based (`darkMode: "class"` in Tailwind config), toggled via
  the navbar and persisted to `localStorage`. An inline script in `<head>` applies
  the stored theme before hydration to avoid a flash of the wrong theme.
- **Global background**: `DecorativeBackground` renders a fixed, low-opacity layer
  (grid + drifting aurora blobs + SVG noise) behind every section, tying the page
  together without repeating effects per-section.
- **Custom cursor**: `CustomCursor` replaces the native pointer with a dot + trailing
  ring on desktop (`pointer: fine` devices only — mobile is untouched). It expands
  over anything matching `a, button, [data-cursor-hover]`.
- **Motion touches**: magnetic + ripple buttons (`Button.tsx`), 3D tilt cards with a
  cursor-follow glow (`TiltCard.tsx`), a mouse-follow spotlight in the hero
  (`Spotlight.tsx`), a scroll-linked progress line in "How It Works", and a branded
  splash screen on first load (`SplashScreen.tsx`).

## Honest Metrics

The stats and testimonial numbers were deliberately kept modest and defensible
(e.g. "6+ AI Products", "5 Industries Served") rather than inflated vanity metrics —
easy to swap for real numbers in `lib/data.ts` once you have them.

## Editing Content

Nearly all copy — product cards, features, FAQ, testimonials, nav links, footer
links, contact email — lives in `lib/data.ts`. Update that file rather than hunting
through components. The FAQ section supports live search out of the box; add more
entries to the `faqs` array and search will pick them up automatically.

## Accessibility & Performance

- Semantic HTML landmarks (`header`, `main`, `section`, `footer`) plus a
  skip-to-content link
- Visible focus rings on all interactive elements
- `prefers-reduced-motion` respected globally
- Images served through `next/image` with lazy loading
- All animated components use IntersectionObserver-based triggers
  (`whileInView`) so nothing animates off-screen
- Contact form has inline validation, `aria-invalid`/`aria-describedby` wiring,
  and a loading + success state
- JSON-LD structured data (Organization schema) in `app/layout.tsx`

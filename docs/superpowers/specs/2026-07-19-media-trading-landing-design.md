# Media Trading Platform — Landing Page Design

## Purpose

A single marketing landing page for a media/programmatic-ad trading platform. The
design goal (per client brief) is to disguise complex supply-side infrastructure
behind a dreamlike, editorial hero visual — a purple twilight meadow with a
glowing iridescent hummingbird — so the product feels like "precision and
poetry in the same product," with programmatic trading features and publisher
tools taking a back seat to atmosphere and wonder in the initial impression.

## Stack

- React 18 + Vite + TypeScript
- Tailwind CSS for layout/typography/utility styling
- `@react-three/fiber` + `@react-three/drei` for the 3D hero scene
- Framer Motion for scroll-progress-driven UI motion (nav fade, CTA entrance,
  "scroll down" cue)
- Static build output — deployable to Vercel/Netlify without a server

## Project structure

```
media-trading-platform/
  src/
    scenes/hero/          # Three.js scene: terrain, hummingbird, flowers, lighting
    components/nav/
    components/cta/
    components/sections/  # features, trust strip, how-it-works, footer
    assets/models/        # sourced hummingbird GLTF + LICENSE.txt
    assets/shaders/        # custom GLSL for iridescence/glow
  docs/superpowers/specs/  # this file and future specs
  public/
```

## Hero section

**Terrain.** A twilight meadow built from noise-displaced (Perlin/simplex),
high-subdivision plane geometry — smooth and organic, not faceted. Oversized
lavender wildflower silhouettes and smooth blob-like dark mossy boulders
recede toward a deep violet horizon with distance fog. No external terrain
assets needed; this is fully procedural.

**Hummingbird.** Sourced as a CC0- or CC-BY-licensed GLTF model (real
anatomical silhouette, not procedurally built) positioned dead center, wings
mid-beat via bone rotation or morph-target animation. A custom material layer
— either `MeshPhysicalMaterial` with iridescence properties or a hand-written
`ShaderMaterial` (fresnel term driving hue shift + emissive glow) — makes it
read as internally lit rather than reflecting external light. This is the one
part of the scene using a third-party asset; see **Asset licensing** below.

**Flowers.** Giant white abstract flower forms in the right foreground, built
from lathe/extrude geometry (organic, not angular), using
`MeshPhysicalMaterial` with roughness-map control and clearcoat for a glossy,
almost-liquid surface.

**Palette.** Unified purple / mauve / midnight-blue across terrain, sky,
flowers, and UI chrome — no element breaks the tonal world.

**Motion.** Scroll-driven parallax: the hummingbird rises and the flowers sway
at different rates as the user scrolls, eased (no linear 1:1 scroll-jacking)
so it doesn't induce motion sickness or feel janky. Implemented via scroll
progress (Framer Motion `useScroll`) mapped to group transforms in the R3F
scene, not a full scroll-jack library.

**Nav.** Frosted-glass strip (`backdrop-filter: blur`) floating over the
canvas, pill-shaped dropdowns, logo left, dual CTAs right — one filled/glowing
primary, one ghost-outlined secondary. Equal visual weight, no aggressive
hierarchy between the two CTAs.

**Typography.** Headline in a warm cream-white serif (Fraunces or Source
Serif) for an editorial, trustworthy feel against the saturated scene; body/UI
text in a neutral grotesk (Inter).

**Discovery cue.** "Scroll down and discover ↓" in the lower right, fades in
after initial load (not present at first paint, so it doesn't compete with the
hero's first impression).

## Below the hero

Placeholder copy throughout — professional in tone, no invented stats,
testimonials, or client names, clearly swappable later:

1. **Trust strip** — "Trusted by leading publishers" + placeholder logo marks.
2. **Features grid** — 3–4 cards: programmatic trading, publisher tools,
   real-time analytics, transparent pricing.
3. **How it works** — 3-step editorial layout: connect inventory → trade
   programmatically → track performance.
4. **Footer** — link columns + legal, visually quiet (dark, low-contrast) so
   it doesn't compete with the hero. Hummingbird model attribution (if
   CC-BY) lives here as a small credit line.

## Asset licensing (hummingbird model)

Requirement: CC0 preferred; CC-BY acceptable only if attribution can be a
small footer credit (no large/obtrusive attribution requirement) and the
license explicitly permits commercial use. The license is checked **before**
a model is chosen, not after.

Search order: Poly Haven, Sketchfab (filtered to downloadable + CC0/CC-BY,
commercial-use confirmed), Poly Pizza. The chosen model's license text and
source URL are recorded in `src/assets/models/LICENSE.txt`.

**Fallback:** if no model meets the license bar, the hummingbird is built as
an enhanced procedural mesh (smooth organic geometry, no facets) with the same
custom shader applied. This is a visible quality trade-off (silhouette will
read as stylized rather than anatomically photoreal), and will be flagged
explicitly if it happens rather than silently substituted.

## Repo & delivery

- Local path: `~/projects/media-trading-platform`, already `git init`'d
  (branch `main`).
- GitHub: new **public** repo `media-trading-platform` under the
  `saichetankari2001` account (already authenticated via `gh`), pushed after
  the initial scaffold is in place.
- Deployment target: static build, Vercel/Netlify-compatible (no server-side
  code).

## Verification plan

- `npm run build` must succeed with no type errors.
- Dev server checked in an actual browser (Playwright): hero renders and
  animates, parallax responds to scroll without jank, nav/CTAs are usable,
  layout is responsive at mobile/tablet/desktop widths.
- No fabricated claims (stats, testimonials, client names) in placeholder
  copy.

## Out of scope (this spec)

- Additional pages (pricing, login, docs, dashboard) — noted by the client as
  a possible future phase, not part of this landing page.
- Backend/API integration — this is a static marketing page only.
- Real product copy — placeholder only, swapped in later by the client.

# Media Trading Platform Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and ship a single-page React/Three.js landing page for a media trading platform, with a scroll-parallax hero (organic terrain, glossy flowers, an iridescent hummingbird) and placeholder marketing sections below it.

**Architecture:** Vite + React + TypeScript app. Pure geometry/motion math lives in plain `.ts` modules (unit-testable with Vitest, no WebGL needed); React Three Fiber components consume those modules to render the scene (verified visually, not unit-tested, per the spec's verification plan); ordinary React components (nav, CTAs, sections) are tested with Vitest + React Testing Library.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, `@react-three/fiber` + `@react-three/drei` (Three.js), `framer-motion`, `simplex-noise`, `@fontsource/fraunces` + `@fontsource/inter`, Vitest + Testing Library.

## Global Constraints

- Palette (Tailwind theme, exact hex): `midnight #0f0a1f`, `violet #1a1330`, `purple #4b2e83`, `mauve #8a6fa8`, `lavender #c9a8e0`, `cream #f8f3e9`, `glow #d8b4fe`, `teal #7fd8d0`.
- Typography: headline serif = Fraunces (weight 600), body/UI sans = Inter — self-hosted via `@fontsource`, no external font CDN calls.
- No fabricated stats, testimonials, or real client/company names anywhere in copy — placeholder publisher names must read as clearly fictional (e.g. "Northwind Media").
- Hummingbird asset license: CC0 preferred; CC-BY acceptable only if attribution can be a single small footer credit line and the license explicitly permits commercial use. License is checked *before* a model is chosen. If nothing qualifies, use the procedural fallback mesh and flag it to the user rather than substituting silently.
- Deployment target is a static build only — no server-side code.
- Local repo: `~/projects/media-trading-platform` (git already initialized, branch `main`, one commit with the design spec). GitHub: new **public** repo `media-trading-platform` under account `saichetankari2001` (already `gh`-authenticated).
- Package manager: npm. Node v20.20.2 is available locally.

---

### Task 1: Project scaffold (Vite + React + TypeScript + Tailwind + Vitest)

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`
- Create: `vite.config.ts`
- Create: `postcss.config.js`
- Create: `tailwind.config.ts`
- Create: `index.html`
- Create: `.gitignore`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/App.test.tsx`
- Create: `src/index.css`
- Create: `src/test/setup.ts`
- Create: `src/vite-env.d.ts`

**Interfaces:**
- Produces: Tailwind theme colors `midnight`, `violet`, `purple`, `mauve`, `lavender`, `cream`, `glow`, `teal`; font families `font-serif` (Fraunces), `font-sans` (Inter). Every later task's Tailwind classes reference these names.
- Produces: `export default function App(): JSX.Element` in `src/App.tsx`, which every later task extends.

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "media-trading-platform",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "three": "^0.165.0",
    "@react-three/fiber": "^8.17.10",
    "@react-three/drei": "^9.114.0",
    "framer-motion": "^11.11.9",
    "simplex-noise": "^4.0.3",
    "@fontsource/fraunces": "^5.1.0",
    "@fontsource/inter": "^5.1.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.5.0",
    "@testing-library/react": "^16.0.1",
    "@types/react": "^18.3.11",
    "@types/react-dom": "^18.3.0",
    "@types/three": "^0.169.0",
    "@vitejs/plugin-react": "^4.3.2",
    "autoprefixer": "^10.4.20",
    "jsdom": "^25.0.1",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.13",
    "typescript": "^5.6.3",
    "vite": "^5.4.8",
    "vitest": "^2.1.2"
  }
}
```

- [ ] **Step 2: Write `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

- [ ] **Step 3: Write `tsconfig.node.json`**

```json
{
  "compilerOptions": {
    "composite": true,
    "skipLibCheck": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true
  },
  "include": ["vite.config.ts"]
}
```

- [ ] **Step 4: Write `vite.config.ts`**

```ts
/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
});
```

- [ ] **Step 5: Write `postcss.config.js`**

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

- [ ] **Step 6: Write `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#0f0a1f',
        violet: '#1a1330',
        purple: '#4b2e83',
        mauve: '#8a6fa8',
        lavender: '#c9a8e0',
        cream: '#f8f3e9',
        glow: '#d8b4fe',
        teal: '#7fd8d0',
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
```

- [ ] **Step 7: Write `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lumen Media — Programmatic Trading, Reimagined</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 8: Write `.gitignore`**

```
node_modules
dist
.DS_Store
*.local
```

- [ ] **Step 9: Write `src/vite-env.d.ts`**

```ts
/// <reference types="vite/client" />
```

- [ ] **Step 10: Write `src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 11: Write `src/test/setup.ts`**

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 12: Write `src/main.tsx`**

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/fraunces/600.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/600.css';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 13: Write the failing test `src/App.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App scaffold', () => {
  it('renders the scaffold placeholder', () => {
    render(<App />);
    expect(screen.getByText(/scaffold ready/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 14: Run test to verify it fails**

Run: `npm install && npm run test`
Expected: FAIL — `src/App.tsx` does not exist yet, so the import fails.

- [ ] **Step 15: Write minimal `src/App.tsx`**

```tsx
export default function App() {
  return (
    <main className="min-h-screen bg-midnight font-sans text-cream">
      <p className="p-8 text-lg">Media Trading Platform — scaffold ready.</p>
    </main>
  );
}
```

- [ ] **Step 16: Run test to verify it passes**

Run: `npm run test`
Expected: PASS — 1 test passed.

- [ ] **Step 17: Verify the dev toolchain builds**

Run: `npm run build`
Expected: exits 0, prints a `dist/` build summary.

- [ ] **Step 18: Commit**

```bash
git add package.json tsconfig.json tsconfig.node.json vite.config.ts postcss.config.js tailwind.config.ts index.html .gitignore src/
git commit -m "Scaffold Vite + React + TypeScript + Tailwind + Vitest"
```

---

### Task 2: Terrain noise and height-field pure functions

**Files:**
- Create: `src/lib/noise.ts`
- Create: `src/scenes/hero/terrainGeometry.ts`
- Test: `src/scenes/hero/terrainGeometry.test.ts`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `createTerrainNoise(seed?: () => number): NoiseFunction2D` from `src/lib/noise.ts`. `buildTerrainHeightField(params: TerrainHeightFieldParams): Float32Array` from `src/scenes/hero/terrainGeometry.ts`, where `TerrainHeightFieldParams = { width: number; depth: number; segments: number; noise2D: (x: number, y: number) => number; frequency?: number; amplitude?: number }`. Task 3's `Terrain.tsx` consumes both.

- [ ] **Step 1: Write `src/lib/noise.ts`**

```ts
import { createNoise2D, type NoiseFunction2D } from 'simplex-noise';

export function createTerrainNoise(seed?: () => number): NoiseFunction2D {
  return createNoise2D(seed);
}
```

- [ ] **Step 2: Write the failing test `src/scenes/hero/terrainGeometry.test.ts`**

```ts
import { describe, expect, it } from 'vitest';
import { buildTerrainHeightField } from './terrainGeometry';

describe('buildTerrainHeightField', () => {
  it('produces one height per vertex on a (segments+1) x (segments+1) grid', () => {
    const heights = buildTerrainHeightField({
      width: 10,
      depth: 10,
      segments: 4,
      noise2D: () => 1,
    });
    expect(heights).toBeInstanceOf(Float32Array);
    expect(heights.length).toBe(5 * 5);
  });

  it('scales noise output by amplitude', () => {
    const heights = buildTerrainHeightField({
      width: 10,
      depth: 10,
      segments: 1,
      noise2D: () => 0.5,
      amplitude: 2,
    });
    for (const h of heights) {
      expect(h).toBeCloseTo(1);
    }
  });

  it('maps grid position to centered world coordinates before sampling noise', () => {
    const seen: Array<[number, number]> = [];
    buildTerrainHeightField({
      width: 10,
      depth: 10,
      segments: 1,
      frequency: 1,
      noise2D: (x, z) => {
        seen.push([x, z]);
        return 0;
      },
    });
    expect(seen).toEqual([
      [-5, -5],
      [5, -5],
      [-5, 5],
      [5, 5],
    ]);
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

Run: `npm run test -- terrainGeometry`
Expected: FAIL — `terrainGeometry.ts` does not exist.

- [ ] **Step 4: Write `src/scenes/hero/terrainGeometry.ts`**

```ts
export interface TerrainHeightFieldParams {
  width: number;
  depth: number;
  segments: number;
  noise2D: (x: number, y: number) => number;
  frequency?: number;
  amplitude?: number;
}

export function buildTerrainHeightField(params: TerrainHeightFieldParams): Float32Array {
  const { width, depth, segments, noise2D, frequency = 0.15, amplitude = 1.2 } = params;
  const verticesPerRow = segments + 1;
  const heights = new Float32Array(verticesPerRow * verticesPerRow);

  for (let row = 0; row <= segments; row++) {
    for (let col = 0; col <= segments; col++) {
      const x = (col / segments - 0.5) * width;
      const z = (row / segments - 0.5) * depth;
      const index = row * verticesPerRow + col;
      heights[index] = noise2D(x * frequency, z * frequency) * amplitude;
    }
  }

  return heights;
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm run test -- terrainGeometry`
Expected: PASS — 3 tests passed.

- [ ] **Step 6: Commit**

```bash
git add src/lib/noise.ts src/scenes/hero/terrainGeometry.ts src/scenes/hero/terrainGeometry.test.ts
git commit -m "Add terrain noise and height-field pure functions"
```

---

### Task 3: Terrain scene component

**Files:**
- Create: `src/scenes/hero/Terrain.tsx`

**Interfaces:**
- Consumes: `createTerrainNoise` from `src/lib/noise.ts`, `buildTerrainHeightField` from `src/scenes/hero/terrainGeometry.ts`.
- Produces: `export function Terrain(): JSX.Element`, consumed by Task 8's `HeroScene.tsx`.

This is a Three.js-rendering component (a `PlaneGeometry` displaced by the height field, colored by height across `lavender → mauve → violet`). It is **not** unit-tested here — rendering a WebGL scene correctly can only be judged visually. It's verified in Task 14 against the running dev server.

- [ ] **Step 1: Write `src/scenes/hero/Terrain.tsx`**

```tsx
import { useMemo } from 'react';
import * as THREE from 'three';
import { createTerrainNoise } from '../../lib/noise';
import { buildTerrainHeightField } from './terrainGeometry';

const WIDTH = 40;
const DEPTH = 40;
const SEGMENTS = 96;

export function Terrain() {
  const geometry = useMemo(() => {
    const noise2D = createTerrainNoise();
    const heights = buildTerrainHeightField({
      width: WIDTH,
      depth: DEPTH,
      segments: SEGMENTS,
      noise2D,
    });

    const geo = new THREE.PlaneGeometry(WIDTH, DEPTH, SEGMENTS, SEGMENTS);
    const position = geo.attributes.position as THREE.BufferAttribute;
    const colors = new Float32Array(position.count * 3);
    const lavender = new THREE.Color('#c9a8e0');
    const mauve = new THREE.Color('#8a6fa8');
    const violet = new THREE.Color('#1a1330');

    for (let i = 0; i < position.count; i++) {
      const height = heights[i];
      position.setZ(i, height);

      const t = THREE.MathUtils.clamp((height + 1.2) / 2.4, 0, 1);
      const color = t < 0.5
        ? lavender.clone().lerp(mauve, t * 2)
        : mauve.clone().lerp(violet, (t - 0.5) * 2);
      color.toArray(colors, i * 3);
    }

    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <meshStandardMaterial vertexColors roughness={0.9} metalness={0.05} />
    </mesh>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/scenes/hero/Terrain.tsx
git commit -m "Add procedural terrain scene component"
```

---

### Task 4: Parallax mapping pure functions

**Files:**
- Create: `src/scenes/hero/parallaxMapping.ts`
- Test: `src/scenes/hero/parallaxMapping.test.ts`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `hummingbirdRise(progress: number, maxRise?: number): number` and `flowerSwayAngle(progress: number, phaseOffset: number, amplitude?: number): number`, consumed by Task 8's `HeroScene.tsx`.

- [ ] **Step 1: Write the failing test `src/scenes/hero/parallaxMapping.test.ts`**

```ts
import { describe, expect, it } from 'vitest';
import { flowerSwayAngle, hummingbirdRise } from './parallaxMapping';

describe('hummingbirdRise', () => {
  it('is zero at scroll progress 0', () => {
    expect(hummingbirdRise(0)).toBe(0);
  });

  it('reaches maxRise at scroll progress 1', () => {
    expect(hummingbirdRise(1, 3)).toBeCloseTo(3);
  });

  it('clamps progress outside [0, 1]', () => {
    expect(hummingbirdRise(-1)).toBe(0);
    expect(hummingbirdRise(2, 3)).toBeCloseTo(3);
  });
});

describe('flowerSwayAngle', () => {
  it('is zero at scroll progress 0 regardless of phase', () => {
    expect(flowerSwayAngle(0, 1.2)).toBe(0);
  });

  it('scales with amplitude', () => {
    const small = flowerSwayAngle(0.5, 0, 0.1);
    const large = flowerSwayAngle(0.5, 0, 0.5);
    expect(Math.abs(large)).toBeGreaterThan(Math.abs(small));
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- parallaxMapping`
Expected: FAIL — `parallaxMapping.ts` does not exist.

- [ ] **Step 3: Write `src/scenes/hero/parallaxMapping.ts`**

```ts
function clampUnit(value: number): number {
  return Math.min(Math.max(value, 0), 1);
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export function hummingbirdRise(progress: number, maxRise = 2.5): number {
  const clamped = clampUnit(progress);
  return easeOutCubic(clamped) * maxRise;
}

export function flowerSwayAngle(progress: number, phaseOffset: number, amplitude = 0.15): number {
  const clamped = clampUnit(progress);
  return Math.sin(clamped * Math.PI * 2 + phaseOffset) * amplitude * clamped;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- parallaxMapping`
Expected: PASS — 5 tests passed.

- [ ] **Step 5: Commit**

```bash
git add src/scenes/hero/parallaxMapping.ts src/scenes/hero/parallaxMapping.test.ts
git commit -m "Add scroll-parallax mapping pure functions"
```

---

### Task 5: Flowers scene component

**Files:**
- Create: `src/scenes/hero/Flowers.tsx`

**Interfaces:**
- Consumes: nothing from earlier tasks (self-contained geometry).
- Produces: `export function Flowers(): JSX.Element`, consumed by Task 8's `HeroScene.tsx`.

Visual component, verified in Task 14 (same reasoning as Task 3).

- [ ] **Step 1: Write `src/scenes/hero/Flowers.tsx`**

```tsx
import { useMemo } from 'react';
import * as THREE from 'three';

function buildPetalGeometry(): THREE.LatheGeometry {
  const points = [
    new THREE.Vector2(0, 0),
    new THREE.Vector2(0.4, 0.3),
    new THREE.Vector2(0.9, 0.9),
    new THREE.Vector2(0.6, 1.6),
    new THREE.Vector2(0.15, 2.1),
    new THREE.Vector2(0, 2.2),
  ];
  return new THREE.LatheGeometry(points, 32, 0, Math.PI * 1.4);
}

interface BloomConfig {
  position: [number, number, number];
  scale: number;
  rotationY: number;
}

const BLOOMS: BloomConfig[] = [
  { position: [6, 0, -2], scale: 1.4, rotationY: 0.3 },
  { position: [8.5, 0, -4.5], scale: 1, rotationY: -0.6 },
  { position: [5.5, 0, -6], scale: 0.8, rotationY: 1.1 },
];

export function Flowers() {
  const geometry = useMemo(() => buildPetalGeometry(), []);

  return (
    <group>
      {BLOOMS.map((bloom, i) => (
        <mesh
          key={i}
          geometry={geometry}
          position={bloom.position}
          rotation={[0, bloom.rotationY, 0]}
          scale={bloom.scale}
        >
          <meshPhysicalMaterial
            color="#f8f3e9"
            roughness={0.15}
            clearcoat={0.9}
            clearcoatRoughness={0.1}
            transmission={0.05}
            sheen={0.4}
            sheenColor="#c9a8e0"
          />
        </mesh>
      ))}
    </group>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/scenes/hero/Flowers.tsx
git commit -m "Add liquid-glossy flower scene component"
```

---

### Task 6: Iridescent shader material

**Files:**
- Create: `src/scenes/hero/shaders/iridescent.ts`
- Test: `src/scenes/hero/shaders/iridescent.test.ts`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `createIridescentMaterial(options?: IridescentMaterialOptions): THREE.MeshPhysicalMaterial` and `setGlowStrength(material: THREE.MeshPhysicalMaterial, strength: number): void`, where `IridescentMaterialOptions = { baseColor?: THREE.ColorRepresentation; glowColor?: THREE.ColorRepresentation; glowStrength?: number }`. Consumed by Task 7's `Hummingbird.tsx` / `ProceduralHummingbird.tsx`.

The material's *construction* (iridescence properties, base color) is unit-testable directly. Its `onBeforeCompile` hook is also testable by invoking it with a fake shader object — this exercises the real GLSL-injection logic without needing a GPU. The final visual result (does it actually glow correctly on screen) is verified in Task 14.

- [ ] **Step 1: Write the failing test `src/scenes/hero/shaders/iridescent.test.ts`**

```ts
import * as THREE from 'three';
import { describe, expect, it } from 'vitest';
import { createIridescentMaterial, setGlowStrength } from './iridescent';

describe('createIridescentMaterial', () => {
  it('configures iridescence on a MeshPhysicalMaterial', () => {
    const material = createIridescentMaterial({ baseColor: '#ff00ff' });
    expect(material).toBeInstanceOf(THREE.MeshPhysicalMaterial);
    expect(material.iridescence).toBe(1);
    expect(material.color.getHexString()).toBe('ff00ff');
  });

  it('injects a fresnel-driven glow uniform into the fragment shader', () => {
    const material = createIridescentMaterial({ glowColor: '#7fd8d0', glowStrength: 1.4 });
    const fakeShader = {
      uniforms: {} as Record<string, { value: unknown }>,
      fragmentShader: '#include <common>\nvoid main() {\n#include <dithering_fragment>\n}',
    } as unknown as THREE.WebGLProgramParametersWithUniforms;

    material.onBeforeCompile(fakeShader, {} as THREE.WebGLRenderer);

    expect(fakeShader.uniforms.uGlowColor.value).toBeInstanceOf(THREE.Color);
    expect(fakeShader.uniforms.uGlowStrength.value).toBe(1.4);
    expect(fakeShader.fragmentShader).toContain('fresnelTerm');
  });

  it('setGlowStrength updates the compiled shader uniform', () => {
    const material = createIridescentMaterial();
    const fakeShader = {
      uniforms: {} as Record<string, { value: unknown }>,
      fragmentShader: '#include <common>\nvoid main() {\n#include <dithering_fragment>\n}',
    } as unknown as THREE.WebGLProgramParametersWithUniforms;

    material.onBeforeCompile(fakeShader, {} as THREE.WebGLRenderer);
    setGlowStrength(material, 2.5);

    expect(fakeShader.uniforms.uGlowStrength.value).toBe(2.5);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- iridescent`
Expected: FAIL — `iridescent.ts` does not exist.

- [ ] **Step 3: Write `src/scenes/hero/shaders/iridescent.ts`**

```ts
import * as THREE from 'three';

export interface IridescentMaterialOptions {
  baseColor?: THREE.ColorRepresentation;
  glowColor?: THREE.ColorRepresentation;
  glowStrength?: number;
}

export function createIridescentMaterial(
  options: IridescentMaterialOptions = {}
): THREE.MeshPhysicalMaterial {
  const { baseColor = '#d8b4fe', glowColor = '#7fd8d0', glowStrength = 1.4 } = options;

  const material = new THREE.MeshPhysicalMaterial({
    color: baseColor,
    metalness: 0.2,
    roughness: 0.25,
    iridescence: 1,
    iridescenceIOR: 1.3,
    iridescenceThicknessRange: [100, 400],
    clearcoat: 0.6,
  });

  const glow = new THREE.Color(glowColor);

  material.onBeforeCompile = (shader) => {
    shader.uniforms.uGlowColor = { value: glow };
    shader.uniforms.uGlowStrength = { value: glowStrength };

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
        uniform vec3 uGlowColor;
        uniform float uGlowStrength;`
      )
      .replace(
        '#include <dithering_fragment>',
        `#include <dithering_fragment>
        float fresnelTerm = pow(1.0 - saturate(dot(normalize(vNormal), normalize(vViewPosition))), 3.0);
        gl_FragColor.rgb += uGlowColor * fresnelTerm * uGlowStrength;`
      );

    material.userData.shader = shader;
  };

  return material;
}

export function setGlowStrength(material: THREE.MeshPhysicalMaterial, strength: number): void {
  const shader = material.userData.shader as THREE.WebGLProgramParametersWithUniforms | undefined;
  if (shader) {
    shader.uniforms.uGlowStrength.value = strength;
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- iridescent`
Expected: PASS — 3 tests passed.

- [ ] **Step 5: Commit**

```bash
git add src/scenes/hero/shaders/iridescent.ts src/scenes/hero/shaders/iridescent.test.ts
git commit -m "Add fresnel-driven iridescent glow shader material"
```

---

### Task 7: Hummingbird — asset sourcing and integration (with procedural fallback)

**Files:**
- Create: `src/assets/models/LICENSE.txt` (only if a sourced model is used)
- Create: `public/models/hummingbird.glb` (only if a sourced model is used — binary, not authored inline)
- Create: `src/scenes/hero/Hummingbird.tsx` (only if a sourced model is used)
- Create: `src/scenes/hero/ProceduralHummingbird.tsx` (fallback path — always safe to write; only wired into the scene in Task 8 if sourcing fails)

**Interfaces:**
- Consumes: `createIridescentMaterial` from `src/scenes/hero/shaders/iridescent.ts`.
- Produces: a component with the exact shape `export function Hummingbird({ position }: { position: [number, number, number] }): JSX.Element` — **whichever file backs it**, Task 8's `HeroScene.tsx` imports one component under this same name and prop signature. Do not wire up both; pick exactly one per the outcome of Step 1.

- [ ] **Step 1: Search for a licensable hummingbird model**

Check, in order: Poly Haven (polyhaven.com/models), Sketchfab (sketchfab.com, filter: Downloadable + License = CC0 or CC Attribution), Poly Pizza (poly.pizza). Apply the license rule from the spec exactly: **CC0 preferred; CC-BY acceptable only if the attribution is a single small credit line and the license explicitly permits commercial use.** Reject anything marked "personal use only," "non-commercial," or with an ambiguous/custom license.

- If a qualifying model is found: download the `.glb` (or convert `.gltf`/`.obj` to `.glb` if needed) into `public/models/hummingbird.glb`, and write `src/assets/models/LICENSE.txt` recording the model name, author, source URL, license type, and (if CC-BY) the exact attribution line to use. Proceed to Step 2a.
- If nothing qualifies: skip to Step 2b, and **tell the user explicitly** that the procedural fallback is being used instead of a sourced model, per the spec.

- [ ] **Step 2a: (sourced model path) Write `src/scenes/hero/Hummingbird.tsx`**

```tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { createIridescentMaterial } from './shaders/iridescent';

const MODEL_PATH = '/models/hummingbird.glb';

export function Hummingbird({ position }: { position: [number, number, number] }) {
  const group = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL_PATH);
  const material = useRef(createIridescentMaterial()).current;

  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = material;
    }
  });

  useFrame((state) => {
    if (!group.current) return;
    const wingBeat = Math.sin(state.clock.elapsedTime * 18) * 0.1;
    group.current.rotation.z = wingBeat;
  });

  return (
    <group ref={group} position={position}>
      <primitive object={scene} scale={0.4} />
    </group>
  );
}

useGLTF.preload(MODEL_PATH);
```

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 2b: (fallback path) Write `src/scenes/hero/ProceduralHummingbird.tsx`**

```tsx
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { createIridescentMaterial } from './shaders/iridescent';

export function Hummingbird({ position }: { position: [number, number, number] }) {
  const group = useRef<THREE.Group>(null);
  const leftWing = useRef<THREE.Mesh>(null);
  const rightWing = useRef<THREE.Mesh>(null);
  const material = useRef(createIridescentMaterial()).current;

  const bodyGeometry = useMemo(() => {
    const points = [
      new THREE.Vector2(0, -0.5),
      new THREE.Vector2(0.18, -0.3),
      new THREE.Vector2(0.22, 0.1),
      new THREE.Vector2(0.1, 0.45),
      new THREE.Vector2(0, 0.55),
    ];
    return new THREE.LatheGeometry(points, 24);
  }, []);

  const wingGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.quadraticCurveTo(0.6, 0.15, 0.75, -0.05);
    shape.quadraticCurveTo(0.5, -0.25, 0, 0);
    return new THREE.ExtrudeGeometry(shape, { depth: 0.02, bevelEnabled: false });
  }, []);

  useFrame((state) => {
    const beat = Math.sin(state.clock.elapsedTime * 22) * 0.9;
    if (leftWing.current) leftWing.current.rotation.z = beat;
    if (rightWing.current) rightWing.current.rotation.z = -beat;
  });

  return (
    <group ref={group} position={position}>
      <mesh geometry={bodyGeometry} material={material} />
      <mesh ref={leftWing} geometry={wingGeometry} material={material} position={[0.05, 0.1, 0]} />
      <mesh
        ref={rightWing}
        geometry={wingGeometry}
        material={material}
        position={[-0.05, 0.1, 0]}
        scale={[-1, 1, 1]}
      />
    </group>
  );
}
```

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 3: Commit**

```bash
git add src/scenes/hero/Hummingbird.tsx src/scenes/hero/ProceduralHummingbird.tsx src/assets/models/ public/models/ 2>/dev/null
git commit -m "Add hummingbird actor (sourced model or procedural fallback) with iridescent shader"
```

(Only `git add` the paths that actually exist for the branch taken — omit `public/models/` and `src/assets/models/LICENSE.txt` if the fallback path was used, or omit `ProceduralHummingbird.tsx` from staging if you choose not to keep the unused branch — but keeping both file is fine and harmless if unused.)

---

### Task 8: HeroScene composition — Canvas, lighting, and scroll wiring

**Files:**
- Create: `src/scenes/hero/useScrollProgress.ts`
- Create: `src/scenes/hero/HeroScene.tsx`

**Interfaces:**
- Consumes: `Terrain` (Task 3), `Flowers` (Task 5), `Hummingbird` (Task 7), `hummingbirdRise`/`flowerSwayAngle` (Task 4).
- Produces: `export function useScrollProgress(targetRef: RefObject<HTMLElement>): MotionValue<number>` and `export function HeroScene({ scrollProgress }: { scrollProgress: MotionValue<number> }): JSX.Element`, consumed by Task 13's `App.tsx`.

- [ ] **Step 1: Write `src/scenes/hero/useScrollProgress.ts`**

```ts
import { type RefObject } from 'react';
import { useScroll, type MotionValue } from 'framer-motion';

export function useScrollProgress(targetRef: RefObject<HTMLElement>): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end start'],
  });
  return scrollYProgress;
}
```

- [ ] **Step 2: Write `src/scenes/hero/HeroScene.tsx`**

```tsx
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import type { MotionValue } from 'framer-motion';
import { Terrain } from './Terrain';
import { Flowers } from './Flowers';
import { Hummingbird } from './Hummingbird';
import { flowerSwayAngle, hummingbirdRise } from './parallaxMapping';

function SceneContents({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  const hummingbirdGroup = useRef<THREE.Group>(null);
  const flowerGroup = useRef<THREE.Group>(null);

  useFrame(() => {
    const progress = scrollProgress.get();

    if (hummingbirdGroup.current) {
      hummingbirdGroup.current.position.y = 1.5 + hummingbirdRise(progress);
    }
    if (flowerGroup.current) {
      flowerGroup.current.rotation.z = flowerSwayAngle(progress, 0.4);
    }
  });

  return (
    <>
      <ambientLight intensity={0.35} color="#8a6fa8" />
      <directionalLight position={[5, 8, 5]} intensity={0.6} color="#c9a8e0" />
      <fog attach="fog" args={['#1a1330', 15, 45]} />
      <Terrain />
      <group ref={flowerGroup}>
        <Flowers />
      </group>
      <group ref={hummingbirdGroup} position={[0, 1.5, 2]}>
        <Hummingbird position={[0, 0, 0]} />
      </group>
    </>
  );
}

export function HeroScene({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
  return (
    <Canvas
      camera={{ position: [0, 2.5, 10], fov: 45 }}
      gl={{ antialias: true }}
      className="!absolute inset-0"
    >
      <color attach="background" args={['#1a1330']} />
      <SceneContents scrollProgress={scrollProgress} />
    </Canvas>
  );
}
```

- [ ] **Step 3: Verify it compiles**

Run: `npm run build`
Expected: exits 0.

- [ ] **Step 4: Commit**

```bash
git add src/scenes/hero/useScrollProgress.ts src/scenes/hero/HeroScene.tsx
git commit -m "Compose hero scene with lighting and scroll-driven parallax"
```

---

### Task 9: Nav and CTA button components

**Files:**
- Create: `src/components/CTAButton.tsx`
- Create: `src/components/CTAButton.test.tsx`
- Create: `src/components/Nav.tsx`
- Create: `src/components/Nav.test.tsx`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `export function CTAButton({ children, variant, href }: { children: ReactNode; variant: 'filled' | 'ghost'; href: string }): JSX.Element` and `export function Nav(): JSX.Element`, consumed by Task 13's `App.tsx`.

- [ ] **Step 1: Write the failing test `src/components/CTAButton.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { CTAButton } from './CTAButton';

describe('CTAButton', () => {
  it('renders a filled CTA as a link with the filled style', () => {
    render(<CTAButton variant="filled" href="/start">Get started</CTAButton>);
    const link = screen.getByRole('link', { name: 'Get started' });
    expect(link).toHaveAttribute('href', '/start');
    expect(link.className).toContain('bg-glow');
  });

  it('renders a ghost CTA with an outlined style', () => {
    render(<CTAButton variant="ghost" href="/learn">Learn more</CTAButton>);
    const link = screen.getByRole('link', { name: 'Learn more' });
    expect(link.className).toContain('border-cream');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- CTAButton`
Expected: FAIL — `CTAButton.tsx` does not exist.

- [ ] **Step 3: Write `src/components/CTAButton.tsx`**

```tsx
import type { ReactNode } from 'react';

interface CTAButtonProps {
  children: ReactNode;
  variant: 'filled' | 'ghost';
  href: string;
}

export function CTAButton({ children, variant, href }: CTAButtonProps) {
  const base = 'rounded-full px-6 py-2.5 text-sm font-semibold transition-colors';
  const styles =
    variant === 'filled'
      ? `${base} bg-glow text-midnight shadow-[0_0_20px_rgba(216,180,254,0.6)] hover:bg-lavender`
      : `${base} border border-cream/70 text-cream hover:bg-cream/10`;

  return (
    <a href={href} className={styles}>
      {children}
    </a>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- CTAButton`
Expected: PASS — 2 tests passed.

- [ ] **Step 5: Write the failing test `src/components/Nav.test.tsx`**

```tsx
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Nav } from './Nav';

describe('Nav', () => {
  it('renders both CTAs', () => {
    render(<Nav />);
    expect(screen.getByRole('link', { name: /request access/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /see how it works/i })).toBeInTheDocument();
  });

  it('toggles the products dropdown on click', () => {
    render(<Nav />);
    const trigger = screen.getByRole('button', { name: /products/i });
    expect(screen.queryByText(/publisher tools/i)).not.toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.getByText(/publisher tools/i)).toBeInTheDocument();

    fireEvent.click(trigger);
    expect(screen.queryByText(/publisher tools/i)).not.toBeInTheDocument();
  });
});
```

- [ ] **Step 6: Run test to verify it fails**

Run: `npm run test -- Nav`
Expected: FAIL — `Nav.tsx` does not exist.

- [ ] **Step 7: Write `src/components/Nav.tsx`**

```tsx
import { useState } from 'react';
import { CTAButton } from './CTAButton';

export function Nav() {
  const [productsOpen, setProductsOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 top-0 z-20 flex items-center justify-between px-6 py-3 backdrop-blur-md bg-midnight/40">
      <span className="font-serif text-lg text-cream">Lumen Media</span>

      <div className="relative flex items-center gap-6">
        <button
          type="button"
          onClick={() => setProductsOpen((open) => !open)}
          className="rounded-full px-4 py-1.5 text-sm text-cream/90 hover:bg-cream/10"
        >
          Products
        </button>
        {productsOpen && (
          <div className="absolute left-0 top-10 flex flex-col gap-1 rounded-2xl bg-violet/95 p-3 shadow-xl">
            <span className="whitespace-nowrap rounded-full px-3 py-1.5 text-sm text-cream/90 hover:bg-cream/10">
              Publisher Tools
            </span>
            <span className="whitespace-nowrap rounded-full px-3 py-1.5 text-sm text-cream/90 hover:bg-cream/10">
              Trading Desk
            </span>
          </div>
        )}

        <div className="flex items-center gap-3">
          <CTAButton variant="ghost" href="#how-it-works">
            See how it works
          </CTAButton>
          <CTAButton variant="filled" href="#request-access">
            Request access
          </CTAButton>
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npm run test -- Nav`
Expected: PASS — 2 tests passed.

- [ ] **Step 9: Commit**

```bash
git add src/components/CTAButton.tsx src/components/CTAButton.test.tsx src/components/Nav.tsx src/components/Nav.test.tsx
git commit -m "Add frosted-glass nav with dual CTAs"
```

---

### Task 10: Hero overlay (headline, subhead, scroll cue)

**Files:**
- Create: `src/components/ScrollCue.tsx`
- Create: `src/components/ScrollCue.test.tsx`
- Create: `src/components/HeroOverlay.tsx`
- Create: `src/components/HeroOverlay.test.tsx`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `export function HeroOverlay(): JSX.Element`, consumed by Task 13's `App.tsx`.

- [ ] **Step 1: Write the failing test `src/components/ScrollCue.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ScrollCue } from './ScrollCue';

describe('ScrollCue', () => {
  it('renders the discovery prompt', () => {
    render(<ScrollCue />);
    expect(screen.getByText(/scroll down and discover/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- ScrollCue`
Expected: FAIL — `ScrollCue.tsx` does not exist.

- [ ] **Step 3: Write `src/components/ScrollCue.tsx`**

```tsx
import { motion } from 'framer-motion';

export function ScrollCue() {
  return (
    <motion.div
      className="absolute bottom-8 right-8 flex items-center gap-2 text-sm text-cream/80"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.8 }}
    >
      <span>Scroll down and discover</span>
      <span aria-hidden>↓</span>
    </motion.div>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- ScrollCue`
Expected: PASS — 1 test passed.

- [ ] **Step 5: Write the failing test `src/components/HeroOverlay.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HeroOverlay } from './HeroOverlay';

describe('HeroOverlay', () => {
  it('renders the headline and subhead', () => {
    render(<HeroOverlay />);
    expect(
      screen.getByRole('heading', { name: /precision and poetry/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/programmatic trading/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 6: Run test to verify it fails**

Run: `npm run test -- HeroOverlay`
Expected: FAIL — `HeroOverlay.tsx` does not exist.

- [ ] **Step 7: Write `src/components/HeroOverlay.tsx`**

```tsx
import { ScrollCue } from './ScrollCue';

export function HeroOverlay() {
  return (
    <div className="relative flex h-full flex-col items-start justify-center px-8 md:px-16">
      <h1 className="max-w-xl font-serif text-4xl leading-tight text-cream md:text-6xl">
        Precision and poetry, in the same product.
      </h1>
      <p className="mt-4 max-w-md font-sans text-base text-cream/80 md:text-lg">
        A programmatic trading platform for publishers who care as much about
        craft as they do about performance.
      </p>
      <ScrollCue />
    </div>
  );
}
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npm run test -- HeroOverlay`
Expected: PASS — 1 test passed.

- [ ] **Step 9: Commit**

```bash
git add src/components/ScrollCue.tsx src/components/ScrollCue.test.tsx src/components/HeroOverlay.tsx src/components/HeroOverlay.test.tsx
git commit -m "Add hero headline overlay and scroll-down cue"
```

---

### Task 11: Trust strip and features section

**Files:**
- Create: `src/components/sections/TrustStrip.tsx`
- Create: `src/components/sections/TrustStrip.test.tsx`
- Create: `src/components/sections/Features.tsx`
- Create: `src/components/sections/Features.test.tsx`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `export function TrustStrip(): JSX.Element` and `export function Features(): JSX.Element`, consumed by Task 13's `App.tsx`.

- [ ] **Step 1: Write the failing test `src/components/sections/TrustStrip.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TrustStrip } from './TrustStrip';

describe('TrustStrip', () => {
  it('renders the trust heading and four placeholder publisher names', () => {
    render(<TrustStrip />);
    expect(screen.getByText(/trusted by leading publishers/i)).toBeInTheDocument();
    expect(screen.getByText('Northwind Media')).toBeInTheDocument();
    expect(screen.getByText('Solstice Publishing')).toBeInTheDocument();
    expect(screen.getByText('Harbor & Co.')).toBeInTheDocument();
    expect(screen.getByText('Fieldstone Group')).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- TrustStrip`
Expected: FAIL — `TrustStrip.tsx` does not exist.

- [ ] **Step 3: Write `src/components/sections/TrustStrip.tsx`**

```tsx
const PLACEHOLDER_PUBLISHERS = [
  'Northwind Media',
  'Solstice Publishing',
  'Harbor & Co.',
  'Fieldstone Group',
];

export function TrustStrip() {
  return (
    <section className="border-y border-cream/10 bg-violet px-8 py-10 text-center">
      <p className="text-xs uppercase tracking-widest text-cream/60">
        Trusted by leading publishers
      </p>
      <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {PLACEHOLDER_PUBLISHERS.map((name) => (
          <li key={name} className="font-serif text-lg text-cream/70">
            {name}
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- TrustStrip`
Expected: PASS — 1 test passed.

- [ ] **Step 5: Write the failing test `src/components/sections/Features.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Features } from './Features';

describe('Features', () => {
  it('renders all four feature cards', () => {
    render(<Features />);
    expect(screen.getByText('Programmatic Trading')).toBeInTheDocument();
    expect(screen.getByText('Publisher Tools')).toBeInTheDocument();
    expect(screen.getByText('Real-Time Analytics')).toBeInTheDocument();
    expect(screen.getByText('Transparent Pricing')).toBeInTheDocument();
  });
});
```

- [ ] **Step 6: Run test to verify it fails**

Run: `npm run test -- Features`
Expected: FAIL — `Features.tsx` does not exist.

- [ ] **Step 7: Write `src/components/sections/Features.tsx`**

```tsx
interface Feature {
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    title: 'Programmatic Trading',
    description: 'Buy and sell inventory in real time across a unified, auction-driven marketplace.',
  },
  {
    title: 'Publisher Tools',
    description: 'Manage floors, deals, and inventory quality from a single publisher-facing console.',
  },
  {
    title: 'Real-Time Analytics',
    description: 'Track fill rate, yield, and latency as they happen, not the next morning.',
  },
  {
    title: 'Transparent Pricing',
    description: 'No hidden take rates — every fee is itemized on every transaction.',
  },
];

export function Features() {
  return (
    <section className="bg-midnight px-8 py-20">
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        {FEATURES.map((feature) => (
          <div key={feature.title} className="rounded-2xl border border-cream/10 p-6">
            <h3 className="font-serif text-xl text-cream">{feature.title}</h3>
            <p className="mt-2 text-sm text-cream/70">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npm run test -- Features`
Expected: PASS — 1 test passed.

- [ ] **Step 9: Commit**

```bash
git add src/components/sections/TrustStrip.tsx src/components/sections/TrustStrip.test.tsx src/components/sections/Features.tsx src/components/sections/Features.test.tsx
git commit -m "Add trust strip and features sections"
```

---

### Task 12: How-it-works and footer sections

**Files:**
- Create: `src/components/sections/HowItWorks.tsx`
- Create: `src/components/sections/HowItWorks.test.tsx`
- Create: `src/components/sections/Footer.tsx`
- Create: `src/components/sections/Footer.test.tsx`

**Interfaces:**
- Consumes: nothing from earlier tasks.
- Produces: `export function HowItWorks(): JSX.Element` and `export function Footer({ modelAttribution }: { modelAttribution?: string }): JSX.Element`, consumed by Task 13's `App.tsx`. `modelAttribution` is the CC-BY credit line recorded in Task 7's `LICENSE.txt`, if any (omit the prop entirely if the model was CC0 or the procedural fallback was used).

- [ ] **Step 1: Write the failing test `src/components/sections/HowItWorks.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HowItWorks } from './HowItWorks';

describe('HowItWorks', () => {
  it('renders all three steps in order', () => {
    render(<HowItWorks />);
    const steps = screen.getAllByRole('heading', { level: 3 });
    expect(steps.map((s) => s.textContent)).toEqual([
      'Connect your inventory',
      'Trade programmatically',
      'Track performance',
    ]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- HowItWorks`
Expected: FAIL — `HowItWorks.tsx` does not exist.

- [ ] **Step 3: Write `src/components/sections/HowItWorks.tsx`**

```tsx
interface Step {
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    title: 'Connect your inventory',
    description: 'Point your ad server or CMS at our SDK — no migration required.',
  },
  {
    title: 'Trade programmatically',
    description: 'Buyers bid in real time; floors and deal terms stay under your control.',
  },
  {
    title: 'Track performance',
    description: 'Watch yield, fill, and latency update live from the same dashboard.',
  },
];

export function HowItWorks() {
  return (
    <section className="bg-violet px-8 py-20" id="how-it-works">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 md:flex-row">
        {STEPS.map((step, index) => (
          <div key={step.title} className="flex-1">
            <span className="font-serif text-3xl text-glow">{index + 1}</span>
            <h3 className="mt-3 font-serif text-xl text-cream">{step.title}</h3>
            <p className="mt-2 text-sm text-cream/70">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- HowItWorks`
Expected: PASS — 1 test passed.

- [ ] **Step 5: Write the failing test `src/components/sections/Footer.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Footer } from './Footer';

describe('Footer', () => {
  it('renders legal text without an attribution line by default', () => {
    render(<Footer />);
    expect(screen.getByText(/lumen media/i)).toBeInTheDocument();
    expect(screen.queryByTestId('model-attribution')).not.toBeInTheDocument();
  });

  it('renders the model attribution line when provided', () => {
    render(<Footer modelAttribution="Hummingbird model by Jane Doe (CC BY 4.0)" />);
    expect(screen.getByTestId('model-attribution')).toHaveTextContent(
      'Hummingbird model by Jane Doe (CC BY 4.0)'
    );
  });
});
```

- [ ] **Step 6: Run test to verify it fails**

Run: `npm run test -- Footer`
Expected: FAIL — `Footer.tsx` does not exist.

- [ ] **Step 7: Write `src/components/sections/Footer.tsx`**

```tsx
interface FooterProps {
  modelAttribution?: string;
}

export function Footer({ modelAttribution }: FooterProps) {
  return (
    <footer className="bg-midnight px-8 py-10 text-xs text-cream/50">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <span>© {new Date().getFullYear()} Lumen Media. All rights reserved.</span>
        <div className="flex gap-6">
          <span>Privacy</span>
          <span>Terms</span>
          <span>Contact</span>
        </div>
      </div>
      {modelAttribution && (
        <p data-testid="model-attribution" className="mx-auto mt-4 max-w-5xl">
          {modelAttribution}
        </p>
      )}
    </footer>
  );
}
```

- [ ] **Step 8: Run test to verify it passes**

Run: `npm run test -- Footer`
Expected: PASS — 2 tests passed.

- [ ] **Step 9: Commit**

```bash
git add src/components/sections/HowItWorks.tsx src/components/sections/HowItWorks.test.tsx src/components/sections/Footer.tsx src/components/sections/Footer.test.tsx
git commit -m "Add how-it-works and footer sections"
```

---

### Task 13: Assemble the full page

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`

**Interfaces:**
- Consumes: `Nav` (Task 9), `HeroScene` + `useScrollProgress` (Task 8), `HeroOverlay` (Task 10), `TrustStrip` + `Features` (Task 11), `HowItWorks` + `Footer` (Task 12).
- Produces: the final `export default function App(): JSX.Element`.

- [ ] **Step 1: Update the test `src/App.test.tsx`**

```tsx
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the nav, hero headline, and every section in order', () => {
    render(<App />);
    expect(screen.getByText('Lumen Media')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /precision and poetry/i })).toBeInTheDocument();
    expect(screen.getByText(/trusted by leading publishers/i)).toBeInTheDocument();
    expect(screen.getByText('Programmatic Trading')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Connect your inventory' })).toBeInTheDocument();
    expect(screen.getByText(/lumen media\. all rights reserved/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm run test -- App`
Expected: FAIL — current `App.tsx` only renders the scaffold placeholder text.

- [ ] **Step 3: Write `src/App.tsx`**

```tsx
import { useRef } from 'react';
import { Nav } from './components/Nav';
import { HeroOverlay } from './components/HeroOverlay';
import { HeroScene } from './scenes/hero/HeroScene';
import { useScrollProgress } from './scenes/hero/useScrollProgress';
import { TrustStrip } from './components/sections/TrustStrip';
import { Features } from './components/sections/Features';
import { HowItWorks } from './components/sections/HowItWorks';
import { Footer } from './components/sections/Footer';

export default function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useScrollProgress(heroRef);

  return (
    <main className="bg-midnight font-sans text-cream">
      <Nav />

      <div ref={heroRef} className="relative h-[150vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <HeroScene scrollProgress={scrollProgress} />
          <HeroOverlay />
        </div>
      </div>

      <TrustStrip />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm run test -- App`
Expected: PASS — 1 test passed.

- [ ] **Step 5: Run the full test suite**

Run: `npm run test`
Expected: PASS — every test file passes.

- [ ] **Step 6: Commit**

```bash
git add src/App.tsx src/App.test.tsx
git commit -m "Assemble hero and marketing sections into the full landing page"
```

---

### Task 14: Build verification and manual browser check

**Files:** none (verification only; fix forward in whichever file if an issue is found).

- [ ] **Step 1: Full test suite and production build**

Run: `npm run test && npm run build`
Expected: all tests pass; build exits 0 with a `dist/` summary.

- [ ] **Step 2: Start the preview server**

Run: `npm run preview -- --port 4173`
Expected: server prints a local URL (e.g. `http://localhost:4173`).

- [ ] **Step 3: Manually verify in a real browser (use the Playwright MCP browser tools)**

Navigate to `http://localhost:4173` and check:
- The hero scene renders (terrain, flowers, hummingbird visible; hummingbird has a visible glow/iridescent highlight).
- Scrolling through the hero raises the hummingbird and sways the flowers smoothly, without jank.
- The nav stays fixed, frosted, and the Products dropdown opens/closes on click.
- Both CTAs render with visibly different styles (filled vs ghost) and are clickable.
- The "Scroll down and discover ↓" cue fades in after load, in the lower right.
- All sections below the hero (trust strip, features, how-it-works, footer) render with the expected copy.
- Resize the viewport to mobile (375px), tablet (768px), and desktop (1440px) widths and confirm the layout stays usable at each (no overlapping text, nav remains usable).
- Check the browser console for errors — expect none.

If any check fails, fix the relevant component and re-run Steps 1–3 before proceeding.

- [ ] **Step 4: Stop the preview server**

Run: whatever process-stop action corresponds to how the server in Step 2 was started.

---

### Task 15: Push to GitHub

**Files:** none (repository operation only).

- [ ] **Step 1: Confirm all work is committed**

Run: `git status`
Expected: `working tree clean` (or only expected untracked build artifacts already covered by `.gitignore`).

- [ ] **Step 2: Create the GitHub repository and push**

Run: `gh repo create saichetankari2001/media-trading-platform --public --source=. --remote=origin --push`
Expected: repo created, `main` pushed, command prints the new repo URL.

- [ ] **Step 3: Verify**

Run: `gh repo view saichetankari2001/media-trading-platform --web=false`
Expected: shows the repo description/URL, confirming the push succeeded.

---

## Self-Review Notes

- **Spec coverage:** terrain (Task 3), hummingbird shader + sourcing/licensing rule (Tasks 6–7), flowers (Task 5), scroll parallax (Tasks 4, 8), nav/CTAs (Task 9), headline/subhead/scroll cue (Task 10), below-hero sections + attribution slot (Tasks 11–12), assembly (Task 13), verification plan (Task 14), repo/delivery (Task 15) — every spec section has a task.
- **Placeholder scan:** no TBD/TODO markers; the one branching task (7) has fully-coded outcomes for both branches rather than a vague placeholder, matching the spec's explicit fallback clause.
- **Type consistency:** `Hummingbird({ position }: { position: [number, number, number] })` matches across Tasks 7 and 8; `HeroScene({ scrollProgress }: { scrollProgress: MotionValue<number> })` matches Tasks 8 and 13; `Footer({ modelAttribution }: { modelAttribution?: string })` matches Tasks 12 and 13 (omitted in Task 13's call since no attribution applies unless Task 7 recorded one).

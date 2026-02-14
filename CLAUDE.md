# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Internationalized color library providing locale-aware color naming across 74 languages. Built on [culori](https://culorijs.org/) for color math, with an immutable `Color` class wrapper and a `ColorNamer` engine that uses k-d trees for O(log n) nearest-neighbor lookup in OkLab perceptual color space.

## Commands

```bash
bun install                          # Install dependencies
bun test                             # Run all tests
bun test tests/naming.test.ts        # Run a single test file
```

### Regenerating locale data from the UW dataset

```bash
git clone https://github.com/uwdata/color-naming-in-different-languages /tmp/uwdata-colors
bun scripts/generate-locales.ts /tmp/uwdata-colors/model/cleaned_color_data_by_lang
```

## Tooling

Default to using Bun instead of Node.js.

- Use `bun <file>` instead of `node <file>` or `ts-node <file>`
- Use `bun test` instead of `jest` or `vitest`
- Use `bun install` instead of `npm install`
- Use `bun run <script>` instead of `npm run <script>`
- Prefer `Bun.file` over `node:fs` readFile/writeFile
- Tests use `import { test, expect } from "bun:test"`

## Architecture

### Layered design

```
naming.ts                   — locale-aware naming, translation, nearest-neighbor (module-level functions)
  ↓ uses
KDTree (kdtree.ts)          — 3D k-d tree for fast OkLab nearest-neighbor search
  ↓ operates on
ColorDictionary (types.ts)  — locale data: names[] + Float32Array of OkLab centroids
  ↓ stored in
locales/*.ts                — tree-shakeable per-language dictionaries
  ↓ wraps
Color (Color.ts)            — immutable value object wrapping culori color objects
  ↓ delegates to
culori/fn                   — color math, parsing, conversion (tree-shakeable)
```

### Key design decisions

- **culori/fn (not culori)**: Tree-shakeable imports. Users must call `setup()` to register color space modes, or `import 'internationalized-color/css'` for all CSS L4 spaces.
- **OkLab as intermediate**: All naming lookups convert to OkLab first. Euclidean distance in OkLab correlates with perceived color difference.
- **Float32Array storage**: Locale dictionaries store OkLab centroids as flat `Float32Array` (3 floats per color: l, a, b) for compactness.
- **Lazy k-d tree construction**: Trees are built on first `name()` call per locale+level, then cached.
- **Immutability**: Every `Color` method returns a new instance. The underlying culori object is `Object.freeze()`'d.
- **Three naming tiers**: `basic` (Berlin-Kay ~11 terms), `extended` (common names), `traditional` (cultural: Japanese wa-iro, Chinese traditional, Korean obangsaek).

### Core files

- `index.ts` — barrel export of `Color`, naming functions (`useLocale`, `nameColor`, `nearestColors`, `lookupColor`, `listColorNames`, `translateColor`), types, and utils
- `src/Color.ts` — immutable Color class (thin wrapper over culori)
- `src/naming.ts` — module-level naming functions with module-scoped `dictionaries` and `trees` caches
- `src/kdtree.ts` — 3D k-d tree with `nearest()` and `nearestN()` using max-heap
- `src/types.ts` — `ColorDictionary`, `ColorNameSet`, `ColorName`, `NamingOptions`, `TranslationResult`
- `src/setup.ts` — `setup()` registers culori modes via `useMode()`
- `src/bootstrap/css.ts` — side-effect import that registers all CSS Color Level 4 spaces
- `src/locales/*.ts` — 74 language dictionaries + 3 traditional variants (auto-generated, don't hand-edit survey-derived ones)
- `src/locales/en.ts` — hand-curated English locale with CSS named colors (not auto-generated)
- `scripts/generate-locales.ts` — generates locale files from the UW multilingual color survey dataset

### Locale data format

Each locale exports a `ColorDictionary` with `basic`, `extended`, and/or `traditional` tiers. Each tier has parallel `names: string[]` and `colors: Float32Array` arrays where `colors[i*3..i*3+2]` are the OkLab `[l, a, b]` centroid for `names[i]`.

### Adding a new locale

1. If survey data exists, add it to the UW dataset processing in `scripts/generate-locales.ts`
2. For traditional/cultural colors, add entries to the `traditionalVariants` array in the same script
3. Re-run the generation script
4. Add the export to `src/locales/index.ts` and `package.json` exports map

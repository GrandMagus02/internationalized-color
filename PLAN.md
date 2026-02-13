# internationalized-color — Implementation Plan

An internationalized color library inspired by `@internationalized/date`, providing
**locale-aware color naming** across languages and cultures. Built on top of
[culori](https://culorijs.org/) for color math, with a thin immutable `Color` class wrapper.

---

## Table of Contents

1. [Motivation & Goals](#1-motivation--goals)
2. [Architecture Overview](#2-architecture-overview)
3. [Core: Color Class Wrapper over Culori](#3-core-color-class-wrapper-over-culori)
4. [Naming: Multi-Language Color Names](#4-naming-multi-language-color-names)
5. [Data Strategy](#5-data-strategy)
6. [API Design](#6-api-design)
7. [File Structure](#7-file-structure)
8. [Implementation Phases](#8-implementation-phases)
9. [Open Questions](#9-open-questions)

---

## 1. Motivation & Goals

### Problem

There is no JavaScript/TypeScript library that provides:
- Locale-aware color naming ("What is this color called in Japanese?")
- Cross-language color translation ("Russian 'siniy' → English 'dark blue'")
- Culture-specific named color palettes (Japanese 和色, Chinese traditional, Korean 오방색)
- A clean, type-safe API modeled after `@internationalized/date`

### Goals

- **Naming first**: The primary value proposition is multi-language color naming, not just
  another color conversion library.
- **Perceptually uniform**: Use OkLab as the intermediate for all name lookups
  (Euclidean distance in OkLab correlates well with perceived color difference).
- **Tree-shakeable**: Locale data you don't use should not be bundled. Color spaces
  are tree-shakeable via `culori/fn` imports.
- **Minimal dependencies**: Only `culori` for color math — no reinventing the wheel.
- **Immutable value objects**: Following `@internationalized/date`'s pattern. Every
  manipulation of the `Color` class returns a new instance.
- **Extensible**: Users can register custom naming dictionaries.

### Non-Goals

- Not a full color manipulation library (no gradients, palettes, contrast ratios — keep scope tight).
- Not a CSS color parser (though we expose culori's parsing via our API).
- Not a color picker component.

---

## 2. Architecture Overview

### Why Culori

Instead of writing our own color space conversion math from scratch, we use
[culori](https://culorijs.org/) — a well-tested, tree-shakeable color library with:

- **30 color spaces** with accurate conversion math
- **Tree-shakeable `culori/fn` entry point** — only bundle the spaces you register
- **CSS Color Level 4 parsing and serialization**
- **Delta E functions** (CIEDE2000, Euclidean in any space, etc.)
- **Gamut mapping** (`clampChroma`, `toGamut`)
- **Plain object color representation** (`{ mode: 'oklch', l, c, h, alpha }`)

Our library wraps culori in a thin immutable `Color` class and adds the unique value:
**locale-aware color naming, cross-language translation, and cultural color systems**.

### Analogy with `@internationalized/date`

| `@internationalized/date`        | `internationalized-color`             |
|----------------------------------|---------------------------------------|
| `Calendar` interface             | culori mode definitions (via `culori/fn`) |
| `CalendarDate` value object      | `Color` value object (wraps culori object) |
| Julian Day Number (intermediate) | OkLab `{ l, a, b }` (intermediate for naming) |
| `toCalendar(date, calendar)`     | `color.to('oklch')` (delegates to culori `converter`) |
| `GregorianCalendar`, `PersianCalendar` | `modeRgb`, `modeOklch`, `modeP3` (culori modes) |
| `DateFormatter` (wraps `Intl`)   | `ColorNamer` (locale-aware naming)    |
| `DateDuration`                   | n/a (not a manipulation library)      |
| `parseDate('2022-02-03')`        | `parseColor('#ff0000')` (wraps culori `parse`) |
| Small CLDR tables (week start)   | Color name dictionaries per locale    |

### Layered Architecture

```
┌─────────────────────────────────────────────────────────┐
│  Layer 4: Formatting & Naming                           │
│  ColorNamer, ColorFormatter                             │
│  Locale-aware color naming and CSS serialization        │
├─────────────────────────────────────────────────────────┤
│  Layer 3: Locale Data                                   │
│  locales/en.ts, locales/ja.ts, locales/zh.ts, ...       │
│  Tree-shakeable color name dictionaries                 │
├─────────────────────────────────────────────────────────┤
│  Layer 2: Color Class (thin wrapper)                    │
│  Immutable Color value object wrapping culori objects    │
│  Parsing, conversion, serialization via culori           │
├─────────────────────────────────────────────────────────┤
│  Layer 1: culori/fn (external dependency)               │
│  Color spaces, conversion math, parsing, deltaE         │
│  Tree-shakeable via useMode() registration              │
└─────────────────────────────────────────────────────────┘
```

### Culori Tree-Shaking Strategy

We use `culori/fn` (not `culori`) so users only bundle the color spaces they need.
Our library re-exports culori mode definitions and provides a `setup()` function:

```typescript
import { setup, Color } from 'internationalized-color';
import { modeOklch, modeOklab, modeRgb, modeP3 } from 'culori/fn';

// Register only the color spaces your app uses
setup([modeRgb, modeOklab, modeOklch, modeP3]);

// Now Color works with those spaces
const c = Color.parse('#ff0000');
const inOklch = c.to('oklch');
```

Alternatively, we provide a convenience bootstrap that registers common CSS spaces:

```typescript
import 'internationalized-color/css'; // registers all CSS Color Level 4 spaces
import { Color } from 'internationalized-color';
```

---

## 3. Core: Color Class Wrapper over Culori

### 3.1 Culori's Plain Object Model

Culori represents colors as plain objects with a `mode` property:

```typescript
// Culori's internal representation
{ mode: 'rgb', r: 1, g: 0, b: 0 }
{ mode: 'oklch', l: 0.63, c: 0.26, h: 29 }
{ mode: 'oklab', l: 0.63, a: 0.22, b: 0.13 }
```

### 3.2 The `Color` Value Object (Our Wrapper)

Our `Color` class wraps a culori color object, making it immutable and providing
a fluent API. **Every method that modifies the color returns a new `Color` instance.**

```typescript
import type { Color as CuloriColor } from 'culori/fn';

class Color {
  /** The underlying culori color object (frozen) */
  readonly #color: Readonly<CuloriColor>;

  /** Construct from a culori color object */
  constructor(color: CuloriColor);

  /** The color space mode (e.g. 'rgb', 'oklch', 'oklab') */
  get mode(): string;

  /** Alpha (opacity), 0-1. Undefined treated as 1 (opaque). */
  get alpha(): number | undefined;

  /** Get a channel value by name (e.g. 'r', 'lightness', 'hue') */
  get(channel: string): number | undefined;

  /** Create a new Color with modified channels — returns new instance */
  set(channels: Record<string, number>): Color;

  /** Create a new Color with alpha changed — returns new instance */
  withAlpha(alpha: number): Color;

  /** Convert to another color space — returns new instance */
  to(mode: string): Color;

  /** Get the raw culori object (for interop with culori functions) */
  toObject(): CuloriColor;

  /** Get OkLab coordinates (for naming lookups) — returns new instance */
  toOklab(): Color;

  /** Perceptual distance (Delta E OK by default) */
  deltaE(other: Color): number;

  /** Check equality within a tolerance */
  equals(other: Color, tolerance?: number): boolean;

  /** CSS string serialization (delegates to culori formatCss/formatHex) */
  toString(format?: 'hex' | 'css'): string;

  /** Hex string (sRGB, gamut-mapped if needed) */
  toHex(): string;

  /** JSON representation */
  toJSON(): { mode: string; channels: Record<string, number>; alpha?: number };

  /** Static: parse a CSS color string */
  static parse(value: string): Color;

  /** Static: create from hex */
  static hex(value: string): Color;

  /** Static: create from a color space mode + channel values */
  static create(mode: string, channels: Record<string, number>, alpha?: number): Color;
}
```

### 3.3 Immutability Guarantee

Every method on `Color` returns a **new instance**. The underlying culori object is
frozen via `Object.freeze()` at construction time.

```typescript
const a = Color.hex('#3498db');
const b = a.to('oklch');           // new Color instance
const c = b.set({ l: 0.4 });      // new Color instance
const d = c.withAlpha(0.5);        // new Color instance

a === b; // false
b === c; // false
```

### 3.4 Delegation to Culori

The `Color` class is intentionally thin. Under the hood:

| Color method | Culori function used |
|---|---|
| `Color.parse(str)` | `parse(str)` from `culori/fn` |
| `color.to(mode)` | `converter(mode)(color.toObject())` |
| `color.toString()` | `formatCss(color.toObject())` |
| `color.toHex()` | `formatHex(color.toObject())` |
| `color.deltaE(other)` | `differenceEuclidean('oklab')(a, b)` |
| gamut mapping | `toGamut('rgb')(color.toObject())` |

### 3.5 Interop with Culori

Users who need culori's full power can extract the raw object:

```typescript
import { interpolate, blend } from 'culori/fn';

const a = Color.hex('#ff0000');
const b = Color.hex('#0000ff');

// Drop down to culori for advanced operations
const gradient = interpolate([a.toObject(), b.toObject()], 'oklch');
const mid = new Color(gradient(0.5)); // wrap back into Color
```

### 3.6 Supported Color Spaces

All 30 culori color spaces are available. Common ones:

| Mode          | Channels         | Notes                                     |
|---------------|------------------|-------------------------------------------|
| `rgb`         | r, g, b [0,1]   | sRGB (CSS `color(srgb ...)`)              |
| `p3`          | r, g, b [0,1]   | Display P3 (CSS `color(display-p3 ...)`)  |
| `hsl`         | h, s, l          | CSS `hsl()`                               |
| `hwb`         | h, w, b          | CSS `hwb()`                               |
| `oklab`       | l, a, b          | OkLab (perceptual intermediate)           |
| `oklch`       | l, c, h          | OkLCH polar form (CSS `oklch()`)          |
| `lab`         | l, a, b          | CIE Lab (D50, CSS `lab()`)                |
| `lab65`       | l, a, b          | CIE Lab (D65)                             |
| `lch`         | l, c, h          | CIE LCH (D50, CSS `lch()`)               |
| `lch65`       | l, c, h          | CIE LCH (D65)                             |
| `xyz50`       | x, y, z          | CIE XYZ (D50)                             |
| `xyz65`       | x, y, z          | CIE XYZ (D65)                             |
| `rec2020`     | r, g, b [0,1]   | Rec. 2020 ultra-wide gamut                |
| `a98`         | r, g, b [0,1]   | Adobe RGB (1998)                          |
| `prophoto`    | r, g, b [0,1]   | ProPhoto RGB                              |
| `lrgb`        | r, g, b          | Linear sRGB                               |
| `okhsl`       | h, s, l          | OK-tuned HSL (perceptually uniform)       |
| `okhsv`       | h, s, v          | OK-tuned HSV (perceptually uniform)       |
| `jab`         | j, a, b          | Jzazbz (HDR-capable)                      |
| `jch`         | j, c, h          | JzCzhz polar form                         |

### 3.7 Parsing

Parsing delegates to culori's `parse()`, which supports:
- Hex: `#rgb`, `#rrggbb`, `#rrggbbaa`
- CSS functions: `rgb()`, `hsl()`, `hwb()`, `lab()`, `lch()`, `oklab()`, `oklch()`, `color()`
- Named CSS colors: `red`, `rebeccapurple`, `transparent`, etc.

---

## 4. Naming: Multi-Language Color Names

This is the core differentiator of the library. Culori does not provide this.

### 4.1 The `ColorNamer` Class

```typescript
class ColorNamer {
  constructor(dictionaries: ColorDictionary[]);

  /** Find the closest named color in the given locale */
  name(color: Color, locale: string, options?: NamingOptions): ColorName;

  /** Find the N closest named colors */
  nearest(color: Color, locale: string, count?: number): ColorName[];

  /** Look up a color by name in a locale */
  lookup(name: string, locale: string): Color | undefined;

  /** List all available color names for a locale */
  names(locale: string): ColorName[];

  /** Translate a color name from one locale to another */
  translate(name: string, from: string, to: string): TranslationResult;
}

interface ColorName {
  /** The color name in the locale's language */
  name: string;
  /** The canonical color (centroid of the name's region) */
  color: Color;
  /** Perceptual distance from the query color (Delta E OK) */
  distance: number;
  /** The dictionary this name came from */
  source: string;
}

interface NamingOptions {
  /** Specificity level */
  level?: 'basic' | 'extended' | 'traditional';
  /** Maximum acceptable distance (skip if no name is close enough) */
  threshold?: number;
}

interface TranslationResult {
  /** Best matching name in the target locale */
  name: string;
  /** The color associated with the source name */
  sourceColor: Color;
  /** The color associated with the target name */
  targetColor: Color;
  /** How "lossy" the translation is (0 = perfect, higher = more semantic drift) */
  distance: number;
}
```

### 4.2 Naming Algorithm

1. **Convert input color to OkLab** via `color.to('oklab')`
2. **For the requested locale, iterate over the color dictionary entries**
3. **Compute Euclidean distance** in OkLab space: `sqrt((L1-L2)^2 + (a1-a2)^2 + (b1-b2)^2)`
4. **Return the entry with the smallest distance**

For performance with large dictionaries, we use a **k-d tree** (built lazily per locale)
to achieve O(log n) nearest-neighbor lookup instead of O(n) linear scan.

Note: We use culori's `differenceEuclidean('oklab')` for the distance calculation,
ensuring consistency with culori's math.

### 4.3 Specificity Levels

Inspired by the Berlin-Kay hierarchy and the ISCC-NBS precision levels:

| Level          | Description                                | Example (English)      |
|----------------|--------------------------------------------|------------------------|
| `basic`        | Berlin-Kay universal terms (~11 categories)| "blue", "red", "green" |
| `extended`     | Common color names (~100-500 per language) | "teal", "salmon", "navy"|
| `traditional`  | Culture-specific named colors              | "桜鼠" (ja), "天青" (zh)|

The `basic` level works for all languages. The `extended` and `traditional` levels
have varying coverage depending on available data.

### 4.4 Cross-Language Translation

Translation is NOT simple dictionary lookup — it's a perceptual mapping:

1. Look up the source name → get its OkLab centroid
2. Find the nearest name in the target locale's dictionary
3. Return the match along with a distance metric

### 4.5 Cultural Color Systems

Some cultures have entire color naming traditions that don't map to Western categories:

- **Japanese 和色 (Wa-iro)**: ~450 traditional colors with poetic names
  (e.g., 勿忘草色 "forget-me-not color", 桜鼠 "cherry blossom grey")
- **Chinese traditional colors (中国传统颜色)**: ~526 colors from historical texts
  (e.g., 天青 "sky after rain", 胭脂 "rouge")
- **Korean 오방색 (Obangsaek)**: 5 directional colors + 5 derived mixed colors,
  plus ~90 traditional named colors

These are exposed as separate dictionaries that can be loaded alongside or instead
of the basic/extended names.

---

## 5. Data Strategy

### 5.1 Data Sources

| Source | Languages | Colors | License | Use |
|--------|-----------|--------|---------|-----|
| CSS Named Colors | English | 148 | W3C (open) | Built-in baseline |
| XKCD Color Survey | English | 954 | Public domain | English extended |
| UW Multilingual Dataset | 14 langs | Full space | Academic (cite) | Basic & extended names for: en, ko, zh, es, de, fa, fr, ru, pt, nl, pl, sv, fi + more |
| Japanese Traditional (和色) | Japanese | ~450 | Various public | `ja` traditional tier |
| Chinese Traditional | Chinese | ~526 | Various public | `zh` traditional tier |
| Korean Traditional | Korean | ~90 | Public | `ko` traditional tier |
| World Color Survey | 110 langs | 330 chips | Academic (cite) | Basic terms for low-resource languages |

### 5.2 Data Processing Pipeline

The raw data from these sources needs to be processed into a unified format:

1. **Normalize all colors to OkLab** — use culori's `converter('oklab')` to convert
   hex/RGB/Munsell to OkLab coordinates
2. **Compute centroids** — for crowdsourced data (UW, XKCD), compute the average OkLab
   position for each color name
3. **Deduplicate** — merge synonyms and near-duplicates within a threshold
4. **Validate** — ensure all entries have valid OkLab coordinates and non-empty names
5. **Output** — generate TypeScript files with typed arrays for each locale

### 5.3 Locale Data Format

Each locale file exports a compact typed array format for minimal bundle size:

```typescript
// locales/en.ts
import type { ColorDictionary } from '../types.ts';

export const en: ColorDictionary = {
  locale: 'en',
  source: 'xkcd+css+uw',
  // Basic terms (Berlin-Kay 11)
  basic: {
    names: ['black','white','red','green','yellow','blue','brown','orange','pink','purple','grey'],
    // OkLab [l, a, b] centroids, flat Float32Array for compactness
    // Each color = 3 floats: [l0,a0,b0, l1,a1,b1, ...]
    colors: new Float32Array([0,0,0, 1,0,0, 0.63,0.22,0.13, ...]),
  },
  // Extended names
  extended: {
    names: ['teal','salmon','navy','coral','turquoise','maroon', ...],
    colors: new Float32Array([...]),
  },
};
```

### 5.4 Tree-Shaking Strategy

Locale data files are separate entry points. Users import only what they need:

```typescript
import { Color, ColorNamer } from 'internationalized-color';
import { en } from 'internationalized-color/locales/en';
import { ja } from 'internationalized-color/locales/ja';
import { jaTraditional } from 'internationalized-color/locales/ja-traditional';

const namer = new ColorNamer([en, ja, jaTraditional]);
```

This ensures that an app using only English and Japanese doesn't bundle Korean, Chinese,
Russian, etc. data.

### 5.5 Bundle Size Budget

Target sizes (gzipped):
- Core (Color wrapper + naming engine): ~1 kB (our code only)
- `culori/fn` with common modes: ~3-5 kB (tree-shaken)
- Per locale basic terms: ~0.2 kB
- Per locale extended names: ~2-5 kB
- Traditional color sets: ~3-8 kB each

---

## 6. API Design

### 6.1 Setup (Register Color Spaces)

```typescript
import { setup } from 'internationalized-color';
import { modeRgb, modeOklab, modeOklch, modeHsl, modeP3 } from 'culori/fn';

// Register the color spaces your app needs (tree-shakeable)
setup([modeRgb, modeOklab, modeOklch, modeHsl, modeP3]);
```

Or use the convenience bootstrap:

```typescript
// Registers all CSS Color Level 4 spaces automatically
import 'internationalized-color/css';
```

### 6.2 Creating Colors

```typescript
import { Color } from 'internationalized-color';

// From hex
const red = Color.hex('#ff0000');

// Parse CSS strings
const c1 = Color.parse('oklch(70% 0.15 180)');
const c2 = Color.parse('rgb(255, 0, 0)');
const c3 = Color.parse('hsl(120, 100%, 50%)');

// From a color space mode + channels
const c4 = Color.create('oklch', { l: 0.7, c: 0.15, h: 180 });
const c5 = Color.create('rgb', { r: 1, g: 0, b: 0 }, 0.5); // with alpha
const c6 = Color.create('p3', { r: 1, g: 0, b: 0 });
```

### 6.3 Converting Between Spaces

```typescript
const color = Color.hex('#e74c3c');

// Convert to different spaces — each returns a new Color
const inOklch = color.to('oklch');
const inP3 = color.to('p3');
const inLab = color.to('lab');
const inOklab = color.to('oklab');

// Access channels
inOklch.get('l'); // 0.637
inOklch.get('c'); // 0.196
inOklch.get('h'); // 25.4
```

### 6.4 Modifying Colors (Immutable — Always Returns New Instance)

```typescript
const base = Color.hex('#3498db');

// Set specific channels — returns new Color
const darker = base.to('oklch').set({ l: 0.4 });
const warmer = base.to('oklch').set({ h: 30 });
const faded = base.withAlpha(0.5);

// All operations return new Color instances
base === darker; // false
base === warmer; // false
base === faded;  // false
```

### 6.5 Naming Colors

```typescript
import { Color, ColorNamer } from 'internationalized-color';
import { en } from 'internationalized-color/locales/en';
import { ja } from 'internationalized-color/locales/ja';
import { jaTraditional } from 'internationalized-color/locales/ja-traditional';

const namer = new ColorNamer([en, ja, jaTraditional]);

const teal = Color.hex('#008080');

// Name in English
namer.name(teal, 'en');
// → { name: 'teal', color: Color(...), distance: 0.002, source: 'css' }

// Name in Japanese
namer.name(teal, 'ja');
// → { name: '青緑', color: Color(...), distance: 0.01, source: 'uw' }

// Japanese traditional name
namer.name(teal, 'ja', { level: 'traditional' });
// → { name: '青竹色', color: Color(...), distance: 0.03, source: 'wa-iro' }

// Basic-only (Berlin-Kay terms)
namer.name(teal, 'en', { level: 'basic' });
// → { name: 'blue', color: Color(...), distance: 0.15, source: 'basic' }

// Find 5 nearest names
namer.nearest(teal, 'en', 5);
// → [{ name: 'teal', ... }, { name: 'dark cyan', ... }, ...]
```

### 6.6 Looking Up Colors by Name

```typescript
// Reverse lookup: name → color
namer.lookup('salmon', 'en');
// → Color (oklch: { l: 0.71, c: 0.12, h: 22 })

namer.lookup('桜色', 'ja');
// → Color (oklch: { l: 0.85, c: 0.06, h: 10 })

// List all names for a locale
namer.names('ko');
// → [{ name: '빨강', color: ... }, { name: '파랑', color: ... }, ...]
```

### 6.7 Cross-Language Translation

```typescript
// Translate color names between languages
namer.translate('синий', 'ru', 'en');
// → { name: 'dark blue', sourceColor: ..., targetColor: ..., distance: 0.04 }

namer.translate('синий', 'ru', 'ja');
// → { name: '紺色', sourceColor: ..., targetColor: ..., distance: 0.06 }

// Note: Russian has TWO blues (синий=dark, голубой=light)
namer.translate('голубой', 'ru', 'en');
// → { name: 'light blue', sourceColor: ..., targetColor: ..., distance: 0.05 }
```

### 6.8 Perceptual Distance

```typescript
const a = Color.hex('#ff0000');
const b = Color.hex('#ff4400');

a.deltaE(b); // Delta E OK distance (Euclidean in OkLab)
a.equals(b); // false
a.equals(b, 0.1); // true (within tolerance)
```

### 6.9 Serialization

```typescript
const c = Color.hex('#e74c3c');

c.toString();         // CSS Color Level 4: 'rgb(231, 76, 60)' (default)
c.toString('css');    // CSS Color Level 4 format for current mode
c.toString('hex');    // '#e74c3c'
c.toHex();            // '#e74c3c'
c.toJSON();           // { mode: 'rgb', channels: { r: 0.906, g: 0.298, b: 0.235 }, alpha: 1 }
```

### 6.10 Culori Interop

```typescript
import { interpolate, clampChroma } from 'culori/fn';

const a = Color.hex('#ff0000');
const b = Color.hex('#0000ff');

// Extract raw culori objects for advanced operations
const gradient = interpolate([a.toObject(), b.toObject()], 'oklch');
const mid = new Color(gradient(0.5)); // wrap back

// Gamut mapping
import { toGamut } from 'culori/fn';
const gamutMapped = new Color(toGamut('rgb')(someWideGamutColor.toObject()));
```

---

## 7. File Structure

```
internationalized-color/
├── index.ts                   # Public barrel export
├── package.json
├── tsconfig.json
├── PLAN.md
│
├── src/
│   ├── types.ts               # Core interfaces: ColorDictionary, ColorName, NamingOptions, etc.
│   ├── Color.ts               # Immutable Color class (thin wrapper over culori objects)
│   ├── setup.ts               # setup() — registers culori modes via useMode()
│   ├── naming.ts              # ColorNamer class
│   ├── kdtree.ts              # k-d tree for fast nearest-neighbor lookup in OkLab
│   │
│   ├── bootstrap/             # Convenience mode registrations
│   │   └── css.ts             # Registers all CSS Color Level 4 spaces
│   │
│   └── locales/               # Locale color name dictionaries (tree-shakeable)
│       ├── _types.ts          # ColorDictionary type definition
│       ├── en.ts              # English (CSS + XKCD + UW data)
│       ├── ja.ts              # Japanese basic + extended
│       ├── ja-traditional.ts  # Japanese 和色 (450 traditional colors)
│       ├── zh.ts              # Chinese basic + extended
│       ├── zh-traditional.ts  # Chinese traditional colors (526 colors)
│       ├── ko.ts              # Korean basic + extended
│       ├── ko-traditional.ts  # Korean 오방색 + traditional
│       ├── ru.ts              # Russian (includes siniy/goluboy distinction)
│       ├── es.ts              # Spanish
│       ├── de.ts              # German
│       ├── fr.ts              # French
│       ├── pt.ts              # Portuguese
│       ├── fa.ts              # Persian (Farsi)
│       ├── nl.ts              # Dutch
│       ├── pl.ts              # Polish
│       ├── sv.ts              # Swedish
│       ├── fi.ts              # Finnish
│       └── index.ts           # Re-exports all locales
│
├── scripts/                   # Data processing scripts (not published)
│   ├── process-uw-data.ts     # Process UW multilingual dataset → locale files
│   ├── process-xkcd.ts        # Process XKCD color survey → en extended names
│   ├── process-wairo.ts       # Process Japanese 和色 → ja-traditional
│   ├── process-zhcolors.ts    # Process Chinese traditional → zh-traditional
│   ├── process-wcs.ts         # Process World Color Survey → basic terms
│   └── utils.ts               # Shared processing utilities
│
└── tests/
    ├── color.test.ts          # Color creation, immutability, channel access
    ├── conversion.test.ts     # Conversion via culori (round-trip accuracy)
    ├── parse.test.ts          # CSS string parsing (delegates to culori)
    ├── naming.test.ts         # ColorNamer: name(), nearest(), lookup()
    ├── translation.test.ts    # Cross-language translation
    └── kdtree.test.ts         # k-d tree nearest-neighbor correctness
```

### Key differences from previous plan

- **Removed `src/spaces/`** — all color space implementations come from `culori/fn`
- **Removed `src/conversion.ts`** — conversion math is handled by culori converters
- **Removed `src/parse.ts`** — parsing delegates to culori's `parse()`
- **Removed `src/serialize.ts`** — serialization delegates to culori's `formatCss/formatHex`
- **Removed `src/operations.ts`** — deltaE delegates to culori's `differenceEuclidean`
- **Added `src/setup.ts`** — registers culori modes via `useMode()`
- **Added `src/bootstrap/css.ts`** — convenience CSS space registration
- **Much simpler `Color.ts`** — thin wrapper, not a full value object with conversion logic

---

## 8. Implementation Phases

### Phase 1: Core Color Wrapper

**Goal**: Immutable `Color` class wrapping culori. Parsing, conversion, serialization.

1. `bun install culori` — add culori as a dependency
2. Implement `setup.ts` — `setup()` function that calls `useMode()` for each mode definition
3. Implement `types.ts` — `ColorDictionary`, `ColorName`, `NamingOptions`, `TranslationResult`
4. Implement `Color.ts`:
   - Constructor freezes the culori color object
   - `mode`, `alpha`, `get(channel)` getters
   - `set(channels)` → new `Color` (spread + override channels)
   - `withAlpha(alpha)` → new `Color`
   - `to(mode)` → new `Color` via culori `converter(mode)`
   - `toObject()` → raw culori color
   - `toOklab()` → `this.to('oklab')`
   - `deltaE(other)` → culori `differenceEuclidean('oklab')`
   - `equals(other, tolerance?)` → deltaE comparison
   - `toString(format?)` → culori `formatCss` / `formatHex`
   - `toHex()` → culori `formatHex` (with gamut mapping if not sRGB)
   - `toJSON()`
   - Static: `parse(str)`, `hex(str)`, `create(mode, channels, alpha?)`
5. Implement `bootstrap/css.ts` — registers common CSS spaces
6. Write tests:
   - Color creation and immutability (verify all methods return new instances)
   - Channel access
   - Conversion round-trips
   - Parsing CSS strings
   - Serialization

### Phase 2: Naming Engine

**Goal**: `ColorNamer` class with English support.

1. Implement the k-d tree for OkLab nearest-neighbor search
2. Define `ColorDictionary` format in `locales/_types.ts`
3. Implement `ColorNamer` class with `name()`, `nearest()`, `lookup()`, `names()`
4. Curate the English locale data:
   - Basic: Berlin-Kay 11 terms with manually verified OkLab centroids
   - Extended: Process XKCD 954 colors + CSS 148 named colors
5. Write naming tests (verify known colors get correct names)

### Phase 3: Multi-Language Data

**Goal**: Add locale data for all supported languages.

1. Write `process-uw-data.ts` script to extract color names from the UW dataset
   (use culori's `converter('oklab')` for normalization)
2. Process Japanese traditional colors (和色)
3. Process Chinese traditional colors
4. Process Korean traditional colors
5. Add locale files for all 14+ languages from the UW dataset
6. Implement `translate()` for cross-language color name translation

### Phase 4: Polish & Publish

**Goal**: Production-ready library.

1. Add `package.json` exports map for tree-shaking:
   ```json
   {
     "exports": {
       ".": "./index.ts",
       "./css": "./src/bootstrap/css.ts",
       "./locales/en": "./src/locales/en.ts",
       "./locales/ja": "./src/locales/ja.ts",
       ...
     }
   }
   ```
2. Build step (Bun can bundle for distribution)
3. Comprehensive test suite
4. README with usage examples
5. Publish to npm

---

## 9. Open Questions

### Data Licensing
- The UW dataset has no explicit license (default copyright), though authors encourage
  academic use with citation. Options:
  - (a) Contact authors for permission to redistribute processed data, or
  - (b) Provide processing scripts that users run against the original data, or
  - (c) Treat our processed centroids as a derived work with proper attribution
- XKCD data is effectively public domain (CC0-like)
- CSS named colors are a W3C standard (open)
- Japanese/Chinese/Korean traditional colors are from multiple public sources

### Naming Scope for v1
- Should we include ALL 14 languages from the UW dataset in v1, or start with a
  curated subset (en, ja, zh, ko, ru, es, fr, de)?
- Should `traditional` tier be available for non-CJK languages? (There are traditional
  European color systems like Werner's Nomenclature of Colours)

### Gamut Mapping for toHex()
- When converting wide-gamut colors (P3, Rec.2020) to sRGB for hex output, which
  approach?
  - Use culori's `toGamut('rgb')` (CSS Color Level 4 algorithm — reduce chroma in OkLCH)
  - Use culori's `clampChroma` (simpler, just clamp chroma)
  - Simple channel clamping (fast but perceptually bad)

### Performance
- For the k-d tree: should we build it lazily on first `name()` call, or eagerly
  in the `ColorNamer` constructor?
- Should we offer a `lite` variant that does linear scan instead of k-d tree for
  apps with small dictionaries?

### Channel Name Convenience
- Culori uses short channel names (`l`, `a`, `b`, `c`, `h`, `r`, `g`). Should the
  `Color.get()` method also accept long names (`lightness`, `chroma`, `hue`, `red`,
  `green`, `blue`) and map them to culori's short names? Or keep it simple and match
  culori exactly?

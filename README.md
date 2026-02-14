<a href="https://stand-with-ukraine.pp.ua/"><img src="https://raw.githubusercontent.com/vshymanskyy/StandWithUkraine/main/banner2-no-action.svg" /></a>

# Internationalized Color

A locale-aware color naming library that maps any color to its closest name in 74 languages. Built on [culori](https://culorijs.org/) for color math, it uses k-d trees in OkLab perceptual color space for fast, accurate nearest-neighbor lookup — so the names you get match what humans actually see.

## Features

- **74 languages** — Arabic, Japanese, Hindi, French, Chinese, and 69 more, each with survey-derived color names
- **3 naming tiers** — basic (Berlin-Kay ~11 terms), extended (common names), and traditional (cultural: Japanese wa-iro, Chinese traditional, Korean obangsaek)
- **Cross-language translation** — translate color names between any two supported languages
- **Perceptually accurate** — nearest-neighbor search in OkLab space correlates with human color perception
- **O(log n) lookup** — k-d tree indexing, lazily built and cached per locale
- **Immutable Color class** — parse, convert, mix, lighten/darken across any CSS Color Level 4 space
- **Tree-shakeable** — import only the locales and color spaces you need
- **Zero config** — works with any CSS color string out of the box

## Install

```bash
npm install internationalized-color
```

```bash
pnpm add internationalized-color
```

```bash
yarn add internationalized-color
```

```bash
bun add internationalized-color
```

## Usage

Register color spaces and locales, then use the standalone functions:

```ts
import 'internationalized-color/css'; // registers all CSS Color Level 4 spaces
import { useLocale, nameColor, nearestColors, lookupColor, translateColor } from 'internationalized-color';
import { en } from 'internationalized-color/locales/en';
import { ar } from 'internationalized-color/locales/ar';
import { ja } from 'internationalized-color/locales/ja';

// Register locales (like culori's useMode)
useLocale(en);
useLocale(ar);
useLocale(ja);

// Name a color in English
nameColor('#ff6347', 'en'); // → "tomato"

// Name the same color in Japanese
nameColor('#ff6347', 'ja'); // → "朱色"

// Name at the basic (Berlin-Kay 11) tier only
nameColor('#ff6347', 'en', { level: 'basic' }); // → "red"

// Translate a color name across languages
translateColor('red', 'en', 'ar'); // → "أحمر"
translateColor('red', 'en', 'ja'); // → "赤"

// Find the N closest named colors
nearestColors('#ff6347', 'en', 3); // → ["tomato", "orangered", "coral"]

// Reverse lookup: name → Color
lookupColor('tomato', 'en'); // → Color (oklab)
```

You can also pass a `ColorDictionary` directly instead of a locale string, bypassing the registry:

```ts
import { en } from 'internationalized-color/locales/en';
import { nameColor } from 'internationalized-color';

nameColor('#ff6347', en); // works without useLocale()
```

### Color formats

Powered by [culori](https://culorijs.org/), any CSS Color Level 4 format is supported:

```ts
import 'internationalized-color/css';
import { Color } from 'internationalized-color';

// Hex
Color.parse('#ff6347');

// CSS named colors
Color.parse('tomato');

// RGB
Color.parse('rgb(255, 99, 71)');

// HSL
Color.parse('hsl(9, 100%, 64%)');

// HWB
Color.parse('hwb(9 28% 0%)');

// OkLab
Color.parse('oklab(0.7 0.1 0.1)');

// OkLCH
Color.parse('oklch(0.7 0.15 50)');

// Lab
Color.parse('lab(62 45 47)');

// LCH
Color.parse('lch(62 65 46)');

// Display P3
Color.parse('color(display-p3 1 0.39 0.28)');
```

### Tree-shakeable setup

If you don't need all CSS color spaces, register only what you use via culori's `useMode`:

```ts
import { useMode, modeRgb, modeOklab, modeOklch } from 'culori/fn';
import { Color } from 'internationalized-color';

useMode(modeRgb);
useMode(modeOklab);
useMode(modeOklch);
```

### Color manipulation

The `Color` class is an immutable value object — every method returns a new instance.

```ts
import 'internationalized-color/css';
import { Color } from 'internationalized-color';

// Create colors
const tomato = Color.parse('#ff6347');
const sky = Color.from('oklch(0.75 0.15 230)');  // accepts string, Color, or culori object
const custom = Color.create('rgb', { r: 0.5, g: 0.2, b: 0.8 });

// Convert between color spaces
const lab = tomato.toOklab();
const lch = tomato.toOklch();
const hsl = tomato.toHsl();
const p3 = tomato.toP3();
const generic = tomato.to('rec2020');  // any registered mode

// Read channels
tomato.mode;                   // → "rgb"
tomato.get('r');               // → 1
tomato.getRed();               // → 1
tomato.channels;               // → ["r", "g", "b"]
tomato.entries();              // → [["r", 1], ["g", 0.388...], ["b", 0.278...]]
tomato.has('r');               // → true

// Modify channels (returns new Color)
tomato.set({ r: 0.5 });
tomato.setAlpha(0.8);

// Mix colors (defaults to 50% blend in OkLab)
tomato.mix(sky);               // perceptually uniform blend
tomato.mix(sky, 0.25);         // 25% toward sky
tomato.mix('#0000ff', 0.5, 'oklch');  // mix in OkLCH space

// Lighten / darken (adjusts OkLab lightness)
tomato.lighten(0.1);
tomato.darken(0.2);

// Perceptual distance & equality
tomato.deltaE(sky);            // Euclidean distance in OkLab
tomato.equals(sky);            // exact match
tomato.equals(sky, 0.05);     // within perceptual tolerance

// Serialize
tomato.toString();             // → "color(srgb 1 0.38824 0.27843)"
tomato.toHex();                // → "#ff6347"
tomato.toJSON();               // → { mode: "rgb", channels: { r: 1, g: 0.388..., b: 0.278... } }
tomato.toObject();             // raw culori color object
```

## Supported Languages

74 languages with ISO 639-1 codes, plus 3 traditional/cultural color sets (Japanese wa-iro, Chinese traditional, Korean obangsaek).

<details>
<summary>Full language list</summary>

| Code | Language | Code | Language |
|------|----------|------|----------|
| aa | 🇩🇯 Afar | na | 🇳🇷 Nauru |
| ab | 🇬🇪 Abkhazian | nb | 🇳🇴 Norwegian Bokmål |
| af | 🇿🇦 Afrikaans | ne | 🇳🇵 Nepali |
| ak | 🇬🇭 Akan | nl | 🇳🇱 Dutch |
| am | 🇪🇹 Amharic | nn | 🇳🇴 Norwegian Nynorsk |
| ar | 🇸🇦 Arabic | no | 🇳🇴 Norwegian |
| az | 🇦🇿 Azerbaijani | ny | 🇲🇼 Chichewa |
| bg | 🇧🇬 Bulgarian | oc | 🇫🇷 Occitan |
| bn | 🇧🇩 Bengali | pa | 🇮🇳 Punjabi |
| ca | 🇪🇸 Catalan | pl | 🇵🇱 Polish |
| cr | 🇨🇦 Cree | ps | 🇦🇫 Pashto |
| cs | 🇨🇿 Czech | pt | 🇵🇹 Portuguese |
| cy | 🏴󠁧󠁢󠁷󠁬󠁳󠁿 Welsh | ro | 🇷🇴 Romanian |
| da | 🇩🇰 Danish | ru | 🇷🇺 Russian |
| de | 🇩🇪 German | si | 🇱🇰 Sinhala |
| el | 🇬🇷 Greek | sk | 🇸🇰 Slovak |
| en | 🇬🇧 English | sl | 🇸🇮 Slovenian |
| es | 🇪🇸 Spanish | sm | 🇼🇸 Samoan |
| et | 🇪🇪 Estonian | so | 🇸🇴 Somali |
| fa | 🇮🇷 Persian | sq | 🇦🇱 Albanian |
| fi | 🇫🇮 Finnish | sr | 🇷🇸 Serbian |
| fr | 🇫🇷 French | su | 🇮🇩 Sundanese |
| ga | 🇮🇪 Irish | sv | 🇸🇪 Swedish |
| gu | 🇮🇳 Gujarati | ta | 🇮🇳 Tamil |
| he | 🇮🇱 Hebrew | te | 🇮🇳 Telugu |
| hi | 🇮🇳 Hindi | th | 🇹🇭 Thai |
| hr | 🇭🇷 Croatian | tl | 🇵🇭 Tagalog |
| hu | 🇭🇺 Hungarian | tr | 🇹🇷 Turkish |
| id | 🇮🇩 Indonesian | uk | 🇺🇦 Ukrainian |
| is | 🇮🇸 Icelandic | ur | 🇵🇰 Urdu |
| it | 🇮🇹 Italian | vi | 🇻🇳 Vietnamese |
| ja | 🇯🇵 Japanese | zh | 🇨🇳 Chinese |
| ka | 🇬🇪 Georgian | ja-traditional | 🇯🇵 Japanese wa-iro |
| kn | 🇮🇳 Kannada | zh-traditional | 🇨🇳 Chinese traditional |
| ko | 🇰🇷 Korean | ko-traditional | 🇰🇷 Korean obangsaek |
| lb | 🇱🇺 Luxembourgish | | |
| lt | 🇱🇹 Lithuanian | | |
| lv | 🇱🇻 Latvian | | |
| mk | 🇲🇰 Macedonian | | |
| ml | 🇮🇳 Malayalam | | |
| ms | 🇲🇾 Malay | | |
| my | 🇲🇲 Burmese | | |

</details>

## Data Source

Color naming data is derived from the **Many Languages, Many Colors Dataset**:

> Younghoon Kim, Kyle Thayer, Gabriella Silva Gorsky, and Jeffrey Heer.
> "[Color Names Across Languages: Salient Colors and Term Translation in Multilingual Color Naming Models](http://idl.cs.washington.edu/papers/multi-lingual-color-names/)."
> *EuroVis*, 2019.

Survey data from [github.com/uwdata/color-naming-in-different-languages](https://github.com/uwdata/color-naming-in-different-languages).

### Help Improve the Data

The color naming models behind this library are only as good as the survey data they're built on. More responses — especially for underrepresented languages — lead to better color names and more accurate translations. You can contribute by taking the 15-minute color perception survey from the [Many Languages, Many Colors](https://studies.labinthewild.org/color-perception/?REF=ManyLanguagesManyColors) project. Every response helps refine the models that power this library.

## Regenerating Locale Data

To regenerate locale files from the dataset:

```bash
git clone https://github.com/uwdata/color-naming-in-different-languages
bun scripts/generate-locales.ts ./color-naming-in-different-languages/model/cleaned_color_data_by_lang
```

## License

MIT

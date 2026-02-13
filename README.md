# internationalized-color

Locale-aware color naming across 74 languages using OkLab color space and k-d trees for efficient nearest-neighbor lookup.

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

Register color spaces first, then load any locales you need:

```ts
import 'internationalized-color/css'; // registers all CSS Color Level 4 spaces
import { Color, ColorNamer } from 'internationalized-color';
import { en } from 'internationalized-color/locales/en';
import { ar } from 'internationalized-color/locales/ar';
import { ja } from 'internationalized-color/locales/ja';

const namer = new ColorNamer([en, ar, ja]);
const color = Color.parse('#ff6347');

// Name a color in English
namer.name(color, 'en'); // → "tomato"

// Name the same color in Japanese
namer.name(color, 'ja'); // → "朱色"

// Name at the basic (Berlin-Kay 11) tier only
namer.name(color, 'en', { level: 'basic' }); // → "red"

// Translate a color name across languages
namer.translate('red', 'en', 'ar'); // → "أحمر"
namer.translate('red', 'en', 'ja'); // → "赤"
namer.translate('blue', 'en', 'fr'); // → "bleu roi"

// Find the N closest named colors
namer.nearest(color, 'en', 3); // → ["tomato", "orangered", "coral"]
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

If you don't need all CSS color spaces, register only what you use:

```ts
import { setup, Color } from 'internationalized-color';
import { modeRgb, modeOklab, modeOklch } from 'culori/fn';

setup([modeRgb, modeOklab, modeOklch]);
```

## Supported Languages

74 languages with ISO 639-1 codes, plus 3 traditional/cultural color sets (Japanese wa-iro, Chinese traditional, Korean obangsaek).

<details>
<summary>Full language list</summary>

| Code | Language | Code | Language |
|------|----------|------|----------|
| aa | Afar | na | Nauru |
| ab | Abkhazian | nb | Norwegian Bokmål |
| af | Afrikaans | ne | Nepali |
| ak | Akan | nl | Dutch |
| am | Amharic | nn | Norwegian Nynorsk |
| ar | Arabic | no | Norwegian |
| az | Azerbaijani | ny | Chichewa |
| bg | Bulgarian | oc | Occitan |
| bn | Bengali | pa | Punjabi |
| ca | Catalan | pl | Polish |
| cr | Cree | ps | Pashto |
| cs | Czech | pt | Portuguese |
| cy | Welsh | ro | Romanian |
| da | Danish | ru | Russian |
| de | German | si | Sinhala |
| el | Greek | sk | Slovak |
| en | English | sl | Slovenian |
| es | Spanish | sm | Samoan |
| et | Estonian | so | Somali |
| fa | Persian | sq | Albanian |
| fi | Finnish | sr | Serbian |
| fr | French | su | Sundanese |
| ga | Irish | sv | Swedish |
| gu | Gujarati | ta | Tamil |
| he | Hebrew | te | Telugu |
| hi | Hindi | th | Thai |
| hr | Croatian | tl | Tagalog |
| hu | Hungarian | tr | Turkish |
| id | Indonesian | uk | Ukrainian |
| is | Icelandic | ur | Urdu |
| it | Italian | vi | Vietnamese |
| ja | Japanese | zh | Chinese |
| ka | Georgian | ja-traditional | Japanese wa-iro |
| kn | Kannada | zh-traditional | Chinese traditional |
| ko | Korean | ko-traditional | Korean obangsaek |
| lb | Luxembourgish | | |
| lt | Lithuanian | | |
| lv | Latvian | | |
| mk | Macedonian | | |
| ml | Malayalam | | |
| ms | Malay | | |
| my | Burmese | | |

</details>

## Data Source

Color naming data is derived from the **Many Languages, Many Colors Dataset**:

> Younghoon Kim, Kyle Thayer, Gabriella Silva Gorsky, and Jeffrey Heer.
> "[Color Names Across Languages: Salient Colors and Term Translation in Multilingual Color Naming Models](http://idl.cs.washington.edu/papers/multi-lingual-color-names/)."
> *EuroVis*, 2019.

Survey data from [github.com/uwdata/color-naming-in-different-languages](https://github.com/uwdata/color-naming-in-different-languages).

## Regenerating Locale Data

To regenerate locale files from the dataset:

```bash
git clone https://github.com/uwdata/color-naming-in-different-languages
bun scripts/generate-locales.ts ./color-naming-in-different-languages/model/cleaned_color_data_by_lang
```

## License

MIT

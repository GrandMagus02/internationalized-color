/**
 * Generates locale data files from the "Many Languages, Many Colors" dataset.
 *
 * Dataset: https://github.com/uwdata/color-naming-in-different-languages
 *
 * Citation:
 *   Kim, Thayer, Gorsky, Heer. "Color Names Across Languages:
 *   Salient Colors and Term Translation in Multilingual Color Naming Models."
 *   EuroVis 2019.
 *
 * Run with: bun scripts/generate-locales.ts [path-to-dataset-dir]
 *
 * The dataset dir should contain files like: cleaned_color_names-en.csv
 * Clone the dataset repo to get the data:
 *   git clone https://github.com/uwdata/color-naming-in-different-languages
 *   bun scripts/generate-locales.ts ./color-naming-in-different-languages/model/cleaned_color_data_by_lang
 */
import {
  useMode,
  modeRgb,
  modeOklab,
  modeOklch,
  modeLrgb,
  converter,
} from 'culori/fn';

useMode(modeRgb);
useMode(modeOklab);
useMode(modeOklch);
useMode(modeLrgb);

const toOklab = converter('oklab');

// === Configuration ===

const DATASET_DIR = process.argv[2] || './data/cleaned_color_data_by_lang';
const OUT_DIR = './src/locales';

/** Number of top-frequency names for the basic tier */
const BASIC_COUNT = 11;
/** Number of next-frequency names for the extended tier */
const EXTENDED_COUNT = 20;
/** Datasets with >= this many rows filter out rare names */
const LARGE_DATASET_THRESHOLD = 100;
/** Minimum occurrences for a name in large datasets */
const MIN_NAME_OCCURRENCES = 2;
/** Minimum unique color names to generate a locale */
const MIN_UNIQUE_NAMES = 3;

/** Skip non-ISO language identifiers and the empty-code file */
const SKIP_LANGS = new Set([
  '', 'bisaya', 'Cape Verdean Creol', 'Filipino',
  'Ixil', 'Mauritian creole', 'Saurashtri', 'Tamil',
]);

/** English uses CSS named colors; don't overwrite from dataset */
const SKIP_GENERATION = new Set(['en']);

// === CSV Parsing ===

function parseCSVRow(line: string): string[] {
  const fields: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') { current += '"'; i++; }
        else inQuotes = false;
      } else current += ch;
    } else {
      if (ch === '"') inQuotes = true;
      else if (ch === ',') { fields.push(current); current = ''; }
      else current += ch;
    }
  }
  fields.push(current);
  return fields;
}

// === Types ===

interface RawEntry {
  name: string;         // normalized (column 3, for grouping)
  displayName: string;  // standardized_entered_name (column 4, for display)
  r: number;
  g: number;
  b: number;
}

interface ColorAggregate {
  displayName: string;
  count: number;
  r: number;
  g: number;
  b: number;
  hex: string;
}

interface LocaleEntry {
  name: string;
  hex: string;
}

interface LocaleData {
  locale: string;
  /** Override filename (without .ts extension), defaults to locale */
  filename?: string;
  langName: string;
  source: string;
  sampleSize: number;
  basic: LocaleEntry[];
  extended: LocaleEntry[];
  traditional?: LocaleEntry[];
}

// === Processing ===

function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)));
  return '#' + [clamp(r), clamp(g), clamp(b)]
    .map(v => v.toString(16).padStart(2, '0'))
    .join('');
}

function computeOklab(hex: string): [number, number, number] {
  const c = toOklab(hex)!;
  return [
    +(c.l as number).toFixed(6),
    +(c.a as number).toFixed(6),
    +(c.b as number).toFixed(6),
  ];
}

function processEntries(entries: RawEntry[]): ColorAggregate[] {
  const groups = new Map<string, {
    displayNames: Map<string, number>;
    count: number;
    totalR: number;
    totalG: number;
    totalB: number;
  }>();

  for (const e of entries) {
    if (!e.name.trim()) continue;
    let g = groups.get(e.name);
    if (!g) {
      g = { displayNames: new Map(), count: 0, totalR: 0, totalG: 0, totalB: 0 };
      groups.set(e.name, g);
    }
    g.count++;
    g.totalR += e.r;
    g.totalG += e.g;
    g.totalB += e.b;
    g.displayNames.set(e.displayName, (g.displayNames.get(e.displayName) || 0) + 1);
  }

  const results: ColorAggregate[] = [];
  for (const [, g] of groups) {
    // Filter rare names in larger datasets
    if (entries.length >= LARGE_DATASET_THRESHOLD && g.count < MIN_NAME_OCCURRENCES) continue;

    // Pick most frequent display name
    let bestDisplay = '';
    let bestCount = 0;
    for (const [dn, cnt] of g.displayNames) {
      if (cnt > bestCount) { bestDisplay = dn; bestCount = cnt; }
    }

    const r = Math.round(g.totalR / g.count);
    const gVal = Math.round(g.totalG / g.count);
    const b = Math.round(g.totalB / g.count);

    results.push({
      displayName: bestDisplay,
      count: g.count,
      r, g: gVal, b,
      hex: rgbToHex(r, gVal, b),
    });
  }

  results.sort((a, b) => b.count - a.count);
  return results;
}

async function readCSV(path: string): Promise<RawEntry[]> {
  const text = await Bun.file(path).text();
  const lines = text.split('\n');
  const entries: RawEntry[] = [];

  // Skip header
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]?.trim();
    if (!line) continue;
    const fields = parseCSVRow(line);
    // Columns: 0=participantId, 1=langAbv, 2=lang, 3=name,
    //          4=standardized_entered_name, 5=entered_name,
    //          6=colorSpace, 7=r, 8=g, 9=b, ...
    const name = fields[3] ?? '';
    const displayName = fields[4] ?? name;
    const r = parseInt(fields[7] ?? '', 10);
    const g = parseInt(fields[8] ?? '', 10);
    const b = parseInt(fields[9] ?? '', 10);

    if (!name || isNaN(r) || isNaN(g) || isNaN(b)) continue;
    entries.push({ name, displayName, r, g, b });
  }

  return entries;
}

// === File Generation ===

function generateFile(data: LocaleData): string {
  const lines: string[] = [];
  const exportName = data.filename ?? data.locale;
  const varName = exportName.replace(/-/g, '_');

  lines.push(`import type { ColorDictionary } from '../types.ts';`);
  lines.push(``);
  lines.push(`// ${data.langName} — ${data.sampleSize} survey responses`);
  lines.push(`export const ${varName}: ColorDictionary = {`);
  lines.push(`  locale: '${data.locale}',`);
  lines.push(`  source: '${data.source}',`);

  for (const tier of ['basic', 'extended', 'traditional'] as const) {
    const entries = data[tier];
    if (!entries || entries.length === 0) continue;

    lines.push(`  ${tier}: {`);
    lines.push(`    names: [`);
    for (const e of entries) {
      lines.push(`      '${e.name.replace(/'/g, "\\'")}',`);
    }
    lines.push(`    ],`);
    lines.push(`    colors: new Float32Array([`);
    for (const e of entries) {
      const [l, a, b] = computeOklab(e.hex);
      lines.push(`      ${l}, ${a}, ${b},`);
    }
    lines.push(`    ]),`);
    lines.push(`  },`);
  }

  lines.push(`};`);
  lines.push(``);
  return lines.join('\n');
}

// === Traditional Variants (hand-curated cultural data) ===

const traditionalVariants: LocaleData[] = [
  {
    locale: 'ja',
    filename: 'ja-traditional',
    langName: 'Japanese Traditional (和色 wa-iro)',
    source: 'wa-iro',
    sampleSize: 0,
    basic: [],
    extended: [],
    traditional: [
      { name: '桜色', hex: '#fef4f4' },
      { name: '薄桜', hex: '#fdeff2' },
      { name: '桜鼠', hex: '#e9dfe5' },
      { name: '鴇色', hex: '#f4b3c2' },
      { name: '撫子色', hex: '#ecb3c3' },
      { name: '紅梅色', hex: '#e7609e' },
      { name: '躑躅色', hex: '#e95295' },
      { name: '牡丹色', hex: '#e7609e' },
      { name: '今様色', hex: '#d0576b' },
      { name: '中紅', hex: '#c85179' },
      { name: '退紅', hex: '#d69090' },
      { name: '一斤染', hex: '#f5b1aa' },
      { name: '珊瑚色', hex: '#f5b1aa' },
      { name: '紅色', hex: '#c3272b' },
      { name: '銀朱', hex: '#c85554' },
      { name: '朱色', hex: '#ec6d51' },
      { name: '曙色', hex: '#f19072' },
      { name: '茜色', hex: '#b7282e' },
      { name: '赤錆色', hex: '#8a3b2c' },
      { name: '紅檜皮', hex: '#7b4741' },
      { name: '海老茶', hex: '#773c30' },
      { name: '栗梅', hex: '#852e19' },
      { name: '弁柄色', hex: '#8f2e14' },
      { name: '赤橙', hex: '#ea5506' },
      { name: '金赤', hex: '#ea5506' },
      { name: '照柿', hex: '#eb6101' },
      { name: '柿色', hex: '#ed6d3d' },
      { name: '黄丹', hex: '#ee7800' },
      { name: '橙色', hex: '#ee7800' },
      { name: '蜜柑色', hex: '#f08300' },
      { name: '金茶', hex: '#f39800' },
      { name: '黄朽葉', hex: '#d3a243' },
      { name: '山吹色', hex: '#f8b500' },
      { name: '鬱金色', hex: '#fabf14' },
      { name: '蒲公英色', hex: '#ffd900' },
      { name: '黄色', hex: '#ffd900' },
      { name: '刈安色', hex: '#f5e56b' },
      { name: '鶸色', hex: '#d7cf3a' },
      { name: '黄緑', hex: '#b8d200' },
      { name: '若草色', hex: '#c3d825' },
      { name: '若葉色', hex: '#b9d08b' },
      { name: '抹茶色', hex: '#c5c56a' },
      { name: '萌黄', hex: '#a9c087' },
      { name: '松葉色', hex: '#687e52' },
      { name: '緑', hex: '#009944' },
      { name: '常盤色', hex: '#007b43' },
      { name: '千歳緑', hex: '#316745' },
      { name: '深緑', hex: '#004d25' },
      { name: '若竹色', hex: '#68be8d' },
      { name: '青竹色', hex: '#7ebeab' },
      { name: '青磁色', hex: '#7ebea5' },
      { name: '浅葱色', hex: '#00a3af' },
      { name: '納戸色', hex: '#008899' },
      { name: '花浅葱', hex: '#2a83a2' },
      { name: '新橋色', hex: '#59b9c6' },
      { name: '水色', hex: '#bce2e8' },
      { name: '甕覗', hex: '#c4dfe6' },
      { name: '白群', hex: '#83ccd2' },
      { name: '空色', hex: '#a0d8ef' },
      { name: '勿忘草色', hex: '#89c3eb' },
      { name: '群青色', hex: '#4c6cb3' },
      { name: '瑠璃色', hex: '#1e50a2' },
      { name: '紺色', hex: '#223a70' },
      { name: '紺青', hex: '#192f60' },
      { name: '藍色', hex: '#165e83' },
      { name: '鉄紺', hex: '#17184b' },
      { name: '藤色', hex: '#bbbcde' },
      { name: '藤紫', hex: '#8b81c3' },
      { name: '桔梗色', hex: '#5654a2' },
      { name: '紫紺', hex: '#460e44' },
      { name: '菫色', hex: '#7058a3' },
      { name: '江戸紫', hex: '#745399' },
      { name: '紫', hex: '#884898' },
      { name: '京紫', hex: '#772f6d' },
      { name: '古代紫', hex: '#895b8a' },
      { name: '茄子紺', hex: '#824880' },
      { name: '葡萄色', hex: '#640125' },
      { name: '亜麻色', hex: '#c4a882' },
      { name: '榛色', hex: '#bfa46f' },
      { name: '丁子色', hex: '#efcd9a' },
      { name: '胡桃色', hex: '#a86f4c' },
      { name: '朽葉色', hex: '#917347' },
      { name: '鳶色', hex: '#724938' },
      { name: '涅色', hex: '#2e211b' },
      { name: '檜皮色', hex: '#6c3524' },
      { name: '鉛色', hex: '#7b7c7d' },
      { name: '利休鼠', hex: '#888e7e' },
      { name: '素鼠', hex: '#9fa0a0' },
      { name: '銀鼠', hex: '#afafb0' },
      { name: '白鼠', hex: '#dcdddd' },
      { name: '生成り', hex: '#fbfaf5' },
      { name: '乳白色', hex: '#f3f3f3' },
      { name: '象牙色', hex: '#f8f4e6' },
      { name: '胡粉色', hex: '#fffffc' },
      { name: '漆黒', hex: '#0d0015' },
      { name: '墨色', hex: '#343434' },
      { name: '鉄黒', hex: '#281a14' },
    ],
  },
  {
    locale: 'zh',
    filename: 'zh-traditional',
    langName: 'Chinese Traditional Colors (中国传统颜色)',
    source: 'zh-traditional',
    sampleSize: 0,
    basic: [],
    extended: [],
    traditional: [
      { name: '胭脂', hex: '#9d2933' },
      { name: '朱砂', hex: '#ff461f' },
      { name: '火红', hex: '#ff2d2d' },
      { name: '朱红', hex: '#ff4c00' },
      { name: '丹', hex: '#ff4e20' },
      { name: '彤', hex: '#f35336' },
      { name: '绛', hex: '#7c0a02' },
      { name: '赤', hex: '#c3272b' },
      { name: '酡红', hex: '#dc3023' },
      { name: '殷红', hex: '#be002f' },
      { name: '枣红', hex: '#c32136' },
      { name: '樱桃色', hex: '#c93756' },
      { name: '银红', hex: '#f05654' },
      { name: '大红', hex: '#ff2121' },
      { name: '桃红', hex: '#f47983' },
      { name: '海棠红', hex: '#db5a6b' },
      { name: '石榴红', hex: '#f20c00' },
      { name: '玫瑰红', hex: '#c45a65' },
      { name: '嫣红', hex: '#ef7a82' },
      { name: '粉红', hex: '#ffb3a7' },
      { name: '橘黄', hex: '#f28500' },
      { name: '杏黄', hex: '#f0c239' },
      { name: '橙黄', hex: '#ffa400' },
      { name: '鹅黄', hex: '#fff143' },
      { name: '明黄', hex: '#f2ce2b' },
      { name: '姜黄', hex: '#e2c027' },
      { name: '秋香色', hex: '#d9b611' },
      { name: '柠檬黄', hex: '#fcd217' },
      { name: '藤黄', hex: '#f2be45' },
      { name: '雌黄', hex: '#ffc64b' },
      { name: '缃色', hex: '#f0c239' },
      { name: '天青', hex: '#68b0ab' },
      { name: '碧蓝', hex: '#3eede7' },
      { name: '蔚蓝', hex: '#70f3ff' },
      { name: '宝蓝', hex: '#4b5cc4' },
      { name: '靛蓝', hex: '#065279' },
      { name: '靛青', hex: '#177cb0' },
      { name: '群青', hex: '#4c8dae' },
      { name: '花青', hex: '#003472' },
      { name: '石青', hex: '#1685a9' },
      { name: '铁青', hex: '#3b818c' },
      { name: '品蓝', hex: '#4b5cc4' },
      { name: '黛蓝', hex: '#425066' },
      { name: '藏蓝', hex: '#2e4e7e' },
      { name: '青碧', hex: '#48c0a3' },
      { name: '翠绿', hex: '#00e09e' },
      { name: '苍翠', hex: '#519a73' },
      { name: '豆绿', hex: '#9ed048' },
      { name: '松花绿', hex: '#057748' },
      { name: '竹青', hex: '#789262' },
      { name: '石绿', hex: '#16a951' },
      { name: '松柏绿', hex: '#21a675' },
      { name: '葱绿', hex: '#9ed900' },
      { name: '鲜绿', hex: '#00e500' },
      { name: '油绿', hex: '#00bc12' },
      { name: '茶色', hex: '#b35c44' },
      { name: '栗色', hex: '#60281e' },
      { name: '驼色', hex: '#a0522d' },
      { name: '赭色', hex: '#955539' },
      { name: '棕色', hex: '#a25b20' },
      { name: '棕榈', hex: '#6e511e' },
      { name: '象牙白', hex: '#fffbf0' },
      { name: '月白', hex: '#d6ecf0' },
      { name: '缟', hex: '#f2ecde' },
      { name: '藕荷色', hex: '#e4c6d0' },
      { name: '丁香色', hex: '#cca4e3' },
      { name: '雪青', hex: '#b0a4e3' },
      { name: '紫棠', hex: '#56004f' },
      { name: '青莲', hex: '#801dae' },
      { name: '紫酱', hex: '#815463' },
      { name: '酱紫', hex: '#815476' },
      { name: '银灰', hex: '#b2bbbe' },
      { name: '鸦青', hex: '#424c50' },
      { name: '铅白', hex: '#f0f0f4' },
      { name: '玄色', hex: '#622a1d' },
      { name: '墨色', hex: '#50616d' },
      { name: '漆黑', hex: '#161823' },
    ],
  },
  {
    locale: 'ko',
    filename: 'ko-traditional',
    langName: 'Korean Traditional (오방색 + 오간색)',
    source: 'ko-traditional',
    sampleSize: 0,
    basic: [],
    extended: [],
    traditional: [
      // 오방색 (Five directional colors)
      { name: '청', hex: '#0000ff' },
      { name: '적', hex: '#ff0000' },
      { name: '황', hex: '#ffff00' },
      { name: '백', hex: '#ffffff' },
      { name: '흑', hex: '#000000' },
      // 오간색 (Five secondary colors)
      { name: '녹', hex: '#008000' },
      { name: '홍', hex: '#ff4500' },
      { name: '벽', hex: '#00ffff' },
      { name: '유황', hex: '#ffa500' },
      { name: '자', hex: '#800080' },
      // Traditional Korean colors
      { name: '옥색', hex: '#00a86b' },
      { name: '비색', hex: '#9fafb0' },
      { name: '치자색', hex: '#ffbb00' },
      { name: '쪽색', hex: '#00477f' },
      { name: '감색', hex: '#191970' },
      { name: '먹색', hex: '#343434' },
      { name: '송화색', hex: '#c4bb97' },
      { name: '두록색', hex: '#4b830d' },
      { name: '연지색', hex: '#e60033' },
      { name: '지황색', hex: '#e0a929' },
    ],
  },
];

// === Language name map for ISO 639-1 codes ===
// Extracted from dataset lang column; used for file comments.
const LANG_NAMES: Record<string, string> = {
  aa: 'Afar', ab: 'Abkhazian', af: 'Afrikaans', ak: 'Akan',
  am: 'Amharic (አማርኛ)', ar: 'Arabic (العربية)', az: 'Azerbaijani (Azərbaycanca)',
  bg: 'Bulgarian (Български)', bn: 'Bengali (বাংলা)',
  ca: 'Catalan (Català)', cr: 'Cree', cs: 'Czech (Čeština)', cy: 'Welsh (Cymraeg)',
  da: 'Danish (Dansk)', de: 'German (Deutsch)',
  el: 'Greek (Ελληνικά)', en: 'English', es: 'Spanish (Español)', et: 'Estonian (Eesti)',
  fa: 'Persian (فارسی)', fi: 'Finnish (Suomi)', fr: 'French (Français)',
  ga: 'Irish (Gaeilge)', gu: 'Gujarati (ગુજરાતી)',
  he: 'Hebrew (עברית)', hi: 'Hindi (हिन्दी)', hr: 'Croatian (Hrvatski)', hu: 'Hungarian (Magyar)',
  id: 'Indonesian (Bahasa Indonesia)', is: 'Icelandic (Íslenska)', it: 'Italian (Italiano)',
  ja: 'Japanese (日本語)',
  ka: 'Georgian (ქართული)', kn: 'Kannada (ಕನ್ನಡ)', ko: 'Korean (한국어)',
  lb: 'Luxembourgish (Lëtzebuergesch)', lt: 'Lithuanian (Lietuvių)', lv: 'Latvian (Latviešu)',
  mk: 'Macedonian (Македонски)', ml: 'Malayalam (മലയാളം)', ms: 'Malay (Bahasa Melayu)', my: 'Burmese (မြန်မာဘာသာ)',
  na: 'Nauru', nb: 'Norwegian Bokmål', ne: 'Nepali (नेपाली)', nl: 'Dutch (Nederlands)',
  nn: 'Norwegian Nynorsk', no: 'Norwegian (Norsk)', ny: 'Chichewa',
  oc: 'Occitan', pa: 'Punjabi (ਪੰਜਾਬੀ)', pl: 'Polish (Polski)', ps: 'Pashto (پښتو)',
  pt: 'Portuguese (Português)', ro: 'Romanian (Română)', ru: 'Russian (Русский)',
  si: 'Sinhala (සිංහල)', sk: 'Slovak (Slovenčina)', sl: 'Slovenian (Slovenščina)',
  sm: 'Samoan', so: 'Somali', sq: 'Albanian (Shqip)', sr: 'Serbian (Српски)',
  su: 'Sundanese', sv: 'Swedish (Svenska)',
  ta: 'Tamil (தமிழ்)', te: 'Telugu (తెలుగు)', th: 'Thai (ไทย)', tl: 'Tagalog',
  tr: 'Turkish (Türkçe)', uk: 'Ukrainian (Українська)', ur: 'Urdu (اردو)',
  vi: 'Vietnamese (Tiếng Việt)', zh: 'Chinese (中文)',
};

// === Main ===

async function main() {
  const dir = DATASET_DIR;

  // Verify dataset directory exists
  const dirFile = Bun.file(dir + '/cleaned_color_names-en.csv');
  if (!(await dirFile.exists())) {
    console.error(`Dataset directory not found: ${dir}`);
    console.error('');
    console.error('Clone the dataset first:');
    console.error('  git clone https://github.com/uwdata/color-naming-in-different-languages');
    console.error('  bun scripts/generate-locales.ts ./color-naming-in-different-languages/model/cleaned_color_data_by_lang');
    process.exit(1);
  }

  // Discover all language CSV files
  const glob = new Bun.Glob('cleaned_color_names-*.csv');
  const files: Array<{ lang: string; path: string }> = [];

  for await (const name of glob.scan({ cwd: dir })) {
    const match = name.match(/^cleaned_color_names-(.+)\.csv$/);
    if (!match || !match[1]) continue;
    const lang = match[1];
    if (SKIP_LANGS.has(lang)) continue;
    files.push({ lang, path: `${dir}/${name}` });
  }

  // Sort by language code
  files.sort((a, b) => a.lang.localeCompare(b.lang));

  console.log(`Found ${files.length} language datasets\n`);

  // Merge Tamil (full name) data into ta if both exist
  const tamilIdx = files.findIndex(f => f.lang === 'Tamil');
  if (tamilIdx >= 0) {
    files.splice(tamilIdx, 1);
    // Data will be merged into 'ta' below
  }

  // Process each language
  const generatedLocales: string[] = [];

  for (const { lang, path } of files) {
    if (SKIP_GENERATION.has(lang)) {
      generatedLocales.push(lang);
      continue;
    }

    // Read entries (merge Tamil data if this is 'ta')
    let entries = await readCSV(path);
    if (lang === 'ta') {
      const tamilPath = `${dir}/cleaned_color_names-Tamil.csv`;
      const tamilFile = Bun.file(tamilPath);
      if (await tamilFile.exists()) {
        const tamilEntries = await readCSV(tamilPath);
        entries = entries.concat(tamilEntries);
      }
    }

    if (entries.length === 0) {
      console.log(`  SKIP ${lang}: no valid entries`);
      continue;
    }

    const colors = processEntries(entries);
    if (colors.length < MIN_UNIQUE_NAMES) {
      console.log(`  SKIP ${lang}: only ${colors.length} unique names (need ${MIN_UNIQUE_NAMES})`);
      continue;
    }

    const basic = colors.slice(0, BASIC_COUNT).map(c => ({ name: c.displayName, hex: c.hex }));
    const extended = colors.slice(BASIC_COUNT, BASIC_COUNT + EXTENDED_COUNT).map(c => ({ name: c.displayName, hex: c.hex }));

    const langName = LANG_NAMES[lang] || lang;
    const data: LocaleData = {
      locale: lang,
      langName,
      source: 'uwdata-multilingual-colors',
      sampleSize: entries.length,
      basic,
      extended,
    };

    const content = generateFile(data);
    const outPath = `${OUT_DIR}/${lang}.ts`;
    await Bun.write(outPath, content);
    generatedLocales.push(lang);

    const totalColors = basic.length + extended.length;
    console.log(`  ${lang.padEnd(4)} ${langName.padEnd(40)} ${String(entries.length).padStart(6)} rows → ${basic.length} basic + ${extended.length} extended = ${totalColors} colors`);
  }

  // Generate traditional variant files
  for (const data of traditionalVariants) {
    const content = generateFile(data);
    const fname = data.filename ?? data.locale;
    const outPath = `${OUT_DIR}/${fname}.ts`;
    await Bun.write(outPath, content);
    console.log(`  ${fname.padEnd(16)} ${data.langName.padEnd(40)} ${data.traditional?.length ?? 0} traditional colors`);
  }

  // Sort locales for consistent output
  generatedLocales.sort();

  // Generate index.ts
  const indexLines: string[] = [];
  for (const loc of generatedLocales) {
    const varName = loc.replace(/-/g, '_');
    indexLines.push(`export { ${varName} } from './${loc}.ts';`);
  }
  // Traditional variants
  for (const data of traditionalVariants) {
    const fname = data.filename ?? data.locale;
    const varName = fname.replace(/-/g, '_');
    indexLines.push(`export { ${varName} } from './${fname}.ts';`);
  }
  indexLines.push('');
  await Bun.write(`${OUT_DIR}/index.ts`, indexLines.join('\n'));
  console.log(`\nGenerated ${OUT_DIR}/index.ts (${generatedLocales.length} locales + ${traditionalVariants.length} traditional variants)`);

  // Print package.json exports snippet
  console.log('\n=== package.json exports to add ===\n');
  const exports: Record<string, string> = {
    '.': './index.ts',
    './css': './src/bootstrap/css.ts',
  };
  for (const loc of generatedLocales) {
    exports[`./locales/${loc}`] = `./src/locales/${loc}.ts`;
  }
  for (const data of traditionalVariants) {
    const fname = data.filename ?? data.locale;
    exports[`./locales/${fname}`] = `./src/locales/${fname}.ts`;
  }
  exports['./locales'] = './src/locales/index.ts';
  console.log(JSON.stringify(exports, null, 2));

  console.log(`\nDone! Generated ${generatedLocales.length} locale files + ${traditionalVariants.length} traditional variants.`);
}

main();

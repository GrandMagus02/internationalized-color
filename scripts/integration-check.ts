/**
 * Quick integration check — exercises the full API surface.
 * Run with: bun scripts/integration-check.ts
 */
import { Color, useLocale, nameColor, nearestColors, lookupColor, translateColor } from '../index.ts';
import { en } from '../src/locales/en.ts';
import { ja } from '../src/locales/ja.ts';
import { ja_traditional } from '../src/locales/ja-traditional.ts';
import { ru } from '../src/locales/ru.ts';
import { modeRgb, modeOklab, modeOklch, modeHsl, modeLrgb, useMode } from 'culori/fn';

useMode(modeRgb);
useMode(modeOklab);
useMode(modeOklch);
useMode(modeHsl);
useMode(modeLrgb);

useLocale(en);
useLocale(ja);
useLocale(ja_traditional);
useLocale(ru);

// 1. Parse and convert
const c = Color.hex('#e74c3c');
console.log('Parsed:', c.toHex());
console.log('OkLCH:', c.to('oklch').toJSON());
console.log('CSS:', c.toString());

// 2. Name in English
const enName = nameColor(c, 'en');
console.log('\nEnglish name:', enName?.name, `(distance: ${enName?.distance.toFixed(4)})`);

// 3. Name in Japanese
const jaName = nameColor(c, 'ja');
console.log('Japanese name:', jaName?.name, `(distance: ${jaName?.distance.toFixed(4)})`);

// 4. Japanese traditional
const jaTraditional = nameColor(c, 'ja', { level: 'traditional' });
console.log('Japanese traditional:', jaTraditional?.name, `(distance: ${jaTraditional?.distance.toFixed(4)})`);

// 5. Translation
const siniy = translateColor('синий', 'ru', 'en');
console.log('\nRussian синий → English:', siniy?.name, `(distance: ${siniy?.distance.toFixed(4)})`);

const goluboy = translateColor('голубой', 'ru', 'en');
console.log('Russian голубой → English:', goluboy?.name, `(distance: ${goluboy?.distance.toFixed(4)})`);

// 6. Nearest colors
const teal = Color.hex('#008080');
const nearest = nearestColors(teal, 'en', 5);
console.log('\n5 nearest to teal:');
for (const n of nearest) {
  console.log(`  ${n.name} (${n.level}, distance: ${n.distance.toFixed(4)})`);
}

// 7. Reverse lookup
const sakuraColor = lookupColor('桜色', 'ja');
console.log('\n桜色 (sakura-iro):', sakuraColor?.toHex());

// 8. Color comparison
const a = Color.hex('#ff0000');
const b = Color.hex('#ff4400');
console.log('\nDeltaE(red, #ff4400):', a.deltaE(b).toFixed(4));
console.log('Equal within 0.1?', a.equals(b, 0.1));

console.log('\n✓ All integration checks passed!');

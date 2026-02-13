/**
 * Script to compute OkLab centroids for named colors.
 * Run with: bun scripts/compute-oklab.ts
 */
import {
  useMode,
  modeRgb,
  modeOklab,
  modeOklch,
  converter,
  colorsNamed,
} from 'culori/fn';

useMode(modeRgb);
useMode(modeOklab);
useMode(modeOklch);

const toOklab = converter('oklab');

// Berlin-Kay 11 basic color terms with representative hex values
const basicColors: Record<string, string> = {
  black: '#000000',
  white: '#ffffff',
  red: '#ff0000',
  green: '#008000',
  yellow: '#ffff00',
  blue: '#0000ff',
  brown: '#8b4513',
  orange: '#ffa500',
  pink: '#ffc0cb',
  purple: '#800080',
  grey: '#808080',
};

console.log('=== Basic Colors (Berlin-Kay 11) ===');
console.log('names:', JSON.stringify(Object.keys(basicColors)));
const basicOklab: number[] = [];
for (const [name, hex] of Object.entries(basicColors)) {
  const oklab = toOklab(hex)!;
  const l = oklab.l as number;
  const a = oklab.a as number;
  const b = oklab.b as number;
  basicOklab.push(l, a, b);
  console.log(`  ${name}: l=${l.toFixed(6)}, a=${a.toFixed(6)}, b=${b.toFixed(6)}`);
}
console.log('Float32Array:', JSON.stringify(basicOklab.map(v => +v.toFixed(6))));

// CSS Named Colors (148 colors from the CSS spec)
console.log('\n=== CSS Named Colors ===');
const cssNames = Object.keys(colorsNamed).sort();
console.log(`Count: ${cssNames.length}`);
const cssOklab: number[] = [];
for (const name of cssNames) {
  const oklab = toOklab(name)!;
  cssOklab.push(oklab.l as number, oklab.a as number, oklab.b as number);
}
console.log('names:', JSON.stringify(cssNames));
console.log('Float32Array:', JSON.stringify(cssOklab.map(v => +v.toFixed(6))));

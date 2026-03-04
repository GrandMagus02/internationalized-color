import type { ColorMode } from '../types.ts';

import { rgbToHsl, hslToRgb } from './rgb-hsl.ts';
import { rgbToHsv, hsvToRgb } from './rgb-hsv.ts';
import { rgbToHwb, hwbToRgb } from './rgb-hwb.ts';
import { rgbToLrgb, lrgbToRgb } from './rgb-lrgb.ts';
import { lrgbToXyz65, xyz65ToLrgb } from './lrgb-xyz65.ts';
import { xyz65ToOklab, oklabToXyz65 } from './xyz65-oklab.ts';
import { oklabToOklch, oklchToOklab } from './oklab-oklch.ts';
import { xyz65ToXyz50, xyz50ToXyz65 } from './xyz65-xyz50.ts';
import { xyz50ToLab, labToXyz50 } from './xyz50-lab.ts';
import { labToLch, lchToLab } from './lab-lch.ts';
import { xyz65ToP3, p3ToXyz65 } from './xyz65-p3.ts';
import { xyz65ToA98, a98ToXyz65 } from './xyz65-a98.ts';
import { xyz50ToProphoto, prophotoToXyz50 } from './xyz50-prophoto.ts';
import { xyz65ToRec2020, rec2020ToXyz65 } from './xyz65-rec2020.ts';

type ConvertFn = (a: number, b: number, c: number) => [number, number, number];

// Direct conversion edges (adjacency list)
const edges: Record<string, Record<string, ConvertFn>> = {
  rgb: { hsl: rgbToHsl, hsv: rgbToHsv, hwb: rgbToHwb, lrgb: rgbToLrgb },
  hsl: { rgb: hslToRgb },
  hsv: { rgb: hsvToRgb },
  hwb: { rgb: hwbToRgb },
  lrgb: { rgb: lrgbToRgb, xyz65: lrgbToXyz65 },
  xyz65: {
    lrgb: xyz65ToLrgb,
    oklab: xyz65ToOklab,
    xyz50: xyz65ToXyz50,
    p3: xyz65ToP3,
    a98: xyz65ToA98,
    rec2020: xyz65ToRec2020,
  },
  oklab: { xyz65: oklabToXyz65, oklch: oklabToOklch },
  oklch: { oklab: oklchToOklab },
  xyz50: { xyz65: xyz50ToXyz65, lab: xyz50ToLab, prophoto: xyz50ToProphoto },
  lab: { xyz50: labToXyz50, lch: labToLch },
  lch: { lab: lchToLab },
  p3: { xyz65: p3ToXyz65 },
  a98: { xyz65: a98ToXyz65 },
  prophoto: { xyz50: prophotoToXyz50 },
  rec2020: { xyz65: rec2020ToXyz65 },
};

// BFS path cache
const pathCache = new Map<string, ConvertFn[]>();

function findPath(from: ColorMode, to: ColorMode): ConvertFn[] | null {
  const key = `${from}→${to}`;
  const cached = pathCache.get(key);
  if (cached) return cached;

  // BFS
  const queue: { mode: string; path: ConvertFn[] }[] = [{ mode: from, path: [] }];
  const visited = new Set<string>([from]);

  while (queue.length > 0) {
    const { mode, path } = queue.shift()!;
    const neighbors = edges[mode];
    if (!neighbors) continue;

    for (const [next, fn] of Object.entries(neighbors)) {
      if (next === to) {
        const fullPath = [...path, fn];
        pathCache.set(key, fullPath);
        return fullPath;
      }
      if (!visited.has(next)) {
        visited.add(next);
        queue.push({ mode: next, path: [...path, fn] });
      }
    }
  }

  return null;
}

export function convert(
  from: ColorMode,
  to: ColorMode,
  channels: [number, number, number],
): [number, number, number] | null {
  if (from === to) return channels;

  const path = findPath(from, to);
  if (!path) return null;

  let current = channels;
  for (const fn of path) {
    current = fn(current[0], current[1], current[2]);
  }
  return current;
}

// Re-export individual conversion functions for direct use
export { rgbToHsl, hslToRgb } from './rgb-hsl.ts';
export { rgbToHsv, hsvToRgb } from './rgb-hsv.ts';
export { rgbToHwb, hwbToRgb } from './rgb-hwb.ts';
export { rgbToLrgb, lrgbToRgb } from './rgb-lrgb.ts';
export { lrgbToXyz65, xyz65ToLrgb } from './lrgb-xyz65.ts';
export { xyz65ToOklab, oklabToXyz65 } from './xyz65-oklab.ts';
export { oklabToOklch, oklchToOklab } from './oklab-oklch.ts';
export { xyz65ToXyz50, xyz50ToXyz65 } from './xyz65-xyz50.ts';
export { xyz50ToLab, labToXyz50 } from './xyz50-lab.ts';
export { labToLch, lchToLab } from './lab-lch.ts';
export { xyz65ToP3, p3ToXyz65 } from './xyz65-p3.ts';
export { xyz65ToA98, a98ToXyz65 } from './xyz65-a98.ts';
export { xyz50ToProphoto, prophotoToXyz50 } from './xyz50-prophoto.ts';
export { xyz65ToRec2020, rec2020ToXyz65 } from './xyz65-rec2020.ts';

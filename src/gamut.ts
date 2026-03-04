import { convert } from './conversions/index.ts';

// OkLCH chroma-reduction binary search for gamut mapping to sRGB
export function gamutMapToSrgb(
  r: number,
  g: number,
  b: number,
  sourceMode: 'rgb' | string,
): [number, number, number] {
  // If already in gamut, return as-is
  if (r >= 0 && r <= 1 && g >= 0 && g <= 1 && b >= 0 && b <= 1) {
    return [r, g, b];
  }

  // Convert to OkLCH for chroma reduction
  let oklch: [number, number, number] | null;
  if (sourceMode === 'rgb') {
    oklch = convert('rgb', 'oklch', [r, g, b]);
  } else {
    // Already have rgb values that are out of gamut
    oklch = convert('rgb', 'oklch', [r, g, b]);
  }
  if (!oklch) return [Math.max(0, Math.min(1, r)), Math.max(0, Math.min(1, g)), Math.max(0, Math.min(1, b))];

  const [l, , h] = oklch;

  // Edge cases
  if (l >= 1) return [1, 1, 1];
  if (l <= 0) return [0, 0, 0];

  // Binary search on chroma
  let lo = 0;
  let hi = oklch[1];
  let bestRgb: [number, number, number] = [Math.max(0, Math.min(1, r)), Math.max(0, Math.min(1, g)), Math.max(0, Math.min(1, b))];

  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    const rgb = convert('oklch', 'rgb', [l, mid, h]);
    if (!rgb) break;

    const [rr, gg, bb] = rgb;
    if (rr >= -0.001 && rr <= 1.001 && gg >= -0.001 && gg <= 1.001 && bb >= -0.001 && bb <= 1.001) {
      bestRgb = [Math.max(0, Math.min(1, rr)), Math.max(0, Math.min(1, gg)), Math.max(0, Math.min(1, bb))];
      lo = mid;
    } else {
      hi = mid;
    }
  }

  return bestRgb;
}

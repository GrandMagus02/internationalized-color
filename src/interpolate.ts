import type { ColorMode } from './types.ts';

// Cylindrical (hue-bearing) modes and their hue channel index
const hueChannelIndex: Partial<Record<ColorMode, number>> = {
  hsl: 0,
  hsv: 0,
  hwb: 0,
  oklch: 2,
  lch: 2,
};

function lerpAngle(a: number, b: number, t: number): number {
  // Shortest-arc hue interpolation
  let delta = ((b - a + 540) % 360) - 180;
  let result = a + delta * t;
  return ((result % 360) + 360) % 360;
}

export function interpolateChannels(
  mode: ColorMode,
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  const hueIdx = hueChannelIndex[mode];

  const result: [number, number, number] = [0, 0, 0];
  for (let i = 0; i < 3; i++) {
    if (i === hueIdx) {
      result[i] = lerpAngle(a[i]!, b[i]!, t);
    } else {
      result[i] = a[i]! + (b[i]! - a[i]!) * t;
    }
  }
  return result;
}

export function interpolateAlpha(a: number | undefined, b: number | undefined, t: number): number | undefined {
  const aa = a ?? 1;
  const bb = b ?? 1;
  if (aa === 1 && bb === 1) return undefined;
  return aa + (bb - aa) * t;
}

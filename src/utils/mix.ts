import { Color, createColorInstance } from '../Color.ts';
import { interpolateChannels, interpolateAlpha } from '../interpolate.ts';
import type { ColorMode } from '../types.ts';

export function mixColors(a: Color | string, b: Color | string, amount = 0.5, mode: ColorMode | string = 'oklab'): Color | undefined {
  const colorA = typeof a === 'string' ? Color.parse(a) : a;
  const colorB = typeof b === 'string' ? Color.parse(b) : b;
  if (!colorA || !colorB) return undefined;

  const mixMode = mode as ColorMode;
  const aConverted = colorA.to(mixMode);
  const bConverted = colorB.to(mixMode);
  if (!aConverted || !bConverted) return undefined;

  const mixed = interpolateChannels(mixMode, aConverted.toArray(), bConverted.toArray(), amount);
  const mixedAlpha = interpolateAlpha(colorA.alpha, colorB.alpha, amount);
  const result = createColorInstance(mixMode, mixed, mixedAlpha);

  if (mixMode !== colorA.mode) {
    return result.to(colorA.mode);
  }
  return result;
}

export function lighten(color: Color | string, amount = 0.1): Color | undefined {
  const c = typeof color === 'string' ? Color.parse(color) : color;
  if (!c) return undefined;

  const lab = c.to('oklab')!;
  const values = lab.toArray();
  const l = Math.min(1, values[0] + amount);
  const adjusted = createColorInstance('oklab', [l, values[1], values[2]], c.alpha);
  if (c.mode !== 'oklab') {
    return adjusted.to(c.mode)!;
  }
  return adjusted;
}

export function darken(color: Color | string, amount = 0.1): Color | undefined {
  const c = typeof color === 'string' ? Color.parse(color) : color;
  if (!c) return undefined;

  const lab = c.to('oklab')!;
  const values = lab.toArray();
  const l = Math.max(0, values[0] - amount);
  const adjusted = createColorInstance('oklab', [l, values[1], values[2]], c.alpha);
  if (c.mode !== 'oklab') {
    return adjusted.to(c.mode)!;
  }
  return adjusted;
}

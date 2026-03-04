import { Color } from '../Color.ts';
import type { ColorMode } from '../types.ts';

export function mixColors(a: Color | string, b: Color | string, amount = 0.5, mode: ColorMode | string = 'oklab'): Color | undefined {
  const colorA = typeof a === 'string' ? Color.parse(a) : a;
  if (!colorA) return undefined;
  return colorA.mix(b, amount, mode);
}

export function lighten(color: Color | string, amount = 0.1): Color | undefined {
  const c = typeof color === 'string' ? Color.parse(color) : color;
  return c?.lighten(amount);
}

export function darken(color: Color | string, amount = 0.1): Color | undefined {
  const c = typeof color === 'string' ? Color.parse(color) : color;
  return c?.darken(amount);
}

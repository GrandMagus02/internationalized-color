import { Color } from '../Color.ts';
import type { ColorMode } from '../types.ts';

export function convertColor(color: Color | string, mode: ColorMode | string): Color | undefined {
  const c = typeof color === 'string' ? Color.parse(color) : color;
  return c?.to(mode as ColorMode);
}

export function toHex(color: Color | string): string | undefined {
  const c = typeof color === 'string' ? Color.parse(color) : color;
  return c?.toHex();
}

export function toCSS(color: Color | string): string | undefined {
  const c = typeof color === 'string' ? Color.parse(color) : color;
  return c?.toString();
}

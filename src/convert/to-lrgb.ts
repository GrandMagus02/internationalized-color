import { Color } from '../Color.ts';
import { LRGBColor } from '../spaces/lrgb.ts';
import { convert } from '../conversions/index.ts';

export function toLrgb(color: Color): LRGBColor {
  if (color instanceof LRGBColor) return color;
  const result = convert(color.mode, 'lrgb', color.toArray());
  if (!result) throw new Error(`Cannot convert ${color.mode} to lrgb`);
  return new LRGBColor(result[0], result[1], result[2], color.alpha);
}

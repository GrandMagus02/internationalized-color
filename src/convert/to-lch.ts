import { Color } from '../Color.ts';
import { LchColor } from '../spaces/lch.ts';
import { convert } from '../conversions/index.ts';

export function toLch(color: Color): LchColor {
  if (color instanceof LchColor) return color;
  const result = convert(color.mode, 'lch', color.toArray());
  if (!result) throw new Error(`Cannot convert ${color.mode} to lch`);
  return new LchColor(result[0], result[1], result[2], color.alpha);
}

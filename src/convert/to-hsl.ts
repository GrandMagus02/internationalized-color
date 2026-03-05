import { Color } from '../Color.ts';
import { HSLColor } from '../spaces/hsl.ts';
import { convert } from '../conversions/index.ts';

export function toHsl(color: Color): HSLColor {
  if (color instanceof HSLColor) return color;
  const result = convert(color.mode, 'hsl', color.toArray());
  if (!result) throw new Error(`Cannot convert ${color.mode} to hsl`);
  return new HSLColor(result[0], result[1], result[2], color.alpha);
}

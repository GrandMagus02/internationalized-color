import { Color } from '../Color.ts';
import { XYZ65Color } from '../spaces/xyz65.ts';
import { convert } from '../conversions/index.ts';

export function toXyz65(color: Color): XYZ65Color {
  if (color instanceof XYZ65Color) return color;
  const result = convert(color.mode, 'xyz65', color.toArray());
  if (!result) throw new Error(`Cannot convert ${color.mode} to xyz65`);
  return new XYZ65Color(result[0], result[1], result[2], color.alpha);
}

import { Color } from '../Color.ts';
import { A98Color } from '../spaces/a98.ts';
import { convert } from '../conversions/index.ts';

export function toA98(color: Color): A98Color {
  if (color instanceof A98Color) return color;
  const result = convert(color.mode, 'a98', color.toArray());
  if (!result) throw new Error(`Cannot convert ${color.mode} to a98`);
  return new A98Color(result[0], result[1], result[2], color.alpha);
}

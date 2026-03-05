import { Color } from '../Color.ts';
import { OklabColor } from '../spaces/oklab.ts';
import { convert } from '../conversions/index.ts';

export function toOklab(color: Color): OklabColor {
  if (color instanceof OklabColor) return color;
  const result = convert(color.mode, 'oklab', color.toArray());
  if (!result) throw new Error(`Cannot convert ${color.mode} to oklab`);
  return new OklabColor(result[0], result[1], result[2], color.alpha);
}

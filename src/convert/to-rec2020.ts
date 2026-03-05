import { Color } from '../Color.ts';
import { Rec2020Color } from '../spaces/rec2020.ts';
import { convert } from '../conversions/index.ts';

export function toRec2020(color: Color): Rec2020Color {
  if (color instanceof Rec2020Color) return color;
  const result = convert(color.mode, 'rec2020', color.toArray());
  if (!result) throw new Error(`Cannot convert ${color.mode} to rec2020`);
  return new Rec2020Color(result[0], result[1], result[2], color.alpha);
}

import { Color } from '../Color.ts';
import { ProphotoColor } from '../spaces/prophoto.ts';
import { convert } from '../conversions/index.ts';

export function toProphoto(color: Color): ProphotoColor {
  if (color instanceof ProphotoColor) return color;
  const result = convert(color.mode, 'prophoto', color.toArray());
  if (!result) throw new Error(`Cannot convert ${color.mode} to prophoto`);
  return new ProphotoColor(result[0], result[1], result[2], color.alpha);
}

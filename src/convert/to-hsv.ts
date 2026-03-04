import { Color } from '../Color.ts';
import { HSVColor } from '../spaces/hsv.ts';
import { convert } from '../conversions/index.ts';

export function toHsv(color: Color): HSVColor {
  if (color instanceof HSVColor) return color;
  const result = convert(color.mode, 'hsv', color.channelValues());
  if (!result) throw new Error(`Cannot convert ${color.mode} to hsv`);
  return new HSVColor(result[0], result[1], result[2], color.alpha);
}

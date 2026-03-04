import { Color } from '../Color.ts';
import { RGBColor } from '../spaces/rgb.ts';
import { convert } from '../conversions/index.ts';

export function toRgb(color: Color): RGBColor {
  if (color instanceof RGBColor) return color;
  const result = convert(color.mode, 'rgb', color.channelValues());
  if (!result) throw new Error(`Cannot convert ${color.mode} to rgb`);
  return new RGBColor(result[0], result[1], result[2], color.alpha);
}

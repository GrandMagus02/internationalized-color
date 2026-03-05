import { Color } from '../Color.ts';
import { HWBColor } from '../spaces/hwb.ts';
import { convert } from '../conversions/index.ts';

export function toHwb(color: Color): HWBColor {
  if (color instanceof HWBColor) return color;
  const result = convert(color.mode, 'hwb', color.toArray());
  if (!result) throw new Error(`Cannot convert ${color.mode} to hwb`);
  return new HWBColor(result[0], result[1], result[2], color.alpha);
}

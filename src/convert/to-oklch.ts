import { Color } from '../Color.ts';
import { OklchColor } from '../spaces/oklch.ts';
import { convert } from '../conversions/index.ts';

export function toOklch(color: Color): OklchColor {
  if (color instanceof OklchColor) return color;
  const result = convert(color.mode, 'oklch', color.channelValues());
  if (!result) throw new Error(`Cannot convert ${color.mode} to oklch`);
  return new OklchColor(result[0], result[1], result[2], color.alpha);
}

import { Color } from '../Color.ts';
import { XYZ50Color } from '../spaces/xyz50.ts';
import { convert } from '../conversions/index.ts';

export function toXyz50(color: Color): XYZ50Color {
  if (color instanceof XYZ50Color) return color;
  const result = convert(color.mode, 'xyz50', color.channelValues());
  if (!result) throw new Error(`Cannot convert ${color.mode} to xyz50`);
  return new XYZ50Color(result[0], result[1], result[2], color.alpha);
}

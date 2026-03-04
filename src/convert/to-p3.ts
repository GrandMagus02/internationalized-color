import { Color } from '../Color.ts';
import { P3Color } from '../spaces/p3.ts';
import { convert } from '../conversions/index.ts';

export function toP3(color: Color): P3Color {
  if (color instanceof P3Color) return color;
  const result = convert(color.mode, 'p3', color.channelValues());
  if (!result) throw new Error(`Cannot convert ${color.mode} to p3`);
  return new P3Color(result[0], result[1], result[2], color.alpha);
}

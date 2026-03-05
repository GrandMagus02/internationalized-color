import { Color } from '../Color.ts';
import { LabColor } from '../spaces/lab.ts';
import { convert } from '../conversions/index.ts';

export function toLab(color: Color): LabColor {
  if (color instanceof LabColor) return color;
  const result = convert(color.mode, 'lab', color.toArray());
  if (!result) throw new Error(`Cannot convert ${color.mode} to lab`);
  return new LabColor(result[0], result[1], result[2], color.alpha);
}

import { Color } from '../Color.ts';
import { convert } from '../conversions/index.ts';
import { formatHex } from '../format.ts';
import { gamutMapToSrgb } from '../gamut.ts';

export function toHex(color: Color): string {
  let rgb: [number, number, number];
  if (color.mode === 'rgb') {
    rgb = color.toArray();
  } else {
    const result = convert(color.mode, 'rgb', color.toArray());
    if (!result) throw new Error(`Cannot convert ${color.mode} to rgb`);
    rgb = result;
  }

  const [r, g, b] = rgb;
  if (r < 0 || r > 1 || g < 0 || g > 1 || b < 0 || b > 1) {
    rgb = gamutMapToSrgb(r, g, b, 'rgb');
  }

  return formatHex(rgb[0], rgb[1], rgb[2], color.alpha);
}

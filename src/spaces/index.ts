import { registerFactories, type Color } from '../Color.ts';
import type { ColorMode } from '../types.ts';
import { RGBColor } from './rgb.ts';
import { HSLColor } from './hsl.ts';
import { HSVColor } from './hsv.ts';
import { HWBColor } from './hwb.ts';
import { OklabColor } from './oklab.ts';
import { OklchColor } from './oklch.ts';
import { LabColor } from './lab.ts';
import { LchColor } from './lch.ts';
import { P3Color } from './p3.ts';
import { A98Color } from './a98.ts';
import { ProphotoColor } from './prophoto.ts';
import { Rec2020Color } from './rec2020.ts';
import { XYZ50Color } from './xyz50.ts';
import { XYZ65Color } from './xyz65.ts';
import { LRGBColor } from './lrgb.ts';

const factories: Record<ColorMode, (channels: [number, number, number], alpha?: number) => Color> = {
  rgb: (c, a) => new RGBColor(c[0], c[1], c[2], a),
  hsl: (c, a) => new HSLColor(c[0], c[1], c[2], a),
  hsv: (c, a) => new HSVColor(c[0], c[1], c[2], a),
  hwb: (c, a) => new HWBColor(c[0], c[1], c[2], a),
  oklab: (c, a) => new OklabColor(c[0], c[1], c[2], a),
  oklch: (c, a) => new OklchColor(c[0], c[1], c[2], a),
  lab: (c, a) => new LabColor(c[0], c[1], c[2], a),
  lch: (c, a) => new LchColor(c[0], c[1], c[2], a),
  p3: (c, a) => new P3Color(c[0], c[1], c[2], a),
  a98: (c, a) => new A98Color(c[0], c[1], c[2], a),
  prophoto: (c, a) => new ProphotoColor(c[0], c[1], c[2], a),
  rec2020: (c, a) => new Rec2020Color(c[0], c[1], c[2], a),
  xyz50: (c, a) => new XYZ50Color(c[0], c[1], c[2], a),
  xyz65: (c, a) => new XYZ65Color(c[0], c[1], c[2], a),
  lrgb: (c, a) => new LRGBColor(c[0], c[1], c[2], a),
};

registerFactories(factories);

export { RGBColor } from './rgb.ts';
export { HSLColor } from './hsl.ts';
export { HSVColor } from './hsv.ts';
export { HWBColor } from './hwb.ts';
export { OklabColor } from './oklab.ts';
export { OklchColor } from './oklch.ts';
export { LabColor } from './lab.ts';
export { LchColor } from './lch.ts';
export { P3Color } from './p3.ts';
export { A98Color } from './a98.ts';
export { ProphotoColor } from './prophoto.ts';
export { Rec2020Color } from './rec2020.ts';
export { XYZ50Color } from './xyz50.ts';
export { XYZ65Color } from './xyz65.ts';
export { LRGBColor } from './lrgb.ts';

import { Color } from '../Color.ts';
import type { ChannelDescriptor } from '../types.ts';
import { parseColor as parseColorInput } from '../parse.ts';
import type { RGBColor } from './rgb.ts';
import type { HSVColor } from './hsv.ts';
import type { HWBColor } from './hwb.ts';
import type { OklabColor } from './oklab.ts';
import type { OklchColor } from './oklch.ts';
import type { LabColor } from './lab.ts';
import type { LchColor } from './lch.ts';
import type { P3Color } from './p3.ts';
import type { A98Color } from './a98.ts';
import type { ProphotoColor } from './prophoto.ts';
import type { Rec2020Color } from './rec2020.ts';
import type { XYZ50Color } from './xyz50.ts';
import type { XYZ65Color } from './xyz65.ts';
import type { LRGBColor } from './lrgb.ts';

export class HSLColor extends Color {
  readonly mode = 'hsl' as const;
  readonly h: number;
  readonly s: number;
  readonly l: number;

  constructor(h: number, s: number, l: number, alpha?: number) {
    super(alpha);
    this.h = h;
    this.s = s;
    this.l = l;
  }

  get hue() { return this.h; }
  get saturation() { return this.s; }
  get lightness() { return this.l; }

  get channels(): ChannelDescriptor[] {
    return [
      { key: 'h', value: this.h, type: 'degree', min: 0, max: 360, label: 'hue' },
      { key: 's', value: this.s, type: 'percent', min: 0, max: 1, label: 'saturation' },
      { key: 'l', value: this.l, type: 'percent', min: 0, max: 1, label: 'lightness' },
    ];
  }

  override toRgb(): RGBColor { return this.to('rgb')! as RGBColor; }
  override toHsl(): HSLColor { return this.to('hsl')! as HSLColor; }
  override toHsv(): HSVColor { return this.to('hsv')! as HSVColor; }
  override toHwb(): HWBColor { return this.to('hwb')! as HWBColor; }
  override toOklab(): OklabColor { return this.to('oklab')! as OklabColor; }
  override toOklch(): OklchColor { return this.to('oklch')! as OklchColor; }
  override toLab(): LabColor { return this.to('lab')! as LabColor; }
  override toLch(): LchColor { return this.to('lch')! as LchColor; }
  override toP3(): P3Color { return this.to('p3')! as P3Color; }
  override toA98(): A98Color { return this.to('a98')! as A98Color; }
  override toProphoto(): ProphotoColor { return this.to('prophoto')! as ProphotoColor; }
  override toRec2020(): Rec2020Color { return this.to('rec2020')! as Rec2020Color; }
  override toXyz50(): XYZ50Color { return this.to('xyz50')! as XYZ50Color; }
  override toXyz65(): XYZ65Color { return this.to('xyz65')! as XYZ65Color; }
  override toLrgb(): LRGBColor { return this.to('lrgb')! as LRGBColor; }

  getHue(): number { return this.h; }
  setHue(value: number): HSLColor { return new HSLColor(value, this.s, this.l, this.alpha); }
  getSaturation(): number { return this.s; }
  setSaturation(value: number): HSLColor { return new HSLColor(this.h, value, this.l, this.alpha); }
  getLightness(): number { return this.l; }
  setLightness(value: number): HSLColor { return new HSLColor(this.h, this.s, value, this.alpha); }

  static parse(value: string): HSLColor | undefined {
    const result = parseColorInput(value);
    if (!result || result.mode !== 'hsl') return undefined;
    return new HSLColor(result.channels[0], result.channels[1], result.channels[2], result.alpha);
  }

  static fromArray(value: number[]): HSLColor | undefined {
    if (value.length < 3) return undefined;
    return new HSLColor(value[0], value[1], value[2], value[3]);
  }

  static fromObject(obj: Record<string, unknown>): HSLColor | undefined {
    if (typeof obj.h === 'number' && typeof obj.s === 'number' && typeof obj.l === 'number') {
      return new HSLColor(obj.h, obj.s, obj.l, obj.alpha as number | undefined);
    }
    return undefined;
  }
}

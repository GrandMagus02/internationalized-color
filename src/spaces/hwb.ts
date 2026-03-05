import { Color } from '../Color.ts';
import type { ChannelDescriptor } from '../types.ts';
import { parseColor as parseColorInput } from '../parse.ts';
import type { RGBColor } from './rgb.ts';
import type { HSLColor } from './hsl.ts';
import type { HSVColor } from './hsv.ts';
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

export class HWBColor extends Color {
  readonly mode = 'hwb' as const;
  readonly h: number;
  readonly w: number;
  readonly b: number;

  constructor(h: number, w: number, b: number, alpha?: number) {
    super(alpha);
    this.h = h;
    this.w = w;
    this.b = b;
  }

  get hue() { return this.h; }
  get whiteness() { return this.w; }
  get blackness() { return this.b; }

  get channels(): ChannelDescriptor[] {
    return [
      { key: 'h', value: this.h, type: 'degree', min: 0, max: 360, label: 'hue' },
      { key: 'w', value: this.w, type: 'percent', min: 0, max: 1, label: 'whiteness' },
      { key: 'b', value: this.b, type: 'percent', min: 0, max: 1, label: 'blackness' },
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
  setHue(value: number): HWBColor { return new HWBColor(value, this.w, this.b, this.alpha); }
  getWhiteness(): number { return this.w; }
  setWhiteness(value: number): HWBColor { return new HWBColor(this.h, value, this.b, this.alpha); }
  getBlackness(): number { return this.b; }
  setBlackness(value: number): HWBColor { return new HWBColor(this.h, this.w, value, this.alpha); }

  static parse(value: string): HWBColor | undefined {
    const result = parseColorInput(value);
    if (!result || result.mode !== 'hwb') return undefined;
    return new HWBColor(result.channels[0], result.channels[1], result.channels[2], result.alpha);
  }

  static fromArray(value: number[]): HWBColor | undefined {
    if (value.length < 3) return undefined;
    return new HWBColor(value[0], value[1], value[2], value[3]);
  }

  static fromObject(obj: Record<string, unknown>): HWBColor | undefined {
    if (typeof obj.h === 'number' && typeof obj.w === 'number' && typeof obj.b === 'number') {
      return new HWBColor(obj.h, obj.w, obj.b, obj.alpha as number | undefined);
    }
    return undefined;
  }
}

import { Color } from '../Color.ts';
import type { ChannelDescriptor } from '../types.ts';
import { parseColor as parseColorInput } from '../parse.ts';
import type { RGBColor } from './rgb.ts';
import type { HSLColor } from './hsl.ts';
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

export class LRGBColor extends Color {
  readonly mode = 'lrgb' as const;
  readonly r: number;
  readonly g: number;
  readonly b: number;

  constructor(r: number, g: number, b: number, alpha?: number) {
    super(alpha);
    this.r = r;
    this.g = g;
    this.b = b;
  }

  get red() { return this.r; }
  get green() { return this.g; }
  get blue() { return this.b; }

  get channels(): ChannelDescriptor[] {
    return [
      { key: 'r', value: this.r, type: 'percent', min: 0, max: 1, label: 'red' },
      { key: 'g', value: this.g, type: 'percent', min: 0, max: 1, label: 'green' },
      { key: 'b', value: this.b, type: 'percent', min: 0, max: 1, label: 'blue' },
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

  getRed(): number { return this.r; }
  setRed(value: number): LRGBColor { return new LRGBColor(value, this.g, this.b, this.alpha); }
  getGreen(): number { return this.g; }
  setGreen(value: number): LRGBColor { return new LRGBColor(this.r, value, this.b, this.alpha); }
  getBlue(): number { return this.b; }
  setBlue(value: number): LRGBColor { return new LRGBColor(this.r, this.g, value, this.alpha); }

  static parse(value: string): LRGBColor | undefined {
    const result = parseColorInput(value);
    if (!result || result.mode !== 'lrgb') return undefined;
    return new LRGBColor(result.channels[0], result.channels[1], result.channels[2], result.alpha);
  }

  static fromArray(value: number[]): LRGBColor | undefined {
    if (value.length < 3) return undefined;
    return new LRGBColor(value[0], value[1], value[2], value[3]);
  }

  static fromObject(obj: Record<string, unknown>): LRGBColor | undefined {
    if (typeof obj.r === 'number' && typeof obj.g === 'number' && typeof obj.b === 'number') {
      return new LRGBColor(obj.r, obj.g, obj.b, obj.alpha as number | undefined);
    }
    return undefined;
  }
}

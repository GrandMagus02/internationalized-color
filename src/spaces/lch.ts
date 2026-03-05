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
import type { P3Color } from './p3.ts';
import type { A98Color } from './a98.ts';
import type { ProphotoColor } from './prophoto.ts';
import type { Rec2020Color } from './rec2020.ts';
import type { XYZ50Color } from './xyz50.ts';
import type { XYZ65Color } from './xyz65.ts';
import type { LRGBColor } from './lrgb.ts';

export class LchColor extends Color {
  readonly mode = 'lch' as const;
  readonly l: number;
  readonly c: number;
  readonly h: number;

  constructor(l: number, c: number, h: number, alpha?: number) {
    super(alpha);
    this.l = l;
    this.c = c;
    this.h = h;
  }

  get lightness() { return this.l; }
  get chroma() { return this.c; }
  get hue() { return this.h; }

  get channels(): ChannelDescriptor[] {
    return [
      { key: 'l', value: this.l, type: 'number', min: 0, max: 100, label: 'lightness' },
      { key: 'c', value: this.c, type: 'number', min: 0, max: 150, label: 'chroma' },
      { key: 'h', value: this.h, type: 'degree', min: 0, max: 360, label: 'hue' },
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

  getLightness(): number { return this.l; }
  setLightness(value: number): LchColor { return new LchColor(value, this.c, this.h, this.alpha); }
  getChroma(): number { return this.c; }
  setChroma(value: number): LchColor { return new LchColor(this.l, value, this.h, this.alpha); }
  getHue(): number { return this.h; }
  setHue(value: number): LchColor { return new LchColor(this.l, this.c, value, this.alpha); }

  static parse(value: string): LchColor | undefined {
    const result = parseColorInput(value);
    if (!result || result.mode !== 'lch') return undefined;
    return new LchColor(result.channels[0], result.channels[1], result.channels[2], result.alpha);
  }

  static fromArray(value: number[]): LchColor | undefined {
    if (value.length < 3) return undefined;
    return new LchColor(value[0], value[1], value[2], value[3]);
  }

  static fromObject(obj: Record<string, unknown>): LchColor | undefined {
    if (typeof obj.l === 'number' && typeof obj.c === 'number' && typeof obj.h === 'number') {
      return new LchColor(obj.l, obj.c, obj.h, obj.alpha as number | undefined);
    }
    return undefined;
  }
}

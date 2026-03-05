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
import type { LRGBColor } from './lrgb.ts';

export class XYZ65Color extends Color {
  readonly mode = 'xyz65' as const;
  readonly x: number;
  readonly y: number;
  readonly z: number;

  constructor(x: number, y: number, z: number, alpha?: number) {
    super(alpha);
    this.x = x;
    this.y = y;
    this.z = z;
  }

  get channels(): ChannelDescriptor[] {
    return [
      { key: 'x', value: this.x, type: 'number', min: 0, max: 1, label: 'x' },
      { key: 'y', value: this.y, type: 'number', min: 0, max: 1, label: 'y' },
      { key: 'z', value: this.z, type: 'number', min: 0, max: 1, label: 'z' },
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

  static parse(value: string): XYZ65Color | undefined {
    const result = parseColorInput(value);
    if (!result || result.mode !== 'xyz65') return undefined;
    return new XYZ65Color(result.channels[0], result.channels[1], result.channels[2], result.alpha);
  }

  static fromArray(value: number[]): XYZ65Color | undefined {
    if (value.length < 3) return undefined;
    return new XYZ65Color(value[0], value[1], value[2], value[3]);
  }

  static fromObject(obj: Record<string, unknown>): XYZ65Color | undefined {
    if (typeof obj.x === 'number' && typeof obj.y === 'number' && typeof obj.z === 'number') {
      return new XYZ65Color(obj.x, obj.y, obj.z, obj.alpha as number | undefined);
    }
    return undefined;
  }
}

import { Color } from '../Color.ts';
import type { ChannelConfig } from '../types.ts';
import type { RGBColor } from './rgb.ts';
import type { HSLColor } from './hsl.ts';
import type { HSVColor } from './hsv.ts';
import type { HWBColor } from './hwb.ts';
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

export class OklabColor extends Color {
  readonly mode = 'oklab' as const;
  readonly l: number;
  readonly a: number;
  readonly b: number;

  constructor(l: number, a: number, b: number, alpha?: number) {
    super(alpha);
    this.l = l;
    this.a = a;
    this.b = b;
  }

  get lightness() { return this.l; }

  channelValues(): [number, number, number] { return [this.l, this.a, this.b]; }
  channelNames(): [string, string, string] { return ['l', 'a', 'b']; }
  channelLabels(): [string, string, string] { return ['lightness', 'a', 'b']; }
  channelConfig(): Record<string, ChannelConfig> {
    return { l: { min: 0, max: 1 }, a: { min: -0.4, max: 0.4 }, b: { min: -0.4, max: 0.4 } };
  }
  protected cloneWith(channels: [number, number, number], alpha?: number): Color {
    return new OklabColor(channels[0], channels[1], channels[2], alpha);
  }

  override toRgb(): RGBColor { return super.toRgb() as RGBColor; }
  override toHsl(): HSLColor { return super.toHsl() as HSLColor; }
  override toHsv(): HSVColor { return super.toHsv() as HSVColor; }
  override toHwb(): HWBColor { return super.toHwb() as HWBColor; }
  override toOklab(): OklabColor { return super.toOklab() as OklabColor; }
  override toOklch(): OklchColor { return super.toOklch() as OklchColor; }
  override toLab(): LabColor { return super.toLab() as LabColor; }
  override toLch(): LchColor { return super.toLch() as LchColor; }
  override toP3(): P3Color { return super.toP3() as P3Color; }
  override toA98(): A98Color { return super.toA98() as A98Color; }
  override toProphoto(): ProphotoColor { return super.toProphoto() as ProphotoColor; }
  override toRec2020(): Rec2020Color { return super.toRec2020() as Rec2020Color; }
  override toXyz50(): XYZ50Color { return super.toXyz50() as XYZ50Color; }
  override toXyz65(): XYZ65Color { return super.toXyz65() as XYZ65Color; }
  override toLrgb(): LRGBColor { return super.toLrgb() as LRGBColor; }
}

import { Color } from '../Color.ts';
import type { ChannelConfig } from '../types.ts';
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
import type { XYZ65Color } from './xyz65.ts';
import type { LRGBColor } from './lrgb.ts';

export class XYZ50Color extends Color {
  readonly mode = 'xyz50' as const;
  readonly x: number;
  readonly y: number;
  readonly z: number;

  constructor(x: number, y: number, z: number, alpha?: number) {
    super(alpha);
    this.x = x;
    this.y = y;
    this.z = z;
  }

  channelValues(): [number, number, number] { return [this.x, this.y, this.z]; }
  channelNames(): [string, string, string] { return ['x', 'y', 'z']; }
  channelLabels(): [string, string, string] { return ['x', 'y', 'z']; }
  channelConfig(): Record<string, ChannelConfig> {
    return { x: { min: 0, max: 1 }, y: { min: 0, max: 1 }, z: { min: 0, max: 1 } };
  }
  protected cloneWith(channels: [number, number, number], alpha?: number): Color {
    return new XYZ50Color(channels[0], channels[1], channels[2], alpha);
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

import { Color } from '../Color.ts';
import type { ChannelDescriptor } from '../types.ts';
import { parseColor as parseColorInput } from '../parse.ts';

export class RGBColor extends Color {
  readonly mode = 'rgb' as const;
  readonly r: number;
  readonly g: number;
  readonly b: number;

  constructor(r?: number, g?: number, b?: number, alpha?: number) {
    const hasChannels = r !== undefined || g !== undefined || b !== undefined;
    super(alpha ?? (hasChannels ? 1 : 0));
    this.r = r ?? 0;
    this.g = g ?? 0;
    this.b = b ?? 0;
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
  getRed(): number { return this.r; }
  setRed(value: number): RGBColor { return new RGBColor(value, this.g, this.b, this.alpha); }
  getGreen(): number { return this.g; }
  setGreen(value: number): RGBColor { return new RGBColor(this.r, value, this.b, this.alpha); }
  getBlue(): number { return this.b; }
  setBlue(value: number): RGBColor { return new RGBColor(this.r, this.g, value, this.alpha); }

  static override parse(value: string): RGBColor | undefined {
    const result = parseColorInput(value);
    if (!result || result.mode !== 'rgb') return undefined;
    return new RGBColor(result.channels[0], result.channels[1], result.channels[2], result.alpha);
  }

  static fromArray(value: number[]): RGBColor | undefined {
    if (value.length < 3) return undefined;
    return new RGBColor(value[0], value[1], value[2], value[3]);
  }

  static fromObject(obj: Record<string, unknown>): RGBColor | undefined {
    if (typeof obj.r === 'number' && typeof obj.g === 'number' && typeof obj.b === 'number') {
      return new RGBColor(obj.r, obj.g, obj.b, obj.alpha as number | undefined);
    }
    return undefined;
  }
}

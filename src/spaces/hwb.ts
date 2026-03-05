import { Color } from '../Color.ts';
import type { ChannelDescriptor } from '../types.ts';
import { parseColor as parseColorInput } from '../parse.ts';

export class HWBColor extends Color {
  readonly mode = 'hwb' as const;
  readonly h: number;
  readonly w: number;
  readonly b: number;

  constructor(h?: number, w?: number, b?: number, alpha?: number) {
    const hasChannels = h !== undefined || w !== undefined || b !== undefined;
    super(alpha ?? (hasChannels ? 1 : 0));
    this.h = h ?? 0;
    this.w = w ?? 0;
    this.b = b ?? 0;
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
  getHue(): number { return this.h; }
  setHue(value: number): HWBColor { return new HWBColor(value, this.w, this.b, this.alpha); }
  getWhiteness(): number { return this.w; }
  setWhiteness(value: number): HWBColor { return new HWBColor(this.h, value, this.b, this.alpha); }
  getBlackness(): number { return this.b; }
  setBlackness(value: number): HWBColor { return new HWBColor(this.h, this.w, value, this.alpha); }

  static override parse(value: string): HWBColor | undefined {
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

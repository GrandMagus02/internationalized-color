import { Color } from '../Color.ts';
import type { ChannelDescriptor } from '../types.ts';
import { parseColor as parseColorInput } from '../parse.ts';

export class HSVColor extends Color {
  readonly mode = 'hsv' as const;
  readonly h: number;
  readonly s: number;
  readonly v: number;

  constructor(h?: number, s?: number, v?: number, alpha?: number) {
    const hasChannels = h !== undefined || s !== undefined || v !== undefined;
    super(alpha ?? (hasChannels ? 1 : 0));
    this.h = h ?? 0;
    this.s = s ?? 0;
    this.v = v ?? 0;
  }

  get hue() { return this.h; }
  get saturation() { return this.s; }
  get value() { return this.v; }

  get channels(): ChannelDescriptor[] {
    return [
      { key: 'h', value: this.h, type: 'degree', min: 0, max: 360, label: 'hue' },
      { key: 's', value: this.s, type: 'percent', min: 0, max: 1, label: 'saturation' },
      { key: 'v', value: this.v, type: 'percent', min: 0, max: 1, label: 'value' },
    ];
  }
  getHue(): number { return this.h; }
  setHue(value: number): HSVColor { return new HSVColor(value, this.s, this.v, this.alpha); }
  getSaturation(): number { return this.s; }
  setSaturation(value: number): HSVColor { return new HSVColor(this.h, value, this.v, this.alpha); }
  getValue(): number { return this.v; }
  setValue(value: number): HSVColor { return new HSVColor(this.h, this.s, value, this.alpha); }

  static override parse(value: string): HSVColor | undefined {
    const result = parseColorInput(value);
    if (!result || result.mode !== 'hsv') return undefined;
    return new HSVColor(result.channels[0], result.channels[1], result.channels[2], result.alpha);
  }

  static fromArray(value: number[]): HSVColor | undefined {
    if (value.length < 3) return undefined;
    return new HSVColor(value[0], value[1], value[2], value[3]);
  }

  static fromObject(obj: Record<string, unknown>): HSVColor | undefined {
    if (typeof obj.h === 'number' && typeof obj.s === 'number' && typeof obj.v === 'number') {
      return new HSVColor(obj.h, obj.s, obj.v, obj.alpha as number | undefined);
    }
    return undefined;
  }
}

import { Color } from '../Color.ts';
import type { ChannelDescriptor } from '../types.ts';
import { parseColor as parseColorInput } from '../parse.ts';

export class HSLColor extends Color {
  readonly mode = 'hsl' as const;
  readonly h: number;
  readonly s: number;
  readonly l: number;

  constructor(h?: number, s?: number, l?: number, alpha?: number) {
    const hasChannels = h !== undefined || s !== undefined || l !== undefined;
    super(alpha ?? (hasChannels ? 1 : 0));
    this.h = h ?? 0;
    this.s = s ?? 0;
    this.l = l ?? 0;
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
  getHue(): number { return this.h; }
  setHue(value: number): HSLColor { return new HSLColor(value, this.s, this.l, this.alpha); }
  getSaturation(): number { return this.s; }
  setSaturation(value: number): HSLColor { return new HSLColor(this.h, value, this.l, this.alpha); }
  getLightness(): number { return this.l; }
  setLightness(value: number): HSLColor { return new HSLColor(this.h, this.s, value, this.alpha); }

  static override parse(value: string): HSLColor | undefined {
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

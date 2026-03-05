import { Color } from '../Color.ts';
import type { ChannelDescriptor } from '../types.ts';
import { parseColor as parseColorInput } from '../parse.ts';

export class OklchColor extends Color {
  readonly mode = 'oklch' as const;
  readonly l: number;
  readonly c: number;
  readonly h: number;

  constructor(l?: number, c?: number, h?: number, alpha?: number) {
    const hasChannels = l !== undefined || c !== undefined || h !== undefined;
    super(alpha ?? (hasChannels ? 1 : 0));
    this.l = l ?? 0;
    this.c = c ?? 0;
    this.h = h ?? 0;
  }

  get lightness() { return this.l; }
  get chroma() { return this.c; }
  get hue() { return this.h; }

  get channels(): ChannelDescriptor[] {
    return [
      { key: 'l', value: this.l, type: 'percent', min: 0, max: 1, label: 'lightness' },
      { key: 'c', value: this.c, type: 'number', min: 0, max: 0.4, label: 'chroma' },
      { key: 'h', value: this.h, type: 'degree', min: 0, max: 360, label: 'hue' },
    ];
  }
  getLightness(): number { return this.l; }
  setLightness(value: number): OklchColor { return new OklchColor(value, this.c, this.h, this.alpha); }
  getChroma(): number { return this.c; }
  setChroma(value: number): OklchColor { return new OklchColor(this.l, value, this.h, this.alpha); }
  getHue(): number { return this.h; }
  setHue(value: number): OklchColor { return new OklchColor(this.l, this.c, value, this.alpha); }

  static override parse(value: string): OklchColor | undefined {
    const result = parseColorInput(value);
    if (!result || result.mode !== 'oklch') return undefined;
    return new OklchColor(result.channels[0], result.channels[1], result.channels[2], result.alpha);
  }

  static fromArray(value: number[]): OklchColor | undefined {
    if (value.length < 3) return undefined;
    return new OklchColor(value[0], value[1], value[2], value[3]);
  }

  static fromObject(obj: Record<string, unknown>): OklchColor | undefined {
    if (typeof obj.l === 'number' && typeof obj.c === 'number' && typeof obj.h === 'number') {
      return new OklchColor(obj.l, obj.c, obj.h, obj.alpha as number | undefined);
    }
    return undefined;
  }
}

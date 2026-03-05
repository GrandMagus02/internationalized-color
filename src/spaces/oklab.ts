import { Color } from '../Color.ts';
import type { ChannelDescriptor } from '../types.ts';
import { parseColor as parseColorInput } from '../parse.ts';

export class OklabColor extends Color {
  readonly mode = 'oklab' as const;
  readonly l: number;
  readonly a: number;
  readonly b: number;

  constructor(l?: number, a?: number, b?: number, alpha?: number) {
    const hasChannels = l !== undefined || a !== undefined || b !== undefined;
    super(alpha ?? (hasChannels ? 1 : 0));
    this.l = l ?? 0;
    this.a = a ?? 0;
    this.b = b ?? 0;
  }

  get lightness() { return this.l; }

  get channels(): ChannelDescriptor[] {
    return [
      { key: 'l', value: this.l, type: 'percent', min: 0, max: 1, label: 'lightness' },
      { key: 'a', value: this.a, type: 'number', min: -0.4, max: 0.4, label: 'a' },
      { key: 'b', value: this.b, type: 'number', min: -0.4, max: 0.4, label: 'b' },
    ];
  }
  getLightness(): number { return this.l; }
  setLightness(value: number): OklabColor { return new OklabColor(value, this.a, this.b, this.alpha); }

  static override parse(value: string): OklabColor | undefined {
    const result = parseColorInput(value);
    if (!result || result.mode !== 'oklab') return undefined;
    return new OklabColor(result.channels[0], result.channels[1], result.channels[2], result.alpha);
  }

  static fromArray(value: number[]): OklabColor | undefined {
    if (value.length < 3) return undefined;
    return new OklabColor(value[0], value[1], value[2], value[3]);
  }

  static fromObject(obj: Record<string, unknown>): OklabColor | undefined {
    if (typeof obj.l === 'number' && typeof obj.a === 'number' && typeof obj.b === 'number') {
      return new OklabColor(obj.l, obj.a, obj.b, obj.alpha as number | undefined);
    }
    return undefined;
  }
}

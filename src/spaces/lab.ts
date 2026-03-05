import { Color } from '../Color.ts';
import type { ChannelDescriptor } from '../types.ts';
import { parseColor as parseColorInput } from '../parse.ts';

export class LabColor extends Color {
  readonly mode = 'lab' as const;
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
      { key: 'l', value: this.l, type: 'number', min: 0, max: 100, label: 'lightness' },
      { key: 'a', value: this.a, type: 'number', min: -125, max: 125, label: 'a' },
      { key: 'b', value: this.b, type: 'number', min: -125, max: 125, label: 'b' },
    ];
  }
  getLightness(): number { return this.l; }
  setLightness(value: number): LabColor { return new LabColor(value, this.a, this.b, this.alpha); }

  static override parse(value: string): LabColor | undefined {
    const result = parseColorInput(value);
    if (!result || result.mode !== 'lab') return undefined;
    return new LabColor(result.channels[0], result.channels[1], result.channels[2], result.alpha);
  }

  static fromArray(value: number[]): LabColor | undefined {
    if (value.length < 3) return undefined;
    return new LabColor(value[0], value[1], value[2], value[3]);
  }

  static fromObject(obj: Record<string, unknown>): LabColor | undefined {
    if (typeof obj.l === 'number' && typeof obj.a === 'number' && typeof obj.b === 'number') {
      return new LabColor(obj.l, obj.a, obj.b, obj.alpha as number | undefined);
    }
    return undefined;
  }
}

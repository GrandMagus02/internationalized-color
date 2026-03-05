import { Color } from '../Color.ts';
import type { ChannelDescriptor } from '../types.ts';
import { parseColor as parseColorInput } from '../parse.ts';

export class XYZ65Color extends Color {
  readonly mode = 'xyz65' as const;
  readonly x: number;
  readonly y: number;
  readonly z: number;

  constructor(x?: number, y?: number, z?: number, alpha?: number) {
    const hasChannels = x !== undefined || y !== undefined || z !== undefined;
    super(alpha ?? (hasChannels ? 1 : 0));
    this.x = x ?? 0;
    this.y = y ?? 0;
    this.z = z ?? 0;
  }

  get channels(): ChannelDescriptor[] {
    return [
      { key: 'x', value: this.x, type: 'number', min: 0, max: 1, label: 'x' },
      { key: 'y', value: this.y, type: 'number', min: 0, max: 1, label: 'y' },
      { key: 'z', value: this.z, type: 'number', min: 0, max: 1, label: 'z' },
    ];
  }
  static override parse(value: string): XYZ65Color | undefined {
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

import type { ColorMode, ChannelDescriptor } from './types.ts';
import { convert } from './conversions/index.ts';
import { parseColor as parseColorInput } from './parse.ts';
import { formatHex, formatCss } from './format.ts';
import { gamutMapToSrgb } from './gamut.ts';

export abstract class Color {
  abstract readonly mode: ColorMode;
  readonly alpha: number | undefined;

  constructor(alpha?: number) {
    this.alpha = alpha;
  }

  abstract get channels(): ChannelDescriptor[];

  private _values(): [number, number, number] {
    const ch = this.channels;
    return [ch[0]!.value, ch[1]!.value, ch[2]!.value];
  }

  private _keys(): [string, string, string] {
    const ch = this.channels;
    return [ch[0]!.key, ch[1]!.key, ch[2]!.key];
  }

  toArray(): [number, number, number];
  toArray(includeAlpha: boolean): number[];
  toArray(includeAlpha?: boolean): number[] {
    const ch = this.channels;
    const arr: number[] = [ch[0]!.value, ch[1]!.value, ch[2]!.value];
    if (includeAlpha && this.alpha !== undefined) arr.push(this.alpha);
    return arr;
  }

  toFloat32Array(includeAlpha?: boolean): Float32Array {
    return new Float32Array(this.toArray(includeAlpha as any));
  }

  channelLabels(): [string, string, string] {
    const ch = this.channels;
    return [ch[0]!.label, ch[1]!.label, ch[2]!.label];
  }

  get(channel: string): number | undefined;
  get<T>(channel: string, defaultValue: T): number | T;
  get(channel: string, defaultValue?: unknown): unknown {
    if (channel === 'alpha') return this.alpha ?? defaultValue;
    const ch = this.channels.find(c => c.key === channel);
    if (ch) return ch.value;
    return defaultValue;
  }

  set(channels: { mode?: string; [channel: string]: number | string | undefined }): Color {
    const { mode: targetMode, ...rest } = channels;
    let base: Color = this as Color;
    if (targetMode && targetMode !== this.mode) {
      const converted = this.to(targetMode as ColorMode);
      if (!converted) return this;
      base = converted;
    }
    const keys = base._keys();
    const values = [...base._values()] as [number, number, number];
    let alpha = base.alpha;
    for (const [key, value] of Object.entries(rest)) {
      if (key === 'alpha' && typeof value === 'number') {
        alpha = value;
        continue;
      }
      const idx = keys.indexOf(key);
      if (idx >= 0 && typeof value === 'number') {
        values[idx] = value;
      }
    }
    return createColorInstance(base.mode, values, alpha);
  }

  setAlpha(alpha: number): Color {
    return createColorInstance(this.mode, this._values(), alpha);
  }

  has(channel: string): boolean {
    return this.channels.some(c => c.key === channel);
  }

  entries(): [string, number][] {
    return this.channels.map(c => [c.key, c.value]);
  }

  getRange(channel: string): [number, number] | undefined {
    const ch = this.channels.find(c => c.key === channel);
    if (!ch) return undefined;
    return [ch.min, ch.max];
  }

  to(mode: ColorMode | string): Color | undefined {
    const targetMode = mode as ColorMode;
    if (targetMode === this.mode) return createColorInstance(this.mode, this._values(), this.alpha);
    const result = convert(this.mode, targetMode, this._values());
    if (!result) return undefined;
    return createColorInstance(targetMode, result, this.alpha);
  }

  // Conversion shorthands
  toRgb(): Color { return this.to('rgb')!; }
  toHsl(): Color { return this.to('hsl')!; }
  toHsv(): Color { return this.to('hsv')!; }
  toHwb(): Color { return this.to('hwb')!; }
  toOklab(): Color { return this.to('oklab')!; }
  toOklch(): Color { return this.to('oklch')!; }
  toLab(): Color { return this.to('lab')!; }
  toLch(): Color { return this.to('lch')!; }
  toP3(): Color { return this.to('p3')!; }
  toA98(): Color { return this.to('a98')!; }
  toProphoto(): Color { return this.to('prophoto')!; }
  toRec2020(): Color { return this.to('rec2020')!; }
  toXyz50(): Color { return this.to('xyz50')!; }
  toXyz65(): Color { return this.to('xyz65')!; }
  toLrgb(): Color { return this.to('lrgb')!; }

  getAlpha(): number | undefined {
    return this.alpha;
  }

  deltaE(other: Color): number {
    const a = this.to('oklab')!;
    const b = other.to('oklab')!;
    const av = a._values();
    const bv = b._values();
    const dl = av[0] - bv[0];
    const da = av[1] - bv[1];
    const db = av[2] - bv[2];
    return Math.sqrt(dl * dl + da * da + db * db);
  }

  equals(other: Color, tolerance = 0): boolean {
    if (tolerance === 0) {
      return this.mode === other.mode && this.toString('hex') === other.toString('hex');
    }
    return this.deltaE(other) <= tolerance;
  }

  toHex(): string {
    let rgb: [number, number, number];
    if (this.mode === 'rgb') {
      rgb = this._values();
    } else {
      const result = convert(this.mode, 'rgb', this._values());
      if (!result) throw new Error(`Cannot convert ${this.mode} to rgb`);
      rgb = result;
    }

    const [r, g, b] = rgb;
    if (r < 0 || r > 1 || g < 0 || g > 1 || b < 0 || b > 1) {
      rgb = gamutMapToSrgb(r, g, b, 'rgb');
    }

    return formatHex(rgb[0], rgb[1], rgb[2], this.alpha);
  }

  toString(format?: 'hex' | 'css'): string {
    if (format === 'hex') return this.toHex();
    return formatCss(this.mode, this._values(), this.alpha);
  }

  toJSON(): { mode: string; channels: Record<string, number>; alpha?: number } {
    const keys = this._keys();
    const values = this._values();
    const channels: Record<string, number> = {};
    for (let i = 0; i < 3; i++) {
      channels[keys[i]!] = values[i]!;
    }
    return {
      mode: this.mode,
      channels,
      ...(this.alpha !== undefined ? { alpha: this.alpha } : {}),
    };
  }

  toObject(): Record<string, unknown> {
    const keys = this._keys();
    const values = this._values();
    const obj: Record<string, unknown> = { mode: this.mode };
    for (let i = 0; i < 3; i++) {
      obj[keys[i]!] = values[i]!;
    }
    if (this.alpha !== undefined) obj.alpha = this.alpha;
    return obj;
  }

  static parse(value: string): Color | undefined {
    const result = parseColorInput(value);
    if (!result) return undefined;
    return createColorInstance(result.mode, result.channels, result.alpha);
  }

  static create(mode: ColorMode | string, channels: Record<string, number>, alpha?: number): Color {
    const m = mode as ColorMode;
    const channelMap: Record<ColorMode, [string, string, string]> = {
      rgb: ['r', 'g', 'b'], hsl: ['h', 's', 'l'], hsv: ['h', 's', 'v'],
      hwb: ['h', 'w', 'b'], oklab: ['l', 'a', 'b'], oklch: ['l', 'c', 'h'],
      lab: ['l', 'a', 'b'], lch: ['l', 'c', 'h'], p3: ['r', 'g', 'b'],
      a98: ['r', 'g', 'b'], prophoto: ['r', 'g', 'b'], rec2020: ['r', 'g', 'b'],
      xyz50: ['x', 'y', 'z'], xyz65: ['x', 'y', 'z'], lrgb: ['r', 'g', 'b'],
    };
    const names = channelMap[m] ?? ['r', 'g', 'b'];
    const vals: [number, number, number] = [
      channels[names[0]] ?? 0,
      channels[names[1]] ?? 0,
      channels[names[2]] ?? 0,
    ];
    return createColorInstance(m, vals, alpha);
  }

  static isColor(value: unknown): value is Color {
    if (value instanceof Color) return true;
    return (
      value !== null &&
      typeof value === 'object' &&
      typeof (value as Color).to === 'function' &&
      typeof (value as Color).set === 'function' &&
      'alpha' in value
    );
  }
}

let _factories: Record<ColorMode, (channels: [number, number, number], alpha?: number) => Color>;

export function registerFactories(factories: Record<ColorMode, (channels: [number, number, number], alpha?: number) => Color>) {
  _factories = factories;
}

export function createColorInstance(mode: ColorMode, channels: [number, number, number], alpha?: number): Color {
  return _factories[mode](channels, alpha);
}

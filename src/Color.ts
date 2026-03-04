import type { ColorMode, ChannelConfig } from './types.ts';
import { convert } from './conversions/index.ts';
import { parseColor as parseColorInput } from './parse.ts';
import { formatHex, formatCss } from './format.ts';
import { gamutMapToSrgb } from './gamut.ts';
import { interpolateChannels, interpolateAlpha } from './interpolate.ts';

export abstract class Color {
  abstract readonly mode: ColorMode;
  readonly alpha: number | undefined;

  constructor(alpha?: number) {
    this.alpha = alpha;
  }

  abstract channelValues(): [number, number, number];
  abstract channelNames(): [string, string, string];
  abstract channelLabels(): [string, string, string];
  abstract channelConfig(): Record<string, ChannelConfig>;
  protected abstract cloneWith(channels: [number, number, number], alpha?: number): Color;

  get(channel: string): number | undefined;
  get<T>(channel: string, defaultValue: T): number | T;
  get(channel: string, defaultValue?: unknown): unknown {
    if (channel === 'alpha') return this.alpha ?? defaultValue;
    const names = this.channelNames();
    const values = this.channelValues();
    const idx = names.indexOf(channel);
    if (idx >= 0) return values[idx];
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
    const names = base.channelNames();
    const values = [...base.channelValues()] as [number, number, number];
    let alpha = base.alpha;
    for (const [key, value] of Object.entries(rest)) {
      if (key === 'alpha' && typeof value === 'number') {
        alpha = value;
        continue;
      }
      const idx = names.indexOf(key);
      if (idx >= 0 && typeof value === 'number') {
        values[idx] = value;
      }
    }
    return base.cloneWith(values, alpha);
  }

  setAlpha(alpha: number): Color {
    return this.cloneWith(this.channelValues(), alpha);
  }

  get channels(): string[] {
    return [...this.channelNames()];
  }

  has(channel: string): boolean {
    return this.channelNames().includes(channel);
  }

  entries(): [string, number][] {
    const names = this.channelNames();
    const values = this.channelValues();
    return names.map((n, i) => [n, values[i]!]);
  }

  getRange(channel: string): [number, number] | undefined {
    const config = this.channelConfig()[channel];
    if (!config) return undefined;
    return [config.min, config.max];
  }

  to(mode: ColorMode | string): Color | undefined {
    const targetMode = mode as ColorMode;
    if (targetMode === this.mode) return this.cloneWith(this.channelValues(), this.alpha);
    const result = convert(this.mode, targetMode, this.channelValues());
    if (!result) return undefined;
    return createColorInstance(targetMode, result, this.alpha);
  }

  toOklab(): Color { return this.to('oklab')!; }
  toOklch(): Color { return this.to('oklch')!; }
  toRgb(): Color { return this.to('rgb')!; }
  toHsl(): Color { return this.to('hsl')!; }
  toHsv(): Color { return this.to('hsv')!; }
  toHwb(): Color { return this.to('hwb')!; }
  toLab(): Color { return this.to('lab')!; }
  toLch(): Color { return this.to('lch')!; }
  toP3(): Color { return this.to('p3')!; }
  toA98(): Color { return this.to('a98')!; }
  toProphoto(): Color { return this.to('prophoto')!; }
  toRec2020(): Color { return this.to('rec2020')!; }
  toXyz50(): Color { return this.to('xyz50')!; }
  toXyz65(): Color { return this.to('xyz65')!; }
  toLrgb(): Color { return this.to('lrgb')!; }

  mix(other: Color | string, amount = 0.5, mode: ColorMode | string = 'oklab'): Color | undefined {
    const otherColor = typeof other === 'string' ? Color.parse(other) : other;
    if (!otherColor) return undefined;

    const mixMode = mode as ColorMode;
    const a = this.to(mixMode);
    const b = otherColor.to(mixMode);
    if (!a || !b) return undefined;

    const mixed = interpolateChannels(mixMode, a.channelValues(), b.channelValues(), amount);
    const mixedAlpha = interpolateAlpha(this.alpha, otherColor.alpha, amount);
    const result = createColorInstance(mixMode, mixed, mixedAlpha);

    // Convert back to original mode
    if (mixMode !== this.mode) {
      return result.to(this.mode);
    }
    return result;
  }

  lighten(amount = 0.1): Color {
    const lab = this.toOklab()!;
    const values = lab.channelValues();
    const l = Math.min(1, values[0] + amount);
    const adjusted = createColorInstance('oklab', [l, values[1], values[2]], this.alpha);
    if (this.mode !== 'oklab') {
      return adjusted.to(this.mode)!;
    }
    return adjusted;
  }

  darken(amount = 0.1): Color {
    const lab = this.toOklab()!;
    const values = lab.channelValues();
    const l = Math.max(0, values[0] - amount);
    const adjusted = createColorInstance('oklab', [l, values[1], values[2]], this.alpha);
    if (this.mode !== 'oklab') {
      return adjusted.to(this.mode)!;
    }
    return adjusted;
  }

  // Semantic accessors
  getRed(): number | undefined {
    const c = this.mode === 'rgb' ? this : this.to('rgb');
    return c?.get('r');
  }
  setRed(value: number): Color {
    const c = this.mode === 'rgb' ? this : this.to('rgb');
    return c!.set({ r: value });
  }
  getGreen(): number | undefined {
    const c = this.mode === 'rgb' ? this : this.to('rgb');
    return c?.get('g');
  }
  setGreen(value: number): Color {
    const c = this.mode === 'rgb' ? this : this.to('rgb');
    return c!.set({ g: value });
  }
  getBlue(): number | undefined {
    const c = this.mode === 'rgb' ? this : this.to('rgb');
    return c?.get('b');
  }
  setBlue(value: number): Color {
    const c = this.mode === 'rgb' ? this : this.to('rgb');
    return c!.set({ b: value });
  }
  getHue(mode: ColorMode | string = 'hsl'): number | undefined {
    const c = this.mode === mode ? this : this.to(mode as ColorMode);
    return c?.get('h');
  }
  setHue(value: number, mode: ColorMode | string = 'hsl'): Color {
    const c = this.mode === mode ? this : this.to(mode as ColorMode);
    return c!.set({ h: value });
  }
  getSaturation(mode: ColorMode | string = 'hsl'): number | undefined {
    const c = this.mode === mode ? this : this.to(mode as ColorMode);
    return c?.get('s');
  }
  setSaturation(value: number, mode: ColorMode | string = 'hsl'): Color {
    const c = this.mode === mode ? this : this.to(mode as ColorMode);
    return c!.set({ s: value });
  }
  getLightness(mode: ColorMode | string = 'hsl'): number | undefined {
    const c = this.mode === mode ? this : this.to(mode as ColorMode);
    return c?.get('l');
  }
  setLightness(value: number, mode: ColorMode | string = 'hsl'): Color {
    const c = this.mode === mode ? this : this.to(mode as ColorMode);
    return c!.set({ l: value });
  }
  getValue(): number | undefined {
    const c = this.mode === 'hsv' ? this : this.to('hsv');
    return c?.get('v');
  }
  setValue(value: number): Color {
    const c = this.mode === 'hsv' ? this : this.to('hsv');
    return c!.set({ v: value });
  }
  getChroma(mode: ColorMode | string = 'oklch'): number | undefined {
    const c = this.mode === mode ? this : this.to(mode as ColorMode);
    return c?.get('c');
  }
  setChroma(value: number, mode: ColorMode | string = 'oklch'): Color {
    const c = this.mode === mode ? this : this.to(mode as ColorMode);
    return c!.set({ c: value });
  }
  getWhiteness(): number | undefined {
    const c = this.mode === 'hwb' ? this : this.to('hwb');
    return c?.get('w');
  }
  setWhiteness(value: number): Color {
    const c = this.mode === 'hwb' ? this : this.to('hwb');
    return c!.set({ w: value });
  }
  getBlackness(): number | undefined {
    const c = this.mode === 'hwb' ? this : this.to('hwb');
    return c?.get('b');
  }
  setBlackness(value: number): Color {
    const c = this.mode === 'hwb' ? this : this.to('hwb');
    return c!.set({ b: value });
  }
  getAlpha(): number | undefined {
    return this.alpha;
  }

  deltaE(other: Color): number {
    const a = this.toOklab()!;
    const b = other.toOklab()!;
    const av = a.channelValues();
    const bv = b.channelValues();
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
      rgb = this.channelValues();
    } else {
      const result = convert(this.mode, 'rgb', this.channelValues());
      if (!result) throw new Error(`Cannot convert ${this.mode} to rgb`);
      rgb = result;
    }

    // Gamut map if out of [0,1]
    const [r, g, b] = rgb;
    if (r < 0 || r > 1 || g < 0 || g > 1 || b < 0 || b > 1) {
      rgb = gamutMapToSrgb(r, g, b, 'rgb');
    }

    return formatHex(rgb[0], rgb[1], rgb[2], this.alpha);
  }

  toString(format?: 'hex' | 'css'): string {
    if (format === 'hex') return this.toHex();
    return formatCss(this.mode, this.channelValues(), this.alpha);
  }

  toJSON(): { mode: string; channels: Record<string, number>; alpha?: number } {
    const names = this.channelNames();
    const values = this.channelValues();
    const channels: Record<string, number> = {};
    for (let i = 0; i < 3; i++) {
      channels[names[i]!] = values[i]!;
    }
    return {
      mode: this.mode,
      channels,
      ...(this.alpha !== undefined ? { alpha: this.alpha } : {}),
    };
  }

  toObject(): Record<string, unknown> {
    const names = this.channelNames();
    const values = this.channelValues();
    const obj: Record<string, unknown> = { mode: this.mode };
    for (let i = 0; i < 3; i++) {
      obj[names[i]!] = values[i]!;
    }
    if (this.alpha !== undefined) obj.alpha = this.alpha;
    return obj;
  }

  static parse(value: string): Color | undefined {
    const result = parseColorInput(value);
    if (!result) return undefined;
    return createColorInstance(result.mode, result.channels, result.alpha);
  }

  static hex(value: string): Color | undefined {
    return Color.parse(value);
  }

  static from(value: string | Color | Record<string, unknown>): Color | undefined {
    if (Color.isColor(value)) return value;
    if (typeof value === 'string') return Color.parse(value);
    // Raw object with mode
    const obj = value as Record<string, unknown>;
    const mode = obj.mode as ColorMode | undefined;
    if (!mode) return undefined;

    const channelMap: Record<ColorMode, [string, string, string]> = {
      rgb: ['r', 'g', 'b'], hsl: ['h', 's', 'l'], hsv: ['h', 's', 'v'],
      hwb: ['h', 'w', 'b'], oklab: ['l', 'a', 'b'], oklch: ['l', 'c', 'h'],
      lab: ['l', 'a', 'b'], lch: ['l', 'c', 'h'], p3: ['r', 'g', 'b'],
      a98: ['r', 'g', 'b'], prophoto: ['r', 'g', 'b'], rec2020: ['r', 'g', 'b'],
      xyz50: ['x', 'y', 'z'], xyz65: ['x', 'y', 'z'], lrgb: ['r', 'g', 'b'],
    };

    const names = channelMap[mode];
    if (!names) return undefined;
    const channels: [number, number, number] = [
      (obj[names[0]] as number) ?? 0,
      (obj[names[1]] as number) ?? 0,
      (obj[names[2]] as number) ?? 0,
    ];
    return createColorInstance(mode, channels, obj.alpha as number | undefined);
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

// Import subclasses lazily to avoid circular dependencies
// These are set by the spaces barrel export
let _factories: Record<ColorMode, (channels: [number, number, number], alpha?: number) => Color>;

export function registerFactories(factories: Record<ColorMode, (channels: [number, number, number], alpha?: number) => Color>) {
  _factories = factories;
}

export function createColorInstance(mode: ColorMode, channels: [number, number, number], alpha?: number): Color {
  return _factories[mode](channels, alpha);
}

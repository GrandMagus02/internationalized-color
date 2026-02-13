import {
  parse,
  converter,
  formatCss,
  formatHex,
  toGamut,
  getMode,
  interpolate,
  type CuloriColor,
} from 'culori/fn';
import type { ExtendedModeDefinition } from './types.ts';

/**
 * Immutable color value object wrapping a culori color.
 * Every method that would modify the color returns a new instance.
 */
export class Color {
  readonly #color: Readonly<CuloriColor>;

  constructor(color: CuloriColor) {
    this.#color = Object.freeze({ ...color });
  }

  /** The color space mode (e.g. 'rgb', 'oklch', 'oklab'). */
  get mode(): string {
    return this.#color.mode;
  }

  /** Alpha (opacity), 0–1. Undefined means fully opaque. */
  get alpha(): number | undefined {
    return this.#color.alpha;
  }

  /** Get a channel value by name (e.g. 'r', 'l', 'h'). */
  get(channel: string): number | undefined;
  get<T>(channel: string, defaultValue: T): number | T;
  get(channel: string, defaultValue?: unknown): unknown {
    const val = this.#color[channel];
    return typeof val === 'number' ? val : defaultValue;
  }

  /** Create a new Color with modified channels. */
  set(channels: Record<string, number>): Color {
    const obj = { ...this.#color } as Record<string, unknown>;
    for (const [key, value] of Object.entries(channels)) {
      obj[key] = value;
    }
    return new Color(obj as CuloriColor);
  }

  /** Create a new Color with the given alpha value. */
  withAlpha(alpha: number): Color {
    return new Color({ ...this.#color, alpha });
  }

  /** Channel names for this color's mode (excludes alpha). */
  get channels(): string[] {
    return getMode(this.#color.mode)?.channels.filter((c: string) => c !== 'alpha') ?? [];
  }

  /** Check if a channel exists on this color with a numeric value. */
  has(channel: string): boolean {
    return typeof this.#color[channel] === 'number';
  }

  /** Returns [channel, value] pairs for all defined channels (excludes mode and alpha). */
  entries(): [string, number][] {
    const result: [string, number][] = [];
    for (const key of Object.keys(this.#color)) {
      if (key !== 'mode' && key !== 'alpha') {
        const val = this.#color[key];
        if (typeof val === 'number') result.push([key, val]);
      }
    }
    return result;
  }

  /** Returns [min, max] range for a channel from the mode definition. */
  getRange(channel: string): [number, number] | undefined {
    return (getMode(this.#color.mode) as ExtendedModeDefinition | undefined)?.ranges?.[channel];
  }

  /** Convert to another color space. Returns a new Color. */
  to(mode: string): Color {
    const convert = converter(mode);
    const result = convert(this.#color as any);
    if (!result) {
      throw new Error(`Cannot convert to mode "${mode}". Is it registered via setup()?`);
    }
    return new Color(result);
  }

  /** Mix with another color. Defaults to 50% blend in OkLab (perceptually uniform). */
  mix(other: Color | string, amount = 0.5, mode = 'oklab'): Color {
    const otherColor = typeof other === 'string' ? Color.parse(other) : other;
    const interp = interpolate([this.#color as any, otherColor.#color as any], mode);
    const result = interp(amount);
    if (!result) {
      throw new Error(`Cannot interpolate in mode "${mode}". Is it registered via setup()?`);
    }
    // Convert back to the original color's mode
    if (result.mode !== this.#color.mode) {
      const convert = converter(this.#color.mode);
      const converted = convert(result);
      if (converted) return new Color(converted);
    }
    return new Color(result);
  }

  /** Increase OkLab lightness by the given amount (default 0.1). Returns a new Color. */
  lighten(amount = 0.1): Color {
    const lab = this.toOklab();
    const l = Math.min(1, (lab.get('l') ?? 0) + amount);
    const adjusted = lab.set({ l });
    if (this.#color.mode !== 'oklab') {
      return adjusted.to(this.#color.mode);
    }
    return adjusted;
  }

  /** Decrease OkLab lightness by the given amount (default 0.1). Returns a new Color. */
  darken(amount = 0.1): Color {
    const lab = this.toOklab();
    const l = Math.max(0, (lab.get('l') ?? 0) - amount);
    const adjusted = lab.set({ l });
    if (this.#color.mode !== 'oklab') {
      return adjusted.to(this.#color.mode);
    }
    return adjusted;
  }

  /** Get the raw culori color object (for interop with culori functions). */
  toObject(): CuloriColor {
    return { ...this.#color };
  }

  /** Convert to OkLab. Shorthand for `this.to('oklab')`. */
  toOklab(): Color {
    return this.to('oklab');
  }

  /** Convert to OkLCH. Shorthand for `this.to('oklch')`. */
  toOklch(): Color {
    return this.to('oklch');
  }

  /** Convert to sRGB. Shorthand for `this.to('rgb')`. */
  toRgb(): Color {
    return this.to('rgb');
  }

  /** Convert to HSL. Shorthand for `this.to('hsl')`. */
  toHsl(): Color {
    return this.to('hsl');
  }

  /** Convert to HWB. Shorthand for `this.to('hwb')`. */
  toHwb(): Color {
    return this.to('hwb');
  }

  /** Convert to CIE Lab (D50). Shorthand for `this.to('lab')`. */
  toLab(): Color {
    return this.to('lab');
  }

  /** Convert to CIE LCH (D50). Shorthand for `this.to('lch')`. */
  toLch(): Color {
    return this.to('lch');
  }

  /** Convert to Display P3. Shorthand for `this.to('p3')`. */
  toP3(): Color {
    return this.to('p3');
  }

  /** Convert to A98 RGB. Shorthand for `this.to('a98')`. */
  toA98(): Color {
    return this.to('a98');
  }

  /** Convert to ProPhoto RGB. Shorthand for `this.to('prophoto')`. */
  toProphoto(): Color {
    return this.to('prophoto');
  }

  /** Convert to Rec. 2020. Shorthand for `this.to('rec2020')`. */
  toRec2020(): Color {
    return this.to('rec2020');
  }

  /** Convert to CIE XYZ (D50). Shorthand for `this.to('xyz50')`. */
  toXyz50(): Color {
    return this.to('xyz50');
  }

  /** Convert to CIE XYZ (D65). Shorthand for `this.to('xyz65')`. */
  toXyz65(): Color {
    return this.to('xyz65');
  }

  /** Convert to Linear sRGB. Shorthand for `this.to('lrgb')`. */
  toLrgb(): Color {
    return this.to('lrgb');
  }

  /** Perceptual distance (Euclidean in OkLab) to another color. */
  deltaE(other: Color): number {
    const a = this.toOklab();
    const b = other.toOklab();
    const dl = (a.get('l') ?? 0) - (b.get('l') ?? 0);
    const da = (a.get('a') ?? 0) - (b.get('a') ?? 0);
    const db = (a.get('b') ?? 0) - (b.get('b') ?? 0);
    return Math.sqrt(dl * dl + da * da + db * db);
  }

  /** Check perceptual equality within a tolerance (default 0 = exact). */
  equals(other: Color, tolerance = 0): boolean {
    if (tolerance === 0) {
      return this.mode === other.mode && this.toString('hex') === other.toString('hex');
    }
    return this.deltaE(other) <= tolerance;
  }

  /** Serialize as a CSS string. */
  toString(format?: 'hex' | 'css'): string {
    if (format === 'hex') {
      return this.toHex();
    }
    const result = formatCss(this.#color as any);
    return result ?? this.toHex();
  }

  /** Get the hex representation (#rrggbb). Gamut-maps to sRGB if needed. */
  toHex(): string {
    let color = this.#color;
    if (color.mode !== 'rgb') {
      const toRgb = converter('rgb');
      const rgb = toRgb(color as any);
      if (rgb) {
        color = rgb;
      }
    }
    // Gamut map if any channel is out of [0, 1]
    const r = color.r as number | undefined;
    const g = color.g as number | undefined;
    const b = color.b as number | undefined;
    if (
      (r !== undefined && (r < 0 || r > 1)) ||
      (g !== undefined && (g < 0 || g > 1)) ||
      (b !== undefined && (b < 0 || b > 1))
    ) {
      const gamutMap = toGamut('rgb', 'oklch');
      const mapped = gamutMap(color as any);
      if (mapped) {
        const hex = formatHex(mapped);
        if (hex) return hex;
      }
    }
    const hex = formatHex(color as any);
    return hex ?? '#000000';
  }

  /** JSON representation. */
  toJSON(): { mode: string; channels: Record<string, number>; alpha?: number } {
    const channels: Record<string, number> = {};
    const obj = this.#color;
    for (const key of Object.keys(obj)) {
      if (key !== 'mode' && key !== 'alpha') {
        const val = obj[key];
        if (typeof val === 'number') {
          channels[key] = val;
        }
      }
    }
    return {
      mode: this.mode,
      channels,
      ...(obj.alpha !== undefined ? { alpha: obj.alpha } : {}),
    };
  }

  /** Universal resolver: accepts a string, Color, or culori object. */
  static from(value: string | Color | CuloriColor): Color {
    if (value instanceof Color) return value;
    if (typeof value === 'string') return Color.parse(value);
    return new Color(value);
  }

  /** Parse a CSS color string. */
  static parse(value: string): Color {
    const result = parse(value);
    if (!result) {
      throw new Error(`Cannot parse color: "${value}"`);
    }
    return new Color(result);
  }

  /** Create from a hex string. */
  static hex(value: string): Color {
    return Color.parse(value);
  }

  /** Create from a color space mode, channel values, and optional alpha. */
  static create(mode: string, channels: Record<string, number>, alpha?: number): Color {
    const color: CuloriColor = { mode, ...channels };
    if (alpha !== undefined) {
      color.alpha = alpha;
    }
    return new Color(color);
  }
}

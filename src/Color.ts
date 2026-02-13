import {
  parse,
  converter,
  formatCss,
  formatHex,
  toGamut,
} from 'culori/fn';
import type { CuloriColor } from './types.ts';

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
  get(channel: string): number | undefined {
    const val = this.#color[channel];
    return typeof val === 'number' ? val : undefined;
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

  /** Convert to another color space. Returns a new Color. */
  to(mode: string): Color {
    const convert = converter(mode);
    const result = convert(this.#color as any);
    if (!result) {
      throw new Error(`Cannot convert to mode "${mode}". Is it registered via setup()?`);
    }
    return new Color(result);
  }

  /** Get the raw culori color object (for interop with culori functions). */
  toObject(): CuloriColor {
    return { ...this.#color };
  }

  /** Convert to OkLab. Shorthand for `this.to('oklab')`. */
  toOklab(): Color {
    return this.to('oklab');
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

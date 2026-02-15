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
 *
 * Every method that would modify the color returns a new instance —
 * the original is never mutated. The underlying culori object is
 * `Object.freeze()`'d at construction time.
 *
 * @example
 * ```ts
 * const red = Color.parse('red');
 * const darker = red.darken(0.2);
 * console.log(red.toHex());    // '#ff0000' — unchanged
 * console.log(darker.toHex()); // a darker red
 * ```
 */
export class Color {
  readonly #color: Readonly<CuloriColor>;

  /**
   * Create a Color from a raw culori color object.
   *
   * Prefer the static factory methods (`Color.parse`, `Color.create`, `Color.from`)
   * for most use cases.
   *
   * @param color - A culori color object. It will be shallow-copied and frozen.
   */
  constructor(color: CuloriColor) {
    this.#color = Object.freeze({ ...color });
  }

  /**
   * The color space mode (e.g. `'rgb'`, `'oklch'`, `'oklab'`).
   *
   * @returns The mode identifier string.
   */
  get mode(): string {
    return this.#color.mode;
  }

  /**
   * Alpha (opacity) channel, ranging from 0 (fully transparent) to 1 (fully opaque).
   * `undefined` means fully opaque (the CSS default).
   *
   * @returns The alpha value, or `undefined` if not explicitly set.
   */
  get alpha(): number | undefined {
    return this.#color.alpha;
  }

  /**
   * Get a channel value by name.
   *
   * @param channel - The channel name (e.g. `'r'`, `'l'`, `'h'`).
   * @returns The numeric channel value, or `undefined` if the channel does not exist.
   *
   * @example
   * ```ts
   * const c = Color.parse('oklch(0.7 0.15 180)');
   * c.get('l'); // 0.7
   * c.get('c'); // 0.15
   * c.get('x'); // undefined
   * ```
   */
  get(channel: string): number | undefined;
  /**
   * Get a channel value by name, with a fallback default.
   *
   * @param channel - The channel name.
   * @param defaultValue - Value returned when the channel is not present.
   * @returns The numeric channel value, or `defaultValue` if the channel does not exist.
   */
  get<T>(channel: string, defaultValue: T): number | T;
  get(channel: string, defaultValue?: unknown): unknown {
    const val = this.#color[channel];
    return typeof val === 'number' ? val : defaultValue;
  }

  /**
   * Create a new Color with modified channels. Pass `mode` to convert first.
   *
   * @param channels - An object of channel names to values. Include `mode` to convert
   *   to that color space before applying the overrides.
   * @returns A new Color with the specified channel values applied.
   *
   * @example
   * ```ts
   * const c = Color.parse('red');
   * const dimRed = c.set({ mode: 'hsl', l: 0.3 });
   * ```
   */
  set(channels: { mode?: string; [channel: string]: number | string | undefined }): Color {
    const { mode, ...rest } = channels;
    let base: Record<string, unknown>;
    if (mode) {
      const converted = converter(mode)(this.#color as any);
      base = { ...converted, mode } as Record<string, unknown>;
    } else {
      base = { ...this.#color } as Record<string, unknown>;
    }
    for (const [key, value] of Object.entries(rest)) {
      base[key] = value;
    }
    return new Color(base as CuloriColor);
  }

  /**
   * Create a new Color with the given alpha value.
   *
   * @param alpha - Opacity from 0 (transparent) to 1 (opaque).
   * @returns A new Color with the specified alpha.
   *
   * @example
   * ```ts
   * const c = Color.parse('blue');
   * const semi = c.setAlpha(0.5);
   * semi.alpha; // 0.5
   * ```
   */
  setAlpha(alpha: number): Color {
    return new Color({ ...this.#color, alpha });
  }

  /**
   * Channel names for this color's mode (excludes alpha).
   *
   * @returns An array of channel name strings (e.g. `['r', 'g', 'b']` for RGB).
   */
  get channels(): string[] {
    return getMode(this.#color.mode)?.channels.filter((c: string) => c !== 'alpha') ?? [];
  }

  /**
   * Check if a channel exists on this color with a numeric value.
   *
   * @param channel - The channel name to check.
   * @returns `true` if the channel is present and numeric.
   */
  has(channel: string): boolean {
    return typeof this.#color[channel] === 'number';
  }

  /**
   * Returns `[channel, value]` pairs for all defined channels (excludes `mode` and `alpha`).
   *
   * @returns An array of tuples, each containing a channel name and its numeric value.
   *
   * @example
   * ```ts
   * const c = Color.parse('#ff8800');
   * c.entries(); // [['r', 1], ['g', 0.533..], ['b', 0]]
   * ```
   */
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

  /**
   * Returns `[min, max]` range for a channel from the mode definition.
   *
   * @param channel - The channel name (e.g. `'r'`, `'h'`, `'l'`).
   * @returns A `[min, max]` tuple, or `undefined` if the mode has no range info for this channel.
   */
  getRange(channel: string): [number, number] | undefined {
    return (getMode(this.#color.mode) as ExtendedModeDefinition | undefined)?.ranges?.[channel];
  }

  /**
   * Convert to another color space. Returns a new Color, or `undefined` if conversion fails.
   *
   * @param mode - The target color space (e.g. `'oklab'`, `'hsl'`, `'p3'`).
   *   The mode must be registered via `useMode()` or the `setup()` helper.
   * @returns A new Color in the target space, or `undefined` on failure.
   *
   * @example
   * ```ts
   * const c = Color.parse('red');
   * const lab = c.to('oklab');
   * lab?.mode; // 'oklab'
   * ```
   */
  to(mode: string): Color | undefined {
    try {
      const convert = converter(mode);
      const result = convert(this.#color as any);
      if (!result) return undefined;
      return new Color(result);
    } catch {
      return undefined;
    }
  }

  /**
   * Mix with another color. Defaults to a 50% blend in OkLab (perceptually uniform).
   * The result is converted back to the original color's mode.
   *
   * @param other - The color to mix with, as a Color instance or CSS string.
   * @param amount - Blend ratio from 0 (all this) to 1 (all other). Defaults to `0.5`.
   * @param mode - The interpolation color space. Defaults to `'oklab'`.
   * @returns A new Color representing the mix, or `undefined` if parsing fails.
   *
   * @example
   * ```ts
   * const red = Color.parse('red');
   * const blue = Color.parse('blue');
   * const purple = red.mix(blue, 0.5);
   * ```
   */
  mix(other: Color | string, amount = 0.5, mode = 'oklab'): Color | undefined {
    const otherColor = typeof other === 'string' ? Color.parse(other) : other;
    if (!otherColor) return undefined;
    const interp = interpolate([this.#color as any, otherColor.#color as any], mode);
    const result = interp(amount);
    if (!result) return undefined;
    // Convert back to the original color's mode
    if (result.mode !== this.#color.mode) {
      const convert = converter(this.#color.mode);
      const converted = convert(result);
      if (converted) return new Color(converted);
    }
    return new Color(result);
  }

  /**
   * Increase OkLab lightness by the given amount. Returns a new Color in the original mode.
   *
   * @param amount - How much to add to the L channel (0–1 scale). Defaults to `0.1`.
   * @returns A new, lighter Color.
   *
   * @example
   * ```ts
   * const c = Color.parse('darkblue');
   * const lighter = c.lighten(0.2);
   * ```
   */
  lighten(amount = 0.1): Color {
    const lab = this.toOklab()!;
    const l = Math.min(1, (lab.get('l') ?? 0) + amount);
    const adjusted = lab.set({ l });
    if (this.#color.mode !== 'oklab') {
      return adjusted.to(this.#color.mode)!;
    }
    return adjusted;
  }

  /**
   * Decrease OkLab lightness by the given amount. Returns a new Color in the original mode.
   *
   * @param amount - How much to subtract from the L channel (0–1 scale). Defaults to `0.1`.
   * @returns A new, darker Color.
   *
   * @example
   * ```ts
   * const c = Color.parse('lightblue');
   * const darker = c.darken(0.2);
   * ```
   */
  darken(amount = 0.1): Color {
    const lab = this.toOklab()!;
    const l = Math.max(0, (lab.get('l') ?? 0) - amount);
    const adjusted = lab.set({ l });
    if (this.#color.mode !== 'oklab') {
      return adjusted.to(this.#color.mode)!;
    }
    return adjusted;
  }

  // ── Semantic Channel Accessors ──────────────────────────────────

  /**
   * Get the red channel (0–1). Converts to sRGB if needed.
   *
   * @returns The red channel value, or `undefined` if conversion fails.
   */
  getRed(): number | undefined {
    const c = this.#color.mode === 'rgb' ? this : this.to('rgb');
    return c?.get('r');
  }

  /**
   * Set the red channel. Converts to sRGB if needed, then applies the value.
   *
   * @param value - The red channel value (0–1).
   * @returns A new Color with the updated red channel.
   */
  setRed(value: number): Color {
    const c = this.#color.mode === 'rgb' ? this : this.to('rgb');
    return c!.set({ r: value });
  }

  /**
   * Get the green channel (0–1). Converts to sRGB if needed.
   *
   * @returns The green channel value, or `undefined` if conversion fails.
   */
  getGreen(): number | undefined {
    const c = this.#color.mode === 'rgb' ? this : this.to('rgb');
    return c?.get('g');
  }

  /**
   * Set the green channel. Converts to sRGB if needed, then applies the value.
   *
   * @param value - The green channel value (0–1).
   * @returns A new Color with the updated green channel.
   */
  setGreen(value: number): Color {
    const c = this.#color.mode === 'rgb' ? this : this.to('rgb');
    return c!.set({ g: value });
  }

  /**
   * Get the blue channel (0–1). Converts to sRGB if needed.
   *
   * @returns The blue channel value, or `undefined` if conversion fails.
   */
  getBlue(): number | undefined {
    const c = this.#color.mode === 'rgb' ? this : this.to('rgb');
    return c?.get('b');
  }

  /**
   * Set the blue channel. Converts to sRGB if needed, then applies the value.
   *
   * @param value - The blue channel value (0–1).
   * @returns A new Color with the updated blue channel.
   */
  setBlue(value: number): Color {
    const c = this.#color.mode === 'rgb' ? this : this.to('rgb');
    return c!.set({ b: value });
  }

  /**
   * Get the hue channel (0–360). Converts to the specified mode if needed.
   *
   * @param mode - A hue-bearing color space. Defaults to `'hsl'`.
   * @returns The hue in degrees, or `undefined` if conversion fails.
   */
  getHue(mode = 'hsl'): number | undefined {
    const c = this.#color.mode === mode ? this : this.to(mode);
    return c?.get('h');
  }

  /**
   * Set the hue channel. Converts to the specified mode if needed, then applies the value.
   *
   * @param value - The hue in degrees (0–360).
   * @param mode - A hue-bearing color space. Defaults to `'hsl'`.
   * @returns A new Color with the updated hue.
   */
  setHue(value: number, mode = 'hsl'): Color {
    const c = this.#color.mode === mode ? this : this.to(mode);
    return c!.set({ h: value });
  }

  /**
   * Get the saturation channel (0–1). Converts to the specified mode if needed.
   *
   * @param mode - A saturation-bearing color space. Defaults to `'hsl'`.
   * @returns The saturation value, or `undefined` if conversion fails.
   */
  getSaturation(mode = 'hsl'): number | undefined {
    const c = this.#color.mode === mode ? this : this.to(mode);
    return c?.get('s');
  }

  /**
   * Set the saturation channel. Converts to the specified mode if needed, then applies the value.
   *
   * @param value - The saturation value (0–1).
   * @param mode - A saturation-bearing color space. Defaults to `'hsl'`.
   * @returns A new Color with the updated saturation.
   */
  setSaturation(value: number, mode = 'hsl'): Color {
    const c = this.#color.mode === mode ? this : this.to(mode);
    return c!.set({ s: value });
  }

  /**
   * Get the lightness channel. Converts to the specified mode if needed.
   *
   * @param mode - A lightness-bearing color space. Defaults to `'hsl'`.
   * @returns The lightness value, or `undefined` if conversion fails.
   */
  getLightness(mode = 'hsl'): number | undefined {
    const c = this.#color.mode === mode ? this : this.to(mode);
    return c?.get('l');
  }

  /**
   * Set the lightness channel. Converts to the specified mode if needed, then applies the value.
   *
   * @param value - The lightness value.
   * @param mode - A lightness-bearing color space. Defaults to `'hsl'`.
   * @returns A new Color with the updated lightness.
   */
  setLightness(value: number, mode = 'hsl'): Color {
    const c = this.#color.mode === mode ? this : this.to(mode);
    return c!.set({ l: value });
  }

  /**
   * Get the value channel (HSV color space, 0–1).
   *
   * @returns The value value, or `undefined` if conversion fails.
   */
  getValue(): number | undefined {
    const c = this.#color.mode === 'hsv' ? this : this.to('hsv');
    return c?.get('v');
  }

  /**
   * Set the value channel (HSV color space).
   *
   * @param value - The value value (0–1).
   * @returns A new Color with the updated value.
   */
  setValue(value: number): Color {
    const c = this.#color.mode === 'hsv' ? this : this.to('hsv');
    return c!.set({ v: value });
  }

  /**
   * Get the chroma channel. Converts to the specified mode if needed.
   *
   * @param mode - A chroma-bearing color space. Defaults to `'oklch'`.
   * @returns The chroma value, or `undefined` if conversion fails.
   */
  getChroma(mode = 'oklch'): number | undefined {
    const c = this.#color.mode === mode ? this : this.to(mode);
    return c?.get('c');
  }

  /**
   * Set the chroma channel. Converts to the specified mode if needed, then applies the value.
   *
   * @param value - The chroma value.
   * @param mode - A chroma-bearing color space. Defaults to `'oklch'`.
   * @returns A new Color with the updated chroma.
   */
  setChroma(value: number, mode = 'oklch'): Color {
    const c = this.#color.mode === mode ? this : this.to(mode);
    return c!.set({ c: value });
  }

  /**
   * Get the whiteness channel (HWB color space, 0–1).
   *
   * @returns The whiteness value, or `undefined` if conversion fails.
   */
  getWhiteness(): number | undefined {
    const c = this.#color.mode === 'hwb' ? this : this.to('hwb');
    return c?.get('w');
  }

  /**
   * Set the whiteness channel (HWB color space).
   *
   * @param value - The whiteness value (0–1).
   * @returns A new Color with the updated whiteness.
   */
  setWhiteness(value: number): Color {
    const c = this.#color.mode === 'hwb' ? this : this.to('hwb');
    return c!.set({ w: value });
  }

  /**
   * Get the blackness channel (HWB color space, 0–1).
   *
   * @returns The blackness value, or `undefined` if conversion fails.
   */
  getBlackness(): number | undefined {
    const c = this.#color.mode === 'hwb' ? this : this.to('hwb');
    return c?.get('b');
  }

  /**
   * Set the blackness channel (HWB color space).
   *
   * @param value - The blackness value (0–1).
   * @returns A new Color with the updated blackness.
   */
  setBlackness(value: number): Color {
    const c = this.#color.mode === 'hwb' ? this : this.to('hwb');
    return c!.set({ b: value });
  }

  /**
   * Get the alpha (opacity) value.
   *
   * @returns The alpha value (0–1), or `undefined` if not explicitly set.
   */
  getAlpha(): number | undefined {
    return this.#color.alpha;
  }


  /**
   * Get the raw culori color object (for interop with culori functions).
   * Returns a shallow copy — the original internal object remains frozen.
   *
   * @returns A mutable copy of the underlying culori color object.
   */
  toObject(): CuloriColor {
    return { ...this.#color };
  }

  /**
   * Convert to OkLab. Shorthand for `this.to('oklab')`.
   *
   * @returns A new Color in the OkLab color space, or `undefined` on failure.
   */
  toOklab(): Color | undefined {
    return this.to('oklab');
  }

  /**
   * Convert to OkLCH. Shorthand for `this.to('oklch')`.
   *
   * @returns A new Color in the OkLCH color space, or `undefined` on failure.
   */
  toOklch(): Color | undefined {
    return this.to('oklch');
  }

  /**
   * Convert to sRGB. Shorthand for `this.to('rgb')`.
   *
   * @returns A new Color in the sRGB color space, or `undefined` on failure.
   */
  toRgb(): Color | undefined {
    return this.to('rgb');
  }

  /**
   * Convert to HSL. Shorthand for `this.to('hsl')`.
   *
   * @returns A new Color in the HSL color space, or `undefined` on failure.
   */
  toHsl(): Color | undefined {
    return this.to('hsl');
  }

  /**
   * Convert to HSV. Shorthand for `this.to('hsv')`.
   *
   * @returns A new Color in the HSV color space, or `undefined` on failure.
   */
  toHsv(): Color | undefined {
    return this.to('hsv');
  }

  /**
   * Convert to HWB. Shorthand for `this.to('hwb')`.
   *
   * @returns A new Color in the HWB color space, or `undefined` on failure.
   */
  toHwb(): Color | undefined {
    return this.to('hwb');
  }

  /**
   * Convert to CIE Lab (D50 illuminant). Shorthand for `this.to('lab')`.
   *
   * @returns A new Color in the CIE Lab color space, or `undefined` on failure.
   */
  toLab(): Color | undefined {
    return this.to('lab');
  }

  /**
   * Convert to CIE LCH (D50 illuminant). Shorthand for `this.to('lch')`.
   *
   * @returns A new Color in the CIE LCH color space, or `undefined` on failure.
   */
  toLch(): Color | undefined {
    return this.to('lch');
  }

  /**
   * Convert to Display P3. Shorthand for `this.to('p3')`.
   *
   * @returns A new Color in the Display P3 color space, or `undefined` on failure.
   */
  toP3(): Color | undefined {
    return this.to('p3');
  }

  /**
   * Convert to A98 RGB. Shorthand for `this.to('a98')`.
   *
   * @returns A new Color in the A98 RGB color space, or `undefined` on failure.
   */
  toA98(): Color | undefined {
    return this.to('a98');
  }

  /**
   * Convert to ProPhoto RGB. Shorthand for `this.to('prophoto')`.
   *
   * @returns A new Color in the ProPhoto RGB color space, or `undefined` on failure.
   */
  toProphoto(): Color | undefined {
    return this.to('prophoto');
  }

  /**
   * Convert to Rec. 2020. Shorthand for `this.to('rec2020')`.
   *
   * @returns A new Color in the Rec. 2020 color space, or `undefined` on failure.
   */
  toRec2020(): Color | undefined {
    return this.to('rec2020');
  }

  /**
   * Convert to CIE XYZ (D50 illuminant). Shorthand for `this.to('xyz50')`.
   *
   * @returns A new Color in the CIE XYZ-D50 color space, or `undefined` on failure.
   */
  toXyz50(): Color | undefined {
    return this.to('xyz50');
  }

  /**
   * Convert to CIE XYZ (D65 illuminant). Shorthand for `this.to('xyz65')`.
   *
   * @returns A new Color in the CIE XYZ-D65 color space, or `undefined` on failure.
   */
  toXyz65(): Color | undefined {
    return this.to('xyz65');
  }

  /**
   * Convert to Linear sRGB. Shorthand for `this.to('lrgb')`.
   *
   * @returns A new Color in the Linear sRGB color space, or `undefined` on failure.
   */
  toLrgb(): Color | undefined {
    return this.to('lrgb');
  }

  /**
   * Compute the perceptual distance (Euclidean in OkLab) to another color.
   * Smaller values indicate colors that look more alike.
   *
   * @param other - The color to compare against.
   * @returns The Euclidean distance in OkLab space.
   *
   * @example
   * ```ts
   * const a = Color.parse('red');
   * const b = Color.parse('orange');
   * a.deltaE(b); // ~0.16
   * ```
   */
  deltaE(other: Color): number {
    const a = this.toOklab()!;
    const b = other.toOklab()!;
    const dl = (a.get('l') ?? 0) - (b.get('l') ?? 0);
    const da = (a.get('a') ?? 0) - (b.get('a') ?? 0);
    const db = (a.get('b') ?? 0) - (b.get('b') ?? 0);
    return Math.sqrt(dl * dl + da * da + db * db);
  }

  /**
   * Check perceptual equality within a tolerance.
   * With tolerance 0 (default), compares mode and hex string exactly.
   * With a positive tolerance, uses {@link deltaE} for perceptual comparison.
   *
   * @param other - The color to compare against.
   * @param tolerance - Maximum acceptable deltaE distance. Defaults to `0` (exact).
   * @returns `true` if the colors are equal within the given tolerance.
   */
  equals(other: Color, tolerance = 0): boolean {
    if (tolerance === 0) {
      return this.mode === other.mode && this.toString('hex') === other.toString('hex');
    }
    return this.deltaE(other) <= tolerance;
  }

  /**
   * Serialize as a CSS string.
   *
   * @param format - `'hex'` for `#rrggbb`, `'css'` (or omit) for the native CSS format of this mode.
   * @returns The CSS string representation, or `undefined` if serialization fails.
   *
   * @example
   * ```ts
   * Color.parse('red').toString('hex');  // '#ff0000'
   * Color.parse('red').toString();       // 'rgb(255, 0, 0)'
   * ```
   */
  toString(format?: 'hex' | 'css'): string | undefined {
    if (format === 'hex') {
      return this.toHex();
    }
    const result = formatCss(this.#color as any);
    return result ?? this.toHex();
  }

  /**
   * Get the hex representation (`#rrggbb`). Gamut-maps to sRGB via OkLCH if any
   * channel is out of the `[0, 1]` range.
   *
   * @returns The hex string, or `undefined` if conversion fails.
   *
   * @example
   * ```ts
   * Color.parse('red').toHex(); // '#ff0000'
   * ```
   */
  toHex(): string | undefined {
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
    return formatHex(color as any) ?? undefined;
  }

  /**
   * JSON representation of the color, suitable for serialization.
   *
   * @returns An object with `mode`, `channels` (a record of channel names to values),
   *   and an optional `alpha` field.
   */
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

  /**
   * Universal resolver: accepts a CSS string, Color instance, or raw culori object.
   *
   * @param value - A CSS color string, an existing Color, or a culori color object.
   * @returns A Color instance, or `undefined` if parsing a string fails.
   *
   * @example
   * ```ts
   * Color.from('red');           // from string
   * Color.from(existingColor);   // pass-through
   * Color.from({ mode: 'rgb', r: 1, g: 0, b: 0 }); // from culori object
   * ```
   */
  static from(value: string | Color | CuloriColor): Color | undefined {
    if (value instanceof Color) return value;
    if (typeof value === 'string') return Color.parse(value);
    return new Color(value);
  }

  /**
   * Parse a CSS color string.
   *
   * @param value - Any valid CSS color string (e.g. `'red'`, `'#ff0000'`, `'oklch(0.7 0.15 180)'`).
   * @returns A Color instance, or `undefined` if the string cannot be parsed.
   *
   * @example
   * ```ts
   * Color.parse('red');             // named color
   * Color.parse('#ff8800');         // hex
   * Color.parse('hsl(120 50% 50%)'); // HSL
   * ```
   */
  static parse(value: string): Color | undefined {
    const result = parse(value);
    if (!result) return undefined;
    return new Color(result);
  }

  /**
   * Create from a hex string. Alias for {@link Color.parse}.
   *
   * @param value - A hex color string (e.g. `'#ff0000'`, `'#f00'`).
   * @returns A Color instance, or `undefined` if parsing fails.
   */
  static hex(value: string): Color | undefined {
    return Color.parse(value);
  }

  /**
   * Create from a color space mode, channel values, and optional alpha.
   *
   * @param mode - The color space mode (e.g. `'rgb'`, `'oklch'`, `'hsl'`).
   * @param channels - A record of channel names to numeric values.
   * @param alpha - Optional opacity from 0 to 1.
   * @returns A new Color instance.
   *
   * @example
   * ```ts
   * Color.create('rgb', { r: 1, g: 0.5, b: 0 });
   * Color.create('oklch', { l: 0.7, c: 0.15, h: 180 }, 0.8);
   * ```
   */
  static create(mode: string, channels: Record<string, number>, alpha?: number): Color {
    const color: CuloriColor = { mode, ...channels };
    if (alpha !== undefined) {
      color.alpha = alpha;
    }
    return new Color(color);
  }
}

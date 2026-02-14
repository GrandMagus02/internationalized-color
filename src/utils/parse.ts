import { Color } from '../Color.ts';

/**
 * Parse a CSS color string. Convenience alias for {@link Color.parse}.
 *
 * @param value - Any valid CSS color string (e.g. `'red'`, `'#ff0000'`, `'oklch(0.7 0.15 180)'`).
 * @returns A Color instance, or `undefined` if the string cannot be parsed.
 *
 * @example
 * ```ts
 * const c = parseColor('#ff8800');
 * c?.toHex(); // '#ff8800'
 * ```
 */
export function parseColor(value: string): Color | undefined {
  return Color.parse(value);
}

/**
 * Create a color from mode, channels, and optional alpha. Convenience alias for {@link Color.create}.
 *
 * @param mode - The color space mode (e.g. `'rgb'`, `'oklch'`).
 * @param channels - A record of channel names to numeric values.
 * @param alpha - Optional opacity from 0 to 1.
 * @returns A new Color instance.
 *
 * @example
 * ```ts
 * const c = createColor('rgb', { r: 1, g: 0.5, b: 0 });
 * ```
 */
export function createColor(mode: string, channels: Record<string, number>, alpha?: number): Color {
  return Color.create(mode, channels, alpha);
}

/**
 * Create a color from a hex string. Convenience alias for {@link Color.hex}.
 *
 * @param value - A hex color string (e.g. `'#ff0000'`, `'#f00'`).
 * @returns A Color instance, or `undefined` if parsing fails.
 *
 * @example
 * ```ts
 * const c = hexColor('#ff0000');
 * c?.getRed(); // 1
 * ```
 */
export function hexColor(value: string): Color | undefined {
  return Color.hex(value);
}

import { Color } from '../Color.ts';

/**
 * Convert a color to a target color space.
 *
 * @param color - The source color, as a Color instance or CSS string.
 * @param mode - The target color space (e.g. `'oklab'`, `'hsl'`, `'p3'`).
 * @returns A new Color in the target space, or `undefined` if parsing or conversion fails.
 *
 * @example
 * ```ts
 * const lab = convertColor('#ff8800', 'oklab');
 * lab?.get('l'); // ~0.79
 * ```
 */
export function convertColor(color: Color | string, mode: string): Color | undefined {
  const c = typeof color === 'string' ? Color.parse(color) : color;
  return c?.to(mode);
}

/**
 * Get the hex representation (`#rrggbb`) of a color.
 *
 * @param color - The source color, as a Color instance or CSS string.
 * @returns The hex string, or `undefined` if parsing fails.
 *
 * @example
 * ```ts
 * toHex('red'); // '#ff0000'
 * ```
 */
export function toHex(color: Color | string): string | undefined {
  const c = typeof color === 'string' ? Color.parse(color) : color;
  return c?.toHex();
}

/**
 * Get the CSS string representation of a color in its native format.
 *
 * @param color - The source color, as a Color instance or CSS string.
 * @returns The CSS string, or `undefined` if parsing fails.
 *
 * @example
 * ```ts
 * toCSS('red'); // 'rgb(255, 0, 0)'
 * ```
 */
export function toCSS(color: Color | string): string | undefined {
  const c = typeof color === 'string' ? Color.parse(color) : color;
  return c?.toString();
}

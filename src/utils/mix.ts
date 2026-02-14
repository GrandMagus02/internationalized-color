import { Color } from '../Color.ts';

/**
 * Mix two colors together. Accepts strings or Color instances.
 *
 * @param a - The first color.
 * @param b - The second color.
 * @param amount - Blend ratio from 0 (all `a`) to 1 (all `b`). Defaults to `0.5`.
 * @param mode - The interpolation color space. Defaults to `'oklab'` (perceptually uniform).
 * @returns A new Color representing the mix, or `undefined` if parsing fails.
 *
 * @example
 * ```ts
 * const purple = mixColors('red', 'blue', 0.5);
 * ```
 */
export function mixColors(a: Color | string, b: Color | string, amount = 0.5, mode = 'oklab'): Color | undefined {
  const colorA = typeof a === 'string' ? Color.parse(a) : a;
  if (!colorA) return undefined;
  return colorA.mix(b, amount, mode);
}

/**
 * Lighten a color by increasing its OkLab lightness.
 *
 * @param color - The source color, as a Color instance or CSS string.
 * @param amount - How much to add to the L channel (0–1 scale). Defaults to `0.1`.
 * @returns A new, lighter Color, or `undefined` if parsing fails.
 *
 * @example
 * ```ts
 * const lighter = lighten('darkblue', 0.2);
 * ```
 */
export function lighten(color: Color | string, amount = 0.1): Color | undefined {
  const c = typeof color === 'string' ? Color.parse(color) : color;
  return c?.lighten(amount);
}

/**
 * Darken a color by decreasing its OkLab lightness.
 *
 * @param color - The source color, as a Color instance or CSS string.
 * @param amount - How much to subtract from the L channel (0–1 scale). Defaults to `0.1`.
 * @returns A new, darker Color, or `undefined` if parsing fails.
 *
 * @example
 * ```ts
 * const darker = darken('lightblue', 0.2);
 * ```
 */
export function darken(color: Color | string, amount = 0.1): Color | undefined {
  const c = typeof color === 'string' ? Color.parse(color) : color;
  return c?.darken(amount);
}

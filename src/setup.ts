import { useMode } from 'culori/fn';
import type { ModeDefinition } from './types.ts';

/**
 * Register culori color space modes for use with Color.
 * Only registered modes can be used for parsing, conversion, and serialization.
 *
 * @example
 * ```ts
 * import { setup } from 'internationalized-color';
 * import { modeRgb, modeOklab, modeOklch } from 'culori/fn';
 * setup([modeRgb, modeOklab, modeOklch]);
 * ```
 */
export function setup(modes: ModeDefinition[]): void {
  for (const mode of modes) {
    useMode(mode as any);
  }
}

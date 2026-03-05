import { Color, createColorInstance } from './Color.ts';
import { parseColor as parseColorInput } from './parse.ts';
import type { ColorMode } from './types.ts';

export function createColor(input: string | Record<string, unknown>): Color | undefined;
export function createColor(mode: ColorMode, values: [number, number, number], alpha?: number): Color;
export function createColor(
  inputOrMode: string | Record<string, unknown> | ColorMode,
  values?: [number, number, number],
  alpha?: number,
): Color | undefined {
  // Overload 2: mode + values
  if (values) {
    return createColorInstance(inputOrMode as ColorMode, values, alpha);
  }

  // Overload 1: string
  if (typeof inputOrMode === 'string') {
    const result = parseColorInput(inputOrMode);
    if (!result) return undefined;
    return createColorInstance(result.mode, result.channels, result.alpha);
  }

  // Overload 1: object with mode
  const obj = inputOrMode;
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

export function isColor(value: unknown): value is Color {
  return Color.isColor(value);
}

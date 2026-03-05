import { Color } from '../Color.ts';
import type { ColorMode } from '../types.ts';

export function parseColor(value: string): Color | undefined {
  return Color.parse(value);
}

export function createColor(mode: ColorMode | string, channels: Record<string, number>, alpha?: number): Color {
  return Color.create(mode, channels, alpha);
}

export function hexColor(value: string): Color | undefined {
  return Color.parse(value);
}

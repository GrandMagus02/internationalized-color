import type { Color } from './Color.ts';

export interface ChannelConfig {
  min: number;
  max: number;
}

export type ColorMode =
  | 'rgb'
  | 'hsl'
  | 'hsv'
  | 'hwb'
  | 'oklab'
  | 'oklch'
  | 'lab'
  | 'lch'
  | 'p3'
  | 'a98'
  | 'prophoto'
  | 'rec2020'
  | 'xyz50'
  | 'xyz65'
  | 'lrgb';

export interface ChannelLabels {
  red: string;
  green: string;
  blue: string;
  hue: string;
  saturation: string;
  lightness: string;
  value: string;
  whiteness: string;
  blackness: string;
  chroma: string;
  x: string;
  y: string;
  z: string;
  a: string;
  b: string;
}

export interface ColorDictionary {
  locale: string;
  sources: string[];
  basic?: ColorNameSet;
  extended?: ColorNameSet;
  traditional?: ColorNameSet;
  channels?: ChannelLabels;
}

export interface ColorNameSet {
  names: string[];
  colors: Float32Array;
}

export interface ColorName {
  name: string;
  color: Color;
  distance: number;
  sources: string[];
  level: 'basic' | 'extended' | 'traditional';
}

export interface NamingOptions {
  level?: 'basic' | 'extended' | 'traditional';
  threshold?: number;
}

export interface TranslationResult {
  name: string;
  sourceColor: Color;
  targetColor: Color;
  distance: number;
}

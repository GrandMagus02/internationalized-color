/** A culori color object — plain object with a `mode` and channel properties. */
export interface CuloriColor {
  mode: string;
  alpha?: number;
  [channel: string]: number | string | undefined;
}

/** A culori mode definition object. */
export interface ModeDefinition {
  mode: string;
  channels: string[];
  parse?: unknown[];
  serialize?: string | ((color: CuloriColor) => string);
  interpolate?: Record<string, unknown>;
  ranges?: Record<string, [number, number]>;
  toMode?: Record<string, (color: CuloriColor) => CuloriColor>;
  fromMode?: Record<string, (color: CuloriColor) => CuloriColor>;
  gamut?: boolean | string;
  white?: Record<string, number>;
  black?: Record<string, number>;
}

/** A color dictionary for a specific locale. */
export interface ColorDictionary {
  locale: string;
  source: string;
  basic?: ColorNameSet;
  extended?: ColorNameSet;
  traditional?: ColorNameSet;
}

/** A set of color names with their OkLab centroids. */
export interface ColorNameSet {
  /** Color names in the locale's language. */
  names: string[];
  /**
   * OkLab [l, a, b] centroids as a flat Float32Array.
   * Each color = 3 consecutive floats: [l0,a0,b0, l1,a1,b1, ...]
   */
  colors: Float32Array;
}

/** Result of naming a color. */
export interface ColorName {
  /** The color name in the locale's language. */
  name: string;
  /** The canonical OkLab centroid as a Color instance. */
  color: import('./Color.ts').Color;
  /** Perceptual distance from the query color (Euclidean in OkLab). */
  distance: number;
  /** The dictionary source this name came from. */
  source: string;
  /** The specificity level this name belongs to. */
  level: 'basic' | 'extended' | 'traditional';
}

/** Options for the naming operation. */
export interface NamingOptions {
  /** Specificity level — which tiers to search. */
  level?: 'basic' | 'extended' | 'traditional';
  /** Maximum acceptable distance (skip if no name is close enough). */
  threshold?: number;
}

/** Result of translating a color name between locales. */
export interface TranslationResult {
  /** Best matching name in the target locale. */
  name: string;
  /** The color associated with the source name. */
  sourceColor: import('./Color.ts').Color;
  /** The color associated with the target name (nearest match). */
  targetColor: import('./Color.ts').Color;
  /** Perceptual distance between source and target centroids. */
  distance: number;
}

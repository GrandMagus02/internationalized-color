import type { CuloriColor, ModeDefinition } from "culori/fn";
import type { Color } from "./Color.ts";


/**
 * Extended culori mode definition with additional fields used internally.
 * Extends the base `ModeDefinition` with optional properties for parsing,
 * serialization, interpolation, gamut mapping, and channel ranges.
 */
export interface ExtendedModeDefinition extends ModeDefinition {
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

/**
 * A color dictionary for a specific locale, containing named colors organized
 * into up to three naming tiers: `basic`, `extended`, and `traditional`.
 *
 * Each tier is optional — a dictionary may have any combination.
 * Locale data files (e.g. `src/locales/en.ts`) export one of these.
 */
export interface ColorDictionary {
  /** The locale identifier (e.g. `'en'`, `'ja'`, `'zh'`). */
  locale: string;
  /** Attribution for the color data (e.g. `'css'`, `'uw-survey'`). */
  source: string;
  /** Berlin-Kay basic color terms (~11 terms). */
  basic?: ColorNameSet;
  /** Extended common color names. */
  extended?: ColorNameSet;
  /** Traditional or cultural color names (e.g. Japanese wa-iro). */
  traditional?: ColorNameSet;
}

/**
 * A parallel-arrays structure holding color names and their OkLab centroids.
 * `names[i]` corresponds to the OkLab point at `colors[i*3 .. i*3+2]`.
 */
export interface ColorNameSet {
  /** Color names in the locale's language. */
  names: string[];
  /**
   * OkLab `[l, a, b]` centroids as a flat Float32Array.
   * Each color occupies 3 consecutive floats: `[l0, a0, b0, l1, a1, b1, ...]`.
   */
  colors: Float32Array;
}

/**
 * Result of naming a color — the closest match found in a locale dictionary.
 */
export interface ColorName {
  /** The color name in the locale's language. */
  name: string;
  /** The canonical OkLab centroid as a Color instance. */
  color: Color;
  /** Perceptual distance from the query color (Euclidean in OkLab). 0 = exact match. */
  distance: number;
  /** The dictionary source this name came from (e.g. `'css'`, `'uw-survey'`). */
  source: string;
  /** The specificity level this name belongs to (`'basic'`, `'extended'`, or `'traditional'`). */
  level: 'basic' | 'extended' | 'traditional';
}

/**
 * Options for the {@link nameColor} function.
 */
export interface NamingOptions {
  /** Maximum specificity level — searches all tiers up to and including this one. */
  level?: 'basic' | 'extended' | 'traditional';
  /** Maximum acceptable perceptual distance. Results farther than this are excluded. */
  threshold?: number;
}

/**
 * Result of translating a color name between two locales.
 * Contains both the source and target colors so the caller can assess
 * how closely the translation matches.
 */
export interface TranslationResult {
  /** Best matching name in the target locale. */
  name: string;
  /** The color associated with the source name. */
  sourceColor: Color;
  /** The color associated with the target name (nearest match). */
  targetColor: Color;
  /** Perceptual distance between source and target centroids (Euclidean in OkLab). */
  distance: number;
}

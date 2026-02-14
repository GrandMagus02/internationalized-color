import { Color } from './Color.ts';
import { KDTree } from './kdtree.ts';
import type {
  ColorDictionary,
  ColorName,
  ColorNameSet,
  NamingOptions,
  TranslationResult,
} from './types.ts';

type Level = 'basic' | 'extended' | 'traditional';
const LEVELS: Level[] = ['basic', 'extended', 'traditional'];

const dictionaries: Record<string, ColorDictionary> = {};
const trees: Map<string, KDTree> = new Map();

/**
 * Register a locale dictionary. If the locale already exists, new tiers are
 * merged in and cached k-d trees for that locale are invalidated.
 *
 * @param dict - The color dictionary to register. Its `locale` field is used as the key.
 *
 * @example
 * ```ts
 * import { en } from 'internationalized-color/locales/en';
 * useLocale(en);
 * ```
 */
export function useLocale(dict: ColorDictionary): void {
  const existing = dictionaries[dict.locale];
  if (existing) {
    if (dict.basic && !existing.basic) existing.basic = dict.basic;
    if (dict.extended && !existing.extended) existing.extended = dict.extended;
    if (dict.traditional && !existing.traditional) existing.traditional = dict.traditional;
    // Invalidate cached trees for this locale
    for (const level of LEVELS) {
      trees.delete(`${dict.locale}:${level}`);
    }
  } else {
    dictionaries[dict.locale] = { ...dict };
  }
}

/**
 * Retrieve a previously registered locale dictionary.
 *
 * @param locale - The locale identifier (e.g. `'en'`, `'ja'`, `'zh'`).
 * @returns The registered dictionary, or `undefined` if not found.
 */
export function getLocale(locale: string): ColorDictionary | undefined {
  return dictionaries[locale];
}

/**
 * Resolve a locale reference to its dictionary.
 * Accepts either a locale string (looked up in the registry) or a dictionary directly.
 *
 * @param locale - A locale identifier string or a ColorDictionary object.
 * @returns The resolved dictionary, or `undefined` if a string locale is not registered.
 */
function resolveDict(locale: string | ColorDictionary): ColorDictionary | undefined {
  return typeof locale === 'string' ? dictionaries[locale] : locale;
}

/**
 * Resolve the tree cache to use for a given locale reference.
 * Returns the shared module-level cache for registered string locales,
 * or `undefined` for inline dictionaries (no caching).
 *
 * @param locale - A locale identifier string or a ColorDictionary object.
 * @returns The tree cache Map, or `undefined` if caching is not applicable.
 */
function resolveTreeCache(locale: string | ColorDictionary): Map<string, KDTree> | undefined {
  // Use the module-level cache only for registered locales
  return typeof locale === 'string' ? trees : undefined;
}

/**
 * Convert a Color to an OkLab `[l, a, b]` query tuple for k-d tree searches.
 *
 * @param color - The Color to convert.
 * @returns A 3-element tuple of OkLab coordinates.
 */
function toOklabQuery(color: Color): [number, number, number] {
  const oklab = color.toOklab()!;
  return [
    oklab.get('l') ?? 0,
    oklab.get('a') ?? 0,
    oklab.get('b') ?? 0,
  ];
}

/**
 * Determine which naming tiers to search based on the requested level.
 * Returns all tiers up to and including the specified level, or all tiers if none specified.
 *
 * @param level - The maximum tier to include. If omitted, all tiers are returned.
 * @returns An array of Level strings to search.
 */
function getLevels(level?: Level): Level[] {
  if (!level) return LEVELS;
  const idx = LEVELS.indexOf(level);
  return LEVELS.slice(0, idx + 1);
}

/**
 * Get or build the k-d tree for a given dictionary tier.
 * Results are cached in the provided cache Map when available.
 *
 * @param dict - The color dictionary containing the tier data.
 * @param level - The naming tier (`'basic'`, `'extended'`, or `'traditional'`).
 * @param cache - Optional Map to cache built trees. Pass `undefined` to skip caching.
 * @returns The k-d tree for the tier, or `null` if the tier has no data.
 */
function getTree(
  dict: ColorDictionary,
  level: Level,
  cache?: Map<string, KDTree>,
): KDTree | null {
  const key = `${dict.locale}:${level}`;

  if (cache) {
    const cached = cache.get(key);
    if (cached) return cached;
  }

  const nameSet = dict[level];
  if (!nameSet || nameSet.names.length === 0) return null;

  const tree = new KDTree(nameSet.colors, nameSet.names.length);
  if (cache) cache.set(key, tree);
  return tree;
}

/**
 * Construct a Color instance from a ColorNameSet entry at the given index.
 * Reads 3 consecutive floats from the set's OkLab Float32Array.
 *
 * @param set - The color name set containing the OkLab centroids.
 * @param index - The index of the color entry.
 * @returns A Color in the OkLab color space.
 */
function makeColorFromSet(set: ColorNameSet, index: number): Color {
  const offset = index * 3;
  return Color.create('oklab', {
    l: set.colors[offset]!,
    a: set.colors[offset + 1]!,
    b: set.colors[offset + 2]!,
  });
}

/**
 * Find the closest named color to a given color in a locale dictionary.
 * Searches tiers from `basic` through the specified level, returning the
 * single best match across all searched tiers.
 *
 * @param color - The query color, as a Color instance or CSS string.
 * @param locale - A registered locale string (e.g. `'en'`) or a ColorDictionary object.
 * @param options - Optional naming options (level, threshold).
 * @returns The closest named color, or `null` if no match is found.
 *
 * @example
 * ```ts
 * import { en } from 'internationalized-color/locales/en';
 * useLocale(en);
 * const result = nameColor('#ff8800', 'en');
 * result?.name; // 'orange'
 * ```
 */
export function nameColor(
  color: Color | string,
  locale: string | ColorDictionary,
  options?: NamingOptions,
): ColorName | null {
  const c = typeof color === 'string' ? Color.parse(color) : color;
  if (!c) return null;

  const dict = resolveDict(locale);
  if (!dict) return null;

  const query = toOklabQuery(c);
  const cache = resolveTreeCache(locale);
  let best: ColorName | null = null;

  for (const level of getLevels(options?.level)) {
    const tree = getTree(dict, level, cache);
    if (!tree) continue;

    const nameSet = dict[level]!;
    const result = tree.nearest(query);
    if (result.index < 0) continue;

    if (options?.threshold !== undefined && result.distance > options.threshold) continue;

    if (!best || result.distance < best.distance) {
      best = {
        name: nameSet.names[result.index]!,
        color: makeColorFromSet(nameSet, result.index),
        distance: result.distance,
        source: dict.source,
        level,
      };
    }
  }

  return best;
}

/**
 * Find the N closest named colors to a given color, searching all tiers.
 * Results are sorted by perceptual distance (closest first).
 *
 * @param color - The query color, as a Color instance or CSS string.
 * @param locale - A registered locale string or a ColorDictionary object.
 * @param count - Maximum number of results to return. Defaults to `5`.
 * @returns An array of the closest named colors, sorted by distance.
 *
 * @example
 * ```ts
 * const nearest = nearestColors('#ff8800', 'en', 3);
 * nearest.map(n => n.name); // ['orange', 'darkorange', 'orangered']
 * ```
 */
export function nearestColors(
  color: Color | string,
  locale: string | ColorDictionary,
  count = 5,
): ColorName[] {
  const c = typeof color === 'string' ? Color.parse(color) : color;
  if (!c) return [];

  const dict = resolveDict(locale);
  if (!dict) return [];

  const query = toOklabQuery(c);
  const cache = resolveTreeCache(locale);
  const candidates: ColorName[] = [];

  for (const level of LEVELS) {
    const tree = getTree(dict, level, cache);
    if (!tree) continue;

    const nameSet = dict[level]!;
    const results = tree.nearestN(query, count);

    for (const result of results) {
      candidates.push({
        name: nameSet.names[result.index]!,
        color: makeColorFromSet(nameSet, result.index),
        distance: result.distance,
        source: dict.source,
        level,
      });
    }
  }

  candidates.sort((a, b) => a.distance - b.distance);
  return candidates.slice(0, count);
}

/**
 * Look up a color by its name in a locale dictionary (case-insensitive).
 * Searches all tiers (`basic`, `extended`, `traditional`) and returns the first match.
 *
 * @param name - The color name to look up (e.g. `'red'`, `'紅'`).
 * @param locale - A registered locale string or a ColorDictionary object.
 * @returns The Color associated with the name (in OkLab), or `undefined` if not found.
 *
 * @example
 * ```ts
 * const color = lookupColor('orange', 'en');
 * color?.toHex(); // '#ffa500'
 * ```
 */
export function lookupColor(
  name: string,
  locale: string | ColorDictionary,
): Color | undefined {
  const dict = resolveDict(locale);
  if (!dict) return undefined;

  const nameLower = name.toLowerCase();

  for (const level of LEVELS) {
    const nameSet = dict[level];
    if (!nameSet) continue;

    const idx = nameSet.names.findIndex((n) => n.toLowerCase() === nameLower);
    if (idx >= 0) {
      return makeColorFromSet(nameSet, idx);
    }
  }

  return undefined;
}

/**
 * List all available color names in a locale dictionary across all tiers.
 * Each entry includes the name, its OkLab centroid color, and metadata.
 *
 * @param locale - A registered locale string or a ColorDictionary object.
 * @returns An array of all ColorName entries, or an empty array if the locale is not found.
 *
 * @example
 * ```ts
 * const names = listColorNames('en');
 * names.length; // total number of named colors in English
 * ```
 */
export function listColorNames(locale: string | ColorDictionary): ColorName[] {
  const dict = resolveDict(locale);
  if (!dict) return [];

  const result: ColorName[] = [];

  for (const level of LEVELS) {
    const nameSet = dict[level];
    if (!nameSet) continue;

    for (let i = 0; i < nameSet.names.length; i++) {
      result.push({
        name: nameSet.names[i]!,
        color: makeColorFromSet(nameSet, i),
        distance: 0,
        source: dict.source,
        level,
      });
    }
  }

  return result;
}

/**
 * Translate a color name from one locale to another.
 * Looks up the color associated with the name in the source locale, then
 * finds the closest named color in the target locale.
 *
 * @param name - The color name to translate (e.g. `'red'`).
 * @param from - The source locale (string or ColorDictionary).
 * @param to - The target locale (string or ColorDictionary).
 * @returns A TranslationResult with the target name and distance, or `null` if
 *   the source name is not found or no target match exists.
 *
 * @example
 * ```ts
 * const result = translateColor('red', 'en', 'ja');
 * result?.name; // '赤' (Japanese for red)
 * ```
 */
export function translateColor(
  name: string,
  from: string | ColorDictionary,
  to: string | ColorDictionary,
): TranslationResult | null {
  const sourceColor = lookupColor(name, from);
  if (!sourceColor) return null;

  const match = nameColor(sourceColor, to);
  if (!match) return null;

  return {
    name: match.name,
    sourceColor,
    targetColor: match.color,
    distance: match.distance,
  };
}

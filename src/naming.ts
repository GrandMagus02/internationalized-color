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

/** Key for caching a k-d tree per locale + level. */
function cacheKey(locale: string, level: Level): string {
  return `${locale}:${level}`;
}

/**
 * Locale-aware color namer.
 * Uses k-d trees in OkLab space for fast nearest-neighbor lookup.
 */
export class ColorNamer {
  #dicts: Map<string, ColorDictionary> = new Map();
  #trees: Map<string, KDTree> = new Map();

  constructor(dictionaries: ColorDictionary[]) {
    for (const dict of dictionaries) {
      // Merge dictionaries for the same locale
      const existing = this.#dicts.get(dict.locale);
      if (existing) {
        if (dict.basic && !existing.basic) existing.basic = dict.basic;
        if (dict.extended && !existing.extended) existing.extended = dict.extended;
        if (dict.traditional && !existing.traditional) existing.traditional = dict.traditional;
      } else {
        this.#dicts.set(dict.locale, { ...dict });
      }
    }
  }

  /** Get or lazily build a k-d tree for a locale + level. */
  #getTree(locale: string, level: Level): KDTree | null {
    const key = cacheKey(locale, level);
    let tree = this.#trees.get(key);
    if (tree) return tree;

    const dict = this.#dicts.get(locale);
    if (!dict) return null;

    const nameSet = dict[level];
    if (!nameSet || nameSet.names.length === 0) return null;

    tree = new KDTree(nameSet.colors, nameSet.names.length);
    this.#trees.set(key, tree);
    return tree;
  }

  /** Get the levels to search based on the requested level. */
  #getLevels(level?: Level): Level[] {
    if (!level) return LEVELS;
    // Search all levels up to and including the requested one
    const idx = LEVELS.indexOf(level);
    return LEVELS.slice(0, idx + 1);
  }

  /** Find the closest named color in the given locale. */
  name(color: Color, locale: string, options?: NamingOptions): ColorName | null {
    const dict = this.#dicts.get(locale);
    if (!dict) return null;

    const oklab = color.toOklab();
    const query: [number, number, number] = [
      oklab.get('l') ?? 0,
      oklab.get('a') ?? 0,
      oklab.get('b') ?? 0,
    ];

    let best: ColorName | null = null;

    for (const level of this.#getLevels(options?.level)) {
      const tree = this.#getTree(locale, level);
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

  /** Find the N closest named colors. */
  nearest(color: Color, locale: string, count = 5): ColorName[] {
    const dict = this.#dicts.get(locale);
    if (!dict) return [];

    const oklab = color.toOklab();
    const query: [number, number, number] = [
      oklab.get('l') ?? 0,
      oklab.get('a') ?? 0,
      oklab.get('b') ?? 0,
    ];

    // Collect candidates from all levels
    const candidates: ColorName[] = [];

    for (const level of LEVELS) {
      const tree = this.#getTree(locale, level);
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

    // Sort by distance and return top N
    candidates.sort((a, b) => a.distance - b.distance);
    return candidates.slice(0, count);
  }

  /** Look up a color by name in a locale. */
  lookup(name: string, locale: string): Color | undefined {
    const dict = this.#dicts.get(locale);
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

  /** List all available color names for a locale. */
  names(locale: string): ColorName[] {
    const dict = this.#dicts.get(locale);
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

  /** Translate a color name from one locale to another. */
  translate(name: string, from: string, to: string): TranslationResult | null {
    const sourceColor = this.lookup(name, from);
    if (!sourceColor) return null;

    const match = this.name(sourceColor, to);
    if (!match) return null;

    return {
      name: match.name,
      sourceColor,
      targetColor: match.color,
      distance: match.distance,
    };
  }
}

/** Create a Color from a ColorNameSet at a given index (OkLab coordinates). */
function makeColorFromSet(set: ColorNameSet, index: number): Color {
  const offset = index * 3;
  return Color.create('oklab', {
    l: set.colors[offset]!,
    a: set.colors[offset + 1]!,
    b: set.colors[offset + 2]!,
  });
}

import { Color, createColorInstance } from './Color.ts';
import { KDTree } from './kdtree.ts';
import type {
  ChannelLabels,
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

export function useLocale(dict: ColorDictionary): void {
  const existing = dictionaries[dict.locale];
  if (existing) {
    if (dict.basic && !existing.basic) existing.basic = dict.basic;
    if (dict.extended && !existing.extended) existing.extended = dict.extended;
    if (dict.traditional && !existing.traditional) existing.traditional = dict.traditional;
    for (const level of LEVELS) {
      trees.delete(`${dict.locale}:${level}`);
    }
  } else {
    dictionaries[dict.locale] = { ...dict };
  }
}

export function getLocale(locale: string): ColorDictionary | undefined {
  return dictionaries[locale];
}

function resolveDict(locale: string | ColorDictionary): ColorDictionary | undefined {
  return typeof locale === 'string' ? dictionaries[locale] : locale;
}

function resolveTreeCache(locale: string | ColorDictionary): Map<string, KDTree> | undefined {
  return typeof locale === 'string' ? trees : undefined;
}

function toOklabQuery(color: Color): [number, number, number] {
  const oklab = color.to('oklab')!;
  return oklab.toArray();
}

function getLevels(level?: Level): Level[] {
  if (!level) return LEVELS;
  const idx = LEVELS.indexOf(level);
  return LEVELS.slice(0, idx + 1);
}

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

function makeColorFromSet(set: ColorNameSet, index: number): Color {
  const offset = index * 3;
  return createColorInstance('oklab', [
    set.colors[offset]!,
    set.colors[offset + 1]!,
    set.colors[offset + 2]!,
  ]);
}

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
        sources: dict.sources,
        level,
      };
    }
  }

  return best;
}

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
        sources: dict.sources,
        level,
      });
    }
  }

  candidates.sort((a, b) => a.distance - b.distance);
  return candidates.slice(0, count);
}

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
        sources: dict.sources,
        level,
      });
    }
  }

  return result;
}

export function getChannelLabels(
  color: Color,
  locale?: string | ColorDictionary,
): [string, string, string] {
  const labels = color.channels.map(c => c.label) as [string, string, string];
  if (!locale) return labels;
  const dict = resolveDict(locale);
  if (!dict?.channels) return labels;
  return labels.map(l => dict.channels![l as keyof ChannelLabels] ?? l) as [string, string, string];
}

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

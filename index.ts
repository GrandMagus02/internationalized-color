export type { CuloriColor, ModeDefinition } from 'culori/fn';
export { Color } from './src/Color.ts';
export {
  useLocale,
  getLocale,
  nameColor,
  nearestColors,
  lookupColor,
  listColorNames,
  translateColor,
} from './src/naming.ts';
export type {
  ExtendedModeDefinition,
  ColorDictionary,
  ColorNameSet,
  ColorName,
  NamingOptions,
  TranslationResult,
} from './src/types.ts';
export * from './src/utils/index.ts';

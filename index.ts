// Register color space factories (must be first)
import './src/spaces/index.ts';

export { Color } from './src/Color.ts';
export {
  RGBColor,
  HSLColor,
  HSVColor,
  HWBColor,
  OklabColor,
  OklchColor,
  LabColor,
  LchColor,
  P3Color,
  A98Color,
  ProphotoColor,
  Rec2020Color,
  XYZ50Color,
  XYZ65Color,
  LRGBColor,
} from './src/spaces/index.ts';
export {
  useLocale,
  getLocale,
  nameColor,
  nearestColors,
  lookupColor,
  listColorNames,
  getChannelLabels,
  translateColor,
} from './src/naming.ts';
export type {
  ColorMode,
  ChannelConfig,
  ChannelLabels,
  ColorDictionary,
  ColorNameSet,
  ColorName,
  NamingOptions,
  TranslationResult,
} from './src/types.ts';
export * from './src/utils/index.ts';
export {
  toRgb, toHsl, toHsv, toHwb,
  toOklab, toOklch, toLab, toLch,
  toP3, toA98, toProphoto, toRec2020,
  toXyz50, toXyz65, toLrgb,
} from './src/convert/index.ts';

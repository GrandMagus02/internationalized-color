/**
 * Convenience bootstrap that registers all CSS Color Level 4 color spaces.
 * Import this module for its side effect:
 *
 * ```ts
 * import 'internationalized-color/css';
 * ```
 */
import { useMode } from 'culori/fn';
import {
  modeRgb,
  modeHsv,
  modeHsl,
  modeHwb,
  modeLab,
  modeLch,
  modeOklab,
  modeOklch,
  modeP3,
  modeA98,
  modeProphoto,
  modeRec2020,
  modeXyz50,
  modeXyz65,
  modeLrgb,
} from 'culori/fn';


export const rgb = useMode(modeRgb);
export const hsv = useMode(modeHsv);
export const hsl = useMode(modeHsl);
export const hwb = useMode(modeHwb);
export const lab = useMode(modeLab);
export const lch = useMode(modeLch);
export const oklab = useMode(modeOklab);
export const oklch = useMode(modeOklch);
export const p3 = useMode(modeP3);
export const a98 = useMode(modeA98);
export const prophoto = useMode(modeProphoto);
export const rec2020 = useMode(modeRec2020);
export const xyz50 = useMode(modeXyz50);
export const xyz65 = useMode(modeXyz65);
export const lrgb = useMode(modeLrgb);

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

const modes = [
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
];

for (const mode of modes) {
  useMode(mode as any);
}

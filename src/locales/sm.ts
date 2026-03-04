import type { ColorDictionary } from '../types.ts';

// Samoan — 28 survey responses
export const sm: ColorDictionary = {
  locale: 'sm',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Mumu', green: 'Lanu', blue: 'Lanu moana',
    hue: 'Hue', saturation: 'Saturation', lightness: 'Lightness',
    value: 'Value', whiteness: 'Whiteness', blackness: 'Blackness',
    chroma: 'Chroma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'moana',
      'meamata',
      'moli',
      'samasama',
      'pigiki',
      'viole',
      'mumu',
      'uliuli',
      'pa\'epa\'e',
      'enaena',
      'efuefu',
    ],
    colors: new Float32Array([
      // moana
      0.574881, -0.040804, -0.230331,
      // meamata
      0.875607, -0.213373, 0.16593,
      // moli
      0.748947, 0.095654, 0.152022,
      // samasama
      0.907972, -0.049202, 0.186072,
      // pigiki
      0.658882, 0.270688, -0.046338,
      // viole
      0.600893, 0.211772, -0.204613,
      // mumu
      0.630287, 0.23242, 0.105238,
      // uliuli
      0, 0, 0,
      // pa'epa'e
      1, 0, 0,
      // enaena
      0.470784, 0.070809, 0.08696,
      // efuefu
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'moana vaivai',
      'moana malosi',
      'moana feololo',
      'meamata malosi',
    ],
    colors: new Float32Array([
      // moana vaivai
      0.830049, -0.121912, -0.078808,
      // moana malosi
      0.523345, -0.032035, -0.263973,
      // moana feololo
      0.596659, -0.045872, -0.216372,
      // meamata malosi
      0.868028, -0.227829, 0.165766,
    ]),
  },
  };

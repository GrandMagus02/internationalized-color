import type { ColorDictionary } from '../types.ts';

// Dutch (Nederlands) — 2044 survey responses
export const nl: ColorDictionary = {
  locale: 'nl',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Rood', green: 'Groen', blue: 'Blauw',
    hue: 'Tint', saturation: 'Verzadiging', lightness: 'Lichtheid',
    value: 'Waarde', whiteness: 'Witheid', blackness: 'Zwartheid',
    chroma: 'Chroma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'blauw',
      'groen',
      'paars',
      'oranje',
      'roze',
      'rood',
      'bruin',
      'geel',
      'zwart',
      'grijs',
      'wit',
    ],
    colors: new Float32Array([
      // blauw
      0.580001, -0.043923, -0.180912,
      // groen
      0.753374, -0.16863, 0.120618,
      // paars
      0.546025, 0.169182, -0.168131,
      // oranje
      0.73628, 0.085827, 0.145482,
      // roze
      0.652609, 0.229987, -0.059421,
      // rood
      0.594388, 0.20907, 0.095884,
      // bruin
      0.516191, 0.038103, 0.065716,
      // geel
      0.907721, -0.052948, 0.183645,
      // zwart
      0.239068, 0.020322, -0.015125,
      // grijs
      0.673325, -0.017969, -0.011485,
      // wit
      1, 0, 0,
    ]),
  },
  extended: {
    names: [
      'lichtblauw',
      'donkerblauw',
      'lichtgroen',
      'turquoise',
      'magenta',
      'donker paars',
      'donkergroen',
      'lila',
      'felgroen',
      'beige',
      'donkerroze',
      'mintgroen',
      'cyaan',
      'bordeaux',
      'groengeel',
      'appelblauwzeegroen',
      'turkoois',
      'grasgroen',
      'oker',
      'neongroen',
      'lichtpaars',
    ],
    colors: new Float32Array([
      // lichtblauw
      0.790282, -0.10226, -0.081914,
      // donkerblauw
      0.411423, -0.01074, -0.219625,
      // lichtgroen
      0.839785, -0.16441, 0.125888,
      // turquoise
      0.805802, -0.133606, -0.01933,
      // magenta
      0.618565, 0.244401, -0.100747,
      // donker paars
      0.415013, 0.098335, -0.107405,
      // donkergroen
      0.461632, -0.082095, 0.045974,
      // lila
      0.689134, 0.117228, -0.111248,
      // felgroen
      0.834307, -0.203601, 0.137591,
      // beige
      0.809987, -0.008971, 0.061464,
      // donkerroze
      0.603481, 0.236207, -0.021885,
      // mintgroen
      0.867576, -0.170576, 0.047233,
      // cyaan
      0.778807, -0.116234, -0.013611,
      // bordeaux
      0.402659, 0.117699, 0.047889,
      // groengeel
      0.881394, -0.123727, 0.171725,
      // appelblauwzeegroen
      0.848271, -0.152524, 0.002741,
      // turkoois
      0.83185, -0.136318, -0.027374,
      // grasgroen
      0.79812, -0.192492, 0.156879,
      // oker
      0.825316, -0.027893, 0.160175,
      // neongroen
      0.866301, -0.214431, 0.165182,
      // lichtpaars
      0.669965, 0.094823, -0.124376,
    ]),
  },
  };

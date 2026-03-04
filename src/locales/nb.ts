import type { ColorDictionary } from '../types.ts';

// Norwegian Bokmål — 637 survey responses
export const nb: ColorDictionary = {
  locale: 'nb',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Rød', green: 'Grønn', blue: 'Blå',
    hue: 'Fargetone', saturation: 'Metning', lightness: 'Lyshet',
    value: 'Verdi', whiteness: 'Hvithet', blackness: 'Sorthet',
    chroma: 'Kroma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'blå',
      'grønn',
      'rosa',
      'rød',
      'oransje',
      'gul',
      'lilla',
      'svart',
      'hvit',
      'brun',
      'grå',
    ],
    colors: new Float32Array([
      // blå
      0.598988, -0.045745, -0.214927,
      // grønn
      0.871702, -0.218334, 0.153607,
      // rosa
      0.662061, 0.27213, -0.064612,
      // rød
      0.631233, 0.229415, 0.10924,
      // oransje
      0.73645, 0.107473, 0.149338,
      // gul
      0.917291, -0.045151, 0.187934,
      // lilla
      0.598206, 0.198695, -0.22511,
      // svart
      0, 0, 0,
      // hvit
      1, 0, 0,
      // brun
      0.470784, 0.070809, 0.08696,
      // grå
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'turkis',
      'lyseblå',
      'himmelblå',
      'lime',
      'mørkeblå',
      'magenta',
      'kongeblå',
      'limegrønn',
      'orange',
      'mintgrønn',
      'lys blå',
      'marineblå',
      'mørk blå',
      'blått',
      'fuchsia',
      'oker',
      'indigo',
      'knallrosa',
      'grønnt',
      'fiolett',
      'lysegrønn',
      'rødrosa',
      'neon grønn',
      'neon rosa',
    ],
    colors: new Float32Array([
      // turkis
      0.873491, -0.151441, -0.01845,
      // lyseblå
      0.794033, -0.109965, -0.095306,
      // himmelblå
      0.732295, -0.087229, -0.133599,
      // lime
      0.89506, -0.181649, 0.182401,
      // mørkeblå
      0.495773, -0.029954, -0.28226,
      // magenta
      0.664455, 0.272352, -0.085124,
      // kongeblå
      0.482031, -0.028669, -0.291497,
      // limegrønn
      0.884695, -0.199728, 0.180423,
      // orange
      0.71029, 0.133256, 0.143708,
      // mintgrønn
      0.884126, -0.18372, 0.058257,
      // lys blå
      0.81128, -0.115119, -0.089005,
      // marineblå
      0.494778, -0.023117, -0.283316,
      // mørk blå
      0.498831, -0.025813, -0.28047,
      // blått
      0.63419, -0.055933, -0.192724,
      // fuchsia
      0.675085, 0.273689, -0.116513,
      // oker
      0.838398, 0.019274, 0.171127,
      // indigo
      0.517632, 0.10013, -0.275279,
      // knallrosa
      0.665, 0.273283, -0.0681,
      // grønnt
      0.874543, -0.215827, 0.168039,
      // fiolett
      0.550009, 0.14465, -0.256589,
      // lysegrønn
      0.91146, -0.154942, 0.18789,
      // rødrosa
      0.638536, 0.250735, 0.04787,
      // neon grønn
      0.887416, -0.195097, 0.181717,
      // neon rosa
      0.658494, 0.270486, -0.044885,
    ]),
  },
  };

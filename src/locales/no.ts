import type { ColorDictionary } from '../types.ts';

// Norwegian (Norsk) — 47 survey responses
export const no: ColorDictionary = {
  locale: 'no',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Rød', green: 'Grønn', blue: 'Blå', hue: 'Kulør', saturation: 'Metning', lightness: 'Lyshet', value: 'Verdi', whiteness: 'Hvithet', blackness: 'Sorthet', chroma: 'Kroma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
      basic: {
    names: [
      'grønn',
      'lilla',
      'blå',
      'rød',
      'gul',
      'oransje',
      'rosa',
      'svart',
      'hvit',
      'brun',
      'grå',
    ],
    colors: new Float32Array([
      // grønn
      0.871013, -0.220119, 0.156019,
      // lilla
      0.63661, 0.233426, -0.197738,
      // blå
      0.619351, -0.051781, -0.20201,
      // rød
      0.630379, 0.232691, 0.104473,
      // gul
      0.948591, -0.068783, 0.194579,
      // oransje
      0.744202, 0.100104, 0.151003,
      // rosa
      0.658882, 0.270688, -0.046338,
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
      'gulgrønn',
      'klar blå',
      'mørk fiolett',
      'mørk blå',
      'neonrosa',
      'mørk neonrosa',
      'mørk oransje',
      'asurblå',
      'lys blå',
      'okergul',
      'lime',
      'konge blå',
      'lys grønn',
      'gull',
      'orange',
      'sennep',
    ],
    colors: new Float32Array([
      // turkis
      0.893921, -0.161118, -0.002765,
      // gulgrønn
      0.905124, -0.165299, 0.186702,
      // klar blå
      0.606871, -0.048459, -0.209885,
      // mørk fiolett
      0.493958, 0.060429, -0.288715,
      // mørk blå
      0.539994, -0.034275, -0.25302,
      // neonrosa
      0.648348, 0.263194, -0.002964,
      // mørk neonrosa
      0.638756, 0.251099, 0.046574,
      // mørk oransje
      0.64092, 0.209282, 0.128675,
      // asurblå
      0.7623, -0.097653, -0.116337,
      // lys blå
      0.714001, -0.08102, -0.144316,
      // okergul
      0.832757, 0.023708, 0.169927,
      // lime
      0.867819, -0.228601, 0.167527,
      // konge blå
      0.465436, 0.001214, -0.304419,
      // lys grønn
      0.880446, -0.191805, 0.079158,
      // gull
      0.888751, -0.018341, 0.181818,
      // orange
      0.700925, 0.142847, 0.141688,
      // sennep
      0.878884, -0.011234, 0.179726,
    ]),
  },
  };

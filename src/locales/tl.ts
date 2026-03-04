import type { ColorDictionary } from '../types.ts';

// Tagalog — 224 survey responses
export const tl: ColorDictionary = {
  locale: 'tl',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Pula', green: 'Berde', blue: 'Asul',
    hue: 'Kulay', saturation: 'Saturation', lightness: 'Liwanag',
    value: 'Halaga', whiteness: 'Kaputi', blackness: 'Kaitiman',
    chroma: 'Chroma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'asul',
      'berde',
      'dilaw',
      'lila',
      'pula',
      'rosas',
      'kahel',
      'itim',
      'puti',
      'kayumanggi',
      'abo',
    ],
    colors: new Float32Array([
      // asul
      0.602752, -0.04598, -0.21082,
      // berde
      0.872588, -0.216678, 0.153811,
      // dilaw
      0.893383, -0.035947, 0.182951,
      // lila
      0.62109, 0.236529, -0.170551,
      // pula
      0.632091, 0.229791, 0.106534,
      // rosas
      0.659174, 0.27096, -0.054451,
      // kahel
      0.7289, 0.114766, 0.147715,
      // itim
      0, 0, 0,
      // puti
      1, 0, 0,
      // kayumanggi
      0.470784, 0.070809, 0.08696,
      // abo
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'blue',
      'pink',
      'light blue',
      'red',
      'orange',
      'yellow',
      'purple',
      'violet',
      'sky grey',
      'lime',
      'bughaw',
      'yellow green',
      'torquise',
      'green',
      'neon green',
      'sky blue',
      'dark blue',
      'azul',
      'light green',
      'ginto',
      'turqoise',
      'mustard',
    ],
    colors: new Float32Array([
      // blue
      0.56559, -0.038251, -0.236369,
      // pink
      0.662486, 0.272342, -0.059406,
      // light blue
      0.780572, -0.107236, -0.096339,
      // red
      0.631744, 0.230223, 0.106434,
      // orange
      0.744202, 0.100104, 0.151003,
      // yellow
      0.9465, -0.059304, 0.194053,
      // purple
      0.566305, 0.176943, -0.229894,
      // violet
      0.605203, 0.203015, -0.224472,
      // sky grey
      0.875894, -0.152321, -0.017272,
      // lime
      0.890012, -0.190639, 0.182592,
      // bughaw
      0.720844, -0.083327, -0.14029,
      // yellow green
      0.908231, -0.160193, 0.187284,
      // torquise
      0.886613, -0.178718, 0.044983,
      // green
      0.880192, -0.205306, 0.168314,
      // neon green
      0.86805, -0.22935, 0.173139,
      // sky blue
      0.720844, -0.083327, -0.14029,
      // dark blue
      0.462862, -0.009432, -0.305532,
      // azul
      0.582683, -0.042543, -0.225311,
      // light green
      0.87719, -0.209939, 0.16373,
      // ginto
      0.888751, -0.018341, 0.181818,
      // turqoise
      0.891341, -0.170076, 0.021363,
      // mustard
      0.871049, -0.005502, 0.178064,
    ]),
  },
  };

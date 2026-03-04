import type { ColorDictionary } from '../types.ts';

// Irish (Gaeilge) — 36 survey responses
export const ga: ColorDictionary = {
  locale: 'ga',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Dearg', green: 'Glas', blue: 'Gorm',
    hue: 'Dath', saturation: 'Sáithiú', lightness: 'Éadromacht',
    value: 'Luach', whiteness: 'Báine', blackness: 'Duibhe',
    chroma: 'Cróma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'dubh',
      'bán',
      'dearg',
      'glas',
      'buí',
      'gorm',
      'donn',
      'oráiste',
      'bándearg',
      'corcra',
      'liath',
    ],
    colors: new Float32Array([
      // dubh
      0, 0, 0,
      // bán
      1, 0, 0,
      // dearg
      0.627955, 0.224863, 0.125846,
      // glas
      0.519752, -0.140302, 0.107676,
      // buí
      0.967983, -0.071369, 0.19857,
      // gorm
      0.452014, -0.032457, -0.311528,
      // donn
      0.470784, 0.070809, 0.08696,
      // oráiste
      0.792688, 0.056611, 0.161385,
      // bándearg
      0.867738, 0.07298, 0.009071,
      // corcra
      0.420914, 0.164704, -0.101472,
      // liath
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'dark blue',
      'green',
      'orange',
      'blue',
      'lime',
      'red',
      'turquoise',
      'light blue',
      'pink',
      'yellow',
      'purple',
      'magenta',
      'sky blue',
      'megenta',
      'cerise',
      'gold',
      'fluorescent yellow',
      'baby blue',
      'pale blue',
      'cerise pink',
    ],
    colors: new Float32Array([
      // dark blue
      0.477789, -0.019759, -0.294861,
      // green
      0.870929, -0.217825, 0.142622,
      // orange
      0.731895, 0.111859, 0.148359,
      // blue
      0.590621, -0.044402, -0.220225,
      // lime
      0.895228, -0.181936, 0.184851,
      // red
      0.633359, 0.219359, 0.124911,
      // turquoise
      0.887085, -0.177807, 0.042535,
      // light blue
      0.725418, -0.08488, -0.137611,
      // pink
      0.689257, 0.276063, -0.1391,
      // yellow
      0.943233, -0.055524, 0.193345,
      // purple
      0.585154, 0.183829, -0.236138,
      // magenta
      0.648662, 0.263489, -0.004394,
      // sky blue
      0.904733, -0.150286, -0.036774,
      // megenta
      0.637274, 0.24854, 0.055521,
      // cerise
      0.634508, 0.243068, 0.073518,
      // gold
      0.840288, 0.017799, 0.171529,
      // fluorescent yellow
      0.934014, -0.119806, 0.192135,
      // baby blue
      0.844151, -0.127039, -0.071248,
      // pale blue
      0.65803, -0.062998, -0.177988,
      // cerise pink
      0.663314, 0.27267, -0.062306,
    ]),
  },
  };

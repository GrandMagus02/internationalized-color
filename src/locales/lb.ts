import type { ColorDictionary } from '../types.ts';

// Luxembourgish (Lëtzebuergesch) — 46 survey responses
export const lb: ColorDictionary = {
  locale: 'lb',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Rout', green: 'Gréng', blue: 'Blo',
    hue: 'Faarftoun', saturation: 'Sättigung', lightness: 'Hellegkeet',
    value: 'Wäert', whiteness: 'Wäissheet', blackness: 'Schwärzheet',
    chroma: 'Chroma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'blo',
      'pink',
      'orange',
      'mauve',
      'rout',
      'giel',
      'gréng',
      'schwaarz',
      'wäiss',
      'brong',
      'gro',
    ],
    colors: new Float32Array([
      // blo
      0.664628, -0.065028, -0.173951,
      // pink
      0.676896, 0.275846, -0.10542,
      // orange
      0.768583, 0.077696, 0.15623,
      // mauve
      0.564666, 0.161965, -0.248068,
      // rout
      0.631901, 0.236882, 0.092388,
      // giel
      0.965581, -0.074635, 0.198113,
      // gréng
      0.869659, -0.22205, 0.152472,
      // schwaarz
      0, 0, 0,
      // wäiss
      1, 0, 0,
      // brong
      0.470784, 0.070809, 0.08696,
      // gro
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'donkelblo',
      'magenta',
      'neongréng',
      'donkelorange',
      'hellblo/himmelblo',
      'hellgréng',
      'hellorange',
      'cyan',
      'hellturquise',
      'himmelblo',
      'donkelgiel',
      'neon green',
      'beigeish orange',
      'yellow',
      'sky blue',
      'darker magenta',
      'neon blue',
      'bright green',
      'pool blue',
      'neon dark blue',
      'cherryish pink',
      'orange red',
      'cooler pink',
    ],
    colors: new Float32Array([
      // donkelblo
      0.484311, -0.020528, -0.290446,
      // magenta
      0.64962, 0.264356, -0.008695,
      // neongréng
      0.920664, -0.14029, 0.189619,
      // donkelorange
      0.660199, 0.186949, 0.13287,
      // hellblo/himmelblo
      0.743799, -0.091194, -0.126935,
      // hellgréng
      0.868809, -0.229345, 0.179716,
      // hellorange
      0.840288, 0.017799, 0.171529,
      // cyan
      0.8903, -0.17189, 0.026398,
      // hellturquise
      0.90149, -0.154552, -0.023686,
      // himmelblo
      0.874757, -0.138217, -0.055133,
      // donkelgiel
      0.9067, -0.030965, 0.18562,
      // neon green
      0.897445, -0.178158, 0.185265,
      // beigeish orange
      0.844078, 0.014857, 0.172335,
      // yellow
      0.96591, -0.070065, 0.198132,
      // sky blue
      0.797237, -0.110068, -0.096734,
      // darker magenta
      0.668044, 0.274216, -0.078213,
      // neon blue
      0.855916, -0.131329, -0.065006,
      // bright green
      0.873674, -0.220298, 0.180839,
      // pool blue
      0.739192, -0.089601, -0.129597,
      // neon dark blue
      0.503851, -0.030325, -0.276886,
      // cherryish pink
      0.635017, 0.244151, 0.070064,
      // orange red
      0.642031, 0.207967, 0.128917,
      // cooler pink
      0.643674, 0.258129, 0.019612,
    ]),
  },
  };

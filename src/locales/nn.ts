import type { ColorDictionary } from '../types.ts';

// Norwegian Nynorsk — 72 survey responses
export const nn: ColorDictionary = {
  locale: 'nn',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Raud', green: 'Grøn', blue: 'Blå', hue: 'Kulør', saturation: 'Metting', lightness: 'Lysleik', value: 'Verdi', whiteness: 'Kvitleik', blackness: 'Svartleik', chroma: 'Kroma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'blå',
      'rosa',
      'gul',
      'lilla',
      'oransje',
      'raud',
      'grøn',
      'svart',
      'kvit',
      'brun',
      'grå',
    ],
    colors: new Float32Array([
      // blå
      0.662767, -0.065715, -0.169913,
      // rosa
      0.655481, 0.268749, -0.033265,
      // gul
      0.891845, -0.041895, 0.182699,
      // lilla
      0.602487, 0.20053, -0.226051,
      // oransje
      0.727415, 0.116214, 0.147396,
      // raud
      0.629335, 0.229511, 0.113327,
      // grøn
      0.871932, -0.223286, 0.179419,
      // svart
      0, 0, 0,
      // kvit
      1, 0, 0,
      // brun
      0.470784, 0.070809, 0.08696,
      // grå
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'grønn',
      'turkis',
      'rød',
      'marineblå',
    ],
    colors: new Float32Array([
      // grønn
      0.875139, -0.215092, 0.169878,
      // turkis
      0.884126, -0.18372, 0.058257,
      // rød
      0.633926, 0.222738, 0.1168,
      // marineblå
      0.464951, 0.00007, -0.30468,
    ]),
  },
  };

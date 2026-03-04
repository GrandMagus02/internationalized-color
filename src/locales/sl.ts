import type { ColorDictionary } from '../types.ts';

// Slovenian (Slovenščina) — 252 survey responses
export const sl: ColorDictionary = {
  locale: 'sl',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Rdeča', green: 'Zelena', blue: 'Modra',
    hue: 'Odtenek', saturation: 'Nasičenost', lightness: 'Svetlost',
    value: 'Vrednost', whiteness: 'Belina', blackness: 'Črnina',
    chroma: 'Kroma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'modra',
      'oranžna',
      'rdeča',
      'vijolična',
      'zelena',
      'rumena',
      'roza',
      'črna',
      'bela',
      'rjava',
      'siva',
    ],
    colors: new Float32Array([
      // modra
      0.648642, -0.060561, -0.182027,
      // oranžna
      0.760278, 0.085202, 0.154451,
      // rdeča
      0.631705, 0.227822, 0.111425,
      // vijolična
      0.616591, 0.222705, -0.198986,
      // zelena
      0.872034, -0.217205, 0.150984,
      // rumena
      0.931286, -0.05104, 0.190856,
      // roza
      0.655116, 0.268516, -0.031813,
      // črna
      0, 0, 0,
      // bela
      1, 0, 0,
      // rjava
      0.470784, 0.070809, 0.08696,
      // siva
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'svetlo zelena',
      'svetlo modra',
      'temno modra',
      'turkizna',
      'sinje modra',
      'magenta',
      'mornarsko modra',
      'svetlo vijolična',
      'ciklamna',
      'temno rožnata',
      'fuksija',
      'zlata',
      'živo modra',
      'živo zelena',
      'ciklamnata',
      'rdece roza',
      'limeta',
      'rumenozelena',
      'modrozelena',
      'živo rdeča',
    ],
    colors: new Float32Array([
      // svetlo zelena
      0.87656, -0.212653, 0.170975,
      // svetlo modra
      0.825715, -0.123014, -0.073318,
      // temno modra
      0.476311, -0.025633, -0.29551,
      // turkizna
      0.883479, -0.185079, 0.061816,
      // sinje modra
      0.77443, -0.103998, -0.102988,
      // magenta
      0.670291, 0.274772, -0.08541,
      // mornarsko modra
      0.565335, -0.038803, -0.236501,
      // svetlo vijolična
      0.675105, 0.270287, -0.136792,
      // ciklamna
      0.668489, 0.274334, -0.079654,
      // temno rožnata
      0.643947, 0.258463, 0.018221,
      // fuksija
      0.660061, 0.271271, -0.050696,
      // zlata
      0.821593, 0.032621, 0.16755,
      // živo modra
      0.707819, -0.080362, -0.142912,
      // živo zelena
      0.869851, -0.227432, 0.18013,
      // ciklamnata
      0.668192, 0.268764, -0.128743,
      // rdece roza
      0.636101, 0.246339, 0.06293,
      // limeta
      0.931363, -0.123805, 0.191634,
      // rumenozelena
      0.917696, -0.144965, 0.189061,
      // modrozelena
      0.88546, -0.180995, 0.051058,
      // živo rdeča
      0.629855, 0.231128, 0.108857,
    ]),
  },
  };

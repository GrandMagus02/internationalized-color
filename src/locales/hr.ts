import type { ColorDictionary } from '../types.ts';

// Croatian (Hrvatski) — 184 survey responses
export const hr: ColorDictionary = {
  locale: 'hr',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Crvena', green: 'Zelena', blue: 'Plava',
    hue: 'Nijansa', saturation: 'Zasićenost', lightness: 'Svjetlina',
    value: 'Vrijednost', whiteness: 'Bjelina', blackness: 'Crnina',
    chroma: 'Kroma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'plava',
      'ljubičasta',
      'žuta',
      'crvena',
      'narančasta',
      'zelena',
      'roza',
      'crna',
      'bijela',
      'smeđa',
      'siva',
    ],
    colors: new Float32Array([
      // plava
      0.618916, -0.051356, -0.200559,
      // ljubičasta
      0.625413, 0.232378, -0.18703,
      // žuta
      0.9428, -0.068354, 0.193392,
      // crvena
      0.630522, 0.227185, 0.115382,
      // narančasta
      0.739527, 0.104534, 0.149999,
      // zelena
      0.870982, -0.222164, 0.165915,
      // roza
      0.659216, 0.270705, -0.074436,
      // crna
      0, 0, 0,
      // bijela
      1, 0, 0,
      // smeđa
      0.470784, 0.070809, 0.08696,
      // siva
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'svijetlo plava',
      'plavo',
      'tirkizna',
      'žuto zelena',
      'tamno plava',
      'cijan',
      'narančasto',
      'svijetloplavo',
      'rozo',
      'tamno narančasta',
      'tamno žuta',
      'zeleno',
      '?',
      'ljubičasto',
      'crveno',
      'svijetlo zelena',
      'magenta',
      'žuto',
    ],
    colors: new Float32Array([
      // svijetlo plava
      0.843859, -0.130709, -0.06059,
      // plavo
      0.53827, -0.034013, -0.25415,
      // tirkizna
      0.870181, -0.176653, 0.047204,
      // žuto zelena
      0.919467, -0.14217, 0.189394,
      // tamno plava
      0.461628, -0.025529, -0.305416,
      // cijan
      0.8903, -0.17189, 0.026398,
      // narančasto
      0.766908, 0.079199, 0.155871,
      // svijetloplavo
      0.799575, -0.110907, -0.095441,
      // rozo
      0.662486, 0.272342, -0.059406,
      // tamno narančasta
      0.688409, 0.155977, 0.138983,
      // tamno žuta
      0.84598, 0.013388, 0.172739,
      // zeleno
      0.868976, -0.226227, 0.166882,
      // ?
      0.879852, -0.198348, 0.126973,
      // ljubičasto
      0.595754, 0.194219, -0.229967,
      // crveno
      0.632382, 0.225174, 0.115298,
      // svijetlo zelena
      0.877246, -0.211882, 0.17333,
      // magenta
      0.643674, 0.258129, 0.019612,
      // žuto
      0.947327, -0.06637, 0.194296,
    ]),
  },
  };

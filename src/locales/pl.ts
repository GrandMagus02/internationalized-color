import type { ColorDictionary } from '../types.ts';

export const pl: ColorDictionary = {
  locale: 'pl',
  source: 'uw+research',
  basic: {
    names: [
      'czarny',
      'biały',
      'czerwony',
      'zielony',
      'żółty',
      'niebieski',
      'brązowy',
      'pomarańczowy',
      'różowy',
      'fioletowy',
      'szary',
    ],
    colors: new Float32Array([
      // czarny
      0, 0, 0,
      // biały
      1, 0, 0,
      // czerwony
      0.627955, 0.224863, 0.125846,
      // zielony
      0.519752, -0.140302, 0.107676,
      // żółty
      0.967983, -0.071369, 0.19857,
      // niebieski
      0.452014, -0.032457, -0.311528,
      // brązowy
      0.470784, 0.070809, 0.08696,
      // pomarańczowy
      0.792688, 0.056611, 0.161385,
      // różowy
      0.867738, 0.07298, 0.009071,
      // fioletowy
      0.420914, 0.164704, -0.101472,
      // szary
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'turkusowy',
      'beżowy',
      'granatowy',
      'bordowy',
      'złoty',
      'srebrny',
      'purpurowy',
      'koralowy',
      'oliwkowy',
      'khaki',
    ],
    colors: new Float32Array([
      // turkusowy
      0.822334, -0.130229, -0.011597,
      // beżowy
      0.963574, -0.009585, 0.031352,
      // granatowy
      0.27115, -0.01947, -0.186877,
      // bordowy
      0.379975, 0.144353, 0.048642,
      // złoty
      0.886771, -0.016925, 0.181398,
      // srebrny
      0.807796, 0, 0,
      // purpurowy
      0.420914, 0.164704, -0.101472,
      // koralowy
      0.735113, 0.128225, 0.108538,
      // oliwkowy
      0.580665, -0.042812, 0.119116,
      // khaki
      0.765376, 0.008314, 0.046967,
    ]),
  },
};

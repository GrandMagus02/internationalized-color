import type { ColorDictionary } from '../types.ts';

export const nl: ColorDictionary = {
  locale: 'nl',
  source: 'uw+research',
  basic: {
    names: [
      'zwart',
      'wit',
      'rood',
      'groen',
      'geel',
      'blauw',
      'bruin',
      'oranje',
      'roze',
      'paars',
      'grijs',
    ],
    colors: new Float32Array([
      // zwart
      0, 0, 0,
      // wit
      1, 0, 0,
      // rood
      0.627955, 0.224863, 0.125846,
      // groen
      0.519752, -0.140302, 0.107676,
      // geel
      0.967983, -0.071369, 0.19857,
      // blauw
      0.452014, -0.032457, -0.311528,
      // bruin
      0.470784, 0.070809, 0.08696,
      // oranje
      0.792688, 0.056611, 0.161385,
      // roze
      0.867738, 0.07298, 0.009071,
      // paars
      0.420914, 0.164704, -0.101472,
      // grijs
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'turquoise',
      'beige',
      'lichtblauw',
      'donkerblauw',
      'donkergroen',
      'lichtgroen',
      'magenta',
      'goud',
      'zilver',
      'bordeaux',
    ],
    colors: new Float32Array([
      // turquoise
      0.822334, -0.130229, -0.011597,
      // beige
      0.963574, -0.009585, 0.031352,
      // lichtblauw
      0.814817, -0.057156, -0.05868,
      // donkerblauw
      0.287824, -0.020667, -0.198369,
      // donkergroen
      0.436018, -0.117699, 0.090329,
      // lichtgroen
      0.868003, -0.126184, 0.091382,
      // magenta
      0.701674, 0.274566, -0.169156,
      // goud
      0.886771, -0.016925, 0.181398,
      // zilver
      0.807796, 0, 0,
      // bordeaux
      0.379975, 0.144353, 0.048642,
    ]),
  },
};

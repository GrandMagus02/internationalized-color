import type { ColorDictionary } from '../types.ts';

export const sv: ColorDictionary = {
  locale: 'sv',
  source: 'uw+research',
  basic: {
    names: [
      'svart',
      'vit',
      'röd',
      'grön',
      'gul',
      'blå',
      'brun',
      'orange',
      'rosa',
      'lila',
      'grå',
    ],
    colors: new Float32Array([
      // svart
      0, 0, 0,
      // vit
      1, 0, 0,
      // röd
      0.627955, 0.224863, 0.125846,
      // grön
      0.519752, -0.140302, 0.107676,
      // gul
      0.967983, -0.071369, 0.19857,
      // blå
      0.452014, -0.032457, -0.311528,
      // brun
      0.470784, 0.070809, 0.08696,
      // orange
      0.792688, 0.056611, 0.161385,
      // rosa
      0.867738, 0.07298, 0.009071,
      // lila
      0.420914, 0.164704, -0.101472,
      // grå
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'turkos',
      'beige',
      'marinblå',
      'guld',
      'silver',
      'vinröd',
      'ljusblå',
      'mörkblå',
      'ljusgrön',
      'mörkgrön',
    ],
    colors: new Float32Array([
      // turkos
      0.822334, -0.130229, -0.011597,
      // beige
      0.963574, -0.009585, 0.031352,
      // marinblå
      0.27115, -0.01947, -0.186877,
      // guld
      0.886771, -0.016925, 0.181398,
      // silver
      0.807796, 0, 0,
      // vinröd
      0.400779, 0.091534, 0.024679,
      // ljusblå
      0.814817, -0.057156, -0.05868,
      // mörkblå
      0.287824, -0.020667, -0.198369,
      // ljusgrön
      0.868003, -0.126184, 0.091382,
      // mörkgrön
      0.436018, -0.117699, 0.090329,
    ]),
  },
};

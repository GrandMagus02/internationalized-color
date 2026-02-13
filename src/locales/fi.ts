import type { ColorDictionary } from '../types.ts';

export const fi: ColorDictionary = {
  locale: 'fi',
  source: 'uw+research',
  basic: {
    names: [
      'musta',
      'valkoinen',
      'punainen',
      'vihreä',
      'keltainen',
      'sininen',
      'ruskea',
      'oranssi',
      'pinkki',
      'violetti',
      'harmaa',
    ],
    colors: new Float32Array([
      // musta
      0, 0, 0,
      // valkoinen
      1, 0, 0,
      // punainen
      0.627955, 0.224863, 0.125846,
      // vihreä
      0.519752, -0.140302, 0.107676,
      // keltainen
      0.967983, -0.071369, 0.19857,
      // sininen
      0.452014, -0.032457, -0.311528,
      // ruskea
      0.470784, 0.070809, 0.08696,
      // oranssi
      0.792688, 0.056611, 0.161385,
      // pinkki
      0.867738, 0.07298, 0.009071,
      // violetti
      0.420914, 0.164704, -0.101472,
      // harmaa
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'turkoosi',
      'beige',
      'laivastonsininen',
      'kulta',
      'hopea',
      'viininpunainen',
      'vaaleansininen',
      'tummansininen',
      'vaaleanvihreä',
      'tummanvihreä',
    ],
    colors: new Float32Array([
      // turkoosi
      0.822334, -0.130229, -0.011597,
      // beige
      0.963574, -0.009585, 0.031352,
      // laivastonsininen
      0.27115, -0.01947, -0.186877,
      // kulta
      0.886771, -0.016925, 0.181398,
      // hopea
      0.807796, 0, 0,
      // viininpunainen
      0.400779, 0.091534, 0.024679,
      // vaaleansininen
      0.814817, -0.057156, -0.05868,
      // tummansininen
      0.287824, -0.020667, -0.198369,
      // vaaleanvihreä
      0.868003, -0.126184, 0.091382,
      // tummanvihreä
      0.436018, -0.117699, 0.090329,
    ]),
  },
};

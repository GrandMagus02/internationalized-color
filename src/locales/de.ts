import type { ColorDictionary } from '../types.ts';

export const de: ColorDictionary = {
  locale: 'de',
  source: 'uw+research',
  basic: {
    names: [
      'schwarz',
      'weiß',
      'rot',
      'grün',
      'gelb',
      'blau',
      'braun',
      'orange',
      'rosa',
      'lila',
      'grau',
    ],
    colors: new Float32Array([
      // schwarz
      0, 0, 0,
      // weiß
      1, 0, 0,
      // rot
      0.627955, 0.224863, 0.125846,
      // grün
      0.519752, -0.140302, 0.107676,
      // gelb
      0.967983, -0.071369, 0.19857,
      // blau
      0.452014, -0.032457, -0.311528,
      // braun
      0.470784, 0.070809, 0.08696,
      // orange
      0.792688, 0.056611, 0.161385,
      // rosa
      0.867738, 0.07298, 0.009071,
      // lila
      0.420914, 0.164704, -0.101472,
      // grau
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'türkis',
      'beige',
      'hellblau',
      'dunkelblau',
      'dunkelgrün',
      'hellgrün',
      'violett',
      'magenta',
      'gold',
      'silber',
      'olive',
      'bordeaux',
      'lachs',
      'koralle',
      'indigo',
      'khaki',
      'ocker',
      'smaragd',
      'kupfer',
      'weinrot',
    ],
    colors: new Float32Array([
      // türkis
      0.822334, -0.130229, -0.011597,
      // beige
      0.963574, -0.009585, 0.031352,
      // hellblau
      0.814817, -0.057156, -0.05868,
      // dunkelblau
      0.287824, -0.020667, -0.198369,
      // dunkelgrün
      0.436018, -0.117699, 0.090329,
      // hellgrün
      0.868003, -0.126184, 0.091382,
      // violett
      0.420914, 0.164704, -0.101472,
      // magenta
      0.701674, 0.274566, -0.169156,
      // gold
      0.886771, -0.016925, 0.181398,
      // silber
      0.807796, 0, 0,
      // olive
      0.580665, -0.042812, 0.119116,
      // bordeaux
      0.379975, 0.144353, 0.048642,
      // lachs
      0.735002, 0.133699, 0.07127,
      // koralle
      0.735113, 0.128225, 0.108538,
      // indigo
      0.338982, 0.094162, -0.152551,
      // khaki
      0.765376, 0.008314, 0.046967,
      // ocker
      0.649562, 0.071007, 0.121099,
      // smaragd
      0.74514, -0.138649, 0.07516,
      // kupfer
      0.617953, 0.057843, 0.101819,
      // weinrot
      0.400779, 0.091534, 0.024679,
    ]),
  },
};

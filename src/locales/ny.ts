import type { ColorDictionary } from '../types.ts';

// Chichewa — 35 survey responses
export const ny: ColorDictionary = {
  locale: 'ny',
  source: 'uwdata-multilingual-colors',
  basic: {
    names: [
      'light blue',
      'blue',
      'light green',
      'pink',
      'dark pink',
      'green',
      'orange',
      'red',
      'purple',
      'greenish orangeish',
      'yellowish orangeish',
    ],
    colors: new Float32Array([
      0.788696, -0.11174, -0.087051,
      0.547009, -0.035404, -0.248428,
      0.874267, -0.213301, 0.152868,
      0.664152, 0.272984, -0.065204,
      0.646518, 0.261369, 0.005576,
      0.869741, -0.226158, 0.173472,
      0.741078, 0.10306, 0.150332,
      0.629021, 0.228502, 0.116086,
      0.583845, 0.182504, -0.2369,
      0.92748, -0.129721, 0.190903,
      0.902691, -0.028179, 0.184771,
    ]),
  },
  extended: {
    names: [
      'greenish blueish',
      'bluw',
      'puple',
      'yellow',
      'dark yellow',
      'orngeis',
    ],
    colors: new Float32Array([
      0.882637, -0.186885, 0.066517,
      0.452014, -0.032457, -0.311528,
      0.658808, 0.246197, -0.193509,
      0.953511, -0.062178, 0.195515,
      0.827154, 0.028157, 0.168734,
      0.755379, 0.089691, 0.153401,
    ]),
  },
};

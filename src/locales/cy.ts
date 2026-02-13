import type { ColorDictionary } from '../types.ts';

// Welsh (Cymraeg) — 12 survey responses
export const cy: ColorDictionary = {
  locale: 'cy',
  source: 'uwdata-multilingual-colors',
  basic: {
    names: [
      'glass golau',
      'pinc',
      'melyn',
      'glass tywyll',
      'gwyrdd',
      'porffor',
      'coch',
    ],
    colors: new Float32Array([
      0.769265, -0.100107, -0.112387,
      0.672597, 0.275237, -0.092583,
      0.825296, 0.029644, 0.168338,
      0.528199, -0.03262, -0.260772,
      0.915382, -0.148644, 0.188626,
      0.640361, 0.253622, 0.037345,
      0.62908, 0.228694, 0.115564,
    ]),
  },
};

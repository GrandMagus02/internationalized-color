import type { ColorDictionary } from '../types.ts';

// Hindi (हिन्दी) — 78 survey responses
export const hi: ColorDictionary = {
  locale: 'hi',
  source: 'uwdata-multilingual-colors',
  basic: {
    names: [
      'neela',
      'hara',
      'gulabi',
      'peela',
      'laal',
      'gulaabi',
      'narangi',
      'nila',
      'pila',
      'lal',
      'peel',
    ],
    colors: new Float32Array([
      0.670889, -0.068191, -0.161594,
      0.872953, -0.214299, 0.144661,
      0.659666, 0.27108, -0.049243,
      0.880169, -0.025015, 0.180135,
      0.632632, 0.224867, 0.115363,
      0.661668, 0.272, -0.056504,
      0.734923, 0.108938, 0.14901,
      0.776241, -0.102577, -0.108451,
      0.949482, -0.097132, 0.195059,
      0.630474, 0.232967, 0.103694,
      0.873003, -0.006939, 0.178478,
    ]),
  },
  extended: {
    names: [
      'baigani',
      'baingani',
      'narangee',
    ],
    colors: new Float32Array([
      0.593084, 0.191655, -0.231521,
      0.530457, 0.118931, -0.267907,
      0.76524, 0.080701, 0.155514,
    ]),
  },
};

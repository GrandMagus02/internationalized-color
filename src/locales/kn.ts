import type { ColorDictionary } from '../types.ts';

// Kannada (ಕನ್ನಡ) — 12 survey responses
export const kn: ColorDictionary = {
  locale: 'kn',
  source: 'uwdata-multilingual-colors',
  basic: {
    names: [
      'lite blue',
      'navy',
      'green blue',
      'pink lite',
      'safrron',
      'jambli',
      'dark navy',
      'pink dark',
      'gili hasiru',
      'blue',
      'haladi',
    ],
    colors: new Float32Array([
      0.888537, -0.175073, 0.035133,
      0.651471, -0.06101, -0.182019,
      0.88182, -0.188683, 0.071164,
      0.669385, 0.274561, -0.082534,
      0.641469, 0.208631, 0.128795,
      0.567171, 0.164776, -0.24661,
      0.590621, -0.044402, -0.220225,
      0.683433, 0.276213, -0.123771,
      0.870085, -0.220609, 0.149126,
      0.901808, -0.154122, -0.024992,
      0.830885, 0.025189, 0.169528,
    ]),
  },
  extended: {
    names: [
      'pink kempu',
    ],
    colors: new Float32Array([
      0.63573, 0.245607, 0.06534,
    ]),
  },
};

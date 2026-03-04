import type { ColorDictionary } from '../types.ts';

// Kannada (ಕನ್ನಡ) — 12 survey responses
export const kn: ColorDictionary = {
  locale: 'kn',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'ಕೆಂಪು', green: 'ಹಸಿರು', blue: 'ನೀಲಿ',
    hue: 'ವರ್ಣ', saturation: 'ಸ್ಯಾಚುರೇಶನ್', lightness: 'ಹಗುರತೆ',
    value: 'ಮೌಲ್ಯ', whiteness: 'ಬಿಳಿತನ', blackness: 'ಕಪ್ಪುತನ',
    chroma: 'ಕ್ರೋಮಾ', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'ಕಪ್ಪು',
      'ಬಿಳಿ',
      'ಕೆಂಪು',
      'ಹಸಿರು',
      'ಹಳದಿ',
      'ನೀಲಿ',
      'ಕಂದು',
      'ಕಿತ್ತಳೆ',
      'ಗುಲಾಬಿ',
      'ನೇರಳೆ',
      'ಬೂದು',
    ],
    colors: new Float32Array([
      // ಕಪ್ಪು
      0, 0, 0,
      // ಬಿಳಿ
      1, 0, 0,
      // ಕೆಂಪು
      0.627955, 0.224863, 0.125846,
      // ಹಸಿರು
      0.519752, -0.140302, 0.107676,
      // ಹಳದಿ
      0.967983, -0.071369, 0.19857,
      // ನೀಲಿ
      0.452014, -0.032457, -0.311528,
      // ಕಂದು
      0.470784, 0.070809, 0.08696,
      // ಕಿತ್ತಳೆ
      0.792688, 0.056611, 0.161385,
      // ಗುಲಾಬಿ
      0.867738, 0.07298, 0.009071,
      // ನೇರಳೆ
      0.420914, 0.164704, -0.101472,
      // ಬೂದು
      0.599871, 0, 0,
    ]),
  },
  extended: {
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
      'pink kempu',
    ],
    colors: new Float32Array([
      // lite blue
      0.888537, -0.175073, 0.035133,
      // navy
      0.651471, -0.06101, -0.182019,
      // green blue
      0.88182, -0.188683, 0.071164,
      // pink lite
      0.669385, 0.274561, -0.082534,
      // safrron
      0.641469, 0.208631, 0.128795,
      // jambli
      0.567171, 0.164776, -0.24661,
      // dark navy
      0.590621, -0.044402, -0.220225,
      // pink dark
      0.683433, 0.276213, -0.123771,
      // gili hasiru
      0.870085, -0.220609, 0.149126,
      // blue
      0.901808, -0.154122, -0.024992,
      // haladi
      0.830885, 0.025189, 0.169528,
      // pink kempu
      0.63573, 0.245607, 0.06534,
    ]),
  },
  };

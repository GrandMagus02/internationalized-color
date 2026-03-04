import type { ColorDictionary } from '../types.ts';

// Amharic (አማርኛ) — 72 survey responses
export const am: ColorDictionary = {
  locale: 'am',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'ቀይ', green: 'አረንጓዴ', blue: 'ሰማያዊ',
    hue: 'ቀለም', saturation: 'ሙላት', lightness: 'ብርሃን',
    value: 'ዋጋ', whiteness: 'ነጭነት', blackness: 'ጥቁርነት',
    chroma: 'ክሮማ', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'ጥቁር',
      'ነጭ',
      'ቀይ',
      'አረንጓዴ',
      'ቢጫ',
      'ሰማያዊ',
      'ቡናማ',
      'ብርቱካናማ',
      'ሮዝ',
      'ሐምራዊ',
      'ግራጫ',
    ],
    colors: new Float32Array([
      // ጥቁር
      0, 0, 0,
      // ነጭ
      1, 0, 0,
      // ቀይ
      0.627955, 0.224863, 0.125846,
      // አረንጓዴ
      0.519752, -0.140302, 0.107676,
      // ቢጫ
      0.967983, -0.071369, 0.19857,
      // ሰማያዊ
      0.452014, -0.032457, -0.311528,
      // ቡናማ
      0.470784, 0.070809, 0.08696,
      // ብርቱካናማ
      0.792688, 0.056611, 0.161385,
      // ሮዝ
      0.867738, 0.07298, 0.009071,
      // ሐምራዊ
      0.420914, 0.164704, -0.101472,
      // ግራጫ
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'light arengade',
      'rose',
      'semayawi',
      'keyi',
      'wuha semayawi',
      'bicha',
      'lomi',
      'buni',
      'arengade',
      'weyniteji',
      'birtukanama',
      'demak semayawi',
      'birtikanama',
      'bunl',
      'weyintej',
    ],
    colors: new Float32Array([
      // light arengade
      0.872823, -0.171619, 0.033624,
      // rose
      0.6621, 0.271049, -0.089734,
      // semayawi
      0.533849, -0.031762, -0.257145,
      // keyi
      0.633544, 0.228746, 0.105397,
      // wuha semayawi
      0.684633, -0.071351, -0.161819,
      // bicha
      0.921597, -0.059754, 0.188968,
      // lomi
      0.893251, -0.184998, 0.183083,
      // buni
      0.799788, 0.050593, 0.1629,
      // arengade
      0.868992, -0.228625, 0.178092,
      // weyniteji
      0.582539, 0.181174, -0.237661,
      // birtukanama
      0.715852, 0.127651, 0.144907,
      // demak semayawi
      0.4736, -0.030155, -0.297067,
      // birtikanama
      0.688409, 0.155977, 0.138983,
      // bunl
      0.757005, 0.088196, 0.15375,
      // weyintej
      0.554822, 0.150505, -0.253794,
    ]),
  },
  };

import type { ColorDictionary } from '../types.ts';

// Amharic (አማርኛ) — 72 survey responses
export const am: ColorDictionary = {
  locale: 'am',
  source: 'uwdata-multilingual-colors',
  basic: {
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
    ],
    colors: new Float32Array([
      0.872823, -0.171619, 0.033624,
      0.6621, 0.271049, -0.089734,
      0.533849, -0.031762, -0.257145,
      0.633544, 0.228746, 0.105397,
      0.684633, -0.071351, -0.161819,
      0.921597, -0.059754, 0.188968,
      0.893251, -0.184998, 0.183083,
      0.799788, 0.050593, 0.1629,
      0.868992, -0.228625, 0.178092,
      0.582539, 0.181174, -0.237661,
      0.715852, 0.127651, 0.144907,
    ]),
  },
  extended: {
    names: [
      'demak semayawi',
      'birtikanama',
      'bunl',
      'weyintej',
    ],
    colors: new Float32Array([
      0.4736, -0.030155, -0.297067,
      0.688409, 0.155977, 0.138983,
      0.757005, 0.088196, 0.15375,
      0.554822, 0.150505, -0.253794,
    ]),
  },
};

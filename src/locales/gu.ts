import type { ColorDictionary } from '../types.ts';

// Gujarati (ગુજરાતી) — 12 survey responses
export const gu: ColorDictionary = {
  locale: 'gu',
  source: 'uwdata-multilingual-colors',
  basic: {
    names: [
      'dark pink',
      'purple',
      'fluorescent',
      'bright yellow',
      'pink',
      'green',
      'medium dark pink',
      'medium pink',
      'blue',
      'yellow',
      'medium blue',
    ],
    colors: new Float32Array([
      0.656592, 0.269426, -0.037621,
      0.573506, 0.171707, -0.242922,
      0.914244, -0.150462, 0.188413,
      0.951451, -0.060853, 0.195081,
      0.698189, 0.275127, -0.161042,
      0.868314, -0.226787, 0.163382,
      0.679365, 0.276058, -0.112506,
      0.66629, 0.273705, -0.072439,
      0.556038, -0.037001, -0.242539,
      0.924869, -0.043362, 0.189464,
      0.494488, -0.029915, -0.283116,
    ]),
  },
  extended: {
    names: [
      'dark purple',
    ],
    colors: new Float32Array([
      0.514564, 0.095374, -0.277034,
    ]),
  },
};

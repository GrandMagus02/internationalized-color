import type { ColorDictionary } from '../types.ts';

// Gujarati (ગુજરાતી) — 12 survey responses
export const gu: ColorDictionary = {
  locale: 'gu',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'લાલ', green: 'લીલો', blue: 'વાદળી',
    hue: 'રંગછટા', saturation: 'સંતૃપ્તિ', lightness: 'હળવાશ',
    value: 'મૂલ્ય', whiteness: 'ધોળાશ', blackness: 'કાળાશ',
    chroma: 'ક્રોમા', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'કાળો',
      'સફેદ',
      'લાલ',
      'લીલો',
      'પીળો',
      'વાદળી',
      'ભૂરો',
      'નારંગી',
      'ગુલાબી',
      'જાંબલી',
      'રાખોડી',
    ],
    colors: new Float32Array([
      // કાળો
      0, 0, 0,
      // સફેદ
      1, 0, 0,
      // લાલ
      0.627955, 0.224863, 0.125846,
      // લીલો
      0.519752, -0.140302, 0.107676,
      // પીળો
      0.967983, -0.071369, 0.19857,
      // વાદળી
      0.452014, -0.032457, -0.311528,
      // ભૂરો
      0.470784, 0.070809, 0.08696,
      // નારંગી
      0.792688, 0.056611, 0.161385,
      // ગુલાબી
      0.867738, 0.07298, 0.009071,
      // જાંબલી
      0.420914, 0.164704, -0.101472,
      // રાખોડી
      0.599871, 0, 0,
    ]),
  },
  extended: {
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
      'dark purple',
    ],
    colors: new Float32Array([
      // dark pink
      0.656592, 0.269426, -0.037621,
      // purple
      0.573506, 0.171707, -0.242922,
      // fluorescent
      0.914244, -0.150462, 0.188413,
      // bright yellow
      0.951451, -0.060853, 0.195081,
      // pink
      0.698189, 0.275127, -0.161042,
      // green
      0.868314, -0.226787, 0.163382,
      // medium dark pink
      0.679365, 0.276058, -0.112506,
      // medium pink
      0.66629, 0.273705, -0.072439,
      // blue
      0.556038, -0.037001, -0.242539,
      // yellow
      0.924869, -0.043362, 0.189464,
      // medium blue
      0.494488, -0.029915, -0.283116,
      // dark purple
      0.514564, 0.095374, -0.277034,
    ]),
  },
  };

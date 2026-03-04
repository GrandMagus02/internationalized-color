import type { ColorDictionary } from '../types.ts';

// Welsh (Cymraeg) — 12 survey responses
export const cy: ColorDictionary = {
  locale: 'cy',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Coch', green: 'Gwyrdd', blue: 'Glas',
    hue: 'Arlliw', saturation: 'Dirlawnder', lightness: 'Goleuedd',
    value: 'Gwerth', whiteness: 'Gwynder', blackness: 'Duder',
    chroma: 'Croma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
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
      // glass golau
      0.769265, -0.100107, -0.112387,
      // pinc
      0.672597, 0.275237, -0.092583,
      // melyn
      0.825296, 0.029644, 0.168338,
      // glass tywyll
      0.528199, -0.03262, -0.260772,
      // gwyrdd
      0.915382, -0.148644, 0.188626,
      // porffor
      0.640361, 0.253622, 0.037345,
      // coch
      0.62908, 0.228694, 0.115564,
    ]),
  },
};

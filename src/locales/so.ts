import type { ColorDictionary } from '../types.ts';

// Somali — 4 survey responses
export const so: ColorDictionary = {
  locale: 'so',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Cas', green: 'Cagaar', blue: 'Buluug',
    hue: 'Midab', saturation: 'Dheritaan', lightness: 'Iftiinle',
    value: 'Qiimaha', whiteness: 'Cadaanta', blackness: 'Madoobaan',
    chroma: 'Chroma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'baby blue',
      'blue',
      'navy blue',
    ],
    colors: new Float32Array([
      // baby blue
      0.896327, -0.161996, -0.001619,
      // blue
      0.632054, -0.055322, -0.194056,
      // navy blue
      0.484855, -0.029813, -0.289542,
    ]),
  },
};

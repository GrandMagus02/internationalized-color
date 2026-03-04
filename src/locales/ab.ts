import type { ColorDictionary } from '../types.ts';

// Abkhazian — 13 survey responses
export const ab: ColorDictionary = {
  locale: 'ab',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Аҟаҧыр', green: 'Аиаҵәа', blue: 'Аҵәаа',
    hue: 'Аоттенок', saturation: 'Анасыщенность', lightness: 'Асветлота',
    value: 'Аҵакы', whiteness: 'Ашкәакәа', blackness: 'Аиқәаҵәа',
    chroma: 'Ахрома', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'бызшәа',
      'аҧсшәа',
      'аҧсуа',
      'turquiose',
      'rad',
    ],
    colors: new Float32Array([
      // бызшәа
      0.620496, -0.022722, -0.008306,
      // аҧсшәа
      0.581784, 0.123647, -0.061857,
      // аҧсуа
      0.882999, -0.191918, 0.123127,
      // turquiose
      0.889535, -0.173253, 0.030154,
      // rad
      0.64835, 0.200559, 0.130293,
    ]),
  },
};

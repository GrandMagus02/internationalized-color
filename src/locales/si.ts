import type { ColorDictionary } from '../types.ts';

// Sinhala (සිංහල) — 48 survey responses
export const si: ColorDictionary = {
  locale: 'si',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'රතු', green: 'කොළ', blue: 'නිල්',
    hue: 'වර්ණය', saturation: 'සන්තෘප්තිය', lightness: 'ආලෝකය',
    value: 'අගය', whiteness: 'සුදුබව', blackness: 'කළුබව',
    chroma: 'ක්‍රෝමා', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'නිල්',
      'රෝස',
      'කහ',
      'කොළ',
      'තැඹිලි',
      'රතු',
      'දම්',
      'කළු',
      'සුදු',
      'දුඹුරු',
      'අළු',
    ],
    colors: new Float32Array([
      // නිල්
      0.64096, -0.057134, -0.188555,
      // රෝස
      0.655358, 0.269401, -0.061375,
      // කහ
      0.921762, -0.120072, 0.189633,
      // කොළ
      0.87522, -0.205009, 0.112017,
      // තැඹිලි
      0.775346, 0.071676, 0.157677,
      // රතු
      0.631169, 0.226118, 0.116098,
      // දම්
      0.569693, 0.167565, -0.245142,
      // කළු
      0, 0, 0,
      // සුදු
      1, 0, 0,
      // දුඹුරු
      0.470784, 0.070809, 0.08696,
      // අළු
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'rosa',
      'kola',
      'thambili',
      'la  kola',
      'thada kola',
      'thada nil',
      'thada rosa',
      'kaha',
      'la nil',
      'kola nil',
      'dam rosa',
      'dam',
    ],
    colors: new Float32Array([
      // rosa
      0.640361, 0.253622, 0.037345,
      // kola
      0.869114, -0.223935, 0.156829,
      // thambili
      0.643194, 0.206596, 0.129171,
      // la  kola
      0.872448, -0.213045, 0.131341,
      // thada kola
      0.874645, -0.206609, 0.115902,
      // thada nil
      0.552393, -0.036337, -0.244913,
      // thada rosa
      0.642091, 0.256084, 0.027881,
      // kaha
      0.865209, -0.001178, 0.176824,
      // la nil
      0.682396, -0.070632, -0.163168,
      // kola nil
      0.888537, -0.175073, 0.035133,
      // dam rosa
      0.665428, 0.273428, -0.069547,
      // dam
      0.523936, 0.109582, -0.271662,
    ]),
  },
  };

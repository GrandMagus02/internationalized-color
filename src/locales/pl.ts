import type { ColorDictionary } from '../types.ts';

// Polish (Polski) — 2659 survey responses
export const pl: ColorDictionary = {
  locale: 'pl',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Czerwony', green: 'Zielony', blue: 'Niebieski',
    hue: 'Odcień', saturation: 'Nasycenie', lightness: 'Jasność',
    value: 'Wartość', whiteness: 'Białość', blackness: 'Czarność',
    chroma: 'Chroma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'niebieski',
      'zielony',
      'fioletowy',
      'różowy',
      'pomarańczowy',
      'czerwony',
      'żółty',
      'brązowy',
      'czarny',
      'szary',
      'biały',
    ],
    colors: new Float32Array([
      // niebieski
      0.607352, -0.051385, -0.174473,
      // zielony
      0.789032, -0.183479, 0.138206,
      // fioletowy
      0.536776, 0.169139, -0.177473,
      // różowy
      0.647577, 0.250897, -0.057993,
      // pomarańczowy
      0.724085, 0.103572, 0.144374,
      // czerwony
      0.60764, 0.218114, 0.101775,
      // żółty
      0.901451, -0.049128, 0.182921,
      // brązowy
      0.513239, 0.052429, 0.070146,
      // czarny
      0.219766, 0.023246, 0.002058,
      // szary
      0.637619, -0.012526, -0.006872,
      // biały
      1, 0, 0,
    ]),
  },
  extended: {
    names: [
      'turkusowy',
      'błękitny',
      'granatowy',
      'ciemny niebieski',
      'jasnoniebieski',
      'jasnozielony',
      'seledynowy',
      'fuksja',
      'morski',
      'ciemnozielony',
      'limonkowy',
      'malinowy',
      'purpurowy',
      'magenta',
      'bordowy',
      'jasnobrązowy',
      'fiolet',
      'ciemnoróżowy',
      'beżowy',
      'miętowy',
      'jasnopomarańczowy',
    ],
    colors: new Float32Array([
      // turkusowy
      0.812578, -0.142143, -0.008453,
      // błękitny
      0.735619, -0.091449, -0.118449,
      // granatowy
      0.383067, -0.00635, -0.195922,
      // ciemny niebieski
      0.475671, -0.024362, -0.26658,
      // jasnoniebieski
      0.767993, -0.098887, -0.101926,
      // jasnozielony
      0.850701, -0.167649, 0.161358,
      // seledynowy
      0.844072, -0.174765, 0.104008,
      // fuksja
      0.654987, 0.262002, -0.112002,
      // morski
      0.73286, -0.122335, -0.021848,
      // ciemnozielony
      0.436664, -0.083903, 0.051643,
      // limonkowy
      0.855122, -0.176414, 0.166045,
      // malinowy
      0.62851, 0.244543, 0.053616,
      // purpurowy
      0.517416, 0.168313, -0.138026,
      // magenta
      0.618512, 0.251644, -0.041444,
      // bordowy
      0.425397, 0.125202, 0.042175,
      // jasnobrązowy
      0.65025, 0.027389, 0.089454,
      // fiolet
      0.532099, 0.151701, -0.175794,
      // ciemnoróżowy
      0.594105, 0.227899, -0.006583,
      // beżowy
      0.758963, 0.009525, 0.031992,
      // miętowy
      0.850851, -0.152367, 0.035649,
      // jasnopomarańczowy
      0.790448, 0.054717, 0.15981,
    ]),
  },
  };

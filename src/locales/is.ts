import type { ColorDictionary } from '../types.ts';

// Icelandic (Íslenska) — 36 survey responses
export const is: ColorDictionary = {
  locale: 'is',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Rauður', green: 'Grænn', blue: 'Blár',
    hue: 'Litblær', saturation: 'Mettun', lightness: 'Ljósleiki',
    value: 'Gildi', whiteness: 'Hvítleiki', blackness: 'Svartleiki',
    chroma: 'Króma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'svartur',
      'hvítur',
      'rauður',
      'grænn',
      'gulur',
      'blár',
      'brúnn',
      'appelsínugulur',
      'bleikur',
      'fjólublár',
      'grár',
    ],
    colors: new Float32Array([
      // svartur
      0, 0, 0,
      // hvítur
      1, 0, 0,
      // rauður
      0.627955, 0.224863, 0.125846,
      // grænn
      0.519752, -0.140302, 0.107676,
      // gulur
      0.967983, -0.071369, 0.19857,
      // blár
      0.452014, -0.032457, -0.311528,
      // brúnn
      0.470784, 0.070809, 0.08696,
      // appelsínugulur
      0.792688, 0.056611, 0.161385,
      // bleikur
      0.867738, 0.07298, 0.009071,
      // fjólublár
      0.420914, 0.164704, -0.101472,
      // grár
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'blue',
      'green',
      'orange',
      'red',
      'pink',
      'greenyellow',
      'redpink',
      'purple',
      'yellow',
      'purpleblue',
      'purplepink',
      'bluegreen',
    ],
    colors: new Float32Array([
      // blue
      0.629922, -0.054718, -0.195386,
      // green
      0.8734, -0.210845, 0.128907,
      // orange
      0.798005, 0.052096, 0.16252,
      // red
      0.630634, 0.226777, 0.115961,
      // pink
      0.675442, 0.275676, -0.101152,
      // greenyellow
      0.928762, -0.12776, 0.191144,
      // redpink
      0.640842, 0.254332, 0.034663,
      // purple
      0.601134, 0.199279, -0.226838,
      // yellow
      0.96591, -0.070065, 0.198132,
      // purpleblue
      0.52181, 0.106441, -0.272883,
      // purplepink
      0.670495, 0.254383, -0.186826,
      // bluegreen
      0.90149, -0.154552, -0.023686,
    ]),
  },
  };

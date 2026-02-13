import type { ColorDictionary } from '../types.ts';

// Icelandic (Íslenska) — 36 survey responses
export const is: ColorDictionary = {
  locale: 'is',
  source: 'uwdata-multilingual-colors',
  basic: {
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
    ],
    colors: new Float32Array([
      0.629922, -0.054718, -0.195386,
      0.8734, -0.210845, 0.128907,
      0.798005, 0.052096, 0.16252,
      0.630634, 0.226777, 0.115961,
      0.675442, 0.275676, -0.101152,
      0.928762, -0.12776, 0.191144,
      0.640842, 0.254332, 0.034663,
      0.601134, 0.199279, -0.226838,
      0.96591, -0.070065, 0.198132,
      0.52181, 0.106441, -0.272883,
      0.670495, 0.254383, -0.186826,
    ]),
  },
  extended: {
    names: [
      'bluegreen',
    ],
    colors: new Float32Array([
      0.90149, -0.154552, -0.023686,
    ]),
  },
};

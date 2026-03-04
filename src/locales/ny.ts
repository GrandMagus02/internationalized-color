import type { ColorDictionary } from '../types.ts';

// Chichewa — 35 survey responses
export const ny: ColorDictionary = {
  locale: 'ny',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Red', green: 'Green', blue: 'Blue',
    hue: 'Hue', saturation: 'Saturation', lightness: 'Lightness',
    value: 'Value', whiteness: 'Whiteness', blackness: 'Blackness',
    chroma: 'Chroma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'blue',
      'pink',
      'green',
      'orange',
      'red',
      'purple',
      'yellow',
      'black',
      'white',
      'brown',
      'grey',
    ],
    colors: new Float32Array([
      // blue
      0.547009, -0.035404, -0.248428,
      // pink
      0.664152, 0.272984, -0.065204,
      // green
      0.869741, -0.226158, 0.173472,
      // orange
      0.741078, 0.10306, 0.150332,
      // red
      0.629021, 0.228502, 0.116086,
      // purple
      0.583845, 0.182504, -0.2369,
      // yellow
      0.953511, -0.062178, 0.195515,
      // black
      0, 0, 0,
      // white
      1, 0, 0,
      // brown
      0.470784, 0.070809, 0.08696,
      // grey
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'light blue',
      'light green',
      'dark pink',
      'greenish orangeish',
      'yellowish orangeish',
      'greenish blueish',
      'bluw',
      'puple',
      'dark yellow',
      'orngeis',
    ],
    colors: new Float32Array([
      // light blue
      0.788696, -0.11174, -0.087051,
      // light green
      0.874267, -0.213301, 0.152868,
      // dark pink
      0.646518, 0.261369, 0.005576,
      // greenish orangeish
      0.92748, -0.129721, 0.190903,
      // yellowish orangeish
      0.902691, -0.028179, 0.184771,
      // greenish blueish
      0.882637, -0.186885, 0.066517,
      // bluw
      0.452014, -0.032457, -0.311528,
      // puple
      0.658808, 0.246197, -0.193509,
      // dark yellow
      0.827154, 0.028157, 0.168734,
      // orngeis
      0.755379, 0.089691, 0.153401,
    ]),
  },
  };

import type { ColorDictionary } from '../types.ts';

// Afar — 36 survey responses
export const aa: ColorDictionary = {
  locale: 'aa',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Red', green: 'Green', blue: 'Blue',
    hue: 'Hue', saturation: 'Saturation', lightness: 'Lightness',
    value: 'Value', whiteness: 'Whiteness', blackness: 'Blackness',
    chroma: 'Chroma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'red',
      'pink',
      'purple',
      'orange',
      'yellow',
      'black',
      'white',
      'green',
      'blue',
      'brown',
      'grey',
    ],
    colors: new Float32Array([
      // red
      0.629696, 0.230643, 0.110206,
      // pink
      0.647118, 0.261988, 0.002737,
      // purple
      0.626613, 0.222379, -0.210344,
      // orange
      0.790928, 0.058117, 0.161008,
      // yellow
      0.890733, -0.019755, 0.182238,
      // black
      0, 0, 0,
      // white
      1, 0, 0,
      // green
      0.519752, -0.140302, 0.107676,
      // blue
      0.452014, -0.032457, -0.311528,
      // brown
      0.470784, 0.070809, 0.08696,
      // grey
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'teal',
      'magenta',
      'lime green',
      'mint green',
      'dark orange',
      'light orange',
      'shamrock green',
      'dark blue',
      'tropical blue',
      'midnight blue',
      'neon green',
      'turqouise',
      'barbie pink',
      'rose',
      'mustard`',
      'violet',
      'gogle docs blue',
      'sky blue',
      'aqua',
      'fusia',
    ],
    colors: new Float32Array([
      // teal
      0.897229, -0.15628, -0.017034,
      // magenta
      0.656968, 0.269645, -0.039073,
      // lime green
      0.892682, -0.186311, 0.184376,
      // mint green
      0.878259, -0.197058, 0.092408,
      // dark orange
      0.669649, 0.176355, 0.134921,
      // light orange
      0.790928, 0.058117, 0.161008,
      // shamrock green
      0.868028, -0.227829, 0.165766,
      // dark blue
      0.472695, -0.030206, -0.297672,
      // tropical blue
      0.785561, -0.105892, -0.103226,
      // midnight blue
      0.606871, -0.048459, -0.209885,
      // neon green
      0.866452, -0.233839, 0.17939,
      // turqouise
      0.903092, -0.152408, -0.030222,
      // barbie pink
      0.650932, 0.265471, -0.01445,
      // rose
      0.630979, 0.234402, 0.099601,
      // mustard`
      0.945838, -0.102377, 0.194369,
      // violet
      0.56342, 0.160551, -0.248793,
      // gogle docs blue
      0.615165, -0.050648, -0.204644,
      // sky blue
      0.714001, -0.08102, -0.144316,
      // aqua
      0.50109, -0.030174, -0.278721,
      // fusia
      0.666099, 0.251347, -0.189337,
    ]),
  },
  };

import type { ColorDictionary } from '../types.ts';

// Cree — 12 survey responses
export const cr: ColorDictionary = {
  locale: 'cr',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Red', green: 'Green', blue: 'Blue',
    hue: 'Hue', saturation: 'Saturation', lightness: 'Lightness',
    value: 'Value', whiteness: 'Whiteness', blackness: 'Blackness',
    chroma: 'Chroma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'yellow',
      'blue',
      'pink',
      'red',
      'black',
      'white',
      'green',
      'brown',
      'orange',
      'purple',
      'grey',
    ],
    colors: new Float32Array([
      // yellow
      0.966379, -0.073547, 0.198265,
      // blue
      0.517073, -0.031369, -0.268118,
      // pink
      0.665428, 0.273428, -0.069547,
      // red
      0.628348, 0.226242, 0.122181,
      // black
      0, 0, 0,
      // white
      1, 0, 0,
      // green
      0.519752, -0.140302, 0.107676,
      // brown
      0.470784, 0.070809, 0.08696,
      // orange
      0.792688, 0.056611, 0.161385,
      // purple
      0.420914, 0.164704, -0.101472,
      // grey
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'light blue',
      'greenish yellow',
      'light purple',
      'coral',
      'cyan',
      'dark blue',
      'neon blue',
      'greem',
    ],
    colors: new Float32Array([
      // light blue
      0.790228, -0.107558, -0.100624,
      // greenish yellow
      0.938086, -0.113731, 0.192904,
      // light purple
      0.529356, 0.117381, -0.268542,
      // coral
      0.651985, 0.196345, 0.131084,
      // cyan
      0.8903, -0.17189, 0.026398,
      // dark blue
      0.452661, -0.032352, -0.311094,
      // neon blue
      0.881826, -0.140805, -0.051468,
      // greem
      0.902629, -0.169439, 0.186235,
    ]),
  },
  };

import type { ColorDictionary } from '../types.ts';

// Cree — 12 survey responses
export const cr: ColorDictionary = {
  locale: 'cr',
  source: 'uwdata-multilingual-colors',
  basic: {
    names: [
      'yellow',
      'blue',
      'pink',
      'light blue',
      'greenish yellow',
      'light purple',
      'coral',
      'cyan',
      'dark blue',
      'neon blue',
      'red',
    ],
    colors: new Float32Array([
      0.966379, -0.073547, 0.198265,
      0.517073, -0.031369, -0.268118,
      0.665428, 0.273428, -0.069547,
      0.790228, -0.107558, -0.100624,
      0.938086, -0.113731, 0.192904,
      0.529356, 0.117381, -0.268542,
      0.651985, 0.196345, 0.131084,
      0.8903, -0.17189, 0.026398,
      0.452661, -0.032352, -0.311094,
      0.881826, -0.140805, -0.051468,
      0.628348, 0.226242, 0.122181,
    ]),
  },
  extended: {
    names: [
      'greem',
    ],
    colors: new Float32Array([
      0.902629, -0.169439, 0.186235,
    ]),
  },
};

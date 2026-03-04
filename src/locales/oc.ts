import type { ColorDictionary } from '../types.ts';

// Occitan — 12 survey responses
export const oc: ColorDictionary = {
  locale: 'oc',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Ròfo', green: 'Verd', blue: 'Blau',
    hue: 'Tinta', saturation: 'Saturacion', lightness: 'Luminositat',
    value: 'Valor', whiteness: 'Blancor', blackness: 'Negror',
    chroma: 'Cròma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'cerulean',
      'blue',
      'dandelion',
      'yellow',
      'sea foam green',
      'red',
      'magenta',
      'indigo',
      'lime green',
      'orange',
    ],
    colors: new Float32Array([
      // cerulean
      0.582683, -0.042543, -0.225311,
      // blue
      0.498397, -0.030051, -0.280513,
      // dandelion
      0.898694, -0.025382, 0.183924,
      // yellow
      0.960853, -0.081131, 0.197215,
      // sea foam green
      0.875516, -0.204198, 0.110041,
      // red
      0.643794, 0.20589, 0.129301,
      // magenta
      0.688717, 0.276094, -0.137714,
      // indigo
      0.47511, 0.022972, -0.299171,
      // lime green
      0.869497, -0.222605, 0.153757,
      // orange
      0.678067, 0.167105, 0.136745,
    ]),
  },
};

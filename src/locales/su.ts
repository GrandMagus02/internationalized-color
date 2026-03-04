import type { ColorDictionary } from '../types.ts';

// Sundanese — 48 survey responses
export const su: ColorDictionary = {
  locale: 'su',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Beureum', green: 'Héjo', blue: 'Biru',
    hue: 'Warna', saturation: 'Saturasi', lightness: 'Kacérah',
    value: 'Nilai', whiteness: 'Kabodas', blackness: 'Kahideung',
    chroma: 'Kroma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'biru',
      'héjo',
      'ungu',
      'beureum',
      'hideung',
      'bodas',
      'konéng',
      'coklat',
      'oranye',
      'pink',
      'abu',
    ],
    colors: new Float32Array([
      // biru
      0.626403, -0.054457, -0.194079,
      // héjo
      0.873745, -0.209923, 0.127174,
      // ungu
      0.612447, 0.214199, -0.211692,
      // beureum
      0.630571, 0.233246, 0.102902,
      // hideung
      0, 0, 0,
      // bodas
      1, 0, 0,
      // konéng
      0.967983, -0.071369, 0.19857,
      // coklat
      0.470784, 0.070809, 0.08696,
      // oranye
      0.792688, 0.056611, 0.161385,
      // pink
      0.867738, 0.07298, 0.009071,
      // abu
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'ping',
      'orange',
      'koneng',
      'blue',
      'biru ngora',
      'koneng kolot',
      'green',
      'bright green',
      'tourquois',
      'royal blue/purple',
      'lime green',
      'red',
      'teal',
      'red orange',
      'green blue',
      'fushia',
      'hejo ngora',
    ],
    colors: new Float32Array([
      // ping
      0.6506, 0.265197, -0.013009,
      // orange
      0.686033, 0.158511, 0.13847,
      // koneng
      0.933688, -0.089383, 0.19175,
      // blue
      0.492019, -0.020923, -0.285279,
      // biru ngora
      0.757665, -0.096026, -0.118978,
      // koneng kolot
      0.834633, 0.022228, 0.170326,
      // green
      0.872101, -0.214112, 0.133873,
      // bright green
      0.926844, -0.130697, 0.190783,
      // tourquois
      0.88654, -0.142532, -0.049035,
      // royal blue/purple
      0.502896, 0.076268, -0.283675,
      // lime green
      0.917112, -0.14589, 0.188951,
      // red
      0.635697, 0.215503, 0.127536,
      // teal
      0.689118, -0.0728, -0.159122,
      // red orange
      0.695793, 0.148186, 0.140579,
      // green blue
      0.88546, -0.180995, 0.051058,
      // fushia
      0.645806, 0.236631, -0.200975,
      // hejo ngora
      0.918873, -0.143105, 0.189282,
    ]),
  },
  };

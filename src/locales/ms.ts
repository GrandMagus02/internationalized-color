import type { ColorDictionary } from '../types.ts';

// Malay (Bahasa Melayu) — 437 survey responses
export const ms: ColorDictionary = {
  locale: 'ms',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Merah', green: 'Hijau', blue: 'Biru',
    hue: 'Rona', saturation: 'Ketepuan', lightness: 'Kecerahan',
    value: 'Nilai', whiteness: 'Keputihan', blackness: 'Kehitaman',
    chroma: 'Kroma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'biru',
      'hijau',
      'merah',
      'merah jambu',
      'kuning',
      'ungu',
      'oren',
      'hitam',
      'putih',
      'coklat',
      'kelabu',
    ],
    colors: new Float32Array([
      // biru
      0.621161, -0.051654, -0.199167,
      // hijau
      0.872286, -0.216989, 0.152409,
      // merah
      0.632189, 0.229298, 0.10732,
      // merah jambu
      0.655262, 0.268985, -0.039914,
      // kuning
      0.905915, -0.047842, 0.185638,
      // ungu
      0.609653, 0.211836, -0.213312,
      // oren
      0.744202, 0.100104, 0.151003,
      // hitam
      0, 0, 0,
      // putih
      1, 0, 0,
      // coklat
      0.470784, 0.070809, 0.08696,
      // kelabu
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'jingga',
      'biru muda',
      'biru langit',
      'pink',
      'hijau muda',
      'biru terang',
      'biru gelap',
      'biru tua',
      'turqoise',
      'purple',
      'biru diraja',
      'hijau neon',
      'biru mida',
      'unggu',
      'blue',
      'magenta',
      'biru pekat',
      'hijau mida',
      'mint',
      'biru hijau',
      'sky blue',
      'merah ungu',
      'biru laut',
      'kuning neon',
    ],
    colors: new Float32Array([
      // jingga
      0.713052, 0.130464, 0.144303,
      // biru muda
      0.770668, -0.101628, -0.108342,
      // biru langit
      0.761828, -0.097994, -0.114971,
      // pink
      0.601069, 0.246595, -0.033446,
      // hijau muda
      0.884597, -0.195766, 0.161475,
      // biru terang
      0.740497, -0.091041, -0.125531,
      // biru gelap
      0.488329, -0.02981, -0.287223,
      // biru tua
      0.497396, -0.02607, -0.281407,
      // turqoise
      0.882145, -0.165647, 0.014371,
      // purple
      0.537638, 0.185462, -0.190579,
      // biru diraja
      0.495773, -0.029954, -0.28226,
      // hijau neon
      0.87379, -0.219032, 0.176217,
      // biru mida
      0.739192, -0.089601, -0.129597,
      // unggu
      0.593084, 0.191655, -0.231521,
      // blue
      0.380171, -0.023014, -0.198828,
      // magenta
      0.654036, 0.267799, -0.027462,
      // biru pekat
      0.483735, -0.029824, -0.29029,
      // hijau mida
      0.871657, -0.215499, 0.137153,
      // mint
      0.882845, -0.186435, 0.065346,
      // biru hijau
      0.889283, -0.173708, 0.031402,
      // sky blue
      0.671263, -0.067098, -0.169909,
      // merah ungu
      0.661262, 0.271823, -0.055052,
      // biru laut
      0.716156, -0.086098, -0.127963,
      // kuning neon
      0.951451, -0.060853, 0.195081,
    ]),
  },
  };

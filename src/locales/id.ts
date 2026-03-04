import type { ColorDictionary } from '../types.ts';

// Indonesian (Bahasa Indonesia) — 679 survey responses
export const id: ColorDictionary = {
  locale: 'id',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Merah', green: 'Hijau', blue: 'Biru',
    hue: 'Corak', saturation: 'Saturasi', lightness: 'Kecerahan',
    value: 'Nilai', whiteness: 'Keputihan', blackness: 'Kehitaman',
    chroma: 'Kroma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'merah',
      'biru',
      'hijau',
      'kuning',
      'ungu',
      'oranye',
      'merah muda',
      'hitam',
      'putih',
      'coklat',
      'abu-abu',
    ],
    colors: new Float32Array([
      // merah
      0.630342, 0.2269, 0.110431,
      // biru
      0.576981, -0.040879, -0.228999,
      // hijau
      0.871662, -0.219142, 0.1574,
      // kuning
      0.924612, -0.051704, 0.189499,
      // ungu
      0.585712, 0.187168, -0.23062,
      // oranye
      0.739527, 0.104534, 0.149999,
      // merah muda
      0.658882, 0.270688, -0.046338,
      // hitam
      0, 0, 0,
      // putih
      1, 0, 0,
      // coklat
      0.470784, 0.070809, 0.08696,
      // abu-abu
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'biru muda',
      'biru tua',
      'hijau muda',
      'pink',
      'magenta',
      'merah jambu',
      'jingga',
      'biru langit',
      'ungu muda',
      'hijau neon',
      'biru laut',
      'biru hijau',
      'oranye muda',
      'hijau tosca',
      'aqua',
      'ungu tua',
      'oranye tua',
      'pink tua',
      'hijau daun',
      'hijau kuning',
      'turquoise',
      'biru gelap',
      'merah terang',
      'biru muda ketuaan',
    ],
    colors: new Float32Array([
      // biru muda
      0.782336, -0.105779, -0.101802,
      // biru tua
      0.503748, -0.027945, -0.275271,
      // hijau muda
      0.873883, -0.214141, 0.153448,
      // pink
      0.659341, 0.269922, -0.06596,
      // magenta
      0.650932, 0.265471, -0.01445,
      // merah jambu
      0.661668, 0.272, -0.056504,
      // jingga
      0.747358, 0.097139, 0.151681,
      // biru langit
      0.759033, -0.097518, -0.114923,
      // ungu muda
      0.645427, 0.259631, -0.124226,
      // hijau neon
      0.874244, -0.211893, 0.144976,
      // biru laut
      0.547009, -0.035404, -0.248428,
      // biru hijau
      0.88944, -0.168291, 0.017723,
      // oranye muda
      0.806975, 0.044585, 0.164434,
      // hijau tosca
      0.883693, -0.184627, 0.060632,
      // aqua
      0.807903, -0.12743, -0.042499,
      // ungu tua
      0.524687, 0.175217, -0.181667,
      // oranye tua
      0.745777, 0.098623, 0.151341,
      // pink tua
      0.641334, 0.255038, 0.031963,
      // hijau daun
      0.893098, -0.185594, 0.184453,
      // hijau kuning
      0.905633, -0.164458, 0.186797,
      // turquoise
      0.8578, -0.17225, 0.0419,
      // biru gelap
      0.50637, -0.021101, -0.275751,
      // merah terang
      0.630021, 0.231632, 0.107451,
      // biru muda ketuaan
      0.671263, -0.067098, -0.169909,
    ]),
  },
  };

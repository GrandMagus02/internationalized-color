import type { ColorDictionary } from '../types.ts';

// Estonian (Eesti) — 382 survey responses
export const et: ColorDictionary = {
  locale: 'et',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Punane', green: 'Roheline', blue: 'Sinine',
    hue: 'Toon', saturation: 'Küllastus', lightness: 'Heledus',
    value: 'Väärtus', whiteness: 'Valgus', blackness: 'Mustus',
    chroma: 'Krooma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'sinine',
      'lilla',
      'oranž',
      'roheline',
      'kollane',
      'roosa',
      'punane',
      'must',
      'valge',
      'pruun',
      'hall',
    ],
    colors: new Float32Array([
      // sinine
      0.584403, -0.043408, -0.218882,
      // lilla
      0.584454, 0.204278, -0.175215,
      // oranž
      0.741078, 0.10306, 0.150332,
      // roheline
      0.814417, -0.196753, 0.137328,
      // kollane
      0.922903, -0.053945, 0.189174,
      // roosa
      0.659341, 0.258702, -0.039039,
      // punane
      0.630301, 0.22373, 0.116974,
      // must
      0.166796, 0.01901, -0.019687,
      // valge
      1, 0, 0,
      // pruun
      0.470784, 0.070809, 0.08696,
      // hall
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'helesinine',
      'heleroheline',
      'türkiissinine',
      'tumekollane',
      'erkroheline',
      'tumeroosa',
      'tumesinine',
      'erk roosa',
      'sinakasroheline',
      'rohekassinine',
      'tumelilla',
      'tumeoranž',
      'punakas oranž',
      'sirelililla',
      'violetne',
      'erksinine',
      'magenta',
      'punakaslilla',
      'roosakaspunane',
      'taevasinine',
      'elektrisinine',
      'kollakasoheline',
      'lillakasroosa',
    ],
    colors: new Float32Array([
      // helesinine
      0.777437, -0.104051, -0.102946,
      // heleroheline
      0.861447, -0.210528, 0.154681,
      // türkiissinine
      0.794135, -0.115845, -0.077727,
      // tumekollane
      0.87692, -0.009805, 0.179309,
      // erkroheline
      0.874172, -0.21796, 0.174647,
      // tumeroosa
      0.648662, 0.263489, -0.004394,
      // tumesinine
      0.456174, -0.023514, -0.268483,
      // erk roosa
      0.673098, 0.247623, -0.059356,
      // sinakasroheline
      0.879326, -0.194449, 0.085859,
      // rohekassinine
      0.777341, -0.144485, 0.015797,
      // tumelilla
      0.414494, 0.144039, -0.119779,
      // tumeoranž
      0.66865, 0.177464, 0.134704,
      // punakas oranž
      0.67066, 0.175234, 0.13514,
      // sirelililla
      0.688179, 0.276121, -0.136327,
      // violetne
      0.56342, 0.160551, -0.248793,
      // erksinine
      0.805632, -0.117331, -0.079418,
      // magenta
      0.645638, 0.260422, 0.009815,
      // punakaslilla
      0.590991, 0.234073, -0.013175,
      // roosakaspunane
      0.63832, 0.25037, 0.049161,
      // taevasinine
      0.773914, -0.101752, -0.109761,
      // elektrisinine
      0.576818, -0.041227, -0.229083,
      // kollakasoheline
      0.901174, -0.17187, 0.185963,
      // lillakasroosa
      0.671338, 0.255134, -0.129681,
    ]),
  },
  };

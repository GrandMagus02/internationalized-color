import type { ColorDictionary } from '../types.ts';

// Hungarian (Magyar) — 730 survey responses
export const hu: ColorDictionary = {
  locale: 'hu',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Vörös', green: 'Zöld', blue: 'Kék',
    hue: 'Árnyalat', saturation: 'Telítettség', lightness: 'Világosság',
    value: 'Érték', whiteness: 'Fehérség', blackness: 'Feketeség',
    chroma: 'Króma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'kék',
      'zöld',
      'lila',
      'piros',
      'sárga',
      'narancssárga',
      'rózsaszín',
      'fekete',
      'fehér',
      'barna',
      'szürke',
    ],
    colors: new Float32Array([
      // kék
      0.602306, -0.046907, -0.211047,
      // zöld
      0.871844, -0.220146, 0.164135,
      // lila
      0.614445, 0.221831, -0.198503,
      // piros
      0.63319, 0.227694, 0.108346,
      // sárga
      0.915374, -0.055734, 0.187654,
      // narancssárga
      0.75376, 0.091184, 0.153054,
      // rózsaszín
      0.659986, 0.271313, -0.057356,
      // fekete
      0, 0, 0,
      // fehér
      1, 0, 0,
      // barna
      0.470784, 0.070809, 0.08696,
      // szürke
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'magenta',
      'világoskék',
      'türkiz',
      'sötétkék',
      'narancs',
      'ciklámen',
      'pink',
      'kékeszöld',
      'citromsárga',
      'neonzöld',
      'világoszöld',
      'vörös',
      'türkizkék',
      'királykék',
      'aqua kék',
      'égszínkék',
      'vizkek',
      'napsárga',
      'bíbor',
      'okker',
      'püspöklila',
      'sárgászöld',
      'égkék',
      'türkizzöld',
    ],
    colors: new Float32Array([
      // magenta
      0.657726, 0.270073, -0.041979,
      // világoskék
      0.75671, -0.096702, -0.116244,
      // türkiz
      0.871974, -0.15808, -0.000316,
      // sötétkék
      0.472393, -0.022583, -0.298322,
      // narancs
      0.744202, 0.100104, 0.151003,
      // ciklámen
      0.651944, 0.266276, -0.018779,
      // pink
      0.654393, 0.268041, -0.028912,
      // kékeszöld
      0.879879, -0.193131, 0.082527,
      // citromsárga
      0.932401, -0.061748, 0.191197,
      // neonzöld
      0.878381, -0.210546, 0.176855,
      // világoszöld
      0.87434, -0.213546, 0.154865,
      // vörös
      0.630883, 0.230559, 0.107695,
      // türkizkék
      0.874308, -0.1424, -0.043288,
      // királykék
      0.47362, -0.0257, -0.297314,
      // aqua kék
      0.825764, -0.126272, -0.063948,
      // égszínkék
      0.743799, -0.091194, -0.126935,
      // vizkek
      0.695869, -0.075001, -0.155079,
      // napsárga
      0.89284, -0.024876, 0.182723,
      // bíbor
      0.619575, 0.253333, -0.021195,
      // okker
      0.775346, 0.071676, 0.157677,
      // püspöklila
      0.664787, 0.260798, -0.157816,
      // sárgászöld
      0.915955, -0.147729, 0.188734,
      // égkék
      0.63848, -0.057171, -0.190055,
      // türkizzöld
      0.878786, -0.195759, 0.089153,
    ]),
  },
  };

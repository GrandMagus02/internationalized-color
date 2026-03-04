import type { ColorDictionary } from '../types.ts';

// Turkish (Türkçe) — 904 survey responses
export const tr: ColorDictionary = {
  locale: 'tr',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Kırmızı', green: 'Yeşil', blue: 'Mavi',
    hue: 'Ton', saturation: 'Doygunluk', lightness: 'Açıklık',
    value: 'Değer', whiteness: 'Beyazlık', blackness: 'Siyahlık',
    chroma: 'Kroma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'mavi',
      'yeşil',
      'turuncu',
      'pembe',
      'mor',
      'sarı',
      'kırmızı',
      'siyah',
      'beyaz',
      'kahverengi',
      'gri',
    ],
    colors: new Float32Array([
      // mavi
      0.651471, -0.061762, -0.175128,
      // yeşil
      0.861971, -0.215672, 0.157881,
      // turuncu
      0.736644, 0.104955, 0.149239,
      // pembe
      0.654771, 0.2675, -0.035199,
      // mor
      0.596355, 0.211373, -0.198536,
      // sarı
      0.91794, -0.052328, 0.188039,
      // kırmızı
      0.627627, 0.22766, 0.109043,
      // siyah
      0, 0, 0,
      // beyaz
      1, 0, 0,
      // kahverengi
      0.470784, 0.070809, 0.08696,
      // gri
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'lacivert',
      'turkuaz',
      'açık mavi',
      'koyu mavi',
      'fıstık yeşili',
      'açık yeşil',
      'eflatun',
      'fuşya',
      'turkuvaz',
      'su yeşili',
      'gök mavisi',
      'camgöbeği',
      'nil yeşili',
      'çingene pembesi',
      'gök',
      'koyu sarı',
      'cirtlak pembe',
      'kraliyet mavisi',
      'parlak yeşil',
      'açık turuncu',
      'koyu turuncu',
      'fosforlu yeşil',
      'limon yeşili',
      'asit yeşili',
    ],
    colors: new Float32Array([
      // lacivert
      0.477368, -0.024667, -0.276487,
      // turkuaz
      0.881007, -0.153641, -0.016231,
      // açık mavi
      0.788049, -0.109393, -0.093807,
      // koyu mavi
      0.515541, -0.031222, -0.269132,
      // fıstık yeşili
      0.875601, -0.214974, 0.173342,
      // açık yeşil
      0.88032, -0.204352, 0.164928,
      // eflatun
      0.647241, 0.263542, -0.102752,
      // fuşya
      0.646763, 0.264745, -0.062379,
      // turkuvaz
      0.892764, -0.162898, 0.00239,
      // su yeşili
      0.881026, -0.190472, 0.075754,
      // gök mavisi
      0.771589, -0.100929, -0.111073,
      // camgöbeği
      0.83334, -0.139497, -0.030968,
      // nil yeşili
      0.885396, -0.165175, 0.011665,
      // çingene pembesi
      0.665858, 0.273568, -0.070993,
      // gök
      0.853912, -0.137111, -0.047715,
      // koyu sarı
      0.829223, 0.01291, 0.168297,
      // cirtlak pembe
      0.682403, 0.276195, -0.120963,
      // kraliyet mavisi
      0.565335, -0.038803, -0.236501,
      // parlak yeşil
      0.870173, -0.220312, 0.148433,
      // açık turuncu
      0.794455, 0.055106, 0.161762,
      // koyu turuncu
      0.679171, 0.165905, 0.136984,
      // fosforlu yeşil
      0.870189, -0.2226, 0.160578,
      // limon yeşili
      0.923097, -0.13649, 0.190077,
      // asit yeşili
      0.872055, -0.218527, 0.158092,
    ]),
  },
  };

import type { ColorDictionary } from '../types.ts';

// Azerbaijani (Azərbaycanca) — 46 survey responses
export const az: ColorDictionary = {
  locale: 'az',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Qırmızı', green: 'Yaşıl', blue: 'Mavi',
    hue: 'Ton', saturation: 'Doyğunluq', lightness: 'Parlaqlıq',
    value: 'Dəyər', whiteness: 'Ağlıq', blackness: 'Qaralıq',
    chroma: 'Xroma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'qırmızı',
      'sarı',
      'çəhrayı',
      'bənövşəyi',
      'qara',
      'ağ',
      'yaşıl',
      'göy',
      'qəhvəyi',
      'narıncı',
      'boz',
    ],
    colors: new Float32Array([
      // qırmızı
      0.638756, 0.251099, 0.046574,
      // sarı
      0.963839, -0.068758, 0.197695,
      // çəhrayı
      0.643947, 0.258463, 0.018221,
      // bənövşəyi
      0.559708, 0.156277, -0.250953,
      // qara
      0, 0, 0,
      // ağ
      1, 0, 0,
      // yaşıl
      0.519752, -0.140302, 0.107676,
      // göy
      0.452014, -0.032457, -0.311528,
      // qəhvəyi
      0.470784, 0.070809, 0.08696,
      // narıncı
      0.792688, 0.056611, 0.161385,
      // boz
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'mavi',
      'cehrayi',
      'sari',
      'goy',
      'yasil',
      'qirmizi',
      'aciq yasil',
      'narinci',
      'tund goy',
      'benovseyi',
      'tund narinci',
      'yashil',
      'tünd mavi',
      'açıq yaşıl',
      'tünd sarı',
      'ot yaşılı',
    ],
    colors: new Float32Array([
      // mavi
      0.813209, -0.116345, -0.086367,
      // cehrayi
      0.657048, 0.270018, -0.067186,
      // sari
      0.890449, -0.035704, 0.182349,
      // goy
      0.563455, -0.038427, -0.23772,
      // yasil
      0.876755, -0.20089, 0.101923,
      // qirmizi
      0.630474, 0.232967, 0.103694,
      // aciq yasil
      0.869045, -0.226632, 0.169444,
      // narinci
      0.700925, 0.142847, 0.141688,
      // tund goy
      0.514025, -0.031083, -0.270135,
      // benovseyi
      0.550009, 0.14465, -0.256589,
      // tund narinci
      0.663833, 0.182848, 0.133659,
      // yashil
      0.903617, -0.167795, 0.18642,
      // tünd mavi
      0.698126, -0.075742, -0.153732,
      // açıq yaşıl
      0.874093, -0.208178, 0.119695,
      // tünd sarı
      0.904694, -0.029573, 0.185195,
      // ot yaşılı
      0.885451, -0.19896, 0.183028,
    ]),
  },
  };

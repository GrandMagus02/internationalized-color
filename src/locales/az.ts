import type { ColorDictionary } from '../types.ts';

// Azerbaijani (Azərbaycanca) — 46 survey responses
export const az: ColorDictionary = {
  locale: 'az',
  source: 'uwdata-multilingual-colors',
  basic: {
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
    ],
    colors: new Float32Array([
      0.813209, -0.116345, -0.086367,
      0.657048, 0.270018, -0.067186,
      0.890449, -0.035704, 0.182349,
      0.563455, -0.038427, -0.23772,
      0.876755, -0.20089, 0.101923,
      0.630474, 0.232967, 0.103694,
      0.869045, -0.226632, 0.169444,
      0.700925, 0.142847, 0.141688,
      0.514025, -0.031083, -0.270135,
      0.550009, 0.14465, -0.256589,
      0.663833, 0.182848, 0.133659,
    ]),
  },
  extended: {
    names: [
      'yashil',
      'qırmızı',
      'sarı',
      'çəhrayı',
      'tünd mavi',
      'açıq yaşıl',
      'tünd sarı',
      'ot yaşılı',
      'bənövşəyi',
    ],
    colors: new Float32Array([
      0.903617, -0.167795, 0.18642,
      0.638756, 0.251099, 0.046574,
      0.963839, -0.068758, 0.197695,
      0.643947, 0.258463, 0.018221,
      0.698126, -0.075742, -0.153732,
      0.874093, -0.208178, 0.119695,
      0.904694, -0.029573, 0.185195,
      0.885451, -0.19896, 0.183028,
      0.559708, 0.156277, -0.250953,
    ]),
  },
};

import type { ColorDictionary } from '../types.ts';

// Romanian (Română) — 1061 survey responses
export const ro: ColorDictionary = {
  locale: 'ro',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Roșu', green: 'Verde', blue: 'Albastru',
    hue: 'Nuanță', saturation: 'Saturație', lightness: 'Luminozitate',
    value: 'Valoare', whiteness: 'Albiciune', blackness: 'Negritudine',
    chroma: 'Cromă', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'albastru',
      'verde',
      'roz',
      'galben',
      'mov',
      'portocaliu',
      'maro',
      'negru',
      'alb',
      'roșu',
      'gri',
    ],
    colors: new Float32Array([
      // albastru
      0.593431, -0.045171, -0.209625,
      // verde
      0.835136, -0.204164, 0.149131,
      // roz
      0.652943, 0.259628, -0.065564,
      // galben
      0.916765, -0.049766, 0.187565,
      // mov
      0.56999, 0.200488, -0.182117,
      // portocaliu
      0.734199, 0.100314, 0.148287,
      // maro
      0.518876, 0.071148, 0.084422,
      // negru
      0, 0, 0,
      // alb
      1, 0, 0,
      // roșu
      0.627955, 0.224863, 0.125846,
      // gri
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'rosu',
      'bleu',
      'turcoaz',
      'albastru deschis',
      'violet',
      'verde deschis',
      'albastru inchis',
      'bleumarin',
      'magenta',
      'fucsia',
      'verde neon',
      'indigo',
      'verde praz',
      'lime',
      'mustar',
      'roz inchis',
      'portocaliu inchis',
      'verde inchis',
      'cyan',
      'orange',
      'rosu aprins',
      'acvamarin',
      'lila',
      'kaki',
    ],
    colors: new Float32Array([
      // rosu
      0.623742, 0.223643, 0.108114,
      // bleu
      0.771637, -0.102543, -0.099784,
      // turcoaz
      0.859523, -0.153941, -0.001968,
      // albastru deschis
      0.7967, -0.11295, -0.084321,
      // violet
      0.594467, 0.212398, -0.187312,
      // verde deschis
      0.861449, -0.205634, 0.157604,
      // albastru inchis
      0.466009, -0.024336, -0.261894,
      // bleumarin
      0.448831, -0.024224, -0.205871,
      // magenta
      0.656307, 0.266269, -0.097809,
      // fucsia
      0.633095, 0.25621, -0.008331,
      // verde neon
      0.877622, -0.198917, 0.09891,
      // indigo
      0.499413, 0.097504, -0.243184,
      // verde praz
      0.89728, -0.166514, 0.177224,
      // lime
      0.898627, -0.155583, 0.182328,
      // mustar
      0.813517, 0.017018, 0.165136,
      // roz inchis
      0.649298, 0.26407, -0.00726,
      // portocaliu inchis
      0.697061, 0.146862, 0.140853,
      // verde inchis
      0.575112, -0.116828, 0.080436,
      // cyan
      0.8923, -0.150637, -0.029726,
      // orange
      0.702332, 0.105209, 0.139281,
      // rosu aprins
      0.63024, 0.227812, 0.114744,
      // acvamarin
      0.766765, -0.112621, -0.063999,
      // lila
      0.639973, 0.090021, -0.102027,
      // kaki
      0.573198, -0.033843, 0.096941,
    ]),
  },
  };

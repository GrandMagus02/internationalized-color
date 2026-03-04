import type { ColorDictionary } from '../types.ts';

// Italian (Italiano) — 2056 survey responses
export const it: ColorDictionary = {
  locale: 'it',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Rosso', green: 'Verde', blue: 'Blu',
    hue: 'Tonalità', saturation: 'Saturazione', lightness: 'Luminosità',
    value: 'Valore', whiteness: 'Bianchezza', blackness: 'Nerezza',
    chroma: 'Croma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'blu',
      'arancione',
      'rosso',
      'verde',
      'viola',
      'giallo',
      'rosa',
      'nero',
      'bianco',
      'marrone',
      'grigio',
    ],
    colors: new Float32Array([
      // blu
      0.517854, -0.029931, -0.262253,
      // arancione
      0.742636, 0.101583, 0.150667,
      // rosso
      0.624025, 0.224292, 0.112109,
      // verde
      0.865936, -0.220016, 0.162203,
      // viola
      0.58098, 0.193043, -0.217875,
      // giallo
      0.927875, -0.055515, 0.190206,
      // rosa
      0.596368, 0.243309, -0.014199,
      // nero
      0, 0, 0,
      // bianco
      1, 0, 0,
      // marrone
      0.470784, 0.070809, 0.08696,
      // grigio
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'azzurro',
      'fucsia',
      'verde acqua',
      'magenta',
      'verde chiaro',
      'celeste',
      'ciano',
      'violetto',
      'lime',
      'blu chiaro',
      'turchese',
      'azzurro scuro',
      'indaco',
      'blu scuro',
      'giallo scuro',
      'blu elettrico',
      'verde pisello',
      'ocra',
      'acquamarina',
      'verde acido',
      'giallo limone',
      'porpora',
      'verde lime',
      'azzurro chiaro',
    ],
    colors: new Float32Array([
      // azzurro
      0.7698, -0.102249, -0.105587,
      // fucsia
      0.655966, 0.269249, -0.069406,
      // verde acqua
      0.885009, -0.181904, 0.053469,
      // magenta
      0.649525, 0.265774, -0.024769,
      // verde chiaro
      0.858417, -0.213006, 0.165588,
      // celeste
      0.806858, -0.116173, -0.083497,
      // ciano
      0.816664, -0.122413, -0.070343,
      // violetto
      0.644847, 0.247142, -0.172499,
      // lime
      0.89205, -0.182049, 0.183251,
      // blu chiaro
      0.615165, -0.050648, -0.204644,
      // turchese
      0.821128, -0.127848, -0.057089,
      // azzurro scuro
      0.623562, -0.052938, -0.199366,
      // indaco
      0.555505, -0.025362, -0.243525,
      // blu scuro
      0.475245, -0.026024, -0.296203,
      // giallo scuro
      0.869096, -0.011595, 0.17773,
      // blu elettrico
      0.484767, -0.028705, -0.256639,
      // verde pisello
      0.787922, -0.179219, 0.160215,
      // ocra
      0.836514, 0.02075, 0.170726,
      // acquamarina
      0.864821, -0.159909, 0.007742,
      // verde acido
      0.917696, -0.144965, 0.189061,
      // giallo limone
      0.864747, -0.095909, 0.177729,
      // porpora
      0.645382, 0.263314, -0.015454,
      // verde lime
      0.887943, -0.193072, 0.177064,
      // azzurro chiaro
      0.825715, -0.123014, -0.073318,
    ]),
  },
  };

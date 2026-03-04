import type { ColorDictionary } from '../types.ts';

// Catalan (Català) — 398 survey responses
export const ca: ColorDictionary = {
  locale: 'ca',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Vermell', green: 'Verd', blue: 'Blau',
    hue: 'Tonalitat', saturation: 'Saturació', lightness: 'Lluminositat',
    value: 'Valor', whiteness: 'Blancor', blackness: 'Negror',
    chroma: 'Croma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'blau',
      'taronja',
      'groc',
      'verd',
      'vermell',
      'lila',
      'rosa',
      'negre',
      'blanc',
      'marró',
      'gris',
    ],
    colors: new Float32Array([
      // blau
      0.633763, -0.057021, -0.186015,
      // taronja
      0.734923, 0.108938, 0.14901,
      // groc
      0.916418, -0.04628, 0.187767,
      // verd
      0.871315, -0.219673, 0.156709,
      // vermell
      0.633294, 0.224628, 0.114368,
      // lila
      0.586963, 0.186825, -0.233369,
      // rosa
      0.657579, 0.270213, -0.048637,
      // negre
      0, 0, 0,
      // blanc
      1, 0, 0,
      // marró
      0.470784, 0.070809, 0.08696,
      // gris
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'blau cel',
      'fucsia',
      'verd llima',
      'magenta',
      'blau marí',
      'turquesa',
      'blau fosc',
      'blau clar',
      'violeta',
      'verd turquesa',
      'verd clar',
      'cian',
      'blau turquesa',
      'morat',
      'rosa fucsia',
      'taronja clar',
      'vermell rosat',
      'verd menta',
      'ocre',
      'llima',
      'blau elèctric',
      'verd groc',
      'vermeil',
      'blau fosa',
    ],
    colors: new Float32Array([
      // blau cel
      0.776241, -0.102577, -0.108451,
      // fucsia
      0.658717, 0.270792, -0.059663,
      // verd llima
      0.872519, -0.220368, 0.171305,
      // magenta
      0.655849, 0.268978, -0.034716,
      // blau marí
      0.480971, -0.028685, -0.292206,
      // turquesa
      0.878281, -0.157615, -0.004498,
      // blau fosc
      0.514233, -0.030598, -0.270026,
      // blau clar
      0.773535, -0.104719, -0.100252,
      // violeta
      0.605268, 0.211813, -0.208975,
      // verd turquesa
      0.890044, -0.172344, 0.027652,
      // verd clar
      0.872292, -0.215669, 0.145259,
      // cian
      0.68851, -0.074872, -0.150974,
      // blau turquesa
      0.859519, -0.134266, -0.058514,
      // morat
      0.536048, 0.126624, -0.264678,
      // rosa fucsia
      0.663163, 0.270129, -0.104366,
      // taronja clar
      0.817909, 0.035605, 0.166765,
      // vermell rosat
      0.637274, 0.24854, 0.055521,
      // verd menta
      0.873562, -0.209715, 0.123392,
      // ocre
      0.832757, 0.023708, 0.169927,
      // llima
      0.924333, -0.134571, 0.19031,
      // blau elèctric
      0.545237, -0.035109, -0.249586,
      // verd groc
      0.903617, -0.167795, 0.18642,
      // vermeil
      0.631657, 0.236243, 0.094265,
      // blau fosa
      0.55421, -0.036665, -0.243729,
    ]),
  },
  };

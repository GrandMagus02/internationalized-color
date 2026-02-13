import type { ColorDictionary } from '../types.ts';

export const fr: ColorDictionary = {
  locale: 'fr',
  source: 'uw+research',
  basic: {
    names: [
      'noir',
      'blanc',
      'rouge',
      'vert',
      'jaune',
      'bleu',
      'marron',
      'orange',
      'rose',
      'violet',
      'gris',
    ],
    colors: new Float32Array([
      // noir
      0, 0, 0,
      // blanc
      1, 0, 0,
      // rouge
      0.627955, 0.224863, 0.125846,
      // vert
      0.519752, -0.140302, 0.107676,
      // jaune
      0.967983, -0.071369, 0.19857,
      // bleu
      0.452014, -0.032457, -0.311528,
      // marron
      0.470784, 0.070809, 0.08696,
      // orange
      0.792688, 0.056611, 0.161385,
      // rose
      0.867738, 0.07298, 0.009071,
      // violet
      0.420914, 0.164704, -0.101472,
      // gris
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'turquoise',
      'beige',
      'bordeaux',
      'saumon',
      'corail',
      'mauve',
      'lilas',
      'magenta',
      'doré',
      'argenté',
      'indigo',
      'kaki',
      'ocre',
      'émeraude',
      'pourpre',
      'cyan',
      'fuchsia',
      'bourgogne',
      'cuivre',
      'terre cuite',
    ],
    colors: new Float32Array([
      // turquoise
      0.822334, -0.130229, -0.011597,
      // beige
      0.963574, -0.009585, 0.031352,
      // bordeaux
      0.379975, 0.144353, 0.048642,
      // saumon
      0.735002, 0.133699, 0.07127,
      // corail
      0.735113, 0.128225, 0.108538,
      // mauve
      0.827347, 0.079053, -0.089042,
      // lilas
      0.758557, 0.056642, -0.037885,
      // magenta
      0.701674, 0.274566, -0.169156,
      // doré
      0.886771, -0.016925, 0.181398,
      // argenté
      0.807796, 0, 0,
      // indigo
      0.338982, 0.094162, -0.152551,
      // kaki
      0.765376, 0.008314, 0.046967,
      // ocre
      0.649562, 0.071007, 0.121099,
      // émeraude
      0.74514, -0.138649, 0.07516,
      // pourpre
      0.420914, 0.164704, -0.101472,
      // cyan
      0.905399, -0.149444, -0.039398,
      // fuchsia
      0.701674, 0.274566, -0.169156,
      // bourgogne
      0.400779, 0.091534, 0.024679,
      // cuivre
      0.617953, 0.057843, 0.101819,
      // terre cuite
      0.677381, 0.121221, 0.078533,
    ]),
  },
};

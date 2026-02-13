import type { ColorDictionary } from '../types.ts';

export const pt: ColorDictionary = {
  locale: 'pt',
  source: 'uw+research',
  basic: {
    names: [
      'preto',
      'branco',
      'vermelho',
      'verde',
      'amarelo',
      'azul',
      'marrom',
      'laranja',
      'rosa',
      'roxo',
      'cinza',
    ],
    colors: new Float32Array([
      // preto
      0, 0, 0,
      // branco
      1, 0, 0,
      // vermelho
      0.627955, 0.224863, 0.125846,
      // verde
      0.519752, -0.140302, 0.107676,
      // amarelo
      0.967983, -0.071369, 0.19857,
      // azul
      0.452014, -0.032457, -0.311528,
      // marrom
      0.470784, 0.070809, 0.08696,
      // laranja
      0.792688, 0.056611, 0.161385,
      // rosa
      0.867738, 0.07298, 0.009071,
      // roxo
      0.420914, 0.164704, -0.101472,
      // cinza
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'turquesa',
      'bege',
      'bordô',
      'salmão',
      'coral',
      'lilás',
      'magenta',
      'dourado',
      'prateado',
      'índigo',
      'caqui',
      'esmeralda',
      'carmim',
      'ocre',
      'ciano',
      'terracota',
      'vinho',
      'oliva',
      'âmbar',
      'cobre',
    ],
    colors: new Float32Array([
      // turquesa
      0.822334, -0.130229, -0.011597,
      // bege
      0.963574, -0.009585, 0.031352,
      // bordô
      0.379975, 0.144353, 0.048642,
      // salmão
      0.735002, 0.133699, 0.07127,
      // coral
      0.735113, 0.128225, 0.108538,
      // lilás
      0.758557, 0.056642, -0.037885,
      // magenta
      0.701674, 0.274566, -0.169156,
      // dourado
      0.886771, -0.016925, 0.181398,
      // prateado
      0.807796, 0, 0,
      // índigo
      0.338982, 0.094162, -0.152551,
      // caqui
      0.765376, 0.008314, 0.046967,
      // esmeralda
      0.74514, -0.138649, 0.07516,
      // carmim
      0.571189, 0.208438, 0.076225,
      // ocre
      0.649562, 0.071007, 0.121099,
      // ciano
      0.905399, -0.149444, -0.039398,
      // terracota
      0.677381, 0.121221, 0.078533,
      // vinho
      0.400779, 0.091534, 0.024679,
      // oliva
      0.580665, -0.042812, 0.119116,
      // âmbar
      0.840288, 0.017799, 0.171529,
      // cobre
      0.617953, 0.057843, 0.101819,
    ]),
  },
};

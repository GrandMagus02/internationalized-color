import type { ColorDictionary } from '../types.ts';

export const es: ColorDictionary = {
  locale: 'es',
  source: 'uw+research',
  basic: {
    names: [
      'negro',
      'blanco',
      'rojo',
      'verde',
      'amarillo',
      'azul',
      'marrón',
      'naranja',
      'rosa',
      'morado',
      'gris',
      'celeste',
    ],
    colors: new Float32Array([
      // negro
      0, 0, 0,
      // blanco
      1, 0, 0,
      // rojo
      0.627955, 0.224863, 0.125846,
      // verde
      0.519752, -0.140302, 0.107676,
      // amarillo
      0.967983, -0.071369, 0.19857,
      // azul
      0.452014, -0.032457, -0.311528,
      // marrón
      0.470784, 0.070809, 0.08696,
      // naranja
      0.792688, 0.056611, 0.161385,
      // rosa
      0.867738, 0.07298, 0.009071,
      // morado
      0.420914, 0.164704, -0.101472,
      // gris
      0.599871, 0, 0,
      // celeste
      0.814817, -0.057156, -0.05868,
    ]),
  },
  extended: {
    names: [
      'turquesa',
      'granate',
      'beige',
      'carmesí',
      'lila',
      'magenta',
      'fucsia',
      'dorado',
      'plateado',
      'salmón',
      'coral',
      'verde oliva',
      'borgoña',
      'índigo',
      'ocre',
      'esmeralda',
      'ámbar',
      'terracota',
      'aguamarina',
      'bermellón',
    ],
    colors: new Float32Array([
      // turquesa
      0.822334, -0.130229, -0.011597,
      // granate
      0.379975, 0.144353, 0.048642,
      // beige
      0.963574, -0.009585, 0.031352,
      // carmesí
      0.571189, 0.208438, 0.076225,
      // lila
      0.758557, 0.056642, -0.037885,
      // magenta
      0.701674, 0.274566, -0.169156,
      // fucsia
      0.701674, 0.274566, -0.169156,
      // dorado
      0.886771, -0.016925, 0.181398,
      // plateado
      0.807796, 0, 0,
      // salmón
      0.735002, 0.133699, 0.07127,
      // coral
      0.735113, 0.128225, 0.108538,
      // verde oliva
      0.580665, -0.042812, 0.119116,
      // borgoña
      0.400779, 0.091534, 0.024679,
      // índigo
      0.338982, 0.094162, -0.152551,
      // ocre
      0.649562, 0.071007, 0.121099,
      // esmeralda
      0.74514, -0.138649, 0.07516,
      // ámbar
      0.840288, 0.017799, 0.171529,
      // terracota
      0.677381, 0.121221, 0.078533,
      // aguamarina
      0.914995, -0.127986, 0.024897,
      // bermellón
      0.612896, 0.174661, 0.097392,
    ]),
  },
};

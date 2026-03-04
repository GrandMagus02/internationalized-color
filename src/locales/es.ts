import type { ColorDictionary } from '../types.ts';

// Spanish (Español) — 6477 survey responses
export const es: ColorDictionary = {
  locale: 'es',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Rojo', green: 'Verde', blue: 'Azul',
    hue: 'Tono', saturation: 'Saturación', lightness: 'Luminosidad',
    value: 'Valor', whiteness: 'Blancura', blackness: 'Negrura',
    chroma: 'Croma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'verde',
      'azul',
      'rosa',
      'morado',
      'rojo',
      'naranja',
      'amarillo',
      'marrón',
      'gris',
      'negro',
      'blanco',
    ],
    colors: new Float32Array([
      // verde
      0.752649, -0.164792, 0.122817,
      // azul
      0.567534, -0.040437, -0.183403,
      // rosa
      0.650609, 0.219291, -0.041822,
      // morado
      0.515298, 0.153639, -0.16245,
      // rojo
      0.597319, 0.211239, 0.102941,
      // naranja
      0.721415, 0.101505, 0.143388,
      // amarillo
      0.906509, -0.050468, 0.183363,
      // marrón
      0.489316, 0.050517, 0.065931,
      // gris
      0.65921, -0.009988, -0.003035,
      // negro
      0.234784, -0.000395, -0.004091,
      // blanco
      1, 0, 0,
    ]),
  },
  extended: {
    names: [
      'violeta',
      'fucsia',
      'celeste',
      'magenta',
      'turquesa',
      'lila',
      'azul marino',
      'púrpura',
      'verde claro',
      'azul oscuro',
      'cian',
      'azul claro',
      'azul cielo',
      'cafe',
      'verde limón',
      'verde oscuro',
      'verde agua',
      'aguamarina',
      'azul rey',
      'mostaza',
      'azul eléctrico',
    ],
    colors: new Float32Array([
      // violeta
      0.536976, 0.152383, -0.156429,
      // fucsia
      0.629542, 0.25243, -0.064261,
      // celeste
      0.781457, -0.106591, -0.080104,
      // magenta
      0.617564, 0.246149, -0.066996,
      // turquesa
      0.798149, -0.135864, -0.012561,
      // lila
      0.638286, 0.130922, -0.128932,
      // azul marino
      0.384354, -0.012618, -0.182991,
      // púrpura
      0.514982, 0.159847, -0.174024,
      // verde claro
      0.834342, -0.158475, 0.126805,
      // azul oscuro
      0.405018, -0.012553, -0.196781,
      // cian
      0.81722, -0.127902, -0.048421,
      // azul claro
      0.705336, -0.078627, -0.129472,
      // azul cielo
      0.744126, -0.086715, -0.101007,
      // cafe
      0.512858, 0.048962, 0.067847,
      // verde limón
      0.832146, -0.159563, 0.164408,
      // verde oscuro
      0.483699, -0.0933, 0.060394,
      // verde agua
      0.83717, -0.161445, 0.052637,
      // aguamarina
      0.812667, -0.141743, -0.005519,
      // azul rey
      0.48494, -0.022079, -0.249541,
      // mostaza
      0.775602, 0.001891, 0.149757,
      // azul eléctrico
      0.457238, -0.016659, -0.253278,
    ]),
  },
  };

import type { ColorDictionary } from '../types.ts';

// Portuguese (Português) — 2950 survey responses
export const pt: ColorDictionary = {
  locale: 'pt',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Vermelho', green: 'Verde', blue: 'Azul',
    hue: 'Matiz', saturation: 'Saturação', lightness: 'Luminosidade',
    value: 'Valor', whiteness: 'Brancura', blackness: 'Negrura',
    chroma: 'Croma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'azul',
      'verde',
      'rosa',
      'roxo',
      'laranja',
      'amarelo',
      'vermelho',
      'marrom',
      'cinza',
      'preto',
      'branco',
    ],
    colors: new Float32Array([
      // azul
      0.593703, -0.04625, -0.179498,
      // verde
      0.776583, -0.178009, 0.133423,
      // rosa
      0.646452, 0.244564, -0.053311,
      // roxo
      0.52319, 0.155289, -0.172358,
      // laranja
      0.724334, 0.101137, 0.144012,
      // amarelo
      0.902286, -0.048112, 0.18336,
      // vermelho
      0.608315, 0.213949, 0.102799,
      // marrom
      0.491898, 0.045712, 0.066865,
      // cinza
      0.641042, -0.003223, 0.006669,
      // preto
      0.259482, 0.01949, -0.013034,
      // branco
      1, 0, 0,
    ]),
  },
  extended: {
    names: [
      'azul claro',
      'verde claro',
      'azul escuro',
      'lilás',
      'verde água',
      'ciano',
      'magenta',
      'rosa choque',
      'verde limão',
      'azul marinho',
      'violeta',
      'verde escuro',
      'vinho',
      'azul piscina',
      'bege',
      'azul bebê',
      'verde musgo',
      'turquesa',
      'fúcsia',
      'verde piscina',
      'azul celeste',
    ],
    colors: new Float32Array([
      // azul claro
      0.753565, -0.094104, -0.108413,
      // verde claro
      0.847821, -0.182428, 0.129529,
      // azul escuro
      0.44846, -0.012639, -0.229344,
      // lilás
      0.651252, 0.125048, -0.119495,
      // verde água
      0.84201, -0.163121, 0.037605,
      // ciano
      0.842654, -0.142849, -0.018976,
      // magenta
      0.611989, 0.24318, -0.066446,
      // rosa choque
      0.651791, 0.263304, -0.057988,
      // verde limão
      0.875627, -0.168867, 0.178004,
      // azul marinho
      0.487559, -0.037219, -0.152822,
      // violeta
      0.564619, 0.186143, -0.172072,
      // verde escuro
      0.515804, -0.104029, 0.073286,
      // vinho
      0.417101, 0.132869, 0.023735,
      // azul piscina
      0.830536, -0.135004, -0.03998,
      // bege
      0.822377, -0.004103, 0.085462,
      // azul bebê
      0.805493, -0.088508, -0.066768,
      // verde musgo
      0.593254, -0.079606, 0.076726,
      // turquesa
      0.763289, -0.116929, -0.054688,
      // fúcsia
      0.609259, 0.24349, -0.088589,
      // verde piscina
      0.82641, -0.153513, 0.029263,
      // azul celeste
      0.692034, -0.075167, -0.142222,
    ]),
  },
  };

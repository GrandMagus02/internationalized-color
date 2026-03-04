import type { ColorDictionary } from '../types.ts';

// Latvian (Latviešu) — 97 survey responses
export const lv: ColorDictionary = {
  locale: 'lv',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Sarkans', green: 'Zaļš', blue: 'Zils',
    hue: 'Tonis', saturation: 'Piesātinājums', lightness: 'Gaišums',
    value: 'Vērtība', whiteness: 'Baltums', blackness: 'Melnums',
    chroma: 'Hroma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'sarkans',
      'zils',
      'rozā',
      'violets',
      'dzeltens',
      'oranžs',
      'zaļš',
      'melns',
      'balts',
      'brūns',
      'pelēks',
    ],
    colors: new Float32Array([
      // sarkans
      0.635699, 0.240973, 0.07516,
      // zils
      0.520889, -0.030054, -0.265692,
      // rozā
      0.664575, 0.273136, -0.066653,
      // violets
      0.619479, 0.220012, -0.207622,
      // dzeltens
      0.93718, -0.076016, 0.192324,
      // oranžs
      0.768583, 0.077696, 0.15623,
      // zaļš
      0.872567, -0.212684, 0.130484,
      // melns
      0, 0, 0,
      // balts
      1, 0, 0,
      // brūns
      0.470784, 0.070809, 0.08696,
      // pelēks
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'gaiši zaļš',
      'gaiši zils',
      'zila',
      'dzeltena',
      'gaiši zila',
      'sarkana',
      'oranža',
      'koši zils',
      'tumši zils',
      'zaļgani zils',
      'violeta',
      'zaļa',
      'gaiši zaļa',
      'zilgani zaļa',
      'laims',
      'violet rozā',
      'spilgti zaļš',
      'debess zils',
      'lapu zaļš',
      'zaļganzils',
      'zilgans',
      'rozi violets',
      'violeti rozā',
      'tumšāki dzeltens',
    ],
    colors: new Float32Array([
      // gaiši zaļš
      0.877177, -0.207546, 0.151498,
      // gaiši zils
      0.832796, -0.125591, -0.069536,
      // zila
      0.541729, -0.034544, -0.251882,
      // dzeltena
      0.898847, -0.029076, 0.183995,
      // gaiši zila
      0.879393, -0.143718, -0.042192,
      // sarkana
      0.632201, 0.224588, 0.116893,
      // oranža
      0.731895, 0.111859, 0.148359,
      // koši zils
      0.820659, -0.118508, -0.08389,
      // tumši zils
      0.514025, -0.031083, -0.270135,
      // zaļgani zils
      0.886613, -0.178718, 0.044983,
      // violeta
      0.573506, 0.171707, -0.242922,
      // zaļa
      0.869911, -0.221195, 0.150488,
      // gaiši zaļa
      0.877673, -0.208609, 0.161657,
      // zilgani zaļa
      0.886613, -0.178718, 0.044983,
      // laims
      0.887598, -0.195169, 0.183428,
      // violet rozā
      0.701674, 0.274566, -0.169156,
      // spilgti zaļš
      0.867183, -0.230996, 0.172968,
      // debess zils
      0.743799, -0.091194, -0.126935,
      // lapu zaļš
      0.912564, -0.153161, 0.188097,
      // zaļganzils
      0.877914, -0.197919, 0.094556,
      // zilgans
      0.632054, -0.055322, -0.194056,
      // rozi violets
      0.610669, 0.207919, -0.221297,
      // violeti rozā
      0.682917, 0.276206, -0.122368,
      // tumšāki dzeltens
      0.829017, 0.026672, 0.169131,
    ]),
  },
  };

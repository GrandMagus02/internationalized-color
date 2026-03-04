import type { ColorDictionary } from '../types.ts';

// Lithuanian (Lietuvių) — 416 survey responses
export const lt: ColorDictionary = {
  locale: 'lt',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Raudona', green: 'Žalia', blue: 'Mėlyna',
    hue: 'Atspalvis', saturation: 'Sotis', lightness: 'Šviesumas',
    value: 'Reikšmė', whiteness: 'Baltumas', blackness: 'Juodumas',
    chroma: 'Chroma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'mėlyna',
      'oranžinė',
      'violetinė',
      'geltona',
      'raudona',
      'rožinė',
      'žalia',
      'juoda',
      'balta',
      'ruda',
      'pilka',
    ],
    colors: new Float32Array([
      // mėlyna
      0.547646, -0.033994, -0.248096,
      // oranžinė
      0.747358, 0.097139, 0.151681,
      // violetinė
      0.603337, 0.207349, -0.215257,
      // geltona
      0.906785, -0.046711, 0.185804,
      // raudona
      0.630999, 0.228696, 0.111233,
      // rožinė
      0.655396, 0.269413, -0.054701,
      // žalia
      0.871004, -0.223506, 0.172426,
      // juoda
      0, 0, 0,
      // balta
      1, 0, 0,
      // ruda
      0.470784, 0.070809, 0.08696,
      // pilka
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'žydra',
      'salotinė',
      'žalsva',
      'purpurinė',
      'tamsiai mėlyna',
      'melsva',
      'ružava',
      'indigo',
      'garstyciu',
      'ciklameno',
      'rausva',
      'sviesiai zalia',
      'akvamarino',
      'orandzine',
      'elektrinė',
      'mėtinė',
      'vyšninė',
      'dangaus žydrumo',
      'turkio',
      'ryškiai žydra',
      'neoninė žalia',
      'magenta',
      'neoninė žydra',
      'sviesiai zydra',
    ],
    colors: new Float32Array([
      // žydra
      0.804504, -0.115322, -0.084779,
      // salotinė
      0.885952, -0.197017, 0.178577,
      // žalsva
      0.880067, -0.19269, 0.081408,
      // purpurinė
      0.661668, 0.272, -0.056504,
      // tamsiai mėlyna
      0.48251, -0.027488, -0.291245,
      // melsva
      0.647121, -0.05971, -0.184703,
      // ružava
      0.65622, 0.269204, -0.036168,
      // indigo
      0.491192, -0.025777, -0.285548,
      // garstyciu
      0.884795, -0.015506, 0.180979,
      // ciklameno
      0.66086, 0.271643, -0.053601,
      // rausva
      0.636482, 0.247072, 0.060489,
      // sviesiai zalia
      0.87083, -0.218146, 0.143375,
      // akvamarino
      0.821328, -0.131217, -0.047736,
      // orandzine
      0.717266, 0.126237, 0.145211,
      // elektrinė
      0.876647, -0.205223, 0.132442,
      // mėtinė
      0.891078, -0.170529, 0.022624,
      // vyšninė
      0.647118, 0.261988, 0.002737,
      // dangaus žydrumo
      0.766942, -0.099287, -0.113702,
      // turkio
      0.773724, -0.123783, -0.044492,
      // ryškiai žydra
      0.840225, -0.134837, -0.047163,
      // neoninė žalia
      0.868969, -0.224444, 0.158002,
      // magenta
      0.654393, 0.268041, -0.028912,
      // neoninė žydra
      0.878062, -0.141597, -0.04738,
      // sviesiai zydra
      0.881123, -0.141632, -0.048816,
    ]),
  },
  };

import type { ColorDictionary } from '../types.ts';

// Afrikaans — 60 survey responses
export const af: ColorDictionary = {
  locale: 'af',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Rooi', green: 'Groen', blue: 'Blou',
    hue: 'Kleur', saturation: 'Versadiging', lightness: 'Ligtheid',
    value: 'Waarde', whiteness: 'Witheid', blackness: 'Swartheid',
    chroma: 'Chroma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'blou',
      'pienk',
      'oranje',
      'geel',
      'groen',
      'pers',
      'rooi',
      'swart',
      'wit',
      'bruin',
      'grys',
    ],
    colors: new Float32Array([
      // blou
      0.574881, -0.040804, -0.230331,
      // pienk
      0.660396, 0.271483, -0.058808,
      // oranje
      0.723013, 0.120535, 0.146448,
      // geel
      0.935379, -0.082733, 0.192026,
      // groen
      0.873054, -0.211218, 0.126989,
      // pers
      0.564666, 0.161965, -0.248068,
      // rooi
      0.63077, 0.233816, 0.101278,
      // swart
      0, 0, 0,
      // wit
      1, 0, 0,
      // bruin
      0.470784, 0.070809, 0.08696,
      // grys
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'turquoise',
      'lig blou',
      'lemmetjie groen',
      'violet',
      'roos pienk',
      'lemmetjies groen',
      'turquise',
      'mostert',
      'pink',
      'af groen',
      'donker oranje',
      'vaal pienk',
      'suurlemoen groen',
      'vaal oranje',
      'vaal blou',
      'persblou',
    ],
    colors: new Float32Array([
      // turquoise
      0.855244, -0.139243, -0.042488,
      // lig blou
      0.723129, -0.084102, -0.13895,
      // lemmetjie groen
      0.89975, -0.174262, 0.185696,
      // violet
      0.635452, 0.253514, -0.133165,
      // roos pienk
      0.647421, 0.262294, 0.001315,
      // lemmetjies groen
      0.870805, -0.224536, 0.175383,
      // turquise
      0.89025, -0.166936, 0.01391,
      // mostert
      0.827154, 0.028157, 0.168734,
      // pink
      0.637478, 0.248907, 0.054262,
      // af groen
      0.87083, -0.218146, 0.143375,
      // donker oranje
      0.715852, 0.127651, 0.144907,
      // vaal pienk
      0.689257, 0.276063, -0.1391,
      // suurlemoen groen
      0.896995, -0.178923, 0.185181,
      // vaal oranje
      0.798005, 0.052096, 0.16252,
      // vaal blou
      0.604814, -0.047928, -0.211188,
      // persblou
      0.482756, 0.038892, -0.294962,
    ]),
  },
  };

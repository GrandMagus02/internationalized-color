import type { ColorDictionary } from '../types.ts';

// Danish (Dansk) — 926 survey responses
export const da: ColorDictionary = {
  locale: 'da',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Rød', green: 'Grøn', blue: 'Blå',
    hue: 'Farvetone', saturation: 'Mætning', lightness: 'Lyshed',
    value: 'Værdi', whiteness: 'Hvidhed', blackness: 'Sorthed',
    chroma: 'Kroma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'blå',
      'orange',
      'grøn',
      'rød',
      'gul',
      'lilla',
      'pink',
      'sort',
      'hvid',
      'brun',
      'grå',
    ],
    colors: new Float32Array([
      // blå
      0.58401, -0.042749, -0.222698,
      // orange
      0.745777, 0.098623, 0.151341,
      // grøn
      0.87156, -0.219686, 0.159165,
      // rød
      0.63268, 0.229059, 0.106703,
      // gul
      0.916732, -0.049893, 0.18787,
      // lilla
      0.597521, 0.206153, -0.211743,
      // pink
      0.662061, 0.27213, -0.064612,
      // sort
      0, 0, 0,
      // hvid
      1, 0, 0,
      // brun
      0.470784, 0.070809, 0.08696,
      // grå
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'turkis',
      'lyseblå',
      'mørkeblå',
      'lysegrøn',
      'lyserød',
      'neongrøn',
      'limegrøn',
      'turkisgrøn',
      'babyblå',
      'himmelblå',
      'turkis blå',
      'violet',
      'lysblå',
      'lysgrøn',
      'gulgrøn',
      'mørk orange',
      'rosa',
      'mørkelilla',
      'cerise',
      'blågrøn',
      'mintgrøn',
      'karrygul',
      'lyse lilla',
      'cyklamen',
    ],
    colors: new Float32Array([
      // turkis
      0.845576, -0.143436, -0.023405,
      // lyseblå
      0.76601, -0.099979, -0.11097,
      // mørkeblå
      0.486816, -0.027792, -0.288349,
      // lysegrøn
      0.874673, -0.214677, 0.163713,
      // lyserød
      0.661641, 0.271974, -0.063162,
      // neongrøn
      0.891526, -0.18816, 0.183524,
      // limegrøn
      0.882683, -0.20278, 0.177691,
      // turkisgrøn
      0.878786, -0.195759, 0.089153,
      // babyblå
      0.720844, -0.083327, -0.14029,
      // himmelblå
      0.700385, -0.076486, -0.152385,
      // turkis blå
      0.875402, -0.148832, -0.026341,
      // violet
      0.620446, 0.230869, -0.184717,
      // lysblå
      0.732295, -0.087229, -0.133599,
      // lysgrøn
      0.870094, -0.22148, 0.153893,
      // gulgrøn
      0.932021, -0.122809, 0.191759,
      // mørk orange
      0.680287, 0.164695, 0.137226,
      // rosa
      0.646222, 0.261056, 0.006991,
      // mørkelilla
      0.504772, 0.079453, -0.282612,
      // cerise
      0.668403, 0.273565, -0.091445,
      // blågrøn
      0.884564, -0.182813, 0.055869,
      // mintgrøn
      0.879693, -0.193572, 0.083642,
      // karrygul
      0.878475, -0.055279, 0.180108,
      // lyse lilla
      0.665108, 0.266132, -0.135536,
      // cyklamen
      0.66595, 0.273371, -0.077632,
    ]),
  },
  };

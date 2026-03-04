import type { ColorDictionary } from '../types.ts';

// Swedish (Svenska) — 2357 survey responses
export const sv: ColorDictionary = {
  locale: 'sv',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Röd', green: 'Grön', blue: 'Blå',
    hue: 'Nyans', saturation: 'Mättnad', lightness: 'Ljushet',
    value: 'Värde', whiteness: 'Vithet', blackness: 'Svarthet',
    chroma: 'Kroma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'blå',
      'grön',
      'lila',
      'röd',
      'rosa',
      'gul',
      'orange',
      'brun',
      'svart',
      'vit',
      'grå',
    ],
    colors: new Float32Array([
      // blå
      0.588574, -0.044632, -0.205623,
      // grön
      0.827203, -0.201787, 0.145078,
      // lila
      0.580391, 0.200068, -0.184638,
      // röd
      0.623662, 0.224449, 0.106647,
      // rosa
      0.650082, 0.258419, -0.048707,
      // gul
      0.91136, -0.052568, 0.185651,
      // orange
      0.732705, 0.102056, 0.14729,
      // brun
      0.538016, 0.057184, 0.081803,
      // svart
      0.222195, 0.016334, -0.004648,
      // vit
      1, 0, 0,
      // grå
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'turkos',
      'ljusblå',
      'mörkblå',
      'limegrön',
      'ljusgrön',
      'mörklila',
      'mintgrön',
      'cerise',
      'neongrön',
      'mörkgrön',
      'mörkrosa',
      'himmelsblå',
      'blågrön',
      'violett',
      'marinblå',
      'senapsgul',
      'ljuslila',
      'lime',
      'klarblå',
      'vinröd',
      'skogsgrön',
      'mörkgul',
    ],
    colors: new Float32Array([
      // turkos
      0.854374, -0.148149, -0.014647,
      // ljusblå
      0.763583, -0.097212, -0.106005,
      // mörkblå
      0.434708, -0.017433, -0.243783,
      // limegrön
      0.872125, -0.169047, 0.174497,
      // ljusgrön
      0.836961, -0.163577, 0.122289,
      // mörklila
      0.418852, 0.11834, -0.121603,
      // mintgrön
      0.840418, -0.155378, 0.048581,
      // cerise
      0.622033, 0.250083, -0.026378,
      // neongrön
      0.85235, -0.207811, 0.164555,
      // mörkgrön
      0.490176, -0.107625, 0.07076,
      // mörkrosa
      0.606481, 0.227393, -0.002325,
      // himmelsblå
      0.702155, -0.06982, -0.133358,
      // blågrön
      0.70607, -0.124154, -0.002744,
      // violett
      0.556578, 0.053182, -0.135966,
      // marinblå
      0.378495, -0.015928, -0.17483,
      // senapsgul
      0.808377, 0.011628, 0.162785,
      // ljuslila
      0.679638, 0.143635, -0.122911,
      // lime
      0.905633, -0.164458, 0.186797,
      // klarblå
      0.477527, -0.023097, -0.25066,
      // vinröd
      0.422456, 0.158513, 0.023533,
      // skogsgrön
      0.534037, -0.07849, 0.074143,
      // mörkgul
      0.874071, -0.017038, 0.178804,
    ]),
  },
  };

import type { ColorDictionary } from '../types.ts';

// Slovak (Slovenčina) — 180 survey responses
export const sk: ColorDictionary = {
  locale: 'sk',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Červená', green: 'Zelená', blue: 'Modrá',
    hue: 'Odtieň', saturation: 'Sýtosť', lightness: 'Svetlosť',
    value: 'Hodnota', whiteness: 'Belosť', blackness: 'Čerň',
    chroma: 'Chroma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'modrá',
      'ružová',
      'oranžová',
      'žltá',
      'zelená',
      'fialová',
      'červená',
      'čierna',
      'biela',
      'hnedá',
      'sivá',
    ],
    colors: new Float32Array([
      // modrá
      0.617397, -0.05092, -0.203257,
      // ružová
      0.647151, 0.265213, -0.030791,
      // oranžová
      0.741078, 0.10306, 0.150332,
      // žltá
      0.934068, -0.059527, 0.191514,
      // zelená
      0.87175, -0.220727, 0.166077,
      // fialová
      0.580399, 0.180219, -0.237191,
      // červená
      0.629403, 0.229728, 0.112732,
      // čierna
      0, 0, 0,
      // biela
      1, 0, 0,
      // hnedá
      0.470784, 0.070809, 0.08696,
      // sivá
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'tyrkysová',
      'azúrová',
      'mentolová',
      'krikľavozelená',
      'citrónovo zelená',
      'bledo modrá',
      'akvamarínová',
      'magenta',
      'limetková',
      'zlatá',
      'krikľavopurpurová',
      'modrozelená',
      'purpurová',
      'tmavomodrá',
      'hot pink',
      'krikľavoružová',
    ],
    colors: new Float32Array([
      // tyrkysová
      0.891341, -0.170076, 0.021363,
      // azúrová
      0.853331, -0.134172, -0.055633,
      // mentolová
      0.885917, -0.180084, 0.048636,
      // krikľavozelená
      0.873695, -0.218638, 0.173623,
      // citrónovo zelená
      0.906146, -0.163613, 0.186894,
      // bledo modrá
      0.808937, -0.114275, -0.090288,
      // akvamarínová
      0.884786, -0.182359, 0.05467,
      // magenta
      0.683952, 0.276216, -0.125172,
      // limetková
      0.910914, -0.155827, 0.187787,
      // zlatá
      0.873003, -0.006939, 0.178478,
      // krikľavopurpurová
      0.659273, 0.270886, -0.047791,
      // modrozelená
      0.873958, -0.208566, 0.120628,
      // purpurová
      0.635915, 0.245973, 0.064139,
      // tmavomodrá
      0.533176, -0.033279, -0.257496,
      // hot pink
      0.648036, 0.262897, -0.001536,
      // krikľavoružová
      0.680874, 0.276142, -0.116741,
    ]),
  },
  };

import type { ColorDictionary } from '../types.ts';

// German (Deutsch) — 6337 survey responses
export const de: ColorDictionary = {
  locale: 'de',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Rot', green: 'Grün', blue: 'Blau',
    hue: 'Farbton', saturation: 'Sättigung', lightness: 'Helligkeit',
    value: 'Wert', whiteness: 'Weißheit', blackness: 'Schwarzheit',
    chroma: 'Chroma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'blau',
      'grün',
      'lila',
      'pink',
      'rot',
      'orange',
      'gelb',
      'braun',
      'schwarz',
      'grau',
      'weiß',
    ],
    colors: new Float32Array([
      // blau
      0.560947, -0.0362, -0.201962,
      // grün
      0.762772, -0.175014, 0.128919,
      // lila
      0.557179, 0.174176, -0.172402,
      // pink
      0.643177, 0.256484, -0.060562,
      // rot
      0.603781, 0.211456, 0.100067,
      // orange
      0.735423, 0.090405, 0.147119,
      // gelb
      0.901501, -0.048939, 0.182465,
      // braun
      0.51815, 0.042163, 0.074084,
      // schwarz
      0.251225, -0.001246, 0.009197,
      // grau
      0.658087, -0.002538, -0.003839,
      // weiß
      1, 0, 0,
    ]),
  },
  extended: {
    names: [
      'türkis',
      'hellblau',
      'hellgrün',
      'dunkelblau',
      'violett',
      'rosa',
      'dunkelgrün',
      'magenta',
      'neongrün',
      'himmelblau',
      'ocker',
      'grasgrün',
      'beige',
      'gelbgrün',
      'königsblau',
      'flieder',
      'giftgrün',
      'hellbraun',
      'dunkellila',
      'dunkelrot',
      'rotbraun',
    ],
    colors: new Float32Array([
      // türkis
      0.836089, -0.147876, -0.001617,
      // hellblau
      0.768561, -0.100715, -0.093561,
      // hellgrün
      0.836237, -0.178595, 0.139974,
      // dunkelblau
      0.404618, -0.012532, -0.208618,
      // violett
      0.530768, 0.144274, -0.147025,
      // rosa
      0.687638, 0.192416, -0.047783,
      // dunkelgrün
      0.460381, -0.092639, 0.063305,
      // magenta
      0.63059, 0.253198, -0.068812,
      // neongrün
      0.848112, -0.203508, 0.158194,
      // himmelblau
      0.718375, -0.081823, -0.126915,
      // ocker
      0.733616, 0.008089, 0.13562,
      // grasgrün
      0.736343, -0.152456, 0.133383,
      // beige
      0.834082, 0.0011, 0.070525,
      // gelbgrün
      0.872525, -0.105178, 0.171671,
      // königsblau
      0.445759, -0.016746, -0.25341,
      // flieder
      0.633933, 0.111403, -0.096176,
      // giftgrün
      0.855136, -0.197308, 0.165061,
      // hellbraun
      0.670542, 0.036222, 0.0862,
      // dunkellila
      0.392598, 0.098616, -0.113131,
      // dunkelrot
      0.429867, 0.14395, 0.051327,
      // rotbraun
      0.469309, 0.117141, 0.056554,
    ]),
  },
  };

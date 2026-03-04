import type { ColorDictionary } from '../types.ts';

// French (Français) — 5094 survey responses
export const fr: ColorDictionary = {
  locale: 'fr',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Rouge', green: 'Vert', blue: 'Bleu',
    hue: 'Teinte', saturation: 'Saturation', lightness: 'Luminosité',
    value: 'Valeur', whiteness: 'Blancheur', blackness: 'Noirceur',
    chroma: 'Chroma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'bleu',
      'vert',
      'violet',
      'rose',
      'orange',
      'rouge',
      'jaune',
      'marron',
      'noir',
      'gris',
      'blanc',
    ],
    colors: new Float32Array([
      // bleu
      0.588947, -0.045857, -0.182413,
      // vert
      0.777599, -0.175043, 0.127571,
      // violet
      0.548128, 0.172876, -0.168848,
      // rose
      0.655369, 0.232817, -0.053122,
      // orange
      0.733327, 0.097416, 0.145965,
      // rouge
      0.599682, 0.212017, 0.102071,
      // jaune
      0.904815, -0.052644, 0.182858,
      // marron
      0.506272, 0.044993, 0.071411,
      // noir
      0.240752, 0.007376, 0.002354,
      // gris
      0.658778, -0.006153, -0.008004,
      // blanc
      1, 0, 0,
    ]),
  },
  extended: {
    names: [
      'turquoise',
      'mauve',
      'bleu ciel',
      'fushia',
      'bleu marine',
      'magenta',
      'vert clair',
      'bleu clair',
      'cyan',
      'vert foncé',
      'vert fluo',
      'vert pomme',
      'bleu foncé',
      'kaki',
      'brun',
      'beige',
      'bleu roi',
      'indigo',
      'pourpre',
      'vert d\'eau',
      'bordeaux',
    ],
    colors: new Float32Array([
      // turquoise
      0.83091, -0.146505, -0.002632,
      // mauve
      0.578606, 0.168013, -0.151893,
      // bleu ciel
      0.769729, -0.094656, -0.097983,
      // fushia
      0.633333, 0.254669, -0.072489,
      // bleu marine
      0.428655, -0.017007, -0.20418,
      // magenta
      0.628797, 0.25349, -0.05124,
      // vert clair
      0.839752, -0.171693, 0.136972,
      // bleu clair
      0.770694, -0.098566, -0.098879,
      // cyan
      0.797246, -0.121735, -0.055727,
      // vert foncé
      0.482881, -0.088651, 0.060009,
      // vert fluo
      0.849138, -0.203203, 0.165821,
      // vert pomme
      0.849772, -0.180737, 0.166072,
      // bleu foncé
      0.452691, -0.018212, -0.22626,
      // kaki
      0.605308, -0.050657, 0.101908,
      // brun
      0.479828, 0.052869, 0.060433,
      // beige
      0.816917, 0.014136, 0.075849,
      // bleu roi
      0.480954, -0.016754, -0.241385,
      // indigo
      0.471373, 0.031122, -0.205698,
      // pourpre
      0.480002, 0.177897, -0.082948,
      // vert d'eau
      0.835434, -0.158989, 0.046642,
      // bordeaux
      0.462344, 0.144095, 0.038434,
    ]),
  },
  };

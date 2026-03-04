import type { ColorDictionary } from '../types.ts';

// Finnish (Suomi) — 1403 survey responses
export const fi: ColorDictionary = {
  locale: 'fi',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Punainen', green: 'Vihreä', blue: 'Sininen',
    hue: 'Sävy', saturation: 'Kylläisyys', lightness: 'Valoisuus',
    value: 'Arvo', whiteness: 'Valkoisuus', blackness: 'Mustuus',
    chroma: 'Krooma', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'sininen',
      'vihreä',
      'oranssi',
      'violetti',
      'punainen',
      'keltainen',
      'ruskea',
      'vaaleanpunainen',
      'musta',
      'harmaa',
      'valkoinen',
    ],
    colors: new Float32Array([
      // sininen
      0.558574, -0.037908, -0.2105,
      // vihreä
      0.796616, -0.192791, 0.1448,
      // oranssi
      0.730043, 0.099942, 0.146424,
      // violetti
      0.561078, 0.195961, -0.176571,
      // punainen
      0.606683, 0.218545, 0.103045,
      // keltainen
      0.916787, -0.049682, 0.187363,
      // ruskea
      0.529822, 0.030641, 0.080897,
      // vaaleanpunainen
      0.703226, 0.170031, -0.032559,
      // musta
      0.206655, 0.008248, -0.005578,
      // harmaa
      0.701747, -0.009878, 0.008959,
      // valkoinen
      1, 0, 0,
    ]),
  },
  extended: {
    names: [
      'turkoosi',
      'pinkki',
      'vaaleansininen',
      'liila',
      'tummansininen',
      'vaaleanvihreä',
      'taivaansininen',
      'magenta',
      'purppura',
      'lime',
      'syaani',
      'kirkkaanvihreä',
      'mintunvihreä',
      'keltavihreä',
      'fuksia',
      'tummanvihreä',
      'viininpunainen',
      'metsänvihreä',
      'limenvihreä',
      'tummankeltainen',
      'sinivihreä',
    ],
    colors: new Float32Array([
      // turkoosi
      0.840496, -0.150765, -0.002334,
      // pinkki
      0.64607, 0.256468, -0.04079,
      // vaaleansininen
      0.797696, -0.113734, -0.072838,
      // liila
      0.578624, 0.186704, -0.145707,
      // tummansininen
      0.417845, -0.016938, -0.232231,
      // vaaleanvihreä
      0.850604, -0.174056, 0.140815,
      // taivaansininen
      0.721666, -0.086004, -0.124867,
      // magenta
      0.655322, 0.262072, -0.120385,
      // purppura
      0.449663, 0.155008, -0.135446,
      // lime
      0.880384, -0.171096, 0.179544,
      // syaani
      0.777081, -0.112539, -0.072728,
      // kirkkaanvihreä
      0.826832, -0.209979, 0.154735,
      // mintunvihreä
      0.844414, -0.158763, 0.042464,
      // keltavihreä
      0.882036, -0.136232, 0.168732,
      // fuksia
      0.611798, 0.242287, -0.016426,
      // tummanvihreä
      0.456383, -0.095858, 0.076326,
      // viininpunainen
      0.437904, 0.166309, 0.018589,
      // metsänvihreä
      0.482065, -0.086669, 0.076035,
      // limenvihreä
      0.901165, -0.146845, 0.183626,
      // tummankeltainen
      0.820071, 0.009644, 0.167223,
      // sinivihreä
      0.758904, -0.133893, 0.010025,
    ]),
  },
  };

import type { ColorDictionary } from '../types.ts';

// Irish (Gaeilge) — 36 survey responses
export const ga: ColorDictionary = {
  locale: 'ga',
  source: 'uwdata-multilingual-colors',
  basic: {
    names: [
      'dark blue',
      'green',
      'orange',
      'blue',
      'lime',
      'red',
      'turquoise',
      'light blue',
      'pink',
      'yellow',
      'purple',
    ],
    colors: new Float32Array([
      0.477789, -0.019759, -0.294861,
      0.870929, -0.217825, 0.142622,
      0.731895, 0.111859, 0.148359,
      0.590621, -0.044402, -0.220225,
      0.895228, -0.181936, 0.184851,
      0.633359, 0.219359, 0.124911,
      0.887085, -0.177807, 0.042535,
      0.725418, -0.08488, -0.137611,
      0.689257, 0.276063, -0.1391,
      0.943233, -0.055524, 0.193345,
      0.585154, 0.183829, -0.236138,
    ]),
  },
  extended: {
    names: [
      'magenta',
      'sky blue',
      'megenta',
      'cerise',
      'gold',
      'fluorescent yellow',
      'baby blue',
      'pale blue',
      'cerise pink',
    ],
    colors: new Float32Array([
      0.648662, 0.263489, -0.004394,
      0.904733, -0.150286, -0.036774,
      0.637274, 0.24854, 0.055521,
      0.634508, 0.243068, 0.073518,
      0.840288, 0.017799, 0.171529,
      0.934014, -0.119806, 0.192135,
      0.844151, -0.127039, -0.071248,
      0.65803, -0.062998, -0.177988,
      0.663314, 0.27267, -0.062306,
    ]),
  },
};

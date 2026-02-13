import type { ColorDictionary } from '../types.ts';

// Pashto (پښتو) — 16 survey responses
export const ps: ColorDictionary = {
  locale: 'ps',
  source: 'uwdata-multilingual-colors',
  basic: {
    names: [
      'jar',
      'maltae',
      'asmani',
      'surkh',
      'zarghun',
      'sherchae',
      'tez asmani',
      'banjari',
      'sur',
    ],
    colors: new Float32Array([
      0.910719, -0.03374, 0.18647,
      0.734923, 0.108938, 0.14901,
      0.71856, -0.082555, -0.141631,
      0.631569, 0.224621, 0.118241,
      0.878107, -0.212155, 0.181662,
      0.655849, 0.268978, -0.034716,
      0.533176, -0.033279, -0.257496,
      0.556037, 0.151956, -0.253088,
      0.629141, 0.228891, 0.115027,
    ]),
  },
};

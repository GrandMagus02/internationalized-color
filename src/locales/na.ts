import type { ColorDictionary } from '../types.ts';

// Nauru — 36 survey responses
export const na: ColorDictionary = {
  locale: 'na',
  source: 'uwdata-multilingual-colors',
  basic: {
    names: [
      '蓝色',
      '绿色',
      '粉色',
      '橙色',
      '黄色',
      '紫色',
      '红色',
      '天蓝',
      '粉红',
    ],
    colors: new Float32Array([
      0.627796, -0.054119, -0.196714,
      0.872207, -0.215828, 0.145239,
      0.660061, 0.271271, -0.050696,
      0.771951, 0.074687, 0.156951,
      0.941401, -0.078607, 0.193213,
      0.609298, 0.206701, -0.222093,
      0.631515, 0.22543, 0.116719,
      0.896912, -0.16111, -0.0042,
      0.635548, 0.245242, 0.066533,
    ]),
  },
};

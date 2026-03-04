import type { ColorDictionary } from '../types.ts';

// Vietnamese (Tiếng Việt) — 729 survey responses
export const vi: ColorDictionary = {
  locale: 'vi',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'Đỏ', green: 'Xanh lá', blue: 'Xanh dương',
    hue: 'Sắc độ', saturation: 'Độ bão hòa', lightness: 'Độ sáng',
    value: 'Giá trị', whiteness: 'Độ trắng', blackness: 'Độ đen',
    chroma: 'Sắc độ', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'hồng',
      'xanh dương',
      'vàng',
      'tím',
      'cam',
      'đỏ',
      'xanh lá',
      'đen',
      'trắng',
      'nâu',
      'xám',
    ],
    colors: new Float32Array([
      // hồng
      0.664631, 0.27299, -0.073298,
      // xanh dương
      0.606871, -0.048459, -0.209885,
      // vàng
      0.915252, -0.043786, 0.187503,
      // tím
      0.580041, 0.1823, -0.233963,
      // cam
      0.721563, 0.121967, 0.146136,
      // đỏ
      0.631595, 0.228287, 0.110725,
      // xanh lá
      0.871038, -0.221548, 0.163451,
      // đen
      0, 0, 0,
      // trắng
      1, 0, 0,
      // nâu
      0.470784, 0.070809, 0.08696,
      // xám
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'xanh da trời',
      'xanh ngọc',
      'xanh lá cây',
      'xanh nước biển',
      'xanh',
      'xanh lam',
      'da cam',
      'màu cam',
      'xanh chuối',
      'xanh nhạt',
      'màu tím',
      'xanh nõn chuối',
      'xanh đậm',
      'xanh lục',
      'đỏ hồng',
      'màu hồng',
      'hồng đậm',
      'do',
      'hồng cánh sen',
      'đỏ cam',
      'blue',
      'màu đỏ',
      'màu vàng',
      'màu xanh lá cây',
    ],
    colors: new Float32Array([
      // xanh da trời
      0.757187, -0.096363, -0.117612,
      // xanh ngọc
      0.853182, -0.150104, -0.012245,
      // xanh lá cây
      0.873163, -0.217148, 0.161781,
      // xanh nước biển
      0.577063, -0.040705, -0.228957,
      // xanh
      0.675547, -0.098131, -0.06429,
      // xanh lam
      0.724624, -0.087534, -0.128061,
      // da cam
      0.76358, 0.082202, 0.155158,
      // màu cam
      0.723013, 0.120535, 0.146448,
      // xanh chuối
      0.878577, -0.210874, 0.179902,
      // xanh nhạt
      0.772355, -0.117722, -0.057791,
      // màu tím
      0.577354, 0.175798, -0.24068,
      // xanh nõn chuối
      0.895308, -0.181623, 0.184129,
      // xanh đậm
      0.509788, -0.026693, -0.273175,
      // xanh lục
      0.728012, -0.113235, -0.050939,
      // đỏ hồng
      0.633555, 0.240936, 0.080178,
      // màu hồng
      0.65622, 0.269204, -0.036168,
      // hồng đậm
      0.651267, 0.265742, -0.015892,
      // do
      0.630282, 0.230948, 0.108258,
      // hồng cánh sen
      0.663314, 0.27267, -0.062306,
      // đỏ cam
      0.655421, 0.193809, 0.128957,
      // blue
      0.547009, -0.035404, -0.248428,
      // màu đỏ
      0.630346, 0.226612, 0.116943,
      // màu vàng
      0.939038, -0.061079, 0.192546,
      // màu xanh lá cây
      0.869881, -0.222953, 0.159375,
    ]),
  },
  };

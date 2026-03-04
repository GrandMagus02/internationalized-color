import { rgbToHsv, hsvToRgb } from './rgb-hsv.ts';

export function rgbToHwb(r: number, g: number, b: number): [number, number, number] {
  const [h] = rgbToHsv(r, g, b);
  const w = Math.min(r, g, b);
  const bk = 1 - Math.max(r, g, b);
  return [h, w, bk];
}

export function hwbToRgb(h: number, w: number, b: number): [number, number, number] {
  // If w + b >= 1, result is a neutral grey
  if (w + b >= 1) {
    const grey = w / (w + b);
    return [grey, grey, grey];
  }
  // HWB to RGB via HSV: s = 1 - w/(1-b), v = 1 - b
  const v = 1 - b;
  const s = v === 0 ? 0 : 1 - w / v;
  return hsvToRgb(h, s, v);
}

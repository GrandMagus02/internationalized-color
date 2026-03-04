// sRGB gamma transfer functions
function linearize(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function gamma(c: number): number {
  return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

export function rgbToLrgb(r: number, g: number, b: number): [number, number, number] {
  return [linearize(r), linearize(g), linearize(b)];
}

export function lrgbToRgb(r: number, g: number, b: number): [number, number, number] {
  return [gamma(r), gamma(g), gamma(b)];
}

// Display P3 uses the same transfer function as sRGB but different primaries

function linearize(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function gamma(c: number): number {
  return c <= 0.0031308 ? c * 12.92 : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

// XYZ-D65 to linear Display P3
export function xyz65ToP3(x: number, y: number, z: number): [number, number, number] {
  const lr = 2.493496911941425 * x - 0.9313836179191239 * y - 0.40271078445071684 * z;
  const lg = -0.8294889695615747 * x + 1.7626640603183463 * y + 0.023624685841943577 * z;
  const lb = 0.03584583024378447 * x - 0.07617238926804182 * y + 0.9568845240076872 * z;
  return [gamma(lr), gamma(lg), gamma(lb)];
}

// Display P3 to XYZ-D65
export function p3ToXyz65(r: number, g: number, b: number): [number, number, number] {
  const lr = linearize(r);
  const lg = linearize(g);
  const lb = linearize(b);
  return [
    0.4865709486482162 * lr + 0.26566769316909306 * lg + 0.1982172852343625 * lb,
    0.2289745640697488 * lr + 0.6917385218365064 * lg + 0.079286914093745 * lb,
    0.0 * lr + 0.04511338185890264 * lg + 1.0439443689009760 * lb,
  ];
}

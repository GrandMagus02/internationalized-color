// D50 white point
const Xn = 0.3457 / 0.3585;
const Yn = 1;
const Zn = (1 - 0.3457 - 0.3585) / 0.3585;

const epsilon = 216 / 24389;
const kappa = 24389 / 27;

function f(t: number): number {
  return t > epsilon ? Math.cbrt(t) : (kappa * t + 16) / 116;
}

function fInv(t: number): number {
  return t > 6 / 29 ? t * t * t : (116 * t - 16) / kappa;
}

export function xyz50ToLab(x: number, y: number, z: number): [number, number, number] {
  const fx = f(x / Xn);
  const fy = f(y / Yn);
  const fz = f(z / Zn);
  return [
    116 * fy - 16,
    500 * (fx - fy),
    200 * (fy - fz),
  ];
}

export function labToXyz50(L: number, a: number, b: number): [number, number, number] {
  const fy = (L + 16) / 116;
  const fx = a / 500 + fy;
  const fz = fy - b / 200;
  return [
    Xn * fInv(fx),
    Yn * fInv(fy),
    Zn * fInv(fz),
  ];
}

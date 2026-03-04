// Adobe RGB (1998) / A98-RGB

function linearize(c: number): number {
  const sign = c < 0 ? -1 : 1;
  return sign * Math.pow(Math.abs(c), 563 / 256);
}

function gamma(c: number): number {
  const sign = c < 0 ? -1 : 1;
  return sign * Math.pow(Math.abs(c), 256 / 563);
}

export function xyz65ToA98(x: number, y: number, z: number): [number, number, number] {
  const lr = 2.0415879038107327 * x - 0.5650069742788597 * y - 0.34473135077832956 * z;
  const lg = -0.9692436362808796 * x + 1.8759675015077202 * y + 0.04155505740717559 * z;
  const lb = 0.013444280632031142 * x - 0.11836239223101838 * y + 1.0151749943912054 * z;
  return [gamma(lr), gamma(lg), gamma(lb)];
}

export function a98ToXyz65(r: number, g: number, b: number): [number, number, number] {
  const lr = linearize(r);
  const lg = linearize(g);
  const lb = linearize(b);
  return [
    0.5766690429101305 * lr + 0.1855582379065463 * lg + 0.1882286462349947 * lb,
    0.29734497525053605 * lr + 0.6273635662554661 * lg + 0.07529145849399788 * lb,
    0.02703136138641234 * lr + 0.07068885253582723 * lg + 0.9913375368376388 * lb,
  ];
}

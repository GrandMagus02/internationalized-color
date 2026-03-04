// ProPhoto RGB (ROMM RGB) — uses D50 white point

const Et = 1 / 512;
const Et16 = 16 * Et;

function linearize(c: number): number {
  return c <= Et16 ? c / 16 : Math.pow(c, 1.8);
}

function gamma(c: number): number {
  return c >= Et ? Math.pow(c, 1 / 1.8) : 16 * c;
}

// XYZ-D50 to ProPhoto RGB
export function xyz50ToProphoto(x: number, y: number, z: number): [number, number, number] {
  const lr = 1.3457989731028281 * x - 0.25558010007997534 * y - 0.05110628506753401 * z;
  const lg = -0.5446224939028347 * x + 1.5082327413132781 * y + 0.02053603239147973 * z;
  const lb = 0.0 * x + 0.0 * y + 1.2119675456389454 * z;
  return [gamma(lr), gamma(lg), gamma(lb)];
}

// ProPhoto RGB to XYZ-D50
export function prophotoToXyz50(r: number, g: number, b: number): [number, number, number] {
  const lr = linearize(r);
  const lg = linearize(g);
  const lb = linearize(b);
  return [
    0.7977604896723027 * lr + 0.13518583717574031 * lg + 0.0313493495815248 * lb,
    0.2880711282292934 * lr + 0.7118432178101014 * lg + 0.00008565396060525902 * lb,
    0.0 * lr + 0.0 * lg + 0.8251046025104602 * lb,
  ];
}

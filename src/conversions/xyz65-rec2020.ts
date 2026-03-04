// Rec. 2020

const alpha = 1.09929682680944;
const beta = 0.018053968510807;

function linearize(c: number): number {
  const abs = Math.abs(c);
  if (abs < beta * 4.5) {
    return c / 4.5;
  }
  const sign = c < 0 ? -1 : 1;
  return sign * Math.pow((abs + alpha - 1) / alpha, 1 / 0.45);
}

function gamma(c: number): number {
  const abs = Math.abs(c);
  if (abs >= beta) {
    const sign = c < 0 ? -1 : 1;
    return sign * (alpha * Math.pow(abs, 0.45) - (alpha - 1));
  }
  return 4.5 * c;
}

export function xyz65ToRec2020(x: number, y: number, z: number): [number, number, number] {
  const lr = 1.7166511879712674 * x - 0.35567078377639233 * y - 0.25336628137365974 * z;
  const lg = -0.666684351832489 * x + 1.616481236634939 * y + 0.0157685458139402 * z;
  const lb = 0.017639857445310783 * x - 0.042770613257808524 * y + 0.9421031212354738 * z;
  return [gamma(lr), gamma(lg), gamma(lb)];
}

export function rec2020ToXyz65(r: number, g: number, b: number): [number, number, number] {
  const lr = linearize(r);
  const lg = linearize(g);
  const lb = linearize(b);
  return [
    0.6369580483012914 * lr + 0.14461690358620832 * lg + 0.1688809751641721 * lb,
    0.2627002120112671 * lr + 0.6779980715188708 * lg + 0.05930171646986196 * lb,
    0.0 * lr + 0.028072693049087428 * lg + 1.0609850577107909 * lb,
  ];
}

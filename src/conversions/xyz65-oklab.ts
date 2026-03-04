// Ottosson's OkLab matrices
// XYZ-D65 → LMS (M1)
// LMS^(1/3) → Lab (M2)

export function xyz65ToOklab(x: number, y: number, z: number): [number, number, number] {
  // M1: XYZ to LMS
  let l = 0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z;
  let m = 0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z;
  let s = 0.0482003018 * x + 0.2643662691 * y + 0.6338517070 * z;

  // Cube root
  l = Math.cbrt(l);
  m = Math.cbrt(m);
  s = Math.cbrt(s);

  // M2: LMS' to Lab
  return [
    0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s,
  ];
}

export function oklabToXyz65(L: number, a: number, b: number): [number, number, number] {
  // Inverse M2: Lab to LMS'
  let l = L + 0.3963377774 * a + 0.2158037573 * b;
  let m = L - 0.1055613458 * a - 0.0638541728 * b;
  let s = L - 0.0894841775 * a - 1.2914855480 * b;

  // Cube
  l = l * l * l;
  m = m * m * m;
  s = s * s * s;

  // Inverse M1: LMS to XYZ
  return [
    1.2270138511035211 * l - 0.5577999806518222 * m + 0.2812561489664678 * s,
    -0.0405801784232806 * l + 1.1122568696168302 * m - 0.0716766786656012 * s,
    -0.0763812845057069 * l - 0.4214819784180127 * m + 1.5861632204407947 * s,
  ];
}

// Bradford chromatic adaptation: D65 → D50
export function xyz65ToXyz50(x: number, y: number, z: number): [number, number, number] {
  return [
    1.0479298208405488 * x + 0.022946793341019088 * y - 0.05019222954313557 * z,
    0.029627815688159344 * x + 0.990434484573249 * y - 0.01707382502938514 * z,
    -0.009243058152591178 * x + 0.015055144896577895 * y + 0.7518742899580008 * z,
  ];
}

// Bradford chromatic adaptation: D50 → D65
export function xyz50ToXyz65(x: number, y: number, z: number): [number, number, number] {
  return [
    0.9554734527042182 * x - 0.023098536874261423 * y + 0.0632593086610217 * z,
    -0.028369706963208136 * x + 1.0099954580106629 * y + 0.021041398966943008 * z,
    0.012314001688319899 * x - 0.020507696433477912 * y + 1.3303659366080753 * z,
  ];
}

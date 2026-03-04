// sRGB (D65) to XYZ-D65 matrix (from CSS Color 4 spec)
export function lrgbToXyz65(r: number, g: number, b: number): [number, number, number] {
  return [
    0.4123907992659595 * r + 0.357584339383878 * g + 0.1804807884018343 * b,
    0.21263900587151027 * r + 0.715168678767756 * g + 0.07219231536073371 * b,
    0.01933081871559182 * r + 0.11919477979462598 * g + 0.9505321522496607 * b,
  ];
}

// XYZ-D65 to linear sRGB matrix (inverse of above)
export function xyz65ToLrgb(x: number, y: number, z: number): [number, number, number] {
  return [
    3.2409699419045226 * x - 1.5373831775700939 * y - 0.4986107602930034 * z,
    -0.9692436362808796 * x + 1.8759675015077202 * y + 0.04155505740717559 * z,
    0.05563007969699366 * x - 0.20397696064091520 * y + 1.0569715142428786 * z,
  ];
}

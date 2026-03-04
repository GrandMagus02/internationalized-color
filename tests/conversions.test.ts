import { test, expect, describe } from 'bun:test';
import {
  Color,
  RGBColor, HSLColor, HSVColor, HWBColor,
  OklabColor, OklchColor, LabColor, LchColor,
  P3Color, A98Color, ProphotoColor, Rec2020Color,
  XYZ50Color, XYZ65Color, LRGBColor,
  toRgb, toHsl, toHsv, toHwb,
  toOklab, toOklch, toLab, toLch,
  toP3, toA98, toProphoto, toRec2020,
  toXyz50, toXyz65, toLrgb,
} from '../index.ts';
import { toHex } from '../src/convert/to-hex.ts';
import type { ColorMode } from '../src/types.ts';

const allModes: ColorMode[] = [
  'rgb', 'hsl', 'hsv', 'hwb', 'oklab', 'oklch',
  'lab', 'lch', 'p3', 'a98', 'prophoto', 'rec2020',
  'xyz50', 'xyz65', 'lrgb',
];

describe('Round-trip conversions', () => {
  const testColors = [
    { hex: '#ff0000', name: 'red' },
    { hex: '#00ff00', name: 'green' },
    { hex: '#0000ff', name: 'blue' },
    { hex: '#ffffff', name: 'white' },
    { hex: '#000000', name: 'black' },
    { hex: '#808080', name: 'gray' },
    { hex: '#e74c3c', name: 'coral red' },
    { hex: '#3498db', name: 'steel blue' },
    { hex: '#f39c12', name: 'orange' },
  ];

  for (const { hex, name } of testColors) {
    for (const mode of allModes) {
      if (mode === 'rgb') continue; // trivial round-trip

      test(`${name} (${hex}) → ${mode} → rgb`, () => {
        const original = Color.hex(hex)!;
        const converted = original.to(mode);
        expect(converted).toBeDefined();
        expect(converted!.mode).toBe(mode);

        const backToRgb = converted!.to('rgb');
        expect(backToRgb).toBeDefined();

        // Allow slightly less precision for multi-hop conversions
        const precision = 2;
        expect(backToRgb!.get('r')).toBeCloseTo(original.get('r')!, precision);
        expect(backToRgb!.get('g')).toBeCloseTo(original.get('g')!, precision);
        expect(backToRgb!.get('b')).toBeCloseTo(original.get('b')!, precision);
      });
    }
  }
});

describe('Edge cases', () => {
  test('black converts correctly to all spaces', () => {
    const black = Color.hex('#000000')!;
    for (const mode of allModes) {
      const c = black.to(mode);
      expect(c).toBeDefined();
      const hex = c!.toHex();
      expect(hex).toBe('#000000');
    }
  });

  test('white converts correctly to all spaces', () => {
    const white = Color.hex('#ffffff')!;
    for (const mode of allModes) {
      const c = white.to(mode);
      expect(c).toBeDefined();
      const hex = c!.toHex();
      expect(hex).toBe('#ffffff');
    }
  });

  test('pure hues maintain identity through OkLab', () => {
    for (const hex of ['#ff0000', '#00ff00', '#0000ff']) {
      const original = Color.hex(hex)!;
      const oklab = original.toOklab()!;
      const back = oklab.toRgb()!;
      expect(back.get('r')).toBeCloseTo(original.get('r')!, 2);
      expect(back.get('g')).toBeCloseTo(original.get('g')!, 2);
      expect(back.get('b')).toBeCloseTo(original.get('b')!, 2);
    }
  });

  test('deltaE between same color is near zero', () => {
    const c = Color.hex('#3498db')!;
    expect(c.deltaE(c)).toBeCloseTo(0, 10);
  });

  test('deltaE is symmetric', () => {
    const a = Color.hex('#ff0000')!;
    const b = Color.hex('#0000ff')!;
    expect(a.deltaE(b)).toBeCloseTo(b.deltaE(a), 10);
  });
});

describe('Parse/format round-trip', () => {
  test('hex round-trip', () => {
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#3498db', '#e74c3c'];
    for (const hex of colors) {
      const c = Color.parse(hex)!;
      expect(c.toHex()).toBe(hex);
    }
  });

  test('oklch parse and format', () => {
    const c = Color.parse('oklch(0.7 0.15 180)')!;
    expect(c.mode).toBe('oklch');
    expect(c.get('l')).toBeCloseTo(0.7, 2);
    expect(c.get('c')).toBeCloseTo(0.15, 2);
    expect(c.get('h')).toBeCloseTo(180, 2);
  });
});

describe('Out-of-gamut handling', () => {
  test('P3 red gamut-maps to sRGB', () => {
    const p3Red = Color.create('p3', { r: 1, g: 0, b: 0 });
    const hex = p3Red.toHex();
    expect(hex).toBeDefined();
    expect(hex!.startsWith('#')).toBe(true);
    // P3 red is slightly beyond sRGB, should still produce a valid hex
    expect(hex!.length).toBe(7);
  });
});

describe('Typed conversion methods', () => {
  const red = () => Color.parse('#ff0000')!;

  test('toRgb() returns RGBColor', () => {
    const c = red().toOklch().toRgb();
    expect(c).toBeInstanceOf(RGBColor);
    expect((c as RGBColor).r).toBeCloseTo(1, 2);
  });

  test('toHsl() returns HSLColor', () => {
    expect(red().toHsl()).toBeInstanceOf(HSLColor);
  });

  test('toHsv() returns HSVColor', () => {
    expect(red().toHsv()).toBeInstanceOf(HSVColor);
  });

  test('toHwb() returns HWBColor', () => {
    expect(red().toHwb()).toBeInstanceOf(HWBColor);
  });

  test('toOklab() returns OklabColor', () => {
    expect(red().toOklab()).toBeInstanceOf(OklabColor);
  });

  test('toOklch() returns OklchColor', () => {
    expect(red().toOklch()).toBeInstanceOf(OklchColor);
  });

  test('toLab() returns LabColor', () => {
    expect(red().toLab()).toBeInstanceOf(LabColor);
  });

  test('toLch() returns LchColor', () => {
    expect(red().toLch()).toBeInstanceOf(LchColor);
  });

  test('toP3() returns P3Color', () => {
    expect(red().toP3()).toBeInstanceOf(P3Color);
  });

  test('toA98() returns A98Color', () => {
    expect(red().toA98()).toBeInstanceOf(A98Color);
  });

  test('toProphoto() returns ProphotoColor', () => {
    expect(red().toProphoto()).toBeInstanceOf(ProphotoColor);
  });

  test('toRec2020() returns Rec2020Color', () => {
    expect(red().toRec2020()).toBeInstanceOf(Rec2020Color);
  });

  test('toXyz50() returns XYZ50Color', () => {
    expect(red().toXyz50()).toBeInstanceOf(XYZ50Color);
  });

  test('toXyz65() returns XYZ65Color', () => {
    expect(red().toXyz65()).toBeInstanceOf(XYZ65Color);
  });

  test('toLrgb() returns LRGBColor', () => {
    expect(red().toLrgb()).toBeInstanceOf(LRGBColor);
  });

  test('chained conversions maintain typed returns', () => {
    const hsv = red().toHsv();
    expect(hsv).toBeInstanceOf(HSVColor);
    const oklab = hsv.toOklab();
    expect(oklab).toBeInstanceOf(OklabColor);
    const rgb = oklab.toRgb();
    expect(rgb).toBeInstanceOf(RGBColor);
    expect((rgb as RGBColor).r).toBeCloseTo(1, 2);
  });

  test('self-conversion clones', () => {
    const rgb = new RGBColor(1, 0, 0);
    const rgb2 = rgb.toRgb();
    expect(rgb2).toBeInstanceOf(RGBColor);
    expect(rgb2).not.toBe(rgb);
  });

  test('toHex() returns string', () => {
    expect(red().toHex()).toBe('#ff0000');
  });
});

describe('Standalone converter functions', () => {
  const red = () => new RGBColor(1, 0, 0);
  const oklch = () => new OklchColor(0.7, 0.15, 180);

  test('toRgb() converts and returns RGBColor', () => {
    const c = toRgb(oklch());
    expect(c).toBeInstanceOf(RGBColor);
  });

  test('toRgb() returns same instance for RGBColor input', () => {
    const r = red();
    expect(toRgb(r)).toBe(r);
  });

  test('toHsl() returns HSLColor', () => {
    expect(toHsl(red())).toBeInstanceOf(HSLColor);
  });

  test('toHsv() returns HSVColor', () => {
    expect(toHsv(red())).toBeInstanceOf(HSVColor);
  });

  test('toHwb() returns HWBColor', () => {
    expect(toHwb(red())).toBeInstanceOf(HWBColor);
  });

  test('toOklab() returns OklabColor', () => {
    expect(toOklab(red())).toBeInstanceOf(OklabColor);
  });

  test('toOklch() returns OklchColor', () => {
    expect(toOklch(red())).toBeInstanceOf(OklchColor);
  });

  test('toLab() returns LabColor', () => {
    expect(toLab(red())).toBeInstanceOf(LabColor);
  });

  test('toLch() returns LchColor', () => {
    expect(toLch(red())).toBeInstanceOf(LchColor);
  });

  test('toP3() returns P3Color', () => {
    expect(toP3(red())).toBeInstanceOf(P3Color);
  });

  test('toA98() returns A98Color', () => {
    expect(toA98(red())).toBeInstanceOf(A98Color);
  });

  test('toProphoto() returns ProphotoColor', () => {
    expect(toProphoto(red())).toBeInstanceOf(ProphotoColor);
  });

  test('toRec2020() returns Rec2020Color', () => {
    expect(toRec2020(red())).toBeInstanceOf(Rec2020Color);
  });

  test('toXyz50() returns XYZ50Color', () => {
    expect(toXyz50(red())).toBeInstanceOf(XYZ50Color);
  });

  test('toXyz65() returns XYZ65Color', () => {
    expect(toXyz65(red())).toBeInstanceOf(XYZ65Color);
  });

  test('toLrgb() returns LRGBColor', () => {
    expect(toLrgb(red())).toBeInstanceOf(LRGBColor);
  });

  test('toHex() returns hex string', () => {
    expect(toHex(red())).toBe('#ff0000');
  });

  test('toHex() gamut maps out-of-sRGB', () => {
    const hex = toHex(new P3Color(1, 0, 0));
    expect(hex.startsWith('#')).toBe(true);
  });

  test('preserves alpha', () => {
    const c = new RGBColor(1, 0, 0, 0.5);
    expect(toOklab(c).alpha).toBe(0.5);
    expect(toRgb(toOklab(c)).alpha).toBe(0.5);
  });

  test('round-trip preserves values', () => {
    const orig = new RGBColor(0.8, 0.4, 0.2);
    const rt = toRgb(toOklch(orig));
    expect(rt.r).toBeCloseTo(0.8, 3);
    expect(rt.g).toBeCloseTo(0.4, 3);
    expect(rt.b).toBeCloseTo(0.2, 3);
  });
});

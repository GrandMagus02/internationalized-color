import { test, expect, describe } from 'bun:test';
import { Color, RGBColor, HSLColor, HSVColor, HWBColor, OklabColor, OklchColor, parseColor, createColor, hexColor, convertColor, toHex, toCSS, mixColors, lighten, darken, nameColor, translateColor, lookupColor, useLocale, getChannelLabels } from '../index.ts';

describe('Color.parse', () => {
  test('parses hex strings', () => {
    const c = Color.parse('#ff0000')!;
    expect(c.mode).toBe('rgb');
    expect(c.get('r')).toBeCloseTo(1, 5);
    expect(c.get('g')).toBeCloseTo(0, 5);
    expect(c.get('b')).toBeCloseTo(0, 5);
  });

  test('parses short hex', () => {
    const c = Color.parse('#f00')!;
    expect(c.get('r')).toBeCloseTo(1, 5);
  });

  test('parses rgb() function', () => {
    const c = Color.parse('rgb(255, 128, 0)')!;
    expect(c.mode).toBe('rgb');
    expect(c.get('r')).toBeCloseTo(1, 2);
    expect(c.get('g')).toBeCloseTo(0.502, 2);
    expect(c.get('b')).toBeCloseTo(0, 2);
  });

  test('parses hsl() function', () => {
    const c = Color.parse('hsl(120, 100%, 50%)')!;
    expect(c.mode).toBe('hsl');
    expect(c.get('h')).toBeCloseTo(120, 2);
  });

  test('parses oklch()', () => {
    const c = Color.parse('oklch(70% 0.15 180)')!;
    expect(c.mode).toBe('oklch');
    expect(c.get('l')).toBeCloseTo(0.7, 2);
    expect(c.get('c')).toBeCloseTo(0.15, 2);
    expect(c.get('h')).toBeCloseTo(180, 2);
  });

  test('parses named CSS colors', () => {
    const c = Color.parse('red')!;
    expect(c.get('r')).toBeCloseTo(1, 5);
    expect(c.get('g')).toBeCloseTo(0, 5);
    expect(c.get('b')).toBeCloseTo(0, 5);
  });

  test('returns undefined on invalid input', () => {
    expect(Color.parse('notacolor')).toBeUndefined();
  });
});

describe('Color.parse (hex)', () => {
  test('creates from hex string', () => {
    const c = Color.parse('#3498db')!;
    expect(c.mode).toBe('rgb');
    expect(c.get('r')).toBeCloseTo(0.204, 2);
  });
});

describe('Color.create', () => {
  test('creates from mode + channels', () => {
    const c = Color.create('oklch', { l: 0.7, c: 0.15, h: 180 });
    expect(c.mode).toBe('oklch');
    expect(c.get('l')).toBeCloseTo(0.7, 5);
    expect(c.get('c')).toBeCloseTo(0.15, 5);
    expect(c.get('h')).toBeCloseTo(180, 5);
  });

  test('creates with alpha', () => {
    const c = Color.create('rgb', { r: 1, g: 0, b: 0 }, 0.5);
    expect(c.alpha).toBe(0.5);
  });

  test('alpha is undefined when not specified', () => {
    const c = Color.create('rgb', { r: 1, g: 0, b: 0 });
    expect(c.alpha).toBeUndefined();
  });
});

describe('Immutability', () => {
  test('set() returns a new instance', () => {
    const a = Color.parse('#ff0000')!;
    const b = a.to('oklch')!.set({ l: 0.4 });
    expect(a).not.toBe(b);
  });

  test('setAlpha() returns a new instance', () => {
    const a = Color.parse('#ff0000')!;
    const b = a.setAlpha(0.5);
    expect(a).not.toBe(b);
    expect(a.alpha).toBeUndefined();
    expect(b.alpha).toBe(0.5);
  });

  test('to() returns a new instance', () => {
    const a = Color.parse('#ff0000')!;
    const b = a.to('oklch')!;
    expect(a).not.toBe(b);
    expect(a.mode).toBe('rgb');
    expect(b.mode).toBe('oklch');
  });

  test('underlying object cannot be modified', () => {
    const c = Color.parse('#ff0000')!;
    const obj = c.toObject();
    (obj as any).r = 0;
    expect(c.get('r')).toBeCloseTo(1, 5);
  });
});

describe('Conversion', () => {
  test('RGB to OkLab', () => {
    const c = Color.parse('#ff0000')!.to('oklab')!;
    expect(c.mode).toBe('oklab');
    expect(c.get('l')).toBeCloseTo(0.628, 2);
  });

  test('RGB to OkLCH', () => {
    const c = Color.parse('#ff0000')!.to('oklch')!;
    expect(c.mode).toBe('oklch');
    expect(c.get('l')).toBeCloseTo(0.628, 2);
    expect(c.get('c')).toBeGreaterThan(0);
    expect(c.get('h')).toBeGreaterThan(0);
  });

  test('toOklab() shorthand', () => {
    const c = (Color.parse('#3498db')! as RGBColor).toOklab()!;
    expect(c.mode).toBe('oklab');
  });

  test('round-trip conversion preserves color', () => {
    const original = Color.parse('#e74c3c')!;
    const roundTrip = original.to('oklch')!.to('rgb')!;
    expect(roundTrip.get('r')).toBeCloseTo(original.get('r')!, 3);
    expect(roundTrip.get('g')).toBeCloseTo(original.get('g')!, 3);
    expect(roundTrip.get('b')).toBeCloseTo(original.get('b')!, 3);
  });

  test('RGB to HSV', () => {
    const c = Color.parse('#ff0000')!.to('hsv')!;
    expect(c.mode).toBe('hsv');
    expect(c.get('h')).toBeCloseTo(0, 2);
    expect(c.get('s')).toBeCloseTo(1, 2);
    expect(c.get('v')).toBeCloseTo(1, 2);
  });

  test('HSV round-trip preserves color', () => {
    const original = Color.parse('#e74c3c')!;
    const roundTrip = original.to('hsv')!.to('rgb')!;
    expect(roundTrip.get('r')).toBeCloseTo(original.get('r')!, 3);
    expect(roundTrip.get('g')).toBeCloseTo(original.get('g')!, 3);
    expect(roundTrip.get('b')).toBeCloseTo(original.get('b')!, 3);
  });

  test('returns undefined for unregistered mode', () => {
    expect(Color.parse('#ff0000')!.to('jab' as any)).toBeUndefined();
  });
});

describe('Serialization', () => {
  test('toHex() returns hex string', () => {
    const c = Color.parse('#e74c3c')!;
    expect(c.toHex()).toBe('#e74c3c');
  });

  test('toString("hex") returns hex', () => {
    const c = Color.parse('#3498db')!;
    expect(c.toString('hex')).toBe('#3498db');
  });

  test('toString() returns CSS string', () => {
    const c = Color.parse('#ff0000')!;
    const css = c.toString()!;
    expect(typeof css).toBe('string');
    expect(css.length).toBeGreaterThan(0);
  });

  test('toJSON() returns structured data', () => {
    const c = Color.create('rgb', { r: 1, g: 0.5, b: 0 }, 0.8);
    const json = c.toJSON();
    expect(json.mode).toBe('rgb');
    expect(json.channels.r).toBe(1);
    expect(json.channels.g).toBe(0.5);
    expect(json.channels.b).toBe(0);
    expect(json.alpha).toBe(0.8);
  });

  test('toJSON() omits alpha when undefined', () => {
    const c = Color.create('rgb', { r: 1, g: 0, b: 0 });
    const json = c.toJSON();
    expect(json.alpha).toBeUndefined();
  });
});

describe('deltaE and equals', () => {
  test('same color has distance 0', () => {
    const a = Color.parse('#ff0000')!;
    const b = Color.parse('#ff0000')!;
    expect(a.deltaE(b)).toBeCloseTo(0, 5);
  });

  test('different colors have positive distance', () => {
    const a = Color.parse('#ff0000')!;
    const b = Color.parse('#0000ff')!;
    expect(a.deltaE(b)).toBeGreaterThan(0);
  });

  test('equals with tolerance', () => {
    const a = Color.parse('#ff0000')!;
    const b = Color.parse('#ff1100')!;
    expect(a.equals(b)).toBe(false);
    expect(a.equals(b, 0.05)).toBe(true);
  });

  test('equals exact match', () => {
    const a = Color.parse('#ff0000')!;
    const b = Color.parse('#ff0000')!;
    expect(a.equals(b)).toBe(true);
  });
});

describe('Channel access', () => {
  test('get() returns channel values', () => {
    const c = Color.create('oklch', { l: 0.7, c: 0.15, h: 180 });
    expect(c.get('l')).toBe(0.7);
    expect(c.get('c')).toBe(0.15);
    expect(c.get('h')).toBe(180);
  });

  test('get() returns undefined for non-existent channels', () => {
    const c = Color.create('rgb', { r: 1, g: 0, b: 0 });
    expect(c.get('h')).toBeUndefined();
  });

  test('get() returns default value when channel does not exist', () => {
    const c = Color.create('rgb', { r: 1, g: 0, b: 0 });
    expect(c.get('h', 0)).toBe(0);
    expect(c.get('h', -1)).toBe(-1);
  });

  test('get() returns actual value over default when channel exists', () => {
    const c = Color.create('oklch', { l: 0.7, c: 0.15, h: 180 });
    expect(c.get('l', 0)).toBe(0.7);
  });

  test('set() updates channels', () => {
    const c = Color.create('oklch', { l: 0.7, c: 0.15, h: 180 });
    const darker = c.set({ l: 0.4 });
    expect(darker.get('l')).toBe(0.4);
    expect(darker.get('c')).toBe(0.15);
    expect(darker.get('h')).toBe(180);
  });
});

describe('Channel introspection', () => {
  test('channels getter returns ChannelDescriptor array', () => {
    const c = Color.create('rgb', { r: 1, g: 0, b: 0 });
    expect(c.channels.map(ch => ch.key)).toEqual(['r', 'g', 'b']);
  });

  test('channels getter for oklch', () => {
    const c = Color.create('oklch', { l: 0.7, c: 0.15, h: 180 });
    expect(c.channels.map(ch => ch.key)).toEqual(['l', 'c', 'h']);
  });

  test('has() returns true for existing channels', () => {
    const c = Color.create('rgb', { r: 1, g: 0, b: 0 });
    expect(c.has('r')).toBe(true);
    expect(c.has('g')).toBe(true);
    expect(c.has('b')).toBe(true);
  });

  test('has() returns false for non-existent channels', () => {
    const c = Color.create('rgb', { r: 1, g: 0, b: 0 });
    expect(c.has('h')).toBe(false);
    expect(c.has('l')).toBe(false);
  });

  test('entries() returns channel-value pairs', () => {
    const c = Color.create('rgb', { r: 1, g: 0.5, b: 0 });
    const entries = c.entries();
    expect(entries).toEqual([
      ['r', 1],
      ['g', 0.5],
      ['b', 0],
    ]);
  });

  test('entries() excludes mode and alpha', () => {
    const c = Color.create('rgb', { r: 1, g: 0, b: 0 }, 0.5);
    const entries = c.entries();
    const keys = entries.map(([k]) => k);
    expect(keys).not.toContain('mode');
    expect(keys).not.toContain('alpha');
  });

  test('getRange() returns min/max for a channel', () => {
    const c = Color.create('oklch', { l: 0.7, c: 0.15, h: 180 });
    const range = c.getRange('l');
    expect(range).toBeDefined();
    expect(range![0]).toBe(0);
    expect(range![1]).toBe(1);
  });

  test('getRange() returns undefined for unknown channel', () => {
    const c = Color.create('rgb', { r: 1, g: 0, b: 0 });
    expect(c.getRange('z')).toBeUndefined();
  });
});

describe('toArray and toFloat32Array', () => {
  test('toArray() returns channel values', () => {
    const c = Color.create('rgb', { r: 1, g: 0.5, b: 0 });
    expect(c.toArray()).toEqual([1, 0.5, 0]);
  });

  test('toArray(true) includes alpha', () => {
    const c = Color.create('rgb', { r: 1, g: 0, b: 0 }, 0.5);
    expect(c.toArray(true)).toEqual([1, 0, 0, 0.5]);
  });

  test('toArray(true) without alpha returns 3 values', () => {
    const c = Color.create('rgb', { r: 1, g: 0, b: 0 });
    expect(c.toArray(true)).toEqual([1, 0, 0]);
  });

  test('toFloat32Array() returns Float32Array', () => {
    const c = Color.create('rgb', { r: 1, g: 0, b: 0 });
    const arr = c.toFloat32Array();
    expect(arr).toBeInstanceOf(Float32Array);
    expect(arr.length).toBe(3);
  });
});

describe('mix', () => {
  test('mixes two colors at 50% by default', () => {
    const red = Color.parse('#ff0000')!;
    const blue = Color.parse('#0000ff')!;
    const mixed = mixColors(red, blue)!;
    expect(mixed.mode).toBe('rgb');
    expect(mixed.get('r')!).toBeGreaterThan(0);
    expect(mixed.get('b')!).toBeGreaterThan(0);
  });

  test('mix at 0 returns the original color', () => {
    const mixed = mixColors('#ff0000', '#0000ff', 0)!;
    expect(mixed.get('r')).toBeCloseTo(1, 2);
    expect(mixed.get('b')).toBeCloseTo(0, 2);
  });

  test('mix at 1 returns the other color', () => {
    const mixed = mixColors('#ff0000', '#0000ff', 1)!;
    expect(mixed.get('r')).toBeCloseTo(0, 2);
    expect(mixed.get('b')).toBeCloseTo(1, 2);
  });

  test('mix accepts strings', () => {
    const mixed = mixColors('#ff0000', '#0000ff', 0.5)!;
    expect(mixed.get('r')!).toBeGreaterThan(0);
    expect(mixed.get('b')!).toBeGreaterThan(0);
  });

  test('mix returns result in first color mode', () => {
    const c = Color.parse('oklch(70% 0.15 180)')!;
    const mixed = mixColors(c, '#ff0000')!;
    expect(mixed.mode).toBe('oklch');
  });

  test('mix returns undefined for invalid string', () => {
    expect(mixColors('#ff0000', 'notacolor')).toBeUndefined();
  });
});

describe('lighten and darken', () => {
  test('lighten() increases lightness', () => {
    const c = Color.parse('#888888')!;
    const lighter = lighten(c)!;
    const origL = c.to('oklab')!.get('l')!;
    const newL = lighter.to('oklab')!.get('l')!;
    expect(newL).toBeGreaterThan(origL);
  });

  test('darken() decreases lightness', () => {
    const c = Color.parse('#888888')!;
    const darker = darken(c)!;
    const origL = c.to('oklab')!.get('l')!;
    const newL = darker.to('oklab')!.get('l')!;
    expect(newL).toBeLessThan(origL);
  });

  test('lighten() returns same mode as original', () => {
    expect(lighten('#ff0000')!.mode).toBe('rgb');
  });

  test('darken() returns same mode as original', () => {
    expect(darken('#ff0000')!.mode).toBe('rgb');
  });

  test('lighten() clamps to 1', () => {
    const lighter = lighten('#ffffff', 0.5)!;
    const l = lighter.to('oklab')!.get('l')!;
    expect(l).toBeLessThanOrEqual(1);
  });

  test('darken() clamps to 0', () => {
    const darker = darken('#000000', 0.5)!;
    const l = darker.to('oklab')!.get('l')!;
    expect(l).toBeGreaterThanOrEqual(0);
  });

  test('lighten() with custom amount', () => {
    const a = lighten('#888888', 0.05)!;
    const b = lighten('#888888', 0.2)!;
    const aL = a.to('oklab')!.get('l')!;
    const bL = b.to('oklab')!.get('l')!;
    expect(bL).toBeGreaterThan(aL);
  });

  test('lighten() on oklab color stays in oklab', () => {
    const c = Color.create('oklab', { l: 0.5, a: 0.1, b: -0.1 });
    const lighter = lighten(c, 0.1)!;
    expect(lighter.mode).toBe('oklab');
    expect(lighter.get('l')).toBeCloseTo(0.6, 5);
  });

  test('darken() on oklab color stays in oklab', () => {
    const c = Color.create('oklab', { l: 0.5, a: 0.1, b: -0.1 });
    const darker = darken(c, 0.1)!;
    expect(darker.mode).toBe('oklab');
    expect(darker.get('l')).toBeCloseTo(0.4, 5);
  });
});

describe('set() with mode option', () => {
  test('converts to target mode then sets channel', () => {
    const rgb = Color.parse('#ff0000')!;
    const result = rgb.set({ mode: 'oklch', h: 180 });
    expect(result.mode).toBe('oklch');
    expect(result.get('h')).toBe(180);
  });

  test('without mode, stays in current mode', () => {
    const c = Color.create('oklch', { l: 0.7, c: 0.15, h: 180 });
    const result = c.set({ l: 0.5 });
    expect(result.mode).toBe('oklch');
    expect(result.get('l')).toBe(0.5);
  });
});

describe('Semantic channel accessors', () => {
  test('getRed/setRed on RGB color', () => {
    const c = Color.parse('#ff0000')! as RGBColor;
    expect(c.getRed()).toBeCloseTo(1, 5);
    const modified = c.setRed(0.5);
    expect(modified.getRed()).toBeCloseTo(0.5, 5);
  });

  test('getGreen/setGreen', () => {
    const c = Color.parse('#00ff00')! as RGBColor;
    expect(c.getGreen()).toBeCloseTo(1, 5);
    const modified = c.setGreen(0.5);
    expect(modified.getGreen()).toBeCloseTo(0.5, 5);
  });

  test('getBlue/setBlue', () => {
    const c = Color.parse('#0000ff')! as RGBColor;
    expect(c.getBlue()).toBeCloseTo(1, 5);
    const modified = c.setBlue(0.5);
    expect(modified.getBlue()).toBeCloseTo(0.5, 5);
  });

  test('getRed on RGB subclass', () => {
    const c = (Color.create('oklch', { l: 0.7, c: 0.15, h: 180 }) as OklchColor).toRgb();
    expect(typeof c.getRed()).toBe('number');
  });

  test('getHue on HSL color', () => {
    const c = (Color.parse('#ff0000')! as RGBColor).toHsl();
    const h = c.getHue();
    expect(typeof h).toBe('number');
  });

  test('getHue on oklch color', () => {
    const c = (Color.parse('#ff0000')! as RGBColor).toOklch();
    const h = c.getHue();
    expect(typeof h).toBe('number');
  });

  test('setHue changes hue in HSL', () => {
    const c = (Color.parse('#ff0000')! as RGBColor).toHsl();
    const modified = c.setHue(120);
    expect(modified.mode).toBe('hsl');
    expect(modified.get('h')).toBeCloseTo(120, 2);
  });

  test('getSaturation/setSaturation', () => {
    const c = Color.parse('hsl(120, 100%, 50%)')! as HSLColor;
    expect(c.getSaturation()).toBeCloseTo(1, 2);
    const modified = c.setSaturation(0.5);
    expect(modified.getSaturation()).toBeCloseTo(0.5, 2);
  });

  test('getLightness/setLightness on HSL', () => {
    const c = Color.parse('hsl(120, 100%, 50%)')! as HSLColor;
    expect(c.getLightness()).toBeCloseTo(0.5, 2);
    const modified = c.setLightness(0.8);
    expect(modified.getLightness()).toBeCloseTo(0.8, 2);
  });

  test('getLightness on oklab color', () => {
    const c = (Color.parse('#ff0000')! as RGBColor).toOklab();
    const l = c.getLightness();
    expect(typeof l).toBe('number');
  });

  test('getValue/setValue (HSV)', () => {
    const c = (Color.parse('#ff0000')! as RGBColor).toHsv();
    const v = c.getValue();
    expect(typeof v).toBe('number');
    expect(v).toBeCloseTo(1, 2);
    const modified = c.setValue(0.5);
    expect(modified.getValue()).toBeCloseTo(0.5, 2);
  });

  test('getValue on HSV subclass', () => {
    const c = (Color.create('oklch', { l: 0.7, c: 0.15, h: 180 }) as OklchColor).toHsv();
    const v = c.getValue();
    expect(typeof v).toBe('number');
  });

  test('setValue returns HSV mode color', () => {
    const c = (Color.parse('#ff0000')! as RGBColor).toHsv();
    const modified = c.setValue(0.8);
    expect(modified.mode).toBe('hsv');
  });

  test('getChroma/setChroma on oklch', () => {
    const c = (Color.parse('#ff0000')! as RGBColor).toOklch();
    const chroma = c.getChroma();
    expect(typeof chroma).toBe('number');
    expect(chroma).toBeGreaterThan(0);
    const modified = c.setChroma(0.1);
    expect(modified.getChroma()).toBeCloseTo(0.1, 2);
  });

  test('getWhiteness/setWhiteness', () => {
    const c = (Color.parse('#ffffff')! as RGBColor).toHwb();
    const w = c.getWhiteness();
    expect(typeof w).toBe('number');
    const modified = c.setWhiteness(0.5);
    expect(modified.getWhiteness()).toBeCloseTo(0.5, 2);
  });

  test('getBlackness/setBlackness', () => {
    const c = (Color.parse('#000000')! as RGBColor).toHwb();
    const b = c.getBlackness();
    expect(typeof b).toBe('number');
    const modified = c.setBlackness(0.5);
    expect(modified.getBlackness()).toBeCloseTo(0.5, 2);
  });

  test('getAlpha/setAlpha', () => {
    const c = Color.parse('#ff0000')!;
    expect(c.getAlpha()).toBeUndefined();
    const withA = c.setAlpha(0.5);
    expect(withA.getAlpha()).toBe(0.5);
  });
});

describe('Conversion shorthands', () => {
  const red = () => Color.parse('#ff0000')! as RGBColor;

  test('toOklab()', () => {
    expect(red().toOklab().mode).toBe('oklab');
  });

  test('toOklch()', () => {
    expect(red().toOklch().mode).toBe('oklch');
  });

  test('toRgb()', () => {
    const c = red().toOklch();
    expect(c.toRgb().mode).toBe('rgb');
  });

  test('toHsl()', () => {
    expect(red().toHsl().mode).toBe('hsl');
  });

  test('toHsv()', () => {
    expect(red().toHsv().mode).toBe('hsv');
  });

  test('toHwb()', () => {
    expect(red().toHwb().mode).toBe('hwb');
  });

  test('toLab()', () => {
    expect(red().toLab().mode).toBe('lab');
  });

  test('toLch()', () => {
    expect(red().toLch().mode).toBe('lch');
  });

  test('toP3()', () => {
    expect(red().toP3().mode).toBe('p3');
  });

  test('toA98()', () => {
    expect(red().toA98().mode).toBe('a98');
  });

  test('toProphoto()', () => {
    expect(red().toProphoto().mode).toBe('prophoto');
  });

  test('toRec2020()', () => {
    expect(red().toRec2020().mode).toBe('rec2020');
  });

  test('toXyz50()', () => {
    expect(red().toXyz50().mode).toBe('xyz50');
  });

  test('toXyz65()', () => {
    expect(red().toXyz65().mode).toBe('xyz65');
  });

  test('toLrgb()', () => {
    expect(red().toLrgb().mode).toBe('lrgb');
  });
});

describe('toHex gamut mapping', () => {
  test('gamut maps out-of-sRGB colors', () => {
    const c = Color.create('p3', { r: 1, g: 0, b: 0 });
    const hex = c.toHex();
    expect(hex).toBeDefined();
    expect(hex!.startsWith('#')).toBe(true);
  });
});

describe('Utility functions', () => {
  test('parseColor parses hex', () => {
    const c = parseColor('#ff0000')! as RGBColor;
    expect(c).toBeDefined();
    expect(c.getRed()).toBeCloseTo(1, 5);
  });

  test('createColor creates a color', () => {
    const c = createColor('rgb', { r: 1, g: 0, b: 0 });
    expect(c.mode).toBe('rgb');
  });

  test('hexColor creates from hex', () => {
    const c = hexColor('#3498db');
    expect(c).toBeDefined();
  });

  test('convertColor converts string to mode', () => {
    const c = convertColor('#ff0000', 'oklch');
    expect(c).toBeDefined();
    expect(c!.mode).toBe('oklch');
  });

  test('toHex returns hex string', () => {
    expect(toHex('#ff0000')).toBe('#ff0000');
  });

  test('toCSS returns CSS string', () => {
    const css = toCSS('#ff0000');
    expect(typeof css).toBe('string');
  });

  test('mixColors mixes two strings', () => {
    const mixed = mixColors('#ff0000', '#0000ff');
    expect(mixed).toBeDefined();
  });

  test('lighten utility', () => {
    const c = lighten('#888888', 0.1);
    expect(c).toBeDefined();
  });

  test('darken utility', () => {
    const c = darken('#888888', 0.1);
    expect(c).toBeDefined();
  });
});

describe('Naming utility functions', () => {
  test('nameColor names a color', () => {
    const { en } = require('../src/locales/en.ts');
    useLocale(en);
    const result = nameColor('#ff0000', 'en');
    expect(result).not.toBeNull();
    expect(result!.name).toBeDefined();
  });

  test('nameColor returns null for invalid color string', () => {
    const result = nameColor('notacolor', 'en');
    expect(result).toBeNull();
  });

  test('nameColor accepts a Color instance', () => {
    const c = Color.parse('#ff0000')!;
    const result = nameColor(c, 'en');
    expect(result).not.toBeNull();
  });

  test('translateColor translates between locales', () => {
    const { es } = require('../src/locales/es.ts');
    useLocale(es);
    const result = translateColor('red', 'en', 'es');
    expect(result).not.toBeNull();
  });

  test('lookupColor looks up a color by name', () => {
    const result = lookupColor('red', 'en');
    expect(result).toBeDefined();
    expect(result!.mode).toBe('oklab');
  });
});

describe('channelLabels', () => {
  test('RGB color returns red/green/blue labels', () => {
    const c = Color.parse('#ff0000')!;
    expect(c.channelLabels()).toEqual(['red', 'green', 'blue']);
  });

  test('HSL color returns hue/saturation/lightness labels', () => {
    const c = Color.parse('hsl(120, 100%, 50%)')!;
    expect(c.channelLabels()).toEqual(['hue', 'saturation', 'lightness']);
  });

  test('OkLab color returns lightness/a/b labels', () => {
    const c = (Color.parse('#ff0000')! as RGBColor).toOklab();
    expect(c.channelLabels()).toEqual(['lightness', 'a', 'b']);
  });

  test('OkLCH color returns lightness/chroma/hue labels', () => {
    const c = (Color.parse('#ff0000')! as RGBColor).toOklch();
    expect(c.channelLabels()).toEqual(['lightness', 'chroma', 'hue']);
  });

  test('HWB color returns hue/whiteness/blackness labels', () => {
    const c = (Color.parse('#ff0000')! as RGBColor).toHwb();
    expect(c.channelLabels()).toEqual(['hue', 'whiteness', 'blackness']);
  });

  test('HSV color returns hue/saturation/value labels', () => {
    const c = (Color.parse('#ff0000')! as RGBColor).toHsv();
    expect(c.channelLabels()).toEqual(['hue', 'saturation', 'value']);
  });

  test('XYZ50 color returns x/y/z labels', () => {
    const c = (Color.parse('#ff0000')! as RGBColor).toXyz50();
    expect(c.channelLabels()).toEqual(['x', 'y', 'z']);
  });
});

describe('getChannelLabels', () => {
  const { es: esLocale } = require('../src/locales/es.ts');
  useLocale(esLocale);

  test('returns lowercase labels without locale', () => {
    const c = Color.parse('#ff0000')!;
    expect(getChannelLabels(c)).toEqual(['red', 'green', 'blue']);
  });

  test('returns English labels with en locale', () => {
    const c = Color.parse('#ff0000')!;
    expect(getChannelLabels(c, 'en')).toEqual(['Red', 'Green', 'Blue']);
  });

  test('returns Spanish labels with es locale', () => {
    const c = Color.parse('#ff0000')!;
    expect(getChannelLabels(c, 'es')).toEqual(['Rojo', 'Verde', 'Azul']);
  });

  test('returns Spanish HSL labels', () => {
    const c = Color.parse('hsl(120, 100%, 50%)')!;
    expect(getChannelLabels(c, 'es')).toEqual(['Tono', 'Saturación', 'Luminosidad']);
  });

  test('falls back to lowercase keys for unregistered locale', () => {
    const c = Color.parse('#ff0000')!;
    expect(getChannelLabels(c, 'xx')).toEqual(['red', 'green', 'blue']);
  });

  test('leaves a/b untranslated in OkLab', () => {
    const c = (Color.parse('#ff0000')! as RGBColor).toOklab();
    const labels = getChannelLabels(c, 'es');
    expect(labels).toEqual(['Luminosidad', 'a', 'b']);
  });
});

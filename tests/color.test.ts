import { test, expect, describe, beforeAll } from 'bun:test';
import { Color, parseColor, createColor, hexColor, convertColor, toHex, toCSS, mixColors, lighten, darken, nameColor, translateColor, lookupColor, useLocale } from '../index.ts';
import {
  modeRgb,
  modeOklab,
  modeOklch,
  modeHsl,
  modeHsv,
  modeHwb,
  modeLab,
  modeLch,
  modeP3,
  modeLrgb,
  modeA98,
  modeProphoto,
  modeRec2020,
  modeXyz50,
  modeXyz65,
  useMode,
} from 'culori/fn';

beforeAll(() => {
  const modes = [
    modeRgb,
    modeHsl,
    modeHsv,
    modeHwb,
    modeLab,
    modeLch,
    modeOklab,
    modeOklch,
    modeP3,
    modeLrgb,
    modeA98,
    modeProphoto,
    modeRec2020,
    modeXyz50,
    modeXyz65,
  ];

  for (const mode of modes) {
    useMode(mode as any);
  }
});

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

describe('Color.hex', () => {
  test('creates from hex string', () => {
    const c = Color.hex('#3498db')!;
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
    const a = Color.hex('#ff0000')!;
    const b = a.to('oklch')!.set({ l: 0.4 });
    expect(a).not.toBe(b);
  });

  test('setAlpha() returns a new instance', () => {
    const a = Color.hex('#ff0000')!;
    const b = a.setAlpha(0.5);
    expect(a).not.toBe(b);
    expect(a.alpha).toBeUndefined();
    expect(b.alpha).toBe(0.5);
  });

  test('to() returns a new instance', () => {
    const a = Color.hex('#ff0000')!;
    const b = a.to('oklch')!;
    expect(a).not.toBe(b);
    expect(a.mode).toBe('rgb');
    expect(b.mode).toBe('oklch');
  });

  test('underlying object cannot be modified', () => {
    const c = Color.hex('#ff0000')!;
    const obj = c.toObject();
    obj.r = 0; // Modify the returned copy
    // Original should be unchanged
    expect(c.get('r')).toBeCloseTo(1, 5);
  });
});

describe('Conversion', () => {
  test('RGB to OkLab', () => {
    const c = Color.hex('#ff0000')!.to('oklab')!;
    expect(c.mode).toBe('oklab');
    expect(c.get('l')).toBeCloseTo(0.628, 2);
  });

  test('RGB to OkLCH', () => {
    const c = Color.hex('#ff0000')!.to('oklch')!;
    expect(c.mode).toBe('oklch');
    expect(c.get('l')).toBeCloseTo(0.628, 2);
    expect(c.get('c')).toBeGreaterThan(0);
    expect(c.get('h')).toBeGreaterThan(0);
  });

  test('toOklab() shorthand', () => {
    const c = Color.hex('#3498db')!.toOklab()!;
    expect(c.mode).toBe('oklab');
  });

  test('round-trip conversion preserves color', () => {
    const original = Color.hex('#e74c3c')!;
    const roundTrip = original.to('oklch')!.to('rgb')!;
    expect(roundTrip.get('r')).toBeCloseTo(original.get('r')!, 4);
    expect(roundTrip.get('g')).toBeCloseTo(original.get('g')!, 4);
    expect(roundTrip.get('b')).toBeCloseTo(original.get('b')!, 4);
  });

  test('RGB to HSV', () => {
    const c = Color.hex('#ff0000')!.to('hsv')!;
    expect(c.mode).toBe('hsv');
    expect(c.get('h')).toBeCloseTo(0, 2);
    expect(c.get('s')).toBeCloseTo(1, 2);
    expect(c.get('v')).toBeCloseTo(1, 2);
  });

  test('HSV round-trip preserves color', () => {
    const original = Color.hex('#e74c3c')!;
    const roundTrip = original.to('hsv')!.to('rgb')!;
    expect(roundTrip.get('r')).toBeCloseTo(original.get('r')!, 4);
    expect(roundTrip.get('g')).toBeCloseTo(original.get('g')!, 4);
    expect(roundTrip.get('b')).toBeCloseTo(original.get('b')!, 4);
  });

  test('returns undefined for unregistered mode', () => {
    expect(Color.hex('#ff0000')!.to('jab')).toBeUndefined();
  });
});

describe('Serialization', () => {
  test('toHex() returns hex string', () => {
    const c = Color.hex('#e74c3c')!;
    expect(c.toHex()).toBe('#e74c3c');
  });

  test('toString("hex") returns hex', () => {
    const c = Color.hex('#3498db')!;
    expect(c.toString('hex')).toBe('#3498db');
  });

  test('toString() returns CSS string', () => {
    const c = Color.hex('#ff0000')!;
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
    const a = Color.hex('#ff0000')!;
    const b = Color.hex('#ff0000')!;
    expect(a.deltaE(b)).toBeCloseTo(0, 5);
  });

  test('different colors have positive distance', () => {
    const a = Color.hex('#ff0000')!;
    const b = Color.hex('#0000ff')!;
    expect(a.deltaE(b)).toBeGreaterThan(0);
  });

  test('equals with tolerance', () => {
    const a = Color.hex('#ff0000')!;
    const b = Color.hex('#ff1100')!;
    expect(a.equals(b)).toBe(false);
    expect(a.equals(b, 0.05)).toBe(true);
  });

  test('equals exact match', () => {
    const a = Color.hex('#ff0000')!;
    const b = Color.hex('#ff0000')!;
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
    expect(darker.get('c')).toBe(0.15); // unchanged
    expect(darker.get('h')).toBe(180); // unchanged
  });
});

describe('Channel introspection', () => {
  test('channels getter returns mode channels (excludes alpha)', () => {
    const c = Color.create('rgb', { r: 1, g: 0, b: 0 });
    expect(c.channels).toEqual(['r', 'g', 'b']);
  });

  test('channels getter for oklch', () => {
    const c = Color.create('oklch', { l: 0.7, c: 0.15, h: 180 });
    expect(c.channels).toEqual(['l', 'c', 'h']);
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

describe('Color.from', () => {
  test('accepts a string', () => {
    const c = Color.from('#ff0000')!;
    expect(c.mode).toBe('rgb');
    expect(c.get('r')).toBeCloseTo(1, 5);
  });

  test('accepts a Color instance (returns same instance)', () => {
    const original = Color.hex('#ff0000')!;
    const c = Color.from(original)!;
    expect(c).toBe(original);
  });

  test('accepts a culori color object', () => {
    const c = Color.from({ mode: 'rgb', r: 1, g: 0, b: 0 })!;
    expect(c.mode).toBe('rgb');
    expect(c.get('r')).toBeCloseTo(1, 5);
  });
});

describe('mix', () => {
  test('mixes two colors at 50% by default', () => {
    const red = Color.hex('#ff0000')!;
    const blue = Color.hex('#0000ff')!;
    const mixed = red.mix(blue)!;
    expect(mixed.mode).toBe('rgb');
    expect(mixed.get('r')!).toBeGreaterThan(0);
    expect(mixed.get('b')!).toBeGreaterThan(0);
  });

  test('mix at 0 returns the original color', () => {
    const red = Color.hex('#ff0000')!;
    const blue = Color.hex('#0000ff')!;
    const mixed = red.mix(blue, 0)!;
    expect(mixed.get('r')).toBeCloseTo(1, 2);
    expect(mixed.get('b')).toBeCloseTo(0, 2);
  });

  test('mix at 1 returns the other color', () => {
    const red = Color.hex('#ff0000')!;
    const blue = Color.hex('#0000ff')!;
    const mixed = red.mix(blue, 1)!;
    expect(mixed.get('r')).toBeCloseTo(0, 2);
    expect(mixed.get('b')).toBeCloseTo(1, 2);
  });

  test('mix accepts a string for the other color', () => {
    const red = Color.hex('#ff0000')!;
    const mixed = red.mix('#0000ff', 0.5)!;
    expect(mixed.get('r')!).toBeGreaterThan(0);
    expect(mixed.get('b')!).toBeGreaterThan(0);
  });

  test('mix returns result in original color mode', () => {
    const c = Color.parse('oklch(70% 0.15 180)')!;
    const mixed = c.mix('#ff0000')!;
    expect(mixed.mode).toBe('oklch');
  });

  test('mix returns undefined for invalid string', () => {
    const c = Color.hex('#ff0000')!;
    expect(c.mix('notacolor')).toBeUndefined();
  });
});

describe('lighten and darken', () => {
  test('lighten() increases lightness', () => {
    const c = Color.hex('#888888')!;
    const lighter = c.lighten();
    const origL = c.toOklab()!.get('l')!;
    const newL = lighter.toOklab()!.get('l')!;
    expect(newL).toBeGreaterThan(origL);
  });

  test('darken() decreases lightness', () => {
    const c = Color.hex('#888888')!;
    const darker = c.darken();
    const origL = c.toOklab()!.get('l')!;
    const newL = darker.toOklab()!.get('l')!;
    expect(newL).toBeLessThan(origL);
  });

  test('lighten() returns same mode as original', () => {
    const c = Color.hex('#ff0000')!;
    expect(c.lighten().mode).toBe('rgb');
  });

  test('darken() returns same mode as original', () => {
    const c = Color.hex('#ff0000')!;
    expect(c.darken().mode).toBe('rgb');
  });

  test('lighten() clamps to 1', () => {
    const c = Color.hex('#ffffff')!;
    const lighter = c.lighten(0.5);
    const l = lighter.toOklab()!.get('l')!;
    expect(l).toBeLessThanOrEqual(1);
  });

  test('darken() clamps to 0', () => {
    const c = Color.hex('#000000')!;
    const darker = c.darken(0.5);
    const l = darker.toOklab()!.get('l')!;
    expect(l).toBeGreaterThanOrEqual(0);
  });

  test('lighten() with custom amount', () => {
    const c = Color.hex('#888888')!;
    const a = c.lighten(0.05);
    const b = c.lighten(0.2);
    const aL = a.toOklab()!.get('l')!;
    const bL = b.toOklab()!.get('l')!;
    expect(bL).toBeGreaterThan(aL);
  });

  test('lighten() on oklab color stays in oklab', () => {
    const c = Color.create('oklab', { l: 0.5, a: 0.1, b: -0.1 });
    const lighter = c.lighten(0.1);
    expect(lighter.mode).toBe('oklab');
    expect(lighter.get('l')).toBeCloseTo(0.6, 5);
  });

  test('darken() on oklab color stays in oklab', () => {
    const c = Color.create('oklab', { l: 0.5, a: 0.1, b: -0.1 });
    const darker = c.darken(0.1);
    expect(darker.mode).toBe('oklab');
    expect(darker.get('l')).toBeCloseTo(0.4, 5);
  });
});

describe('set() with mode option', () => {
  test('converts to target mode then sets channel', () => {
    const rgb = Color.hex('#ff0000')!;
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
    const c = Color.hex('#ff0000')!;
    expect(c.getRed()).toBeCloseTo(1, 5);
    const modified = c.setRed(0.5);
    expect(modified.getRed()).toBeCloseTo(0.5, 5);
  });

  test('getGreen/setGreen', () => {
    const c = Color.hex('#00ff00')!;
    expect(c.getGreen()).toBeCloseTo(1, 5);
    const modified = c.setGreen(0.5);
    expect(modified.getGreen()).toBeCloseTo(0.5, 5);
  });

  test('getBlue/setBlue', () => {
    const c = Color.hex('#0000ff')!;
    expect(c.getBlue()).toBeCloseTo(1, 5);
    const modified = c.setBlue(0.5);
    expect(modified.getBlue()).toBeCloseTo(0.5, 5);
  });

  test('getRed converts non-RGB to RGB', () => {
    const c = Color.create('oklch', { l: 0.7, c: 0.15, h: 180 });
    const r = c.getRed();
    expect(typeof r).toBe('number');
  });

  test('getHue defaults to HSL', () => {
    const c = Color.hex('#ff0000')!;
    const h = c.getHue();
    expect(typeof h).toBe('number');
  });

  test('getHue with oklch mode', () => {
    const c = Color.hex('#ff0000')!;
    const h = c.getHue('oklch');
    expect(typeof h).toBe('number');
  });

  test('setHue changes hue in HSL', () => {
    const c = Color.hex('#ff0000')!;
    const modified = c.setHue(120);
    expect(modified.mode).toBe('hsl');
    expect(modified.get('h')).toBeCloseTo(120, 2);
  });

  test('getSaturation/setSaturation', () => {
    const c = Color.parse('hsl(120, 100%, 50%)')!;
    expect(c.getSaturation()).toBeCloseTo(1, 2);
    const modified = c.setSaturation(0.5);
    expect(modified.getSaturation()).toBeCloseTo(0.5, 2);
  });

  test('getLightness/setLightness', () => {
    const c = Color.parse('hsl(120, 100%, 50%)')!;
    expect(c.getLightness()).toBeCloseTo(0.5, 2);
    const modified = c.setLightness(0.8);
    expect(modified.getLightness()).toBeCloseTo(0.8, 2);
  });

  test('getLightness with oklab mode', () => {
    const c = Color.hex('#ff0000')!;
    const l = c.getLightness('oklab');
    expect(typeof l).toBe('number');
  });

  test('getValue/setValue (HSV)', () => {
    const c = Color.hex('#ff0000')!;
    const v = c.getValue();
    expect(typeof v).toBe('number');
    expect(v).toBeCloseTo(1, 2);
    const modified = c.setValue(0.5);
    expect(modified.getValue()).toBeCloseTo(0.5, 2);
  });

  test('getValue converts non-HSV to HSV', () => {
    const c = Color.create('oklch', { l: 0.7, c: 0.15, h: 180 });
    const v = c.getValue();
    expect(typeof v).toBe('number');
  });

  test('setValue returns HSV mode color', () => {
    const c = Color.hex('#ff0000')!;
    const modified = c.setValue(0.8);
    expect(modified.mode).toBe('hsv');
  });

  test('getChroma/setChroma defaults to oklch', () => {
    const c = Color.hex('#ff0000')!;
    const chroma = c.getChroma();
    expect(typeof chroma).toBe('number');
    expect(chroma!).toBeGreaterThan(0);
    const modified = c.setChroma(0.1);
    expect(modified.getChroma()).toBeCloseTo(0.1, 2);
  });

  test('getWhiteness/setWhiteness', () => {
    const c = Color.hex('#ffffff')!;
    const w = c.getWhiteness();
    expect(typeof w).toBe('number');
    const modified = c.setWhiteness(0.5);
    expect(modified.getWhiteness()).toBeCloseTo(0.5, 2);
  });

  test('getBlackness/setBlackness', () => {
    const c = Color.hex('#000000')!;
    const b = c.getBlackness();
    expect(typeof b).toBe('number');
    const modified = c.setBlackness(0.5);
    expect(modified.getBlackness()).toBeCloseTo(0.5, 2);
  });

  test('getAlpha/setAlpha', () => {
    const c = Color.hex('#ff0000')!;
    expect(c.getAlpha()).toBeUndefined();
    const withA = c.setAlpha(0.5);
    expect(withA.getAlpha()).toBe(0.5);
  });
});

describe('Conversion shorthands', () => {
  const red = () => Color.hex('#ff0000')!;

  test('toOklab()', () => {
    expect(red().toOklab()!.mode).toBe('oklab');
  });

  test('toOklch()', () => {
    expect(red().toOklch()!.mode).toBe('oklch');
  });

  test('toRgb()', () => {
    const c = red().toOklch()!;
    expect(c.toRgb()!.mode).toBe('rgb');
  });

  test('toHsl()', () => {
    expect(red().toHsl()!.mode).toBe('hsl');
  });

  test('toHsv()', () => {
    expect(red().toHsv()!.mode).toBe('hsv');
  });

  test('toHwb()', () => {
    expect(red().toHwb()!.mode).toBe('hwb');
  });

  test('toLab()', () => {
    expect(red().toLab()!.mode).toBe('lab');
  });

  test('toLch()', () => {
    expect(red().toLch()!.mode).toBe('lch');
  });

  test('toP3()', () => {
    expect(red().toP3()!.mode).toBe('p3');
  });

  test('toA98()', () => {
    expect(red().toA98()!.mode).toBe('a98');
  });

  test('toProphoto()', () => {
    expect(red().toProphoto()!.mode).toBe('prophoto');
  });

  test('toRec2020()', () => {
    expect(red().toRec2020()!.mode).toBe('rec2020');
  });

  test('toXyz50()', () => {
    expect(red().toXyz50()!.mode).toBe('xyz50');
  });

  test('toXyz65()', () => {
    expect(red().toXyz65()!.mode).toBe('xyz65');
  });

  test('toLrgb()', () => {
    expect(red().toLrgb()!.mode).toBe('lrgb');
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
    const c = parseColor('#ff0000');
    expect(c).toBeDefined();
    expect(c!.getRed()).toBeCloseTo(1, 5);
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
    const c = Color.hex('#ff0000')!;
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

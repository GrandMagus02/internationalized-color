import { test, expect, describe, beforeAll } from 'bun:test';
import { Color, setup } from '../index.ts';
import {
  modeRgb,
  modeOklab,
  modeOklch,
  modeHsl,
  modeHwb,
  modeLab,
  modeLch,
  modeP3,
  modeLrgb,
} from 'culori/fn';

beforeAll(() => {
  setup([modeRgb, modeOklab, modeOklch, modeHsl, modeHwb, modeLab, modeLch, modeP3, modeLrgb]);
});

describe('Color.parse', () => {
  test('parses hex strings', () => {
    const c = Color.parse('#ff0000');
    expect(c.mode).toBe('rgb');
    expect(c.get('r')).toBeCloseTo(1, 5);
    expect(c.get('g')).toBeCloseTo(0, 5);
    expect(c.get('b')).toBeCloseTo(0, 5);
  });

  test('parses short hex', () => {
    const c = Color.parse('#f00');
    expect(c.get('r')).toBeCloseTo(1, 5);
  });

  test('parses rgb() function', () => {
    const c = Color.parse('rgb(255, 128, 0)');
    expect(c.mode).toBe('rgb');
    expect(c.get('r')).toBeCloseTo(1, 2);
    expect(c.get('g')).toBeCloseTo(0.502, 2);
    expect(c.get('b')).toBeCloseTo(0, 2);
  });

  test('parses hsl() function', () => {
    const c = Color.parse('hsl(120, 100%, 50%)');
    expect(c.mode).toBe('hsl');
    expect(c.get('h')).toBeCloseTo(120, 2);
  });

  test('parses oklch()', () => {
    const c = Color.parse('oklch(70% 0.15 180)');
    expect(c.mode).toBe('oklch');
    expect(c.get('l')).toBeCloseTo(0.7, 2);
    expect(c.get('c')).toBeCloseTo(0.15, 2);
    expect(c.get('h')).toBeCloseTo(180, 2);
  });

  test('parses named CSS colors', () => {
    const c = Color.parse('red');
    expect(c.get('r')).toBeCloseTo(1, 5);
    expect(c.get('g')).toBeCloseTo(0, 5);
    expect(c.get('b')).toBeCloseTo(0, 5);
  });

  test('throws on invalid input', () => {
    expect(() => Color.parse('notacolor')).toThrow('Cannot parse color');
  });
});

describe('Color.hex', () => {
  test('creates from hex string', () => {
    const c = Color.hex('#3498db');
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
    const a = Color.hex('#ff0000');
    const b = a.to('oklch').set({ l: 0.4 });
    expect(a).not.toBe(b);
  });

  test('withAlpha() returns a new instance', () => {
    const a = Color.hex('#ff0000');
    const b = a.withAlpha(0.5);
    expect(a).not.toBe(b);
    expect(a.alpha).toBeUndefined();
    expect(b.alpha).toBe(0.5);
  });

  test('to() returns a new instance', () => {
    const a = Color.hex('#ff0000');
    const b = a.to('oklch');
    expect(a).not.toBe(b);
    expect(a.mode).toBe('rgb');
    expect(b.mode).toBe('oklch');
  });

  test('underlying object cannot be modified', () => {
    const c = Color.hex('#ff0000');
    const obj = c.toObject();
    obj.r = 0; // Modify the returned copy
    // Original should be unchanged
    expect(c.get('r')).toBeCloseTo(1, 5);
  });
});

describe('Conversion', () => {
  test('RGB to OkLab', () => {
    const c = Color.hex('#ff0000').to('oklab');
    expect(c.mode).toBe('oklab');
    expect(c.get('l')).toBeCloseTo(0.628, 2);
  });

  test('RGB to OkLCH', () => {
    const c = Color.hex('#ff0000').to('oklch');
    expect(c.mode).toBe('oklch');
    expect(c.get('l')).toBeCloseTo(0.628, 2);
    expect(c.get('c')).toBeGreaterThan(0);
    expect(c.get('h')).toBeGreaterThan(0);
  });

  test('toOklab() shorthand', () => {
    const c = Color.hex('#3498db').toOklab();
    expect(c.mode).toBe('oklab');
  });

  test('round-trip conversion preserves color', () => {
    const original = Color.hex('#e74c3c');
    const roundTrip = original.to('oklch').to('rgb');
    expect(roundTrip.get('r')).toBeCloseTo(original.get('r')!, 4);
    expect(roundTrip.get('g')).toBeCloseTo(original.get('g')!, 4);
    expect(roundTrip.get('b')).toBeCloseTo(original.get('b')!, 4);
  });

  test('throws for unregistered mode', () => {
    expect(() => Color.hex('#ff0000').to('jab')).toThrow();
  });
});

describe('Serialization', () => {
  test('toHex() returns hex string', () => {
    const c = Color.hex('#e74c3c');
    expect(c.toHex()).toBe('#e74c3c');
  });

  test('toString("hex") returns hex', () => {
    const c = Color.hex('#3498db');
    expect(c.toString('hex')).toBe('#3498db');
  });

  test('toString() returns CSS string', () => {
    const c = Color.hex('#ff0000');
    const css = c.toString();
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
    const a = Color.hex('#ff0000');
    const b = Color.hex('#ff0000');
    expect(a.deltaE(b)).toBeCloseTo(0, 5);
  });

  test('different colors have positive distance', () => {
    const a = Color.hex('#ff0000');
    const b = Color.hex('#0000ff');
    expect(a.deltaE(b)).toBeGreaterThan(0);
  });

  test('equals with tolerance', () => {
    const a = Color.hex('#ff0000');
    const b = Color.hex('#ff1100');
    expect(a.equals(b)).toBe(false);
    expect(a.equals(b, 0.05)).toBe(true);
  });

  test('equals exact match', () => {
    const a = Color.hex('#ff0000');
    const b = Color.hex('#ff0000');
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

  test('set() updates channels', () => {
    const c = Color.create('oklch', { l: 0.7, c: 0.15, h: 180 });
    const darker = c.set({ l: 0.4 });
    expect(darker.get('l')).toBe(0.4);
    expect(darker.get('c')).toBe(0.15); // unchanged
    expect(darker.get('h')).toBe(180); // unchanged
  });
});

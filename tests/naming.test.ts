import { test, expect, describe, beforeAll } from 'bun:test';
import { Color, ColorNamer } from '../index.ts';
import { en } from '../src/locales/en.ts';
import { modeRgb, modeOklab, modeOklch, modeHsl, modeLrgb, useMode } from 'culori/fn';

beforeAll(() => {
  const modes = [modeRgb, modeOklab, modeOklch, modeHsl, modeLrgb];
  
  for (const mode of modes) {
    useMode(mode as any);
  }
});

describe('ColorNamer', () => {
  const namer = new ColorNamer([en]);

  describe('name()', () => {
    test('names pure red as "red" (basic)', () => {
      const c = Color.hex('#ff0000');
      const result = namer.name(c, 'en', { level: 'basic' });
      expect(result).not.toBeNull();
      expect(result!.name).toBe('red');
      expect(result!.distance).toBeLessThan(0.01);
    });

    test('names pure blue as "blue" (basic)', () => {
      const c = Color.hex('#0000ff');
      const result = namer.name(c, 'en', { level: 'basic' });
      expect(result).not.toBeNull();
      expect(result!.name).toBe('blue');
    });

    test('names black correctly', () => {
      const c = Color.hex('#000000');
      const result = namer.name(c, 'en', { level: 'basic' });
      expect(result!.name).toBe('black');
    });

    test('names white correctly', () => {
      const c = Color.hex('#ffffff');
      const result = namer.name(c, 'en', { level: 'basic' });
      expect(result!.name).toBe('white');
    });

    test('names teal from extended level', () => {
      const c = Color.hex('#008080');
      const result = namer.name(c, 'en');
      expect(result).not.toBeNull();
      expect(result!.name).toBe('teal');
      expect(result!.distance).toBeLessThan(0.01);
    });

    test('returns null for unknown locale', () => {
      const c = Color.hex('#ff0000');
      const result = namer.name(c, 'xx');
      expect(result).toBeNull();
    });

    test('respects threshold option', () => {
      const c = Color.hex('#ff0000');
      // With very small threshold, should still find red
      const result = namer.name(c, 'en', { level: 'basic', threshold: 0.001 });
      expect(result).not.toBeNull();

      // With impossibly small threshold for a non-exact color
      const c2 = Color.create('oklab', { l: 0.5, a: 0.1, b: 0.1 });
      const result2 = namer.name(c2, 'en', { level: 'basic', threshold: 0.0001 });
      expect(result2).toBeNull();
    });
  });

  describe('nearest()', () => {
    test('returns multiple results sorted by distance', () => {
      const c = Color.hex('#ff4400');
      const results = namer.nearest(c, 'en', 5);
      expect(results.length).toBe(5);
      for (let i = 1; i < results.length; i++) {
        expect(results[i]!.distance).toBeGreaterThanOrEqual(results[i - 1]!.distance);
      }
    });

    test('returns empty array for unknown locale', () => {
      const c = Color.hex('#ff0000');
      const results = namer.nearest(c, 'xx');
      expect(results).toEqual([]);
    });
  });

  describe('lookup()', () => {
    test('finds a color by name', () => {
      const c = namer.lookup('red', 'en');
      expect(c).toBeDefined();
      expect(c!.mode).toBe('oklab');
    });

    test('case-insensitive lookup', () => {
      const c = namer.lookup('Red', 'en');
      expect(c).toBeDefined();
    });

    test('finds extended names', () => {
      const c = namer.lookup('coral', 'en');
      expect(c).toBeDefined();
    });

    test('returns undefined for unknown name', () => {
      const c = namer.lookup('nonexistent', 'en');
      expect(c).toBeUndefined();
    });

    test('returns undefined for unknown locale', () => {
      const c = namer.lookup('red', 'xx');
      expect(c).toBeUndefined();
    });
  });

  describe('names()', () => {
    test('lists all names for a locale', () => {
      const allNames = namer.names('en');
      expect(allNames.length).toBeGreaterThan(0);
      // Should have basic + extended
      expect(allNames.length).toBe(11 + 130); // 11 basic + 130 extended CSS names
    });

    test('returns empty for unknown locale', () => {
      expect(namer.names('xx')).toEqual([]);
    });
  });
});

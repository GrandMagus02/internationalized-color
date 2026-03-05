import { test, expect, describe, beforeAll } from 'bun:test';
import { Color, useLocale, nameColor, nearestColors, lookupColor, listColorNames } from '../index.ts';
import { en } from '../src/locales/en.ts';

beforeAll(() => {
  useLocale(en);
});

describe('Color naming', () => {
  describe('nameColor()', () => {
    test('names pure red as "red" (basic)', () => {
      const c = Color.parse('#ff0000')!;
      const result = nameColor(c, 'en', { level: 'basic' });
      expect(result).not.toBeNull();
      expect(result!.name).toBe('red');
      expect(result!.distance).toBeLessThan(0.01);
    });

    test('names pure blue as "blue" (basic)', () => {
      const c = Color.parse('#0000ff')!;
      const result = nameColor(c, 'en', { level: 'basic' });
      expect(result).not.toBeNull();
      expect(result!.name).toBe('blue');
    });

    test('names black correctly', () => {
      const c = Color.parse('#000000')!;
      const result = nameColor(c, 'en', { level: 'basic' });
      expect(result!.name).toBe('black');
    });

    test('names white correctly', () => {
      const c = Color.parse('#ffffff')!;
      const result = nameColor(c, 'en', { level: 'basic' });
      expect(result!.name).toBe('white');
    });

    test('names teal from extended level', () => {
      const c = Color.parse('#008080')!;
      const result = nameColor(c, 'en');
      expect(result).not.toBeNull();
      expect(result!.name).toBe('teal');
      expect(result!.distance).toBeLessThan(0.01);
    });

    test('returns null for unknown locale', () => {
      const c = Color.parse('#ff0000')!;
      const result = nameColor(c, 'xx');
      expect(result).toBeNull();
    });

    test('respects threshold option', () => {
      const c = Color.parse('#ff0000')!;
      const result = nameColor(c, 'en', { level: 'basic', threshold: 0.001 });
      expect(result).not.toBeNull();

      const c2 = Color.create('oklab', { l: 0.5, a: 0.1, b: 0.1 });
      const result2 = nameColor(c2, 'en', { level: 'basic', threshold: 0.0001 });
      expect(result2).toBeNull();
    });
  });

  describe('nearestColors()', () => {
    test('returns multiple results sorted by distance', () => {
      const c = Color.parse('#ff4400')!;
      const results = nearestColors(c, 'en', 5);
      expect(results.length).toBe(5);
      for (let i = 1; i < results.length; i++) {
        expect(results[i]!.distance).toBeGreaterThanOrEqual(results[i - 1]!.distance);
      }
    });

    test('returns empty array for unknown locale', () => {
      const c = Color.parse('#ff0000')!;
      const results = nearestColors(c, 'xx');
      expect(results).toEqual([]);
    });
  });

  describe('lookupColor()', () => {
    test('finds a color by name', () => {
      const c = lookupColor('red', 'en');
      expect(c).toBeDefined();
      expect(c!.mode).toBe('oklab');
    });

    test('case-insensitive lookup', () => {
      const c = lookupColor('Red', 'en');
      expect(c).toBeDefined();
    });

    test('finds extended names', () => {
      const c = lookupColor('coral', 'en');
      expect(c).toBeDefined();
    });

    test('returns undefined for unknown name', () => {
      const c = lookupColor('nonexistent', 'en');
      expect(c).toBeUndefined();
    });

    test('returns undefined for unknown locale', () => {
      const c = lookupColor('red', 'xx');
      expect(c).toBeUndefined();
    });
  });

  describe('listColorNames()', () => {
    test('lists all names for a locale', () => {
      const allNames = listColorNames('en');
      expect(allNames.length).toBeGreaterThan(0);
      expect(allNames.length).toBe(11 + 130);
    });

    test('returns empty for unknown locale', () => {
      expect(listColorNames('xx')).toEqual([]);
    });
  });
});

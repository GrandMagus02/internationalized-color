import { test, expect, describe, beforeAll } from 'bun:test';
import { Color, useLocale, nameColor, lookupColor, listColorNames, translateColor } from '../index.ts';
import { en } from '../src/locales/en.ts';
import { ja } from '../src/locales/ja.ts';
import { ja_traditional } from '../src/locales/ja-traditional.ts';
import { zh } from '../src/locales/zh.ts';
import { zh_traditional } from '../src/locales/zh-traditional.ts';
import { ko } from '../src/locales/ko.ts';
import { ru } from '../src/locales/ru.ts';
import { es } from '../src/locales/es.ts';
import { de } from '../src/locales/de.ts';
import { fr } from '../src/locales/fr.ts';
import { modeRgb, modeOklab, modeOklch, modeHsl, modeLrgb, useMode } from 'culori/fn';

beforeAll(() => {
  const modes = [modeRgb, modeOklab, modeOklch, modeHsl, modeLrgb];

  for (const mode of modes) {
    useMode(mode as any);
  }

  for (const dict of [en, ja, ja_traditional, zh, zh_traditional, ko, ru, es, de, fr]) {
    useLocale(dict);
  }
});

describe('Cross-language translation', () => {
  test('translates English "red" to Japanese', () => {
    const result = translateColor('red', 'en', 'ja');
    expect(result).not.toBeNull();
    expect(result!.name).toBe('赤');
    expect(result!.distance).toBeLessThan(0.05);
  });

  test('translates English "red" to Chinese', () => {
    const result = translateColor('red', 'en', 'zh');
    expect(result).not.toBeNull();
    // May match 红色 (basic) or 大红 (traditional, very close to pure red)
    expect(['红色', '大红']).toContain(result!.name);
    expect(result!.distance).toBeLessThan(0.05);
  });

  test('translates English "red" to Korean', () => {
    const result = translateColor('red', 'en', 'ko');
    expect(result).not.toBeNull();
    expect(result!.name).toBe('빨강색');
  });

  test('translates English "red" to Russian', () => {
    const result = translateColor('red', 'en', 'ru');
    expect(result).not.toBeNull();
    expect(result!.name).toBe('красный');
    expect(result!.distance).toBeLessThan(0.1);
  });

  test('translates English "red" to Spanish', () => {
    const result = translateColor('red', 'en', 'es');
    expect(result).not.toBeNull();
    expect(result!.name).toBe('rojo');
  });

  test('translates English "red" to German', () => {
    const result = translateColor('red', 'en', 'de');
    expect(result).not.toBeNull();
    expect(result!.name).toBe('rot');
  });

  test('translates English "red" to French', () => {
    const result = translateColor('red', 'en', 'fr');
    expect(result).not.toBeNull();
    expect(result!.name).toBe('rouge');
  });

  test('translates Japanese "青" to English', () => {
    const result = translateColor('青', 'ja', 'en');
    expect(result).not.toBeNull();
    // Dataset centroids reflect survey averages; 青 maps to a blue-family color
    expect(['blue', 'royalblue', 'mediumblue']).toContain(result!.name);
  });

  test('Russian siniy/goluboy distinction', () => {
    // синий (dark blue) should translate to English as something blueish
    const siniy = translateColor('синий', 'ru', 'en');
    expect(siniy).not.toBeNull();

    // голубой (light blue) should translate differently
    const goluboy = translateColor('голубой', 'ru', 'en');
    expect(goluboy).not.toBeNull();

    // They should map to different English names
    expect(siniy!.name).not.toBe(goluboy!.name);
  });

  test('returns null for unknown source name', () => {
    const result = translateColor('nonexistent', 'en', 'ja');
    expect(result).toBeNull();
  });

  test('returns null for unknown source locale', () => {
    const result = translateColor('red', 'xx', 'ja');
    expect(result).toBeNull();
  });

  test('returns null for unknown target locale', () => {
    const result = translateColor('red', 'en', 'xx');
    expect(result).toBeNull();
  });
});

describe('Multi-language naming', () => {
  test('names pure red correctly in all languages', () => {
    const red = Color.hex('#ff0000');

    expect(nameColor(red, 'en', { level: 'basic' })!.name).toBe('red');
    expect(nameColor(red, 'ja', { level: 'basic' })!.name).toBe('赤');
    expect(nameColor(red, 'zh', { level: 'basic' })!.name).toBe('红色');
    expect(nameColor(red, 'ko', { level: 'basic' })!.name).toBe('빨강색');
    expect(nameColor(red, 'ru', { level: 'basic' })!.name).toBe('красный');
  });

  test('names pure blue correctly in all languages', () => {
    const blue = Color.hex('#0000ff');

    expect(nameColor(blue, 'en', { level: 'basic' })!.name).toBe('blue');
    const jaBlue = nameColor(blue, 'ja', { level: 'basic' })!.name;
    expect(['青', '濃青', 'あお']).toContain(jaBlue);
    const zhBlue = nameColor(blue, 'zh', { level: 'basic' })!.name;
    expect(['蓝色', '深蓝色']).toContain(zhBlue);
    const koBlue = nameColor(blue, 'ko', { level: 'basic' })!.name;
    expect(['파랑색', '파랑']).toContain(koBlue);
  });

  test('names teal in Japanese', () => {
    const teal = Color.hex('#008080');
    const result = nameColor(teal, 'ja');
    expect(result).not.toBeNull();
    expect(result!.name).toBeTruthy();
  });

  test('Japanese traditional naming', () => {
    // 桜色 is a very light pink
    const sakura = lookupColor('桜色', 'ja');
    expect(sakura).toBeDefined();

    // Looking up a cherry blossom color should find 桜色 in traditional
    const result = nameColor(sakura!, 'ja', { level: 'traditional' });
    expect(result).not.toBeNull();
    expect(result!.name).toBe('桜色');
  });

  test('Chinese traditional naming', () => {
    const result = lookupColor('胭脂', 'zh');
    expect(result).toBeDefined();
  });

  test('lists all Japanese names including traditional', () => {
    const names = listColorNames('ja');
    // Should include basic + extended + traditional
    expect(names.length).toBeGreaterThan(90);
  });
});

import { test, expect } from 'bun:test';
import {
  RGBColor, HSLColor, HSVColor, HWBColor,
  OklabColor, OklchColor, LabColor, LchColor,
  P3Color, A98Color, ProphotoColor, Rec2020Color,
  XYZ50Color, XYZ65Color, LRGBColor,
  parseColor,
} from '../index.ts';

// --- RGBColor.parse ---
test('RGBColor.parse with rgb()', () => {
  const c = RGBColor.parse('rgb(255, 0, 0)');
  expect(c).toBeInstanceOf(RGBColor);
  expect(c!.r).toBeCloseTo(1);
  expect(c!.g).toBeCloseTo(0);
  expect(c!.b).toBeCloseTo(0);
});

test('RGBColor.parse with hex', () => {
  const c = RGBColor.parse('#ff0000');
  expect(c).toBeInstanceOf(RGBColor);
  expect(c!.r).toBeCloseTo(1);
});

test('RGBColor.parse returns undefined for hsl()', () => {
  expect(RGBColor.parse('hsl(0, 100%, 50%)')).toBeUndefined();
});

// --- HSLColor.parse ---
test('HSLColor.parse with hsl()', () => {
  const c = HSLColor.parse('hsl(120, 1, 0.5)');
  expect(c).toBeInstanceOf(HSLColor);
  expect(c!.h).toBeCloseTo(120);
});

test('HSLColor.parse returns undefined for rgb()', () => {
  expect(HSLColor.parse('rgb(255, 0, 0)')).toBeUndefined();
});

// --- RGBColor.fromArray ---
test('RGBColor.fromArray', () => {
  const c = RGBColor.fromArray([1, 0, 0]);
  expect(c).toBeInstanceOf(RGBColor);
  expect(c!.r).toBe(1);
  expect(c!.g).toBe(0);
  expect(c!.b).toBe(0);
});

test('RGBColor.fromArray with alpha', () => {
  const c = RGBColor.fromArray([1, 0, 0, 0.5]);
  expect(c!.alpha).toBe(0.5);
});

test('RGBColor.fromArray too short', () => {
  expect(RGBColor.fromArray([1, 0])).toBeUndefined();
});

// --- RGBColor.fromObject ---
test('RGBColor.fromObject', () => {
  const c = RGBColor.fromObject({ r: 1, g: 0, b: 0 });
  expect(c).toBeInstanceOf(RGBColor);
  expect(c!.r).toBe(1);
});

test('RGBColor.fromObject with alpha', () => {
  const c = RGBColor.fromObject({ r: 1, g: 0, b: 0, alpha: 0.5 });
  expect(c!.alpha).toBe(0.5);
});

test('RGBColor.fromObject wrong keys', () => {
  expect(RGBColor.fromObject({ h: 0, s: 1, l: 0.5 })).toBeUndefined();
});

// --- OklabColor.parse ---
test('OklabColor.parse', () => {
  const c = OklabColor.parse('oklab(0.5 0.1 -0.1)');
  expect(c).toBeInstanceOf(OklabColor);
  expect(c!.l).toBeCloseTo(0.5);
});

// --- P3Color.parse ---
test('P3Color.parse with color(display-p3)', () => {
  const c = P3Color.parse('color(display-p3 1 0 0)');
  expect(c).toBeInstanceOf(P3Color);
  expect(c!.r).toBeCloseTo(1);
});

// --- LRGBColor.parse ---
test('LRGBColor.parse with color(srgb-linear)', () => {
  const c = LRGBColor.parse('color(srgb-linear 1 0 0)');
  expect(c).toBeInstanceOf(LRGBColor);
});

// --- XYZ65Color.parse ---
test('XYZ65Color.parse', () => {
  const c = XYZ65Color.parse('color(xyz-d65 0.5 0.5 0.5)');
  expect(c).toBeInstanceOf(XYZ65Color);
});

// --- XYZ50Color.fromObject ---
test('XYZ50Color.fromObject', () => {
  const c = XYZ50Color.fromObject({ x: 0.5, y: 0.5, z: 0.5 });
  expect(c).toBeInstanceOf(XYZ50Color);
  expect(c!.x).toBe(0.5);
});

// --- HSVColor.fromObject ---
test('HSVColor.fromObject', () => {
  const c = HSVColor.fromObject({ h: 120, s: 1, v: 1 });
  expect(c).toBeInstanceOf(HSVColor);
  expect(c!.v).toBe(1);
});

// --- HWBColor.fromArray ---
test('HWBColor.fromArray', () => {
  const c = HWBColor.fromArray([180, 0, 0]);
  expect(c).toBeInstanceOf(HWBColor);
  expect(c!.h).toBe(180);
});

// --- parseColor ---
test('parseColor with named color', () => {
  const c = parseColor('red');
  expect(c).toBeInstanceOf(RGBColor);
});

test('parseColor with hsl()', () => {
  const c = parseColor('hsl(120, 1, 0.5)');
  expect(c).toBeInstanceOf(HSLColor);
});

test('parseColor with oklab()', () => {
  const c = parseColor('oklab(0.5 0.1 -0.1)');
  expect(c).toBeInstanceOf(OklabColor);
});

test('parseColor with color(display-p3)', () => {
  const c = parseColor('color(display-p3 1 0 0)');
  expect(c).toBeInstanceOf(P3Color);
});

test('parseColor returns undefined for invalid', () => {
  expect(parseColor('notacolor')).toBeUndefined();
});

// --- LchColor.fromObject ---
test('LchColor.fromObject', () => {
  const c = LchColor.fromObject({ l: 50, c: 30, h: 120 });
  expect(c).toBeInstanceOf(LchColor);
});

// --- OklchColor.fromArray ---
test('OklchColor.fromArray', () => {
  const c = OklchColor.fromArray([0.7, 0.15, 180]);
  expect(c).toBeInstanceOf(OklchColor);
  expect(c!.h).toBe(180);
});

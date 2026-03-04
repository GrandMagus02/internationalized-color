import { namedColors } from './named-colors.ts';
import type { ColorMode } from './types.ts';

export interface ParseResult {
  mode: ColorMode;
  channels: [number, number, number];
  alpha?: number;
}

function hexToNum(hex: string): number {
  return parseInt(hex, 16) / 255;
}

function parseHex(str: string): ParseResult | undefined {
  const hex = str.slice(1);
  let r: number, g: number, b: number, a: number | undefined;

  if (hex.length === 3 || hex.length === 4) {
    r = hexToNum(hex[0]! + hex[0]!);
    g = hexToNum(hex[1]! + hex[1]!);
    b = hexToNum(hex[2]! + hex[2]!);
    if (hex.length === 4) a = hexToNum(hex[3]! + hex[3]!);
  } else if (hex.length === 6 || hex.length === 8) {
    r = hexToNum(hex.slice(0, 2));
    g = hexToNum(hex.slice(2, 4));
    b = hexToNum(hex.slice(4, 6));
    if (hex.length === 8) a = hexToNum(hex.slice(6, 8));
  } else {
    return undefined;
  }

  return { mode: 'rgb', channels: [r, g, b], alpha: a };
}

// Parse a numeric value, handling percentages
// Parse a numeric value. percentScale maps 100% to this value.
// For non-percentage values, divideRaw controls division.
function parseNum(s: string, percentScale = 1, divideRaw = false): number {
  s = s.trim();
  if (s === 'none') return 0;
  if (s.endsWith('%')) {
    return (parseFloat(s) / 100) * percentScale;
  }
  const v = parseFloat(s);
  return divideRaw ? v / percentScale : v;
}

// Parse alpha value
function parseAlpha(s: string | undefined): number | undefined {
  if (s === undefined || s === '') return undefined;
  s = s.trim();
  if (s === 'none') return 0;
  if (s.endsWith('%')) return parseFloat(s) / 100;
  return parseFloat(s);
}

// Split arguments handling both comma and space syntax
function splitArgs(argsStr: string): { values: string[]; alpha?: string } {
  // Check for slash-separated alpha
  const slashIdx = argsStr.lastIndexOf('/');
  let alpha: string | undefined;
  let mainPart = argsStr;
  if (slashIdx !== -1) {
    alpha = argsStr.slice(slashIdx + 1).trim();
    mainPart = argsStr.slice(0, slashIdx).trim();
  }

  // Try comma-separated first
  if (mainPart.includes(',')) {
    const parts = mainPart.split(',').map(s => s.trim());
    // Last part might contain alpha after /
    return { values: parts, alpha };
  }

  // Space-separated
  const values = mainPart.split(/\s+/).filter(s => s.length > 0);
  return { values, alpha };
}

function parseRgbComponent(s: string): number {
  s = s.trim();
  if (s === 'none') return 0;
  if (s.endsWith('%')) return parseFloat(s) / 100;
  return parseFloat(s) / 255;
}

function parseFn(name: string, argsStr: string): ParseResult | undefined {
  const { values, alpha: alphaStr } = splitArgs(argsStr);
  const a = parseAlpha(alphaStr);

  switch (name) {
    case 'rgb':
    case 'rgba': {
      if (values.length < 3) return undefined;
      // Check if values use percentage or 0-255 scale
      return {
        mode: 'rgb',
        channels: [
          parseRgbComponent(values[0]!),
          parseRgbComponent(values[1]!),
          parseRgbComponent(values[2]!),
        ],
        alpha: values.length >= 4 && !alphaStr ? parseAlpha(values[3]) : a,
      };
    }

    case 'hsl':
    case 'hsla': {
      if (values.length < 3) return undefined;
      return {
        mode: 'hsl',
        channels: [
          parseNum(values[0]!), // hue in degrees
          parseNum(values[1]!, 1), // saturation 0-1
          parseNum(values[2]!, 1), // lightness 0-1
        ],
        alpha: values.length >= 4 && !alphaStr ? parseAlpha(values[3]) : a,
      };
    }

    case 'hwb': {
      if (values.length < 3) return undefined;
      return {
        mode: 'hwb',
        channels: [
          parseNum(values[0]!),
          parseNum(values[1]!, 1),
          parseNum(values[2]!, 1),
        ],
        alpha: a,
      };
    }

    case 'lab': {
      if (values.length < 3) return undefined;
      return {
        mode: 'lab',
        channels: [
          parseNum(values[0]!, 100), // L 0-100
          parseNum(values[1]!, 125), // a -125 to 125
          parseNum(values[2]!, 125), // b -125 to 125
        ],
        alpha: a,
      };
    }

    case 'lch': {
      if (values.length < 3) return undefined;
      return {
        mode: 'lch',
        channels: [
          parseNum(values[0]!, 100),
          parseNum(values[1]!, 150),
          parseNum(values[2]!),
        ],
        alpha: a,
      };
    }

    case 'oklab': {
      if (values.length < 3) return undefined;
      return {
        mode: 'oklab',
        channels: [
          parseNum(values[0]!, 1), // L 0-1
          parseNum(values[1]!, 0.4), // a
          parseNum(values[2]!, 0.4), // b
        ],
        alpha: a,
      };
    }

    case 'oklch': {
      if (values.length < 3) return undefined;
      return {
        mode: 'oklch',
        channels: [
          parseNum(values[0]!, 1),
          parseNum(values[1]!, 0.4),
          parseNum(values[2]!),
        ],
        alpha: a,
      };
    }

    case 'color': {
      // color(display-p3 r g b / alpha)
      // color(srgb r g b / alpha)
      // color(a98-rgb r g b / alpha)
      // color(prophoto-rgb r g b / alpha)
      // color(rec2020 r g b / alpha)
      // color(xyz-d50 x y z / alpha)
      // color(xyz-d65 x y z / alpha)
      // color(srgb-linear r g b / alpha)
      if (values.length < 4) return undefined;
      const space = values[0]!;
      const c1 = parseNum(values[1]!, 1);
      const c2 = parseNum(values[2]!, 1);
      const c3 = parseNum(values[3]!, 1);

      const modeMap: Record<string, ColorMode> = {
        'srgb': 'rgb',
        'srgb-linear': 'lrgb',
        'display-p3': 'p3',
        'a98-rgb': 'a98',
        'prophoto-rgb': 'prophoto',
        'rec2020': 'rec2020',
        'xyz-d50': 'xyz50',
        'xyz-d65': 'xyz65',
        'xyz': 'xyz65',
      };

      const mode = modeMap[space];
      if (!mode) return undefined;
      return { mode, channels: [c1, c2, c3], alpha: a };
    }

    default:
      return undefined;
  }
}

export function parseColor(input: string): ParseResult | undefined {
  const str = input.trim().toLowerCase();
  if (!str) return undefined;

  // transparent
  if (str === 'transparent') {
    return { mode: 'rgb', channels: [0, 0, 0], alpha: 0 };
  }

  // Hex
  if (str.startsWith('#')) {
    return parseHex(str);
  }

  // Named color
  const hex = namedColors[str];
  if (hex) {
    return parseHex('#' + hex);
  }

  // Function syntax: name(args)
  const fnMatch = str.match(/^([a-z]+)\s*\((.+)\)\s*$/s);
  if (fnMatch) {
    return parseFn(fnMatch[1]!, fnMatch[2]!);
  }

  return undefined;
}

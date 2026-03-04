import type { ColorMode } from './types.ts';

function clamp01(v: number): number {
  return Math.max(0, Math.min(1, v));
}

function round(v: number, digits: number): number {
  const m = Math.pow(10, digits);
  return Math.round(v * m) / m;
}

function toHex2(n: number): string {
  const byte = Math.round(clamp01(n) * 255);
  return byte.toString(16).padStart(2, '0');
}

export function formatHex(r: number, g: number, b: number, alpha?: number): string {
  const hex = '#' + toHex2(r) + toHex2(g) + toHex2(b);
  if (alpha !== undefined && alpha < 1) {
    return hex + toHex2(alpha);
  }
  return hex;
}

function fmtNum(n: number, digits = 5): string {
  const r = round(n, digits);
  return String(r);
}

function fmtAlpha(alpha: number | undefined): string {
  if (alpha === undefined || alpha >= 1) return '';
  return ' / ' + fmtNum(alpha, 4);
}

export function formatCss(
  mode: ColorMode,
  channels: [number, number, number],
  alpha?: number,
): string {
  const a = fmtAlpha(alpha);

  switch (mode) {
    case 'rgb': {
      const [r, g, b] = channels;
      return `rgb(${round(r * 255, 2)} ${round(g * 255, 2)} ${round(b * 255, 2)}${a})`;
    }
    case 'hsl': {
      const [h, s, l] = channels;
      return `hsl(${round(h, 2)} ${round(s * 100, 2)}% ${round(l * 100, 2)}%${a})`;
    }
    case 'hwb': {
      const [h, w, bk] = channels;
      return `hwb(${round(h, 2)} ${round(w * 100, 2)}% ${round(bk * 100, 2)}%${a})`;
    }
    case 'lab': {
      const [l, aa, b] = channels;
      return `lab(${round(l, 4)} ${round(aa, 4)} ${round(b, 4)}${a})`;
    }
    case 'lch': {
      const [l, c, h] = channels;
      return `lch(${round(l, 4)} ${round(c, 4)} ${round(h, 2)}${a})`;
    }
    case 'oklab': {
      const [l, aa, b] = channels;
      return `oklab(${round(l, 5)} ${round(aa, 5)} ${round(b, 5)}${a})`;
    }
    case 'oklch': {
      const [l, c, h] = channels;
      return `oklch(${round(l, 5)} ${round(c, 5)} ${round(h, 2)}${a})`;
    }
    case 'p3': {
      const [r, g, b] = channels;
      return `color(display-p3 ${fmtNum(r)} ${fmtNum(g)} ${fmtNum(b)}${a})`;
    }
    case 'a98': {
      const [r, g, b] = channels;
      return `color(a98-rgb ${fmtNum(r)} ${fmtNum(g)} ${fmtNum(b)}${a})`;
    }
    case 'prophoto': {
      const [r, g, b] = channels;
      return `color(prophoto-rgb ${fmtNum(r)} ${fmtNum(g)} ${fmtNum(b)}${a})`;
    }
    case 'rec2020': {
      const [r, g, b] = channels;
      return `color(rec2020 ${fmtNum(r)} ${fmtNum(g)} ${fmtNum(b)}${a})`;
    }
    case 'xyz50': {
      const [x, y, z] = channels;
      return `color(xyz-d50 ${fmtNum(x)} ${fmtNum(y)} ${fmtNum(z)}${a})`;
    }
    case 'xyz65': {
      const [x, y, z] = channels;
      return `color(xyz-d65 ${fmtNum(x)} ${fmtNum(y)} ${fmtNum(z)}${a})`;
    }
    case 'lrgb': {
      const [r, g, b] = channels;
      return `color(srgb-linear ${fmtNum(r)} ${fmtNum(g)} ${fmtNum(b)}${a})`;
    }
    case 'hsv': {
      // HSV has no CSS syntax, use a debug format
      const [h, s, v] = channels;
      return `hsv(${round(h, 2)} ${round(s * 100, 2)}% ${round(v * 100, 2)}%${a})`;
    }
  }
}

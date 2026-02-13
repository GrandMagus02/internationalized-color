/**
 * Generates locale data files with OkLab centroids.
 * Run with: bun scripts/generate-locales.ts
 *
 * This script computes OkLab centroids for color names across languages,
 * using representative hex values based on linguistic color research.
 */
import {
  useMode,
  modeRgb,
  modeOklab,
  modeOklch,
  modeLrgb,
  converter,
} from 'culori/fn';

useMode(modeRgb);
useMode(modeOklab);
useMode(modeOklch);
useMode(modeLrgb);

const toOklab = converter('oklab');

interface LocaleEntry {
  name: string;
  hex: string;
}

interface LocaleDef {
  locale: string;
  source: string;
  basic: LocaleEntry[];
  extended?: LocaleEntry[];
  traditional?: LocaleEntry[];
}

function computeOklab(hex: string): [number, number, number] {
  const c = toOklab(hex)!;
  return [
    +(c.l as number).toFixed(6),
    +(c.a as number).toFixed(6),
    +(c.b as number).toFixed(6),
  ];
}

function generateFile(def: LocaleDef): string {
  const lines: string[] = [];
  lines.push(`import type { ColorDictionary } from '../types.ts';`);
  lines.push(``);
  lines.push(`export const ${def.locale.replace('-', '_')}: ColorDictionary = {`);
  lines.push(`  locale: '${def.locale}',`);
  lines.push(`  source: '${def.source}',`);

  for (const tier of ['basic', 'extended', 'traditional'] as const) {
    const entries = def[tier];
    if (!entries || entries.length === 0) continue;

    lines.push(`  ${tier}: {`);
    lines.push(`    names: [`);
    for (const e of entries) {
      lines.push(`      '${e.name}',`);
    }
    lines.push(`    ],`);
    lines.push(`    colors: new Float32Array([`);
    for (const e of entries) {
      const [l, a, b] = computeOklab(e.hex);
      lines.push(`      // ${e.name}`);
      lines.push(`      ${l}, ${a}, ${b},`);
    }
    lines.push(`    ]),`);
    lines.push(`  },`);
  }

  lines.push(`};`);
  lines.push(``);
  return lines.join('\n');
}

// === Language Data ===

// Japanese (日本語) — Berlin-Kay basic terms + extended
const ja: LocaleDef = {
  locale: 'ja',
  source: 'uw+research',
  basic: [
    { name: '黒', hex: '#000000' },
    { name: '白', hex: '#ffffff' },
    { name: '赤', hex: '#ff0000' },
    { name: '緑', hex: '#008000' },
    { name: '黄', hex: '#ffff00' },
    { name: '青', hex: '#0000ff' },
    { name: '茶', hex: '#8b4513' },
    { name: 'オレンジ', hex: '#ffa500' },
    { name: 'ピンク', hex: '#ffc0cb' },
    { name: '紫', hex: '#800080' },
    { name: '灰色', hex: '#808080' },
    // Japanese has 水色 (mizuiro/light blue) as a basic term
    { name: '水色', hex: '#87ceeb' },
  ],
  extended: [
    { name: '紺', hex: '#191970' },
    { name: '藍', hex: '#264348' },
    { name: '青緑', hex: '#008080' },
    { name: '若草色', hex: '#c3d825' },
    { name: '黄緑', hex: '#9acd32' },
    { name: '金色', hex: '#ffd700' },
    { name: '銀色', hex: '#c0c0c0' },
    { name: '肌色', hex: '#fce2c4' },
    { name: 'えんじ', hex: '#b94047' },
    { name: '朱色', hex: '#ec6d51' },
    { name: '桃色', hex: '#f47983' },
    { name: '薄紫', hex: '#b19cd9' },
    { name: '群青', hex: '#4169e1' },
    { name: '空色', hex: '#87ceeb' },
    { name: '深緑', hex: '#006400' },
    { name: '山吹色', hex: '#f8b500' },
    { name: '小豆色', hex: '#96514d' },
    { name: '栗色', hex: '#800000' },
    { name: 'クリーム色', hex: '#fffdd0' },
    { name: '鶯色', hex: '#928c36' },
  ],
};

// Japanese Traditional (和色 wa-iro)
const ja_traditional: LocaleDef = {
  locale: 'ja',
  source: 'wa-iro',
  basic: [],
  traditional: [
    { name: '桜色', hex: '#fef4f4' },
    { name: '薄桜', hex: '#fdeff2' },
    { name: '桜鼠', hex: '#e9dfe5' },
    { name: '鴇色', hex: '#f4b3c2' },
    { name: '撫子色', hex: '#ecb3c3' },
    { name: '紅梅色', hex: '#e7609e' },
    { name: '躑躅色', hex: '#e95295' },
    { name: '牡丹色', hex: '#e7609e' },
    { name: '今様色', hex: '#d0576b' },
    { name: '中紅', hex: '#c85179' },
    { name: '退紅', hex: '#d69090' },
    { name: '一斤染', hex: '#f5b1aa' },
    { name: '珊瑚色', hex: '#f5b1aa' },
    { name: '紅色', hex: '#c3272b' },
    { name: '銀朱', hex: '#c85554' },
    { name: '朱色', hex: '#ec6d51' },
    { name: '曙色', hex: '#f19072' },
    { name: '茜色', hex: '#b7282e' },
    { name: '赤錆色', hex: '#8a3b2c' },
    { name: '紅檜皮', hex: '#7b4741' },
    { name: '海老茶', hex: '#773c30' },
    { name: '栗梅', hex: '#852e19' },
    { name: '弁柄色', hex: '#8f2e14' },
    { name: '赤橙', hex: '#ea5506' },
    { name: '金赤', hex: '#ea5506' },
    { name: '照柿', hex: '#eb6101' },
    { name: '柿色', hex: '#ed6d3d' },
    { name: '黄丹', hex: '#ee7800' },
    { name: '橙色', hex: '#ee7800' },
    { name: '蜜柑色', hex: '#f08300' },
    { name: '金茶', hex: '#f39800' },
    { name: '黄朽葉', hex: '#d3a243' },
    { name: '山吹色', hex: '#f8b500' },
    { name: '鬱金色', hex: '#fabf14' },
    { name: '蒲公英色', hex: '#ffd900' },
    { name: '黄色', hex: '#ffd900' },
    { name: '刈安色', hex: '#f5e56b' },
    { name: '鶸色', hex: '#d7cf3a' },
    { name: '黄緑', hex: '#b8d200' },
    { name: '若草色', hex: '#c3d825' },
    { name: '若葉色', hex: '#b9d08b' },
    { name: '抹茶色', hex: '#c5c56a' },
    { name: '萌黄', hex: '#a9c087' },
    { name: '松葉色', hex: '#687e52' },
    { name: '緑', hex: '#009944' },
    { name: '常盤色', hex: '#007b43' },
    { name: '千歳緑', hex: '#316745' },
    { name: '深緑', hex: '#004d25' },
    { name: '若竹色', hex: '#68be8d' },
    { name: '青竹色', hex: '#7ebeab' },
    { name: '青磁色', hex: '#7ebea5' },
    { name: '浅葱色', hex: '#00a3af' },
    { name: '納戸色', hex: '#008899' },
    { name: '花浅葱', hex: '#2a83a2' },
    { name: '新橋色', hex: '#59b9c6' },
    { name: '水色', hex: '#bce2e8' },
    { name: '甕覗', hex: '#c4dfe6' },
    { name: '白群', hex: '#83ccd2' },
    { name: '空色', hex: '#a0d8ef' },
    { name: '勿忘草色', hex: '#89c3eb' },
    { name: '群青色', hex: '#4c6cb3' },
    { name: '瑠璃色', hex: '#1e50a2' },
    { name: '紺色', hex: '#223a70' },
    { name: '紺青', hex: '#192f60' },
    { name: '藍色', hex: '#165e83' },
    { name: '鉄紺', hex: '#17184b' },
    { name: '藤色', hex: '#bbbcde' },
    { name: '藤紫', hex: '#8b81c3' },
    { name: '桔梗色', hex: '#5654a2' },
    { name: '紫紺', hex: '#460e44' },
    { name: '菫色', hex: '#7058a3' },
    { name: '江戸紫', hex: '#745399' },
    { name: '紫', hex: '#884898' },
    { name: '京紫', hex: '#772f6d' },
    { name: '古代紫', hex: '#895b8a' },
    { name: '茄子紺', hex: '#824880' },
    { name: '葡萄色', hex: '#640125' },
    { name: '亜麻色', hex: '#c4a882' },
    { name: '榛色', hex: '#bfa46f' },
    { name: '丁子色', hex: '#efcd9a' },
    { name: '胡桃色', hex: '#a86f4c' },
    { name: '朽葉色', hex: '#917347' },
    { name: '鳶色', hex: '#724938' },
    { name: '涅色', hex: '#2e211b' },
    { name: '檜皮色', hex: '#6c3524' },
    { name: '鉛色', hex: '#7b7c7d' },
    { name: '利休鼠', hex: '#888e7e' },
    { name: '素鼠', hex: '#9fa0a0' },
    { name: '銀鼠', hex: '#afafb0' },
    { name: '白鼠', hex: '#dcdddd' },
    { name: '生成り', hex: '#fbfaf5' },
    { name: '乳白色', hex: '#f3f3f3' },
    { name: '象牙色', hex: '#f8f4e6' },
    { name: '胡粉色', hex: '#fffffc' },
    { name: '漆黒', hex: '#0d0015' },
    { name: '墨色', hex: '#343434' },
    { name: '鉄黒', hex: '#281a14' },
  ],
};

// Chinese (中文)
const zh: LocaleDef = {
  locale: 'zh',
  source: 'uw+research',
  basic: [
    { name: '黑', hex: '#000000' },
    { name: '白', hex: '#ffffff' },
    { name: '红', hex: '#ff0000' },
    { name: '绿', hex: '#008000' },
    { name: '黄', hex: '#ffff00' },
    { name: '蓝', hex: '#0000ff' },
    { name: '棕', hex: '#8b4513' },
    { name: '橙', hex: '#ffa500' },
    { name: '粉', hex: '#ffc0cb' },
    { name: '紫', hex: '#800080' },
    { name: '灰', hex: '#808080' },
  ],
  extended: [
    { name: '深红', hex: '#8b0000' },
    { name: '浅红', hex: '#f08080' },
    { name: '深蓝', hex: '#00008b' },
    { name: '浅蓝', hex: '#87ceeb' },
    { name: '深绿', hex: '#006400' },
    { name: '浅绿', hex: '#90ee90' },
    { name: '深紫', hex: '#4b0082' },
    { name: '浅紫', hex: '#dda0dd' },
    { name: '天蓝', hex: '#87ceeb' },
    { name: '草绿', hex: '#7cfc00' },
    { name: '玫红', hex: '#e60073' },
    { name: '金', hex: '#ffd700' },
    { name: '银', hex: '#c0c0c0' },
    { name: '米色', hex: '#f5f5dc' },
    { name: '卡其色', hex: '#c3b091' },
    { name: '酒红', hex: '#722f37' },
    { name: '青', hex: '#00ffff' },
    { name: '藏青', hex: '#2e4e7e' },
    { name: '墨绿', hex: '#004d25' },
    { name: '桃红', hex: '#f47983' },
    { name: '橘红', hex: '#ff4500' },
    { name: '杏色', hex: '#f7c97e' },
    { name: '驼色', hex: '#a0522d' },
    { name: '土黄', hex: '#c89b40' },
    { name: '藕色', hex: '#edd1d8' },
  ],
};

// Chinese Traditional Colors (中国传统颜色)
const zh_traditional: LocaleDef = {
  locale: 'zh',
  source: 'zh-traditional',
  basic: [],
  traditional: [
    { name: '胭脂', hex: '#9d2933' },
    { name: '朱砂', hex: '#ff461f' },
    { name: '火红', hex: '#ff2d2d' },
    { name: '朱红', hex: '#ff4c00' },
    { name: '丹', hex: '#ff4e20' },
    { name: '彤', hex: '#f35336' },
    { name: '绛', hex: '#7c0a02' },
    { name: '赤', hex: '#c3272b' },
    { name: '酡红', hex: '#dc3023' },
    { name: '殷红', hex: '#be002f' },
    { name: '枣红', hex: '#c32136' },
    { name: '樱桃色', hex: '#c93756' },
    { name: '银红', hex: '#f05654' },
    { name: '大红', hex: '#ff2121' },
    { name: '桃红', hex: '#f47983' },
    { name: '海棠红', hex: '#db5a6b' },
    { name: '石榴红', hex: '#f20c00' },
    { name: '玫瑰红', hex: '#c45a65' },
    { name: '嫣红', hex: '#ef7a82' },
    { name: '粉红', hex: '#ffb3a7' },
    { name: '橘黄', hex: '#f28500' },
    { name: '杏黄', hex: '#f0c239' },
    { name: '橙黄', hex: '#ffa400' },
    { name: '鹅黄', hex: '#fff143' },
    { name: '明黄', hex: '#f2ce2b' },
    { name: '姜黄', hex: '#e2c027' },
    { name: '秋香色', hex: '#d9b611' },
    { name: '柠檬黄', hex: '#fcd217' },
    { name: '藤黄', hex: '#f2be45' },
    { name: '雌黄', hex: '#ffc64b' },
    { name: '缃色', hex: '#f0c239' },
    { name: '天青', hex: '#68b0ab' },
    { name: '碧蓝', hex: '#3eede7' },
    { name: '蔚蓝', hex: '#70f3ff' },
    { name: '宝蓝', hex: '#4b5cc4' },
    { name: '靛蓝', hex: '#065279' },
    { name: '靛青', hex: '#177cb0' },
    { name: '群青', hex: '#4c8dae' },
    { name: '花青', hex: '#003472' },
    { name: '石青', hex: '#1685a9' },
    { name: '铁青', hex: '#3b818c' },
    { name: '品蓝', hex: '#4b5cc4' },
    { name: '黛蓝', hex: '#425066' },
    { name: '藏蓝', hex: '#2e4e7e' },
    { name: '青碧', hex: '#48c0a3' },
    { name: '翠绿', hex: '#00e09e' },
    { name: '苍翠', hex: '#519a73' },
    { name: '豆绿', hex: '#9ed048' },
    { name: '松花绿', hex: '#057748' },
    { name: '竹青', hex: '#789262' },
    { name: '石绿', hex: '#16a951' },
    { name: '松柏绿', hex: '#21a675' },
    { name: '葱绿', hex: '#9ed900' },
    { name: '鲜绿', hex: '#00e500' },
    { name: '油绿', hex: '#00bc12' },
    { name: '茶色', hex: '#b35c44' },
    { name: '栗色', hex: '#60281e' },
    { name: '驼色', hex: '#a0522d' },
    { name: '赭色', hex: '#955539' },
    { name: '棕色', hex: '#a25b20' },
    { name: '棕榈', hex: '#6e511e' },
    { name: '象牙白', hex: '#fffbf0' },
    { name: '月白', hex: '#d6ecf0' },
    { name: '缟', hex: '#f2ecde' },
    { name: '藕荷色', hex: '#e4c6d0' },
    { name: '丁香色', hex: '#cca4e3' },
    { name: '雪青', hex: '#b0a4e3' },
    { name: '紫棠', hex: '#56004f' },
    { name: '青莲', hex: '#801dae' },
    { name: '紫酱', hex: '#815463' },
    { name: '酱紫', hex: '#815476' },
    { name: '银灰', hex: '#b2bbbe' },
    { name: '鸦青', hex: '#424c50' },
    { name: '铅白', hex: '#f0f0f4' },
    { name: '玄色', hex: '#622a1d' },
    { name: '墨色', hex: '#50616d' },
    { name: '漆黑', hex: '#161823' },
  ],
};

// Korean (한국어)
const ko: LocaleDef = {
  locale: 'ko',
  source: 'uw+research',
  basic: [
    { name: '검정', hex: '#000000' },
    { name: '하양', hex: '#ffffff' },
    { name: '빨강', hex: '#ff0000' },
    { name: '초록', hex: '#008000' },
    { name: '노랑', hex: '#ffff00' },
    { name: '파랑', hex: '#0000ff' },
    { name: '갈색', hex: '#8b4513' },
    { name: '주황', hex: '#ffa500' },
    { name: '분홍', hex: '#ffc0cb' },
    { name: '보라', hex: '#800080' },
    { name: '회색', hex: '#808080' },
    // Korean also recognizes 하늘색 (sky blue) as a basic term
    { name: '하늘색', hex: '#87ceeb' },
  ],
  extended: [
    { name: '남색', hex: '#000080' },
    { name: '진홍', hex: '#dc143c' },
    { name: '자주', hex: '#990066' },
    { name: '연두', hex: '#9acd32' },
    { name: '청록', hex: '#008080' },
    { name: '금색', hex: '#ffd700' },
    { name: '은색', hex: '#c0c0c0' },
    { name: '살색', hex: '#fce2c4' },
    { name: '밤색', hex: '#800000' },
    { name: '옥색', hex: '#00a86b' },
    { name: '진분홍', hex: '#ff69b4' },
    { name: '연분홍', hex: '#ffb7c5' },
    { name: '다홍', hex: '#ff4500' },
    { name: '감색', hex: '#191970' },
    { name: '흰색', hex: '#ffffff' },
    { name: '베이지', hex: '#f5f5dc' },
    { name: '올리브', hex: '#808000' },
    { name: '카키', hex: '#c3b091' },
    { name: '와인색', hex: '#722f37' },
    { name: '코발트', hex: '#0047ab' },
  ],
};

// Korean Traditional (오방색 + traditional)
const ko_traditional: LocaleDef = {
  locale: 'ko',
  source: 'ko-traditional',
  basic: [],
  traditional: [
    // 오방색 (Five directional colors)
    { name: '청', hex: '#0000ff' },   // Blue (East)
    { name: '적', hex: '#ff0000' },   // Red (South)
    { name: '황', hex: '#ffff00' },   // Yellow (Center)
    { name: '백', hex: '#ffffff' },   // White (West)
    { name: '흑', hex: '#000000' },   // Black (North)
    // 오간색 (Five secondary colors)
    { name: '녹', hex: '#008000' },   // Green (between Blue-Yellow)
    { name: '홍', hex: '#ff4500' },   // Red-Orange (between Red-Yellow)
    { name: '벽', hex: '#00ffff' },   // Cyan (between Blue-White)
    { name: '유황', hex: '#ffa500' }, // Amber (between Yellow-Red)
    { name: '자', hex: '#800080' },   // Purple (between Red-Blue)
    // Traditional Korean colors
    { name: '옥색', hex: '#00a86b' },
    { name: '비색', hex: '#9fafb0' },
    { name: '치자색', hex: '#ffbb00' },
    { name: '쪽색', hex: '#00477f' },
    { name: '감색', hex: '#191970' },
    { name: '먹색', hex: '#343434' },
    { name: '송화색', hex: '#c4bb97' },
    { name: '두록색', hex: '#4b830d' },
    { name: '연지색', hex: '#e60033' },
    { name: '지황색', hex: '#e0a929' },
  ],
};

// Russian (Русский) — includes siniy/goluboy distinction
const ru: LocaleDef = {
  locale: 'ru',
  source: 'uw+research',
  basic: [
    { name: 'чёрный', hex: '#000000' },
    { name: 'белый', hex: '#ffffff' },
    { name: 'красный', hex: '#ff0000' },
    { name: 'зелёный', hex: '#008000' },
    { name: 'жёлтый', hex: '#ffff00' },
    // Russian has TWO basic blue terms
    { name: 'синий', hex: '#00008b' },     // dark blue
    { name: 'голубой', hex: '#87ceeb' },   // light blue
    { name: 'коричневый', hex: '#8b4513' },
    { name: 'оранжевый', hex: '#ffa500' },
    { name: 'розовый', hex: '#ffc0cb' },
    { name: 'фиолетовый', hex: '#800080' },
    { name: 'серый', hex: '#808080' },
  ],
  extended: [
    { name: 'бордовый', hex: '#800020' },
    { name: 'бирюзовый', hex: '#40e0d0' },
    { name: 'бежевый', hex: '#f5f5dc' },
    { name: 'малиновый', hex: '#dc143c' },
    { name: 'сиреневый', hex: '#c8a2c8' },
    { name: 'салатовый', hex: '#7fff00' },
    { name: 'алый', hex: '#ff2400' },
    { name: 'золотой', hex: '#ffd700' },
    { name: 'серебряный', hex: '#c0c0c0' },
    { name: 'тёмно-зелёный', hex: '#006400' },
    { name: 'изумрудный', hex: '#50c878' },
    { name: 'лиловый', hex: '#c8a2c8' },
    { name: 'васильковый', hex: '#6495ed' },
    { name: 'лазурный', hex: '#007fff' },
    { name: 'хаки', hex: '#c3b091' },
    { name: 'каштановый', hex: '#80461b' },
    { name: 'терракотовый', hex: '#e2725b' },
    { name: 'песочный', hex: '#c2b280' },
    { name: 'морской волны', hex: '#006d6f' },
    { name: 'индиго', hex: '#4b0082' },
  ],
};

// Spanish (Español)
const es: LocaleDef = {
  locale: 'es',
  source: 'uw+research',
  basic: [
    { name: 'negro', hex: '#000000' },
    { name: 'blanco', hex: '#ffffff' },
    { name: 'rojo', hex: '#ff0000' },
    { name: 'verde', hex: '#008000' },
    { name: 'amarillo', hex: '#ffff00' },
    { name: 'azul', hex: '#0000ff' },
    { name: 'marrón', hex: '#8b4513' },
    { name: 'naranja', hex: '#ffa500' },
    { name: 'rosa', hex: '#ffc0cb' },
    { name: 'morado', hex: '#800080' },
    { name: 'gris', hex: '#808080' },
    // Spanish sometimes has celeste as a basic term
    { name: 'celeste', hex: '#87ceeb' },
  ],
  extended: [
    { name: 'turquesa', hex: '#40e0d0' },
    { name: 'granate', hex: '#800020' },
    { name: 'beige', hex: '#f5f5dc' },
    { name: 'carmesí', hex: '#dc143c' },
    { name: 'lila', hex: '#c8a2c8' },
    { name: 'magenta', hex: '#ff00ff' },
    { name: 'fucsia', hex: '#ff00ff' },
    { name: 'dorado', hex: '#ffd700' },
    { name: 'plateado', hex: '#c0c0c0' },
    { name: 'salmón', hex: '#fa8072' },
    { name: 'coral', hex: '#ff7f50' },
    { name: 'verde oliva', hex: '#808000' },
    { name: 'borgoña', hex: '#722f37' },
    { name: 'índigo', hex: '#4b0082' },
    { name: 'ocre', hex: '#cc7722' },
    { name: 'esmeralda', hex: '#50c878' },
    { name: 'ámbar', hex: '#ffbf00' },
    { name: 'terracota', hex: '#e2725b' },
    { name: 'aguamarina', hex: '#7fffd4' },
    { name: 'bermellón', hex: '#e34234' },
  ],
};

// German (Deutsch)
const de: LocaleDef = {
  locale: 'de',
  source: 'uw+research',
  basic: [
    { name: 'schwarz', hex: '#000000' },
    { name: 'weiß', hex: '#ffffff' },
    { name: 'rot', hex: '#ff0000' },
    { name: 'grün', hex: '#008000' },
    { name: 'gelb', hex: '#ffff00' },
    { name: 'blau', hex: '#0000ff' },
    { name: 'braun', hex: '#8b4513' },
    { name: 'orange', hex: '#ffa500' },
    { name: 'rosa', hex: '#ffc0cb' },
    { name: 'lila', hex: '#800080' },
    { name: 'grau', hex: '#808080' },
  ],
  extended: [
    { name: 'türkis', hex: '#40e0d0' },
    { name: 'beige', hex: '#f5f5dc' },
    { name: 'hellblau', hex: '#87ceeb' },
    { name: 'dunkelblau', hex: '#00008b' },
    { name: 'dunkelgrün', hex: '#006400' },
    { name: 'hellgrün', hex: '#90ee90' },
    { name: 'violett', hex: '#800080' },
    { name: 'magenta', hex: '#ff00ff' },
    { name: 'gold', hex: '#ffd700' },
    { name: 'silber', hex: '#c0c0c0' },
    { name: 'olive', hex: '#808000' },
    { name: 'bordeaux', hex: '#800020' },
    { name: 'lachs', hex: '#fa8072' },
    { name: 'koralle', hex: '#ff7f50' },
    { name: 'indigo', hex: '#4b0082' },
    { name: 'khaki', hex: '#c3b091' },
    { name: 'ocker', hex: '#cc7722' },
    { name: 'smaragd', hex: '#50c878' },
    { name: 'kupfer', hex: '#b87333' },
    { name: 'weinrot', hex: '#722f37' },
  ],
};

// French (Français)
const fr: LocaleDef = {
  locale: 'fr',
  source: 'uw+research',
  basic: [
    { name: 'noir', hex: '#000000' },
    { name: 'blanc', hex: '#ffffff' },
    { name: 'rouge', hex: '#ff0000' },
    { name: 'vert', hex: '#008000' },
    { name: 'jaune', hex: '#ffff00' },
    { name: 'bleu', hex: '#0000ff' },
    { name: 'marron', hex: '#8b4513' },
    { name: 'orange', hex: '#ffa500' },
    { name: 'rose', hex: '#ffc0cb' },
    { name: 'violet', hex: '#800080' },
    { name: 'gris', hex: '#808080' },
  ],
  extended: [
    { name: 'turquoise', hex: '#40e0d0' },
    { name: 'beige', hex: '#f5f5dc' },
    { name: 'bordeaux', hex: '#800020' },
    { name: 'saumon', hex: '#fa8072' },
    { name: 'corail', hex: '#ff7f50' },
    { name: 'mauve', hex: '#e0b0ff' },
    { name: 'lilas', hex: '#c8a2c8' },
    { name: 'magenta', hex: '#ff00ff' },
    { name: 'doré', hex: '#ffd700' },
    { name: 'argenté', hex: '#c0c0c0' },
    { name: 'indigo', hex: '#4b0082' },
    { name: 'kaki', hex: '#c3b091' },
    { name: 'ocre', hex: '#cc7722' },
    { name: 'émeraude', hex: '#50c878' },
    { name: 'pourpre', hex: '#800080' },
    { name: 'cyan', hex: '#00ffff' },
    { name: 'fuchsia', hex: '#ff00ff' },
    { name: 'bourgogne', hex: '#722f37' },
    { name: 'cuivre', hex: '#b87333' },
    { name: 'terre cuite', hex: '#e2725b' },
  ],
};

// Portuguese (Português)
const pt: LocaleDef = {
  locale: 'pt',
  source: 'uw+research',
  basic: [
    { name: 'preto', hex: '#000000' },
    { name: 'branco', hex: '#ffffff' },
    { name: 'vermelho', hex: '#ff0000' },
    { name: 'verde', hex: '#008000' },
    { name: 'amarelo', hex: '#ffff00' },
    { name: 'azul', hex: '#0000ff' },
    { name: 'marrom', hex: '#8b4513' },
    { name: 'laranja', hex: '#ffa500' },
    { name: 'rosa', hex: '#ffc0cb' },
    { name: 'roxo', hex: '#800080' },
    { name: 'cinza', hex: '#808080' },
  ],
  extended: [
    { name: 'turquesa', hex: '#40e0d0' },
    { name: 'bege', hex: '#f5f5dc' },
    { name: 'bordô', hex: '#800020' },
    { name: 'salmão', hex: '#fa8072' },
    { name: 'coral', hex: '#ff7f50' },
    { name: 'lilás', hex: '#c8a2c8' },
    { name: 'magenta', hex: '#ff00ff' },
    { name: 'dourado', hex: '#ffd700' },
    { name: 'prateado', hex: '#c0c0c0' },
    { name: 'índigo', hex: '#4b0082' },
    { name: 'caqui', hex: '#c3b091' },
    { name: 'esmeralda', hex: '#50c878' },
    { name: 'carmim', hex: '#dc143c' },
    { name: 'ocre', hex: '#cc7722' },
    { name: 'ciano', hex: '#00ffff' },
    { name: 'terracota', hex: '#e2725b' },
    { name: 'vinho', hex: '#722f37' },
    { name: 'oliva', hex: '#808000' },
    { name: 'âmbar', hex: '#ffbf00' },
    { name: 'cobre', hex: '#b87333' },
  ],
};

// Persian (فارسی)
const fa: LocaleDef = {
  locale: 'fa',
  source: 'uw+research',
  basic: [
    { name: 'سیاه', hex: '#000000' },
    { name: 'سفید', hex: '#ffffff' },
    { name: 'قرمز', hex: '#ff0000' },
    { name: 'سبز', hex: '#008000' },
    { name: 'زرد', hex: '#ffff00' },
    { name: 'آبی', hex: '#0000ff' },
    { name: 'قهوه‌ای', hex: '#8b4513' },
    { name: 'نارنجی', hex: '#ffa500' },
    { name: 'صورتی', hex: '#ffc0cb' },
    { name: 'بنفش', hex: '#800080' },
    { name: 'خاکستری', hex: '#808080' },
  ],
  extended: [
    { name: 'فیروزه‌ای', hex: '#40e0d0' },
    { name: 'بژ', hex: '#f5f5dc' },
    { name: 'آبی آسمانی', hex: '#87ceeb' },
    { name: 'سبز تیره', hex: '#006400' },
    { name: 'آبی تیره', hex: '#00008b' },
    { name: 'زرشکی', hex: '#800020' },
    { name: 'طلایی', hex: '#ffd700' },
    { name: 'نقره‌ای', hex: '#c0c0c0' },
    { name: 'بادمجانی', hex: '#614051' },
    { name: 'یاسی', hex: '#c8a2c8' },
  ],
};

// Dutch (Nederlands)
const nl: LocaleDef = {
  locale: 'nl',
  source: 'uw+research',
  basic: [
    { name: 'zwart', hex: '#000000' },
    { name: 'wit', hex: '#ffffff' },
    { name: 'rood', hex: '#ff0000' },
    { name: 'groen', hex: '#008000' },
    { name: 'geel', hex: '#ffff00' },
    { name: 'blauw', hex: '#0000ff' },
    { name: 'bruin', hex: '#8b4513' },
    { name: 'oranje', hex: '#ffa500' },
    { name: 'roze', hex: '#ffc0cb' },
    { name: 'paars', hex: '#800080' },
    { name: 'grijs', hex: '#808080' },
  ],
  extended: [
    { name: 'turquoise', hex: '#40e0d0' },
    { name: 'beige', hex: '#f5f5dc' },
    { name: 'lichtblauw', hex: '#87ceeb' },
    { name: 'donkerblauw', hex: '#00008b' },
    { name: 'donkergroen', hex: '#006400' },
    { name: 'lichtgroen', hex: '#90ee90' },
    { name: 'magenta', hex: '#ff00ff' },
    { name: 'goud', hex: '#ffd700' },
    { name: 'zilver', hex: '#c0c0c0' },
    { name: 'bordeaux', hex: '#800020' },
  ],
};

// Polish (Polski)
const pl: LocaleDef = {
  locale: 'pl',
  source: 'uw+research',
  basic: [
    { name: 'czarny', hex: '#000000' },
    { name: 'biały', hex: '#ffffff' },
    { name: 'czerwony', hex: '#ff0000' },
    { name: 'zielony', hex: '#008000' },
    { name: 'żółty', hex: '#ffff00' },
    { name: 'niebieski', hex: '#0000ff' },
    { name: 'brązowy', hex: '#8b4513' },
    { name: 'pomarańczowy', hex: '#ffa500' },
    { name: 'różowy', hex: '#ffc0cb' },
    { name: 'fioletowy', hex: '#800080' },
    { name: 'szary', hex: '#808080' },
  ],
  extended: [
    { name: 'turkusowy', hex: '#40e0d0' },
    { name: 'beżowy', hex: '#f5f5dc' },
    { name: 'granatowy', hex: '#000080' },
    { name: 'bordowy', hex: '#800020' },
    { name: 'złoty', hex: '#ffd700' },
    { name: 'srebrny', hex: '#c0c0c0' },
    { name: 'purpurowy', hex: '#800080' },
    { name: 'koralowy', hex: '#ff7f50' },
    { name: 'oliwkowy', hex: '#808000' },
    { name: 'khaki', hex: '#c3b091' },
  ],
};

// Swedish (Svenska)
const sv: LocaleDef = {
  locale: 'sv',
  source: 'uw+research',
  basic: [
    { name: 'svart', hex: '#000000' },
    { name: 'vit', hex: '#ffffff' },
    { name: 'röd', hex: '#ff0000' },
    { name: 'grön', hex: '#008000' },
    { name: 'gul', hex: '#ffff00' },
    { name: 'blå', hex: '#0000ff' },
    { name: 'brun', hex: '#8b4513' },
    { name: 'orange', hex: '#ffa500' },
    { name: 'rosa', hex: '#ffc0cb' },
    { name: 'lila', hex: '#800080' },
    { name: 'grå', hex: '#808080' },
  ],
  extended: [
    { name: 'turkos', hex: '#40e0d0' },
    { name: 'beige', hex: '#f5f5dc' },
    { name: 'marinblå', hex: '#000080' },
    { name: 'guld', hex: '#ffd700' },
    { name: 'silver', hex: '#c0c0c0' },
    { name: 'vinröd', hex: '#722f37' },
    { name: 'ljusblå', hex: '#87ceeb' },
    { name: 'mörkblå', hex: '#00008b' },
    { name: 'ljusgrön', hex: '#90ee90' },
    { name: 'mörkgrön', hex: '#006400' },
  ],
};

// Finnish (Suomi)
const fi: LocaleDef = {
  locale: 'fi',
  source: 'uw+research',
  basic: [
    { name: 'musta', hex: '#000000' },
    { name: 'valkoinen', hex: '#ffffff' },
    { name: 'punainen', hex: '#ff0000' },
    { name: 'vihreä', hex: '#008000' },
    { name: 'keltainen', hex: '#ffff00' },
    { name: 'sininen', hex: '#0000ff' },
    { name: 'ruskea', hex: '#8b4513' },
    { name: 'oranssi', hex: '#ffa500' },
    { name: 'pinkki', hex: '#ffc0cb' },
    { name: 'violetti', hex: '#800080' },
    { name: 'harmaa', hex: '#808080' },
  ],
  extended: [
    { name: 'turkoosi', hex: '#40e0d0' },
    { name: 'beige', hex: '#f5f5dc' },
    { name: 'laivastonsininen', hex: '#000080' },
    { name: 'kulta', hex: '#ffd700' },
    { name: 'hopea', hex: '#c0c0c0' },
    { name: 'viininpunainen', hex: '#722f37' },
    { name: 'vaaleansininen', hex: '#87ceeb' },
    { name: 'tummansininen', hex: '#00008b' },
    { name: 'vaaleanvihreä', hex: '#90ee90' },
    { name: 'tummanvihreä', hex: '#006400' },
  ],
};

// Generate all locale files
const locales: LocaleDef[] = [ja, zh, ko, ru, es, de, fr, pt, fa, nl, pl, sv, fi];
const traditionals: LocaleDef[] = [ja_traditional, zh_traditional, ko_traditional];

for (const def of locales) {
  const content = generateFile(def);
  const path = `./src/locales/${def.locale}.ts`;
  await Bun.write(path, content);
  console.log(`Generated ${path} (${def.basic.length} basic + ${def.extended?.length ?? 0} extended)`);
}

for (const def of traditionals) {
  const suffix = def.locale === 'ja' ? 'ja-traditional' : def.locale === 'zh' ? 'zh-traditional' : 'ko-traditional';
  const content = generateFile(def);
  const path = `./src/locales/${suffix}.ts`;
  await Bun.write(path, content);
  console.log(`Generated ${path} (${def.traditional?.length ?? 0} traditional)`);
}

console.log('\nDone! All locale files generated.');

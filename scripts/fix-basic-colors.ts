/**
 * Fix Berlin-Kay basic colors across all locales.
 *
 * For each locale:
 * 1. Identify which basic names are Berlin-Kay terms and which are not
 * 2. Move non-Berlin-Kay colors from basic → extended (prepend)
 * 3. Move Berlin-Kay colors from extended → basic (if they exist there)
 * 4. For missing Berlin-Kay terms, add them using en.ts reference OkLab values
 * 5. Add // colorName comments above each Float32Array triplet
 */

import { readdir } from 'node:fs/promises';

// en.ts reference OkLab values for each Berlin-Kay term
const enReference: Record<string, [number, number, number]> = {
  black:  [0, 0, 0],
  white:  [1, 0, 0],
  red:    [0.627955, 0.224863, 0.125846],
  green:  [0.519752, -0.140302, 0.107676],
  yellow: [0.967983, -0.071369, 0.19857],
  blue:   [0.452014, -0.032457, -0.311528],
  brown:  [0.470784, 0.070809, 0.08696],
  orange: [0.792688, 0.056611, 0.161385],
  pink:   [0.867738, 0.07298, 0.009071],
  purple: [0.420914, 0.164704, -0.101472],
  grey:   [0.599871, 0, 0],
};

const berlinKayKeys = Object.keys(enReference);

// Berlin-Kay translations for each locale
// Maps locale code → { berlinKayEnglish: localTranslation }
const berlinKay: Record<string, Record<string, string>> = {
  aa: { black: 'black', white: 'white', red: 'red', green: 'green', yellow: 'yellow', blue: 'blue', brown: 'brown', orange: 'orange', pink: 'pink', purple: 'purple', grey: 'grey' },
  ab: { black: 'чёрный', white: 'белый', red: 'красный', green: 'зелёный', yellow: 'жёлтый', blue: 'синий', brown: 'коричневый', orange: 'оранжевый', pink: 'розовый', purple: 'фиолетовый', grey: 'серый' },
  af: { black: 'swart', white: 'wit', red: 'rooi', green: 'groen', yellow: 'geel', blue: 'blou', brown: 'bruin', orange: 'oranje', pink: 'pienk', purple: 'pers', grey: 'grys' },
  ak: { black: 'tuntum', white: 'fitaa', red: 'kɔkɔɔ', green: 'ahabammono', yellow: 'akokɔ srade', blue: 'bruu', brown: 'brown', orange: 'orange', pink: 'pink', purple: 'purple', grey: 'grey' },
  am: { black: 'ጥቁር', white: 'ነጭ', red: 'ቀይ', green: 'አረንጓዴ', yellow: 'ቢጫ', blue: 'ሰማያዊ', brown: 'ቡናማ', orange: 'ብርቱካናማ', pink: 'ሮዝ', purple: 'ሐምራዊ', grey: 'ግራጫ' },
  ar: { black: 'أسود', white: 'أبيض', red: 'أحمر', green: 'أخضر', yellow: 'اصفر', blue: 'أزرق', brown: 'بني', orange: 'برتقالي', pink: 'وردي', purple: 'بنفسجي', grey: 'رمادي' },
  az: { black: 'qara', white: 'ağ', red: 'qırmızı', green: 'yaşıl', yellow: 'sarı', blue: 'göy', brown: 'qəhvəyi', orange: 'narıncı', pink: 'çəhrayı', purple: 'bənövşəyi', grey: 'boz' },
  bg: { black: 'черно', white: 'бяло', red: 'червено', green: 'зелено', yellow: 'жълто', blue: 'синьо', brown: 'кафяво', orange: 'оранжево', pink: 'розово', purple: 'лилаво', grey: 'сиво' },
  bn: { black: 'কালো', white: 'সাদা', red: 'লাল', green: 'সবুজ', yellow: 'হলুদ', blue: 'নীল', brown: 'বাদামি', orange: 'কমলা', pink: 'গোলাপি', purple: 'বেগুনি', grey: 'ধূসর' },
  ca: { black: 'negre', white: 'blanc', red: 'vermell', green: 'verd', yellow: 'groc', blue: 'blau', brown: 'marró', orange: 'taronja', pink: 'rosa', purple: 'lila', grey: 'gris' },
  cr: { black: 'black', white: 'white', red: 'red', green: 'green', yellow: 'yellow', blue: 'blue', brown: 'brown', orange: 'orange', pink: 'pink', purple: 'purple', grey: 'grey' },
  cs: { black: 'černá', white: 'bílá', red: 'červená', green: 'zelená', yellow: 'žlutá', blue: 'modrá', brown: 'hnědá', orange: 'oranžová', pink: 'růžová', purple: 'fialová', grey: 'šedá' },
  cy: { black: 'du', white: 'gwyn', red: 'coch', green: 'gwyrdd', yellow: 'melyn', blue: 'glas', brown: 'brown', orange: 'oren', pink: 'pinc', purple: 'porffor', grey: 'llwyd' },
  da: { black: 'sort', white: 'hvid', red: 'rød', green: 'grøn', yellow: 'gul', blue: 'blå', brown: 'brun', orange: 'orange', pink: 'pink', purple: 'lilla', grey: 'grå' },
  de: { black: 'schwarz', white: 'weiß', red: 'rot', green: 'grün', yellow: 'gelb', blue: 'blau', brown: 'braun', orange: 'orange', pink: 'pink', purple: 'lila', grey: 'grau' },
  el: { black: 'μαύρο', white: 'λευκό', red: 'κόκκινο', green: 'πράσινο', yellow: 'κίτρινο', blue: 'μπλε', brown: 'καφέ', orange: 'πορτοκαλί', pink: 'ροζ', purple: 'μωβ', grey: 'γκρι' },
  es: { black: 'negro', white: 'blanco', red: 'rojo', green: 'verde', yellow: 'amarillo', blue: 'azul', brown: 'marrón', orange: 'naranja', pink: 'rosa', purple: 'morado', grey: 'gris' },
  et: { black: 'must', white: 'valge', red: 'punane', green: 'roheline', yellow: 'kollane', blue: 'sinine', brown: 'pruun', orange: 'oranž', pink: 'roosa', purple: 'lilla', grey: 'hall' },
  fa: { black: 'سیاه', white: 'سفید', red: 'قرمز', green: 'سبز', yellow: 'زرد', blue: 'آبی', brown: 'قهوه‌ای', orange: 'نارنجی', pink: 'صورتی', purple: 'بنفش', grey: 'خاکستری' },
  fi: { black: 'musta', white: 'valkoinen', red: 'punainen', green: 'vihreä', yellow: 'keltainen', blue: 'sininen', brown: 'ruskea', orange: 'oranssi', pink: 'vaaleanpunainen', purple: 'violetti', grey: 'harmaa' },
  fr: { black: 'noir', white: 'blanc', red: 'rouge', green: 'vert', yellow: 'jaune', blue: 'bleu', brown: 'marron', orange: 'orange', pink: 'rose', purple: 'violet', grey: 'gris' },
  ga: { black: 'dubh', white: 'bán', red: 'dearg', green: 'glas', yellow: 'buí', blue: 'gorm', brown: 'donn', orange: 'oráiste', pink: 'bándearg', purple: 'corcra', grey: 'liath' },
  gu: { black: 'કાળો', white: 'સફેદ', red: 'લાલ', green: 'લીલો', yellow: 'પીળો', blue: 'વાદળી', brown: 'ભૂરો', orange: 'નારંગી', pink: 'ગુલાબી', purple: 'જાંબલી', grey: 'રાખોડી' },
  he: { black: 'שחור', white: 'לבן', red: 'אדום', green: 'ירוק', yellow: 'צהוב', blue: 'כחול', brown: 'חום', orange: 'כתום', pink: 'ורוד', purple: 'סגול', grey: 'אפור' },
  hi: { black: 'काला', white: 'सफ़ेद', red: 'लाल', green: 'हरा', yellow: 'पीला', blue: 'नीला', brown: 'भूरा', orange: 'नारंगी', pink: 'गुलाबी', purple: 'बैंगनी', grey: 'स्लेटी' },
  hr: { black: 'crna', white: 'bijela', red: 'crvena', green: 'zelena', yellow: 'žuta', blue: 'plava', brown: 'smeđa', orange: 'narančasta', pink: 'roza', purple: 'ljubičasta', grey: 'siva' },
  hu: { black: 'fekete', white: 'fehér', red: 'piros', green: 'zöld', yellow: 'sárga', blue: 'kék', brown: 'barna', orange: 'narancssárga', pink: 'rózsaszín', purple: 'lila', grey: 'szürke' },
  id: { black: 'hitam', white: 'putih', red: 'merah', green: 'hijau', yellow: 'kuning', blue: 'biru', brown: 'coklat', orange: 'oranye', pink: 'merah muda', purple: 'ungu', grey: 'abu-abu' },
  is: { black: 'svartur', white: 'hvítur', red: 'rauður', green: 'grænn', yellow: 'gulur', blue: 'blár', brown: 'brúnn', orange: 'appelsínugulur', pink: 'bleikur', purple: 'fjólublár', grey: 'grár' },
  it: { black: 'nero', white: 'bianco', red: 'rosso', green: 'verde', yellow: 'giallo', blue: 'blu', brown: 'marrone', orange: 'arancione', pink: 'rosa', purple: 'viola', grey: 'grigio' },
  ja: { black: '黒', white: '白', red: '赤', green: '緑', yellow: '黄色', blue: '青', brown: '茶色', orange: 'オレンジ', pink: 'ピンク', purple: '紫', grey: '灰色' },
  ka: { black: 'შავი', white: 'თეთრი', red: 'წითელი', green: 'მწვანე', yellow: 'ყვითელი', blue: 'ლურჯი', brown: 'ყავისფერი', orange: 'ნარინჯისფერი', pink: 'ვარდისფერი', purple: 'იასამნისფერი', grey: 'ნაცრისფერი' },
  kn: { black: 'ಕಪ್ಪು', white: 'ಬಿಳಿ', red: 'ಕೆಂಪು', green: 'ಹಸಿರು', yellow: 'ಹಳದಿ', blue: 'ನೀಲಿ', brown: 'ಕಂದು', orange: 'ಕಿತ್ತಳೆ', pink: 'ಗುಲಾಬಿ', purple: 'ನೇರಳೆ', grey: 'ಬೂದು' },
  ko: { black: '검정색', white: '흰색', red: '빨강색', green: '초록색', yellow: '노랑색', blue: '파랑색', brown: '갈색', orange: '주황색', pink: '분홍색', purple: '보라색', grey: '회색' },
  lb: { black: 'schwaarz', white: 'wäiss', red: 'rout', green: 'gréng', yellow: 'giel', blue: 'blo', brown: 'brong', orange: 'orange', pink: 'pink', purple: 'mauve', grey: 'gro' },
  lt: { black: 'juoda', white: 'balta', red: 'raudona', green: 'žalia', yellow: 'geltona', blue: 'mėlyna', brown: 'ruda', orange: 'oranžinė', pink: 'rožinė', purple: 'violetinė', grey: 'pilka' },
  lv: { black: 'melns', white: 'balts', red: 'sarkans', green: 'zaļš', yellow: 'dzeltens', blue: 'zils', brown: 'brūns', orange: 'oranžs', pink: 'rozā', purple: 'violets', grey: 'pelēks' },
  mk: { black: 'црна', white: 'бела', red: 'црвена', green: 'зелена', yellow: 'жолта', blue: 'сина', brown: 'кафеава', orange: 'портокалова', pink: 'розова', purple: 'виолетова', grey: 'сива' },
  ml: { black: 'കറുപ്പ്', white: 'വെള്ള', red: 'ചുവപ്പ്', green: 'പച്ച', yellow: 'മഞ്ഞ', blue: 'നീല', brown: 'തവിട്ട്', orange: 'ഓറഞ്ച്', pink: 'പിങ്ക്', purple: 'പർപ്പിൾ', grey: 'ചാരനിറം' },
  ms: { black: 'hitam', white: 'putih', red: 'merah', green: 'hijau', yellow: 'kuning', blue: 'biru', brown: 'coklat', orange: 'oren', pink: 'merah jambu', purple: 'ungu', grey: 'kelabu' },
  my: { black: 'အနက်ရောင်', white: 'အဖြူရောင်', red: 'အနီရောင်', green: 'အစိမ်းရောင်', yellow: 'အဝါရောင်', blue: 'အပြာရောင်', brown: 'အညိုရောင်', orange: 'လိမ္မော်ရောင်', pink: 'ပန်းရောင်', purple: 'ခရမ်းရောင်', grey: 'မီးခိုးရောင်' },
  na: { black: '黑色', white: '白色', red: '红色', green: '绿色', yellow: '黄色', blue: '蓝色', brown: '棕色', orange: '橙色', pink: '粉色', purple: '紫色', grey: '灰色' },
  nb: { black: 'svart', white: 'hvit', red: 'rød', green: 'grønn', yellow: 'gul', blue: 'blå', brown: 'brun', orange: 'oransje', pink: 'rosa', purple: 'lilla', grey: 'grå' },
  ne: { black: 'कालो', white: 'सेतो', red: 'रातो', green: 'हरियो', yellow: 'पहेँलो', blue: 'नीलो', brown: 'खैरो', orange: 'सुन्तला', pink: 'गुलाबी', purple: 'बैजनी', grey: 'खरानी' },
  nl: { black: 'zwart', white: 'wit', red: 'rood', green: 'groen', yellow: 'geel', blue: 'blauw', brown: 'bruin', orange: 'oranje', pink: 'roze', purple: 'paars', grey: 'grijs' },
  nn: { black: 'svart', white: 'kvit', red: 'raud', green: 'grøn', yellow: 'gul', blue: 'blå', brown: 'brun', orange: 'oransje', pink: 'rosa', purple: 'lilla', grey: 'grå' },
  no: { black: 'svart', white: 'hvit', red: 'rød', green: 'grønn', yellow: 'gul', blue: 'blå', brown: 'brun', orange: 'oransje', pink: 'rosa', purple: 'lilla', grey: 'grå' },
  ny: { black: 'black', white: 'white', red: 'red', green: 'green', yellow: 'yellow', blue: 'blue', brown: 'brown', orange: 'orange', pink: 'pink', purple: 'purple', grey: 'grey' },
  oc: { black: 'black', white: 'white', red: 'red', green: 'green', yellow: 'yellow', blue: 'blue', brown: 'brown', orange: 'orange', pink: 'pink', purple: 'purple', grey: 'grey' },
  pa: { black: 'kala', white: 'chitta', red: 'lal', green: 'hara', yellow: 'peela', blue: 'neela', brown: 'bhura', orange: 'narangi', pink: 'gulabi', purple: 'jamnee', grey: 'sleti' },
  pl: { black: 'czarny', white: 'biały', red: 'czerwony', green: 'zielony', yellow: 'żółty', blue: 'niebieski', brown: 'brązowy', orange: 'pomarańczowy', pink: 'różowy', purple: 'fioletowy', grey: 'szary' },
  ps: { black: 'tor', white: 'spin', red: 'surkh', green: 'zarghun', yellow: 'jar', blue: 'asmani', brown: 'nswari', orange: 'maltae', pink: 'sherchae', purple: 'banjari', grey: 'kherzai' },
  pt: { black: 'preto', white: 'branco', red: 'vermelho', green: 'verde', yellow: 'amarelo', blue: 'azul', brown: 'marrom', orange: 'laranja', pink: 'rosa', purple: 'roxo', grey: 'cinza' },
  ro: { black: 'negru', white: 'alb', red: 'roșu', green: 'verde', yellow: 'galben', blue: 'albastru', brown: 'maro', orange: 'portocaliu', pink: 'roz', purple: 'mov', grey: 'gri' },
  ru: { black: 'черный', white: 'белый', red: 'красный', green: 'зеленый', yellow: 'желтый', blue: 'синий', brown: 'коричневый', orange: 'оранжевый', pink: 'розовый', purple: 'фиолетовый', grey: 'серый' },
  si: { black: 'කළු', white: 'සුදු', red: 'රතු', green: 'කොළ', yellow: 'කහ', blue: 'නිල්', brown: 'දුඹුරු', orange: 'තැඹිලි', pink: 'රෝස', purple: 'දම්', grey: 'අළු' },
  sk: { black: 'čierna', white: 'biela', red: 'červená', green: 'zelená', yellow: 'žltá', blue: 'modrá', brown: 'hnedá', orange: 'oranžová', pink: 'ružová', purple: 'fialová', grey: 'sivá' },
  sl: { black: 'črna', white: 'bela', red: 'rdeča', green: 'zelena', yellow: 'rumena', blue: 'modra', brown: 'rjava', orange: 'oranžna', pink: 'roza', purple: 'vijolična', grey: 'siva' },
  sm: { black: 'uliuli', white: 'pa\'epa\'e', red: 'mumu', green: 'meamata', yellow: 'samasama', blue: 'moana', brown: 'enaena', orange: 'moli', pink: 'pigiki', purple: 'viole', grey: 'efuefu' },
  so: { black: 'madow', white: 'cad', red: 'cas', green: 'cagaar', yellow: 'huruud', blue: 'blue', brown: 'brown', orange: 'orange', pink: 'pink', purple: 'purple', grey: 'grey' },
  sq: { black: 'e zezë', white: 'e bardhë', red: 'e kuqe', green: 'e gjelbër', yellow: 'e verdhë', blue: 'blu', brown: 'kafe', orange: 'portokalli', pink: 'rozë', purple: 'vjollcë', grey: 'gri' },
  sr: { black: 'црна', white: 'бела', red: 'црвена', green: 'зелена', yellow: 'жута', blue: 'плава', brown: 'браон', orange: 'наранџаста', pink: 'розе', purple: 'љубичаста', grey: 'сива' },
  su: { black: 'hideung', white: 'bodas', red: 'beureum', green: 'héjo', yellow: 'konéng', blue: 'biru', brown: 'coklat', orange: 'oranye', pink: 'pink', purple: 'ungu', grey: 'abu' },
  sv: { black: 'svart', white: 'vit', red: 'röd', green: 'grön', yellow: 'gul', blue: 'blå', brown: 'brun', orange: 'orange', pink: 'rosa', purple: 'lila', grey: 'grå' },
  ta: { black: 'கருப்பு', white: 'வெள்ளை', red: 'சிவப்பு', green: 'பச்சை', yellow: 'மஞ்சள்', blue: 'நீலம்', brown: 'பழுப்பு', orange: 'ஆரஞ்சு', pink: 'இளஞ்சிவப்பு', purple: 'ஊதா', grey: 'சாம்பல்' },
  te: { black: 'నల్లం', white: 'తెలుపు', red: 'ఎరుపు', green: 'ఆకుపచ్చ', yellow: 'పసుపు', blue: 'నీలం', brown: 'గోధుమ', orange: 'నారింజ', pink: 'గులాబీ', purple: 'ఊదా', grey: 'బూడిద' },
  th: { black: 'ดำ', white: 'ขาว', red: 'แดง', green: 'เขียว', yellow: 'เหลือง', blue: 'น้ำเงิน', brown: 'น้ำตาล', orange: 'ส้ม', pink: 'ชมพู', purple: 'ม่วง', grey: 'เทา' },
  tl: { black: 'itim', white: 'puti', red: 'pula', green: 'berde', yellow: 'dilaw', blue: 'asul', brown: 'kayumanggi', orange: 'kahel', pink: 'rosas', purple: 'lila', grey: 'abo' },
  tr: { black: 'siyah', white: 'beyaz', red: 'kırmızı', green: 'yeşil', yellow: 'sarı', blue: 'mavi', brown: 'kahverengi', orange: 'turuncu', pink: 'pembe', purple: 'mor', grey: 'gri' },
  ur: { black: 'سیاہ', white: 'سفید', red: 'سرخ', green: 'سبز', yellow: 'پیلا', blue: 'نیلا', brown: 'بھورا', orange: 'نارنجی', pink: 'گلابی', purple: 'جامنی', grey: 'سلیٹی' },
  vi: { black: 'đen', white: 'trắng', red: 'đỏ', green: 'xanh lá', yellow: 'vàng', blue: 'xanh dương', brown: 'nâu', orange: 'cam', pink: 'hồng', purple: 'tím', grey: 'xám' },
  zh: { black: '黑色', white: '白色', red: '红色', green: '绿色', yellow: '黄色', blue: '蓝色', brown: '棕色', orange: '橙色', pink: '粉色', purple: '紫色', grey: '灰色' },
};

// Locales that should only get comments, no name changes
// (fewer than 11 basic terms, or traditional-only)
const commentOnlyLocales = new Set([
  'so', 'ab', 'cy', 'na', 'oc', 'pa', 'ps',
  'ja-traditional', 'ko-traditional', 'zh-traditional',
  'en', 'uk',
]);

// Locales where basic names are in English (survey artifacts)
const englishBasicLocales = new Set([
  'aa', 'cr', 'ny', 'oc', 'ak', 'kn', 'sm',
]);

const localesDir = `${import.meta.dir}/../src/locales`;

function normalizeColorName(name: string): string {
  return name.toLowerCase().trim();
}

interface ParsedLocale {
  header: string; // everything before basic/extended/traditional
  basic?: { names: string[]; colors: number[][] };
  extended?: { names: string[]; colors: number[][] };
  traditional?: { names: string[]; colors: number[][] };
  trailer: string; // closing of the object
}

function parseFloat32Block(block: string): number[][] {
  const triplets: number[][] = [];
  // Match all floating point numbers
  const nums = block.match(/-?\d+\.?\d*/g);
  if (!nums) return triplets;
  for (let i = 0; i < nums.length; i += 3) {
    triplets.push([
      parseFloat(nums[i]),
      parseFloat(nums[i + 1]),
      parseFloat(nums[i + 2]),
    ]);
  }
  return triplets;
}

function parseNamesArray(block: string): string[] {
  const names: string[] = [];
  const regex = /'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"/g;
  let m;
  while ((m = regex.exec(block)) !== null) {
    // Unescape the captured name
    const raw = m[1] ?? m[2];
    names.push(raw.replace(/\\'/g, "'").replace(/\\\\/g, '\\'));
  }
  return names;
}

function parseTier(content: string, tierName: string): { names: string[]; colors: number[][]; startIdx: number; endIdx: number } | null {
  // Find the tier block: "basic: {" or "extended: {" or "traditional: {"
  const tierStart = content.indexOf(`${tierName}: {`);
  if (tierStart === -1) return null;

  // Find the matching closing brace
  let depth = 0;
  let startBrace = -1;
  for (let i = tierStart; i < content.length; i++) {
    if (content[i] === '{') {
      if (startBrace === -1) startBrace = i;
      depth++;
    } else if (content[i] === '}') {
      depth--;
      if (depth === 0) {
        const block = content.slice(startBrace, i + 1);

        // Extract names block
        const namesStart = block.indexOf('names:');
        const namesArrayStart = block.indexOf('[', namesStart);
        const namesArrayEnd = block.indexOf(']', namesArrayStart);
        const namesBlock = block.slice(namesArrayStart, namesArrayEnd + 1);

        // Extract colors block
        const colorsStart = block.indexOf('colors:');
        const float32Start = block.indexOf('([', colorsStart);
        const float32End = block.indexOf('])', float32Start);
        const colorsBlock = block.slice(float32Start, float32End + 2);

        return {
          names: parseNamesArray(namesBlock),
          colors: parseFloat32Block(colorsBlock),
          startIdx: tierStart,
          endIdx: i + 1,
        };
      }
    }
  }
  return null;
}

function formatTriplet(vals: number[]): string {
  return vals.map(v => {
    if (v === 0) return '0';
    if (v === 1) return '1';
    return v.toString();
  }).join(', ');
}

function generateTierBlock(tierName: string, names: string[], colors: number[][], indent: string = '  '): string {
  let out = `${indent}${tierName}: {\n`;
  out += `${indent}  names: [\n`;
  for (let i = 0; i < names.length; i++) {
    const comma = i < names.length - 1 ? ',' : ',';
    out += `${indent}    '${names[i].replace(/'/g, "\\'")}'${comma}\n`;
  }
  out += `${indent}  ],\n`;
  out += `${indent}  colors: new Float32Array([\n`;
  for (let i = 0; i < colors.length; i++) {
    out += `${indent}    // ${names[i]}\n`;
    const comma = i < colors.length - 1 ? ',' : ',';
    out += `${indent}    ${formatTriplet(colors[i])}${comma}\n`;
  }
  out += `${indent}  ]),\n`;
  out += `${indent}}`;
  return out;
}

async function processLocale(filename: string) {
  const localeCode = filename.replace('.ts', '');
  const filePath = `${localesDir}/${filename}`;
  const content = await Bun.file(filePath).text();

  const isCommentOnly = commentOnlyLocales.has(localeCode);

  const basic = parseTier(content, 'basic');
  const extended = parseTier(content, 'extended');
  const traditional = parseTier(content, 'traditional');

  if (!basic && !traditional) {
    console.log(`  SKIP: no basic or traditional tier`);
    return;
  }

  // For traditional-only files (ja-traditional, ko-traditional, zh-traditional), just add comments
  if (!basic && traditional) {
    // Rebuild with comments
    const tradBlock = generateTierBlock('traditional', traditional.names, traditional.colors);
    const newContent = content.slice(0, traditional.startIdx) + tradBlock + ',' + content.slice(traditional.endIdx + 1);
    await Bun.write(filePath, newContent);
    console.log(`  Added comments to traditional tier`);
    return;
  }

  if (!basic) return;

  const bkMap = berlinKay[localeCode];

  if (isCommentOnly || !bkMap) {
    // Just add comments to existing tiers
    let newContent = content;

    // Rebuild basic with comments
    const basicBlock = generateTierBlock('basic', basic.names, basic.colors);
    // Also rebuild extended if it exists
    if (extended) {
      const extBlock = generateTierBlock('extended', extended.names, extended.colors);
      // We need to replace both. Find the range covering both.
      const firstStart = Math.min(basic.startIdx, extended.startIdx);
      const firstEnd = basic.startIdx < extended.startIdx ? basic.endIdx : extended.endIdx;
      const secondStart = basic.startIdx < extended.startIdx ? extended.startIdx : basic.startIdx;
      const secondEnd = Math.max(basic.endIdx, extended.endIdx);

      // Replace second first (to preserve indices), then first
      if (basic.startIdx < extended.startIdx) {
        newContent = content.slice(0, basic.startIdx) + basicBlock + ',' + content.slice(basic.endIdx + 1);
        // Recalculate extended position after basic replacement
        const offset = basicBlock.length + 1 - (basic.endIdx + 1 - basic.startIdx);
        newContent = newContent.slice(0, extended.startIdx + offset) + extBlock + ',' + newContent.slice(extended.endIdx + 1 + offset);
      } else {
        newContent = content.slice(0, extended.startIdx) + extBlock + ',' + content.slice(extended.endIdx + 1);
        const offset = extBlock.length + 1 - (extended.endIdx + 1 - extended.startIdx);
        newContent = newContent.slice(0, basic.startIdx + offset) + basicBlock + ',' + newContent.slice(basic.endIdx + 1 + offset);
      }
    } else {
      newContent = content.slice(0, basic.startIdx) + basicBlock + ',' + content.slice(basic.endIdx + 1);
    }

    // Also handle traditional tier if present
    if (traditional) {
      // Re-parse from newContent since positions shifted
      const tradInNew = parseTier(newContent, 'traditional');
      if (tradInNew) {
        const tradBlock = generateTierBlock('traditional', tradInNew.names, tradInNew.colors);
        newContent = newContent.slice(0, tradInNew.startIdx) + tradBlock + ',' + newContent.slice(tradInNew.endIdx + 1);
      }
    }

    await Bun.write(filePath, newContent);
    console.log(`  Added comments only`);
    return;
  }

  // Build reverse map: local name → berlin-kay key
  const localToBK: Record<string, string> = {};
  for (const [bk, local] of Object.entries(bkMap)) {
    localToBK[normalizeColorName(local)] = bk;
  }

  // Categorize current basic names
  const newBasicNames: string[] = [];
  const newBasicColors: number[][] = [];
  const movedToExtendedNames: string[] = [];
  const movedToExtendedColors: number[][] = [];
  const foundBKKeys = new Set<string>();

  for (let i = 0; i < basic.names.length; i++) {
    const normalized = normalizeColorName(basic.names[i]);
    const bkKey = localToBK[normalized];
    if (bkKey) {
      newBasicNames.push(basic.names[i]);
      newBasicColors.push(basic.colors[i]);
      foundBKKeys.add(bkKey);
    } else {
      // Not a Berlin-Kay term — move to extended
      movedToExtendedNames.push(basic.names[i]);
      movedToExtendedColors.push(basic.colors[i]);
    }
  }

  // Check extended for Berlin-Kay terms that should be in basic
  const remainingExtNames: string[] = [];
  const remainingExtColors: number[][] = [];

  if (extended) {
    for (let i = 0; i < extended.names.length; i++) {
      const normalized = normalizeColorName(extended.names[i]);
      const bkKey = localToBK[normalized];
      if (bkKey && !foundBKKeys.has(bkKey)) {
        // Move to basic
        newBasicNames.push(extended.names[i]);
        newBasicColors.push(extended.colors[i]);
        foundBKKeys.add(bkKey);
      } else {
        remainingExtNames.push(extended.names[i]);
        remainingExtColors.push(extended.colors[i]);
      }
    }
  }

  // Add missing Berlin-Kay terms using en.ts reference values
  for (const bkKey of berlinKayKeys) {
    if (!foundBKKeys.has(bkKey)) {
      const localName = bkMap[bkKey];
      newBasicNames.push(localName);
      newBasicColors.push([...enReference[bkKey]]);
      console.log(`    Added missing: ${bkKey} → ${localName}`);
    }
  }

  // Build new extended: moved items prepended to remaining extended
  const finalExtNames = [...movedToExtendedNames, ...remainingExtNames];
  const finalExtColors = [...movedToExtendedColors, ...remainingExtColors];

  // Rebuild the file
  // Find the region to replace (from first tier to last tier)
  const allTiers = [basic, extended, traditional].filter(Boolean) as Array<{ startIdx: number; endIdx: number }>;
  const regionStart = Math.min(...allTiers.map(t => t.startIdx));
  const regionEnd = Math.max(...allTiers.map(t => t.endIdx));

  let tiersBlock = generateTierBlock('basic', newBasicNames, newBasicColors);

  if (finalExtNames.length > 0) {
    tiersBlock += ',\n' + generateTierBlock('extended', finalExtNames, finalExtColors);
  }

  if (traditional) {
    tiersBlock += ',\n' + generateTierBlock('traditional', traditional.names, traditional.colors);
  }

  // Check what comes after the region — need to handle trailing comma
  let afterRegion = content.slice(regionEnd);
  // Remove leading comma and whitespace if present
  afterRegion = afterRegion.replace(/^,?\s*/, '');

  const newContent = content.slice(0, regionStart) + tiersBlock + ',\n  ' + afterRegion;

  await Bun.write(filePath, newContent);

  const movedOut = movedToExtendedNames.length;
  const movedIn = newBasicNames.length - basic.names.length + movedOut;
  console.log(`  Basic: ${basic.names.length} → ${newBasicNames.length} (moved out ${movedOut}, moved in/added ${movedIn})`);
}

async function main() {
  const files = (await readdir(localesDir))
    .filter(f => f.endsWith('.ts') && f !== 'index.ts')
    .sort();

  console.log(`Processing ${files.length} locale files...\n`);

  for (const file of files) {
    console.log(`${file}:`);
    await processLocale(file);
  }

  console.log('\nDone!');
}

main().catch(console.error);

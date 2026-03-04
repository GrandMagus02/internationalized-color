/**
 * Fix locale files:
 * 1. Replace `source: '...'` (singular string) with `sources: [...]` (array)
 * 2. Add `channels` block with translated labels where missing
 */

const UWDATA_URL = 'https://github.com/uwdata/color-naming-in-different-languages';

// Traditional variants keep their own source URLs
const traditionalSources: Record<string, string[]> = {
  'ja-traditional': ['https://ja.wikipedia.org/wiki/%E5%92%8C%E8%89%B2'],
  'ko-traditional': ['https://ko.wikipedia.org/wiki/%EC%98%A4%EB%B0%A9%EC%83%89'],
  'zh-traditional': ['https://zh.wikipedia.org/wiki/%E4%B8%AD%E5%9B%BD%E4%BC%A0%E7%BB%9F%E8%89%B2%E5%BD%A9'],
};

// Files that already have `sources:` and `channels:` — skip entirely
const SKIP_FILES = new Set(['en', 'my', 'nn', 'no', 'ru', 'uk']);
// Traditional variants: fix source but don't add channels
const TRADITIONAL_VARIANTS = new Set(['ja-traditional', 'ko-traditional', 'zh-traditional']);

// Channel label translations per locale
const channelTranslations: Record<string, { red: string; green: string; blue: string; hue: string; saturation: string; lightness: string; value: string; whiteness: string; blackness: string; chroma: string }> = {
  aa: { red: 'Red', green: 'Green', blue: 'Blue', hue: 'Hue', saturation: 'Saturation', lightness: 'Lightness', value: 'Value', whiteness: 'Whiteness', blackness: 'Blackness', chroma: 'Chroma' },
  ab: { red: 'Аҟаҧыр', green: 'Аиаҵәа', blue: 'Аҵәаа', hue: 'Аоттенок', saturation: 'Анасыщенность', lightness: 'Асветлота', value: 'Аҵакы', whiteness: 'Ашкәакәа', blackness: 'Аиқәаҵәа', chroma: 'Ахрома' },
  af: { red: 'Rooi', green: 'Groen', blue: 'Blou', hue: 'Kleur', saturation: 'Versadiging', lightness: 'Ligtheid', value: 'Waarde', whiteness: 'Witheid', blackness: 'Swartheid', chroma: 'Chroma' },
  ak: { red: 'Kɔkɔɔ', green: 'Ahabammono', blue: 'Bluu', hue: 'Hue', saturation: 'Saturation', lightness: 'Lightness', value: 'Value', whiteness: 'Whiteness', blackness: 'Blackness', chroma: 'Chroma' },
  am: { red: 'ቀይ', green: 'አረንጓዴ', blue: 'ሰማያዊ', hue: 'ቀለም', saturation: 'ሙላት', lightness: 'ብርሃን', value: 'ዋጋ', whiteness: 'ነጭነት', blackness: 'ጥቁርነት', chroma: 'ክሮማ' },
  ar: { red: 'أحمر', green: 'أخضر', blue: 'أزرق', hue: 'صبغة', saturation: 'تشبع', lightness: 'إضاءة', value: 'قيمة', whiteness: 'بياض', blackness: 'سواد', chroma: 'صفاء' },
  az: { red: 'Qırmızı', green: 'Yaşıl', blue: 'Mavi', hue: 'Ton', saturation: 'Doyğunluq', lightness: 'Parlaqlıq', value: 'Dəyər', whiteness: 'Ağlıq', blackness: 'Qaralıq', chroma: 'Xroma' },
  bg: { red: 'Червено', green: 'Зелено', blue: 'Синьо', hue: 'Тон', saturation: 'Наситеност', lightness: 'Светлост', value: 'Стойност', whiteness: 'Белота', blackness: 'Чернота', chroma: 'Хрома' },
  bn: { red: 'লাল', green: 'সবুজ', blue: 'নীল', hue: 'বর্ণ', saturation: 'পরিপৃক্তি', lightness: 'হালকাতা', value: 'মান', whiteness: 'সাদাত্ব', blackness: 'কালোত্ব', chroma: 'ক্রোমা' },
  ca: { red: 'Vermell', green: 'Verd', blue: 'Blau', hue: 'Tonalitat', saturation: 'Saturació', lightness: 'Lluminositat', value: 'Valor', whiteness: 'Blancor', blackness: 'Negror', chroma: 'Croma' },
  cr: { red: 'Red', green: 'Green', blue: 'Blue', hue: 'Hue', saturation: 'Saturation', lightness: 'Lightness', value: 'Value', whiteness: 'Whiteness', blackness: 'Blackness', chroma: 'Chroma' },
  cs: { red: 'Červená', green: 'Zelená', blue: 'Modrá', hue: 'Odstín', saturation: 'Sytost', lightness: 'Světlost', value: 'Hodnota', whiteness: 'Bělost', blackness: 'Černost', chroma: 'Chroma' },
  cy: { red: 'Coch', green: 'Gwyrdd', blue: 'Glas', hue: 'Arlliw', saturation: 'Dirlawnder', lightness: 'Goleuedd', value: 'Gwerth', whiteness: 'Gwynder', blackness: 'Duder', chroma: 'Croma' },
  da: { red: 'Rød', green: 'Grøn', blue: 'Blå', hue: 'Farvetone', saturation: 'Mætning', lightness: 'Lyshed', value: 'Værdi', whiteness: 'Hvidhed', blackness: 'Sorthed', chroma: 'Kroma' },
  de: { red: 'Rot', green: 'Grün', blue: 'Blau', hue: 'Farbton', saturation: 'Sättigung', lightness: 'Helligkeit', value: 'Wert', whiteness: 'Weißheit', blackness: 'Schwarzheit', chroma: 'Chroma' },
  el: { red: 'Κόκκινο', green: 'Πράσινο', blue: 'Μπλε', hue: 'Απόχρωση', saturation: 'Κορεσμός', lightness: 'Φωτεινότητα', value: 'Τιμή', whiteness: 'Λευκότητα', blackness: 'Μαυρότητα', chroma: 'Χρωματικότητα' },
  es: { red: 'Rojo', green: 'Verde', blue: 'Azul', hue: 'Tono', saturation: 'Saturación', lightness: 'Luminosidad', value: 'Valor', whiteness: 'Blancura', blackness: 'Negrura', chroma: 'Croma' },
  et: { red: 'Punane', green: 'Roheline', blue: 'Sinine', hue: 'Toon', saturation: 'Küllastus', lightness: 'Heledus', value: 'Väärtus', whiteness: 'Valgus', blackness: 'Mustus', chroma: 'Krooma' },
  fa: { red: 'قرمز', green: 'سبز', blue: 'آبی', hue: 'فام', saturation: 'اشباع', lightness: 'روشنایی', value: 'مقدار', whiteness: 'سفیدی', blackness: 'سیاهی', chroma: 'کروما' },
  fi: { red: 'Punainen', green: 'Vihreä', blue: 'Sininen', hue: 'Sävy', saturation: 'Kylläisyys', lightness: 'Valoisuus', value: 'Arvo', whiteness: 'Valkoisuus', blackness: 'Mustuus', chroma: 'Krooma' },
  fr: { red: 'Rouge', green: 'Vert', blue: 'Bleu', hue: 'Teinte', saturation: 'Saturation', lightness: 'Luminosité', value: 'Valeur', whiteness: 'Blancheur', blackness: 'Noirceur', chroma: 'Chroma' },
  ga: { red: 'Dearg', green: 'Glas', blue: 'Gorm', hue: 'Dath', saturation: 'Sáithiú', lightness: 'Éadromacht', value: 'Luach', whiteness: 'Báine', blackness: 'Duibhe', chroma: 'Cróma' },
  gu: { red: 'લાલ', green: 'લીલો', blue: 'વાદળી', hue: 'રંગછટા', saturation: 'સંતૃપ્તિ', lightness: 'હળવાશ', value: 'મૂલ્ય', whiteness: 'ધોળાશ', blackness: 'કાળાશ', chroma: 'ક્રોમા' },
  he: { red: 'אדום', green: 'ירוק', blue: 'כחול', hue: 'גוון', saturation: 'רוויה', lightness: 'בהירות', value: 'ערך', whiteness: 'לובן', blackness: 'שחרות', chroma: 'כרומה' },
  hi: { red: 'लाल', green: 'हरा', blue: 'नीला', hue: 'वर्ण', saturation: 'संतृप्ति', lightness: 'हल्कापन', value: 'मान', whiteness: 'सफ़ेदी', blackness: 'कालापन', chroma: 'क्रोमा' },
  hr: { red: 'Crvena', green: 'Zelena', blue: 'Plava', hue: 'Nijansa', saturation: 'Zasićenost', lightness: 'Svjetlina', value: 'Vrijednost', whiteness: 'Bjelina', blackness: 'Crnina', chroma: 'Kroma' },
  hu: { red: 'Vörös', green: 'Zöld', blue: 'Kék', hue: 'Árnyalat', saturation: 'Telítettség', lightness: 'Világosság', value: 'Érték', whiteness: 'Fehérség', blackness: 'Feketeség', chroma: 'Króma' },
  id: { red: 'Merah', green: 'Hijau', blue: 'Biru', hue: 'Corak', saturation: 'Saturasi', lightness: 'Kecerahan', value: 'Nilai', whiteness: 'Keputihan', blackness: 'Kehitaman', chroma: 'Kroma' },
  is: { red: 'Rauður', green: 'Grænn', blue: 'Blár', hue: 'Litblær', saturation: 'Mettun', lightness: 'Ljósleiki', value: 'Gildi', whiteness: 'Hvítleiki', blackness: 'Svartleiki', chroma: 'Króma' },
  it: { red: 'Rosso', green: 'Verde', blue: 'Blu', hue: 'Tonalità', saturation: 'Saturazione', lightness: 'Luminosità', value: 'Valore', whiteness: 'Bianchezza', blackness: 'Nerezza', chroma: 'Croma' },
  ja: { red: '赤', green: '緑', blue: '青', hue: '色相', saturation: '彩度', lightness: '明度', value: '値', whiteness: '白さ', blackness: '黒さ', chroma: '彩度' },
  ka: { red: 'წითელი', green: 'მწვანე', blue: 'ლურჯი', hue: 'ტონი', saturation: 'გაჯერება', lightness: 'სინათლე', value: 'მნიშვნელობა', whiteness: 'სითეთრე', blackness: 'სიშავე', chroma: 'ქრომა' },
  kn: { red: 'ಕೆಂಪು', green: 'ಹಸಿರು', blue: 'ನೀಲಿ', hue: 'ವರ್ಣ', saturation: 'ಸ್ಯಾಚುರೇಶನ್', lightness: 'ಹಗುರತೆ', value: 'ಮೌಲ್ಯ', whiteness: 'ಬಿಳಿತನ', blackness: 'ಕಪ್ಪುತನ', chroma: 'ಕ್ರೋಮಾ' },
  ko: { red: '빨강', green: '초록', blue: '파랑', hue: '색상', saturation: '채도', lightness: '명도', value: '값', whiteness: '백색도', blackness: '흑색도', chroma: '채도' },
  lb: { red: 'Rout', green: 'Gréng', blue: 'Blo', hue: 'Faarftoun', saturation: 'Sättigung', lightness: 'Hellegkeet', value: 'Wäert', whiteness: 'Wäissheet', blackness: 'Schwärzheet', chroma: 'Chroma' },
  lt: { red: 'Raudona', green: 'Žalia', blue: 'Mėlyna', hue: 'Atspalvis', saturation: 'Sotis', lightness: 'Šviesumas', value: 'Reikšmė', whiteness: 'Baltumas', blackness: 'Juodumas', chroma: 'Chroma' },
  lv: { red: 'Sarkans', green: 'Zaļš', blue: 'Zils', hue: 'Tonis', saturation: 'Piesātinājums', lightness: 'Gaišums', value: 'Vērtība', whiteness: 'Baltums', blackness: 'Melnums', chroma: 'Hroma' },
  mk: { red: 'Црвена', green: 'Зелена', blue: 'Сина', hue: 'Тон', saturation: 'Заситеност', lightness: 'Осветленост', value: 'Вредност', whiteness: 'Белина', blackness: 'Црнина', chroma: 'Хрома' },
  ml: { red: 'ചുവപ്പ്', green: 'പച്ച', blue: 'നീല', hue: 'വർണ്ണം', saturation: 'സാന്ദ്രത', lightness: 'തെളിച്ചം', value: 'മൂല്യം', whiteness: 'വെണ്മ', blackness: 'കറുപ്പ്', chroma: 'ക്രോമ' },
  ms: { red: 'Merah', green: 'Hijau', blue: 'Biru', hue: 'Rona', saturation: 'Ketepuan', lightness: 'Kecerahan', value: 'Nilai', whiteness: 'Keputihan', blackness: 'Kehitaman', chroma: 'Kroma' },
  na: { red: 'Red', green: 'Green', blue: 'Blue', hue: 'Hue', saturation: 'Saturation', lightness: 'Lightness', value: 'Value', whiteness: 'Whiteness', blackness: 'Blackness', chroma: 'Chroma' },
  nb: { red: 'Rød', green: 'Grønn', blue: 'Blå', hue: 'Fargetone', saturation: 'Metning', lightness: 'Lyshet', value: 'Verdi', whiteness: 'Hvithet', blackness: 'Sorthet', chroma: 'Kroma' },
  ne: { red: 'रातो', green: 'हरियो', blue: 'नीलो', hue: 'वर्ण', saturation: 'संतृप्ति', lightness: 'हल्कापन', value: 'मान', whiteness: 'सेतोपन', blackness: 'कालोपन', chroma: 'क्रोमा' },
  nl: { red: 'Rood', green: 'Groen', blue: 'Blauw', hue: 'Tint', saturation: 'Verzadiging', lightness: 'Lichtheid', value: 'Waarde', whiteness: 'Witheid', blackness: 'Zwartheid', chroma: 'Chroma' },
  ny: { red: 'Red', green: 'Green', blue: 'Blue', hue: 'Hue', saturation: 'Saturation', lightness: 'Lightness', value: 'Value', whiteness: 'Whiteness', blackness: 'Blackness', chroma: 'Chroma' },
  oc: { red: 'Ròfo', green: 'Verd', blue: 'Blau', hue: 'Tinta', saturation: 'Saturacion', lightness: 'Luminositat', value: 'Valor', whiteness: 'Blancor', blackness: 'Negror', chroma: 'Cròma' },
  pa: { red: 'ਲਾਲ', green: 'ਹਰਾ', blue: 'ਨੀਲਾ', hue: 'ਰੰਗਤ', saturation: 'ਸੰਤ੍ਰਿਪਤੀ', lightness: 'ਹਲਕਾਪਨ', value: 'ਮੁੱਲ', whiteness: 'ਚਿੱਟਾਪਨ', blackness: 'ਕਾਲਾਪਨ', chroma: 'ਕ੍ਰੋਮਾ' },
  pl: { red: 'Czerwony', green: 'Zielony', blue: 'Niebieski', hue: 'Odcień', saturation: 'Nasycenie', lightness: 'Jasność', value: 'Wartość', whiteness: 'Białość', blackness: 'Czarność', chroma: 'Chroma' },
  ps: { red: 'سور', green: 'شین', blue: 'آبي', hue: 'رنګ', saturation: 'ډکوالی', lightness: 'رڼا', value: 'ارزښت', whiteness: 'سپینتوب', blackness: 'تورتوب', chroma: 'کروما' },
  pt: { red: 'Vermelho', green: 'Verde', blue: 'Azul', hue: 'Matiz', saturation: 'Saturação', lightness: 'Luminosidade', value: 'Valor', whiteness: 'Brancura', blackness: 'Negrura', chroma: 'Croma' },
  ro: { red: 'Roșu', green: 'Verde', blue: 'Albastru', hue: 'Nuanță', saturation: 'Saturație', lightness: 'Luminozitate', value: 'Valoare', whiteness: 'Albiciune', blackness: 'Negritudine', chroma: 'Cromă' },
  si: { red: 'රතු', green: 'කොළ', blue: 'නිල්', hue: 'වර්ණය', saturation: 'සන්තෘප්තිය', lightness: 'ආලෝකය', value: 'අගය', whiteness: 'සුදුබව', blackness: 'කළුබව', chroma: 'ක්‍රෝමා' },
  sk: { red: 'Červená', green: 'Zelená', blue: 'Modrá', hue: 'Odtieň', saturation: 'Sýtosť', lightness: 'Svetlosť', value: 'Hodnota', whiteness: 'Belosť', blackness: 'Čerň', chroma: 'Chroma' },
  sl: { red: 'Rdeča', green: 'Zelena', blue: 'Modra', hue: 'Odtenek', saturation: 'Nasičenost', lightness: 'Svetlost', value: 'Vrednost', whiteness: 'Belina', blackness: 'Črnina', chroma: 'Kroma' },
  sm: { red: 'Mumu', green: 'Lanu', blue: 'Lanu moana', hue: 'Hue', saturation: 'Saturation', lightness: 'Lightness', value: 'Value', whiteness: 'Whiteness', blackness: 'Blackness', chroma: 'Chroma' },
  so: { red: 'Cas', green: 'Cagaar', blue: 'Buluug', hue: 'Midab', saturation: 'Dheritaan', lightness: 'Iftiinle', value: 'Qiimaha', whiteness: 'Cadaanta', blackness: 'Madoobaan', chroma: 'Chroma' },
  sq: { red: 'Kuqe', green: 'Gjelbër', blue: 'Blu', hue: 'Nuancë', saturation: 'Ngopje', lightness: 'Ndriçim', value: 'Vlerë', whiteness: 'Bardhësi', blackness: 'Zezësi', chroma: 'Kroma' },
  sr: { red: 'Црвена', green: 'Зелена', blue: 'Плава', hue: 'Тон', saturation: 'Засићеност', lightness: 'Светлост', value: 'Вредност', whiteness: 'Белина', blackness: 'Црнина', chroma: 'Хрома' },
  su: { red: 'Beureum', green: 'Héjo', blue: 'Biru', hue: 'Warna', saturation: 'Saturasi', lightness: 'Kacérah', value: 'Nilai', whiteness: 'Kabodas', blackness: 'Kahideung', chroma: 'Kroma' },
  sv: { red: 'Röd', green: 'Grön', blue: 'Blå', hue: 'Nyans', saturation: 'Mättnad', lightness: 'Ljushet', value: 'Värde', whiteness: 'Vithet', blackness: 'Svarthet', chroma: 'Kroma' },
  ta: { red: 'சிவப்பு', green: 'பச்சை', blue: 'நீலம்', hue: 'நிறத்தொனி', saturation: 'நிறைவு', lightness: 'ஒளிர்வு', value: 'மதிப்பு', whiteness: 'வெண்மை', blackness: 'கருமை', chroma: 'குரோமா' },
  te: { red: 'ఎరుపు', green: 'ఆకుపచ్చ', blue: 'నీలం', hue: 'వర్ణం', saturation: 'సంతృప్తత', lightness: 'తేలిక', value: 'విలువ', whiteness: 'తెలుపుదనం', blackness: 'నలుపుదనం', chroma: 'క్రోమా' },
  th: { red: 'แดง', green: 'เขียว', blue: 'น้ำเงิน', hue: 'สีสัน', saturation: 'ความอิ่มตัว', lightness: 'ความสว่าง', value: 'ค่า', whiteness: 'ความขาว', blackness: 'ความดำ', chroma: 'โครมา' },
  tl: { red: 'Pula', green: 'Berde', blue: 'Asul', hue: 'Kulay', saturation: 'Saturation', lightness: 'Liwanag', value: 'Halaga', whiteness: 'Kaputi', blackness: 'Kaitiman', chroma: 'Chroma' },
  tr: { red: 'Kırmızı', green: 'Yeşil', blue: 'Mavi', hue: 'Ton', saturation: 'Doygunluk', lightness: 'Açıklık', value: 'Değer', whiteness: 'Beyazlık', blackness: 'Siyahlık', chroma: 'Kroma' },
  ur: { red: 'سرخ', green: 'سبز', blue: 'نیلا', hue: 'رنگت', saturation: 'اشباع', lightness: 'ہلکاپن', value: 'قدر', whiteness: 'سفیدی', blackness: 'سیاہی', chroma: 'کروما' },
  vi: { red: 'Đỏ', green: 'Xanh lá', blue: 'Xanh dương', hue: 'Sắc độ', saturation: 'Độ bão hòa', lightness: 'Độ sáng', value: 'Giá trị', whiteness: 'Độ trắng', blackness: 'Độ đen', chroma: 'Sắc độ' },
  zh: { red: '红', green: '绿', blue: '蓝', hue: '色相', saturation: '饱和度', lightness: '亮度', value: '值', whiteness: '白度', blackness: '黑度', chroma: '色度' },
};

async function main() {
  const localeDir = `${import.meta.dir}/../src/locales`;
  const glob = new Bun.Glob('*.ts');

  for await (const filename of glob.scan(localeDir)) {
    if (filename === 'index.ts') continue;
    const localeName = filename.replace('.ts', '');
    if (SKIP_FILES.has(localeName)) continue;

    const filePath = `${localeDir}/${filename}`;
    let content = await Bun.file(filePath).text();

    // 1. Fix source -> sources
    if (content.includes('source:') && !content.includes('sources:')) {
      if (TRADITIONAL_VARIANTS.has(localeName)) {
        const sources = traditionalSources[localeName] || [UWDATA_URL];
        content = content.replace(
          /source:\s*'[^']*'/,
          `sources: ${JSON.stringify(sources)}`
        );
      } else {
        content = content.replace(
          /source:\s*'[^']*'/,
          `sources: ['${UWDATA_URL}']`
        );
      }
    }

    // 2. Add channels (skip traditional variants)
    if (TRADITIONAL_VARIANTS.has(localeName)) {
      await Bun.write(filePath, content);
      continue;
    }

    if (!content.includes('channels:') && channelTranslations[localeName]) {
      const ch = channelTranslations[localeName];
      const channelsBlock = `  channels: {\n    red: '${ch.red}', green: '${ch.green}', blue: '${ch.blue}',\n    hue: '${ch.hue}', saturation: '${ch.saturation}', lightness: '${ch.lightness}',\n    value: '${ch.value}', whiteness: '${ch.whiteness}', blackness: '${ch.blackness}',\n    chroma: '${ch.chroma}', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',\n  },`;

      // Insert channels after sources line, before first tier
      content = content.replace(
        /(sources:\s*\[[^\]]*\],?\n)/,
        `$1${channelsBlock}\n`
      );
    }

    await Bun.write(filePath, content);
  }

  console.log('Done! Fixed sources and added channels to all locale files.');
}

main();

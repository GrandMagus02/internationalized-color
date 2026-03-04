import type { ColorDictionary } from '../types.ts';

// Bengali (বাংলা) — 62 survey responses
export const bn: ColorDictionary = {
  locale: 'bn',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'লাল', green: 'সবুজ', blue: 'নীল',
    hue: 'বর্ণ', saturation: 'পরিপৃক্তি', lightness: 'হালকাতা',
    value: 'মান', whiteness: 'সাদাত্ব', blackness: 'কালোত্ব',
    chroma: 'ক্রোমা', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'হলুদ',
      'গোলাপি',
      'সবুজ',
      'নীল',
      'লাল',
      'কমলা',
      'কালো',
      'সাদা',
      'বাদামি',
      'বেগুনি',
      'ধূসর',
    ],
    colors: new Float32Array([
      // হলুদ
      0.961769, -0.067448, 0.197259,
      // গোলাপি
      0.672597, 0.275237, -0.092583,
      // সবুজ
      0.874787, -0.206212, 0.114939,
      // নীল
      0.523936, 0.109582, -0.271662,
      // লাল
      0.637894, 0.249639, 0.051724,
      // কমলা
      0.766908, 0.079199, 0.155871,
      // কালো
      0, 0, 0,
      // সাদা
      1, 0, 0,
      // বাদামি
      0.470784, 0.070809, 0.08696,
      // বেগুনি
      0.420914, 0.164704, -0.101472,
      // ধূসর
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'neel',
      'blue',
      'holud',
      'narangi',
      'shobuj',
      'green',
      'golabi',
      'akashi neel',
      'laal',
      'magenta',
      'neel shobuj',
      'red',
      'pink',
      'cyan blue',
      'shobuj neel',
      'beguni',
      'gadho golabi',
      'halka beguni',
      'halka shobuj',
      'বেগুনী',
      'light blue',
      'orange',
      'sky blue',
      'yellow',
    ],
    colors: new Float32Array([
      // neel
      0.565335, -0.038803, -0.236501,
      // blue
      0.507321, -0.028989, -0.27467,
      // holud
      0.90386, -0.046478, 0.185203,
      // narangi
      0.711666, 0.131863, 0.144005,
      // shobuj
      0.872049, -0.221835, 0.173927,
      // green
      0.871804, -0.222154, 0.173248,
      // golabi
      0.667162, 0.273968, -0.075327,
      // akashi neel
      0.806596, -0.113431, -0.091573,
      // laal
      0.630108, 0.23189, 0.106727,
      // magenta
      0.653681, 0.267553, -0.026013,
      // neel shobuj
      0.897206, -0.160667, -0.005492,
      // red
      0.629916, 0.22597, 0.11921,
      // pink
      0.668044, 0.274216, -0.078213,
      // cyan blue
      0.904733, -0.150286, -0.036774,
      // shobuj neel
      0.885009, -0.181904, 0.053469,
      // beguni
      0.511556, 0.090606, -0.278752,
      // gadho golabi
      0.650271, 0.26492, -0.01157,
      // halka beguni
      0.609298, 0.206701, -0.222093,
      // halka shobuj
      0.878964, -0.195323, 0.088059,
      // বেগুনী
      0.593084, 0.191655, -0.231521,
      // light blue
      0.642791, -0.05843, -0.187381,
      // orange
      0.682552, 0.162248, 0.137716,
      // sky blue
      0.7623, -0.097653, -0.116337,
      // yellow
      0.886771, -0.016925, 0.181398,
    ]),
  },
  };

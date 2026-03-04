import type { ColorDictionary } from '../types.ts';

// Punjabi (ਪੰਜਾਬੀ) — 36 survey responses
export const pa: ColorDictionary = {
  locale: 'pa',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'ਲਾਲ', green: 'ਹਰਾ', blue: 'ਨੀਲਾ',
    hue: 'ਰੰਗਤ', saturation: 'ਸੰਤ੍ਰਿਪਤੀ', lightness: 'ਹਲਕਾਪਨ',
    value: 'ਮੁੱਲ', whiteness: 'ਚਿੱਟਾਪਨ', blackness: 'ਕਾਲਾਪਨ',
    chroma: 'ਕ੍ਰੋਮਾ', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'neela',
      'lal',
      'hara',
      'sungtari',
      'jamnee',
      'gulabi',
      'peela',
      'jamani',
      'narangi',
      'neeala',
    ],
    colors: new Float32Array([
      // neela
      0.577632, -0.039491, -0.228663,
      // lal
      0.633043, 0.230971, 0.101964,
      // hara
      0.870106, -0.224002, 0.166663,
      // sungtari
      0.766908, 0.079199, 0.155871,
      // jamnee
      0.632337, 0.009575, -0.150531,
      // gulabi
      0.669972, 0.272669, -0.10746,
      // peela
      0.948016, -0.099236, 0.194781,
      // jamani
      0.883909, -0.184174, 0.059446,
      // narangi
      0.937091, -0.051497, 0.192047,
      // neeala
      0.905399, -0.149444, -0.039398,
    ]),
  },
};

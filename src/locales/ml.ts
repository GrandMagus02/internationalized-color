import type { ColorDictionary } from '../types.ts';

// Malayalam (മലയാളം) — 156 survey responses
export const ml: ColorDictionary = {
  locale: 'ml',
  sources: ['https://github.com/uwdata/color-naming-in-different-languages'],
  channels: {
    red: 'ചുവപ്പ്', green: 'പച്ച', blue: 'നീല',
    hue: 'വർണ്ണം', saturation: 'സാന്ദ്രത', lightness: 'തെളിച്ചം',
    value: 'മൂല്യം', whiteness: 'വെണ്മ', blackness: 'കറുപ്പ്',
    chroma: 'ക്രോമ', x: 'X', y: 'Y', z: 'Z', a: 'a', b: 'b',
  },
    basic: {
    names: [
      'കറുപ്പ്',
      'വെള്ള',
      'ചുവപ്പ്',
      'പച്ച',
      'മഞ്ഞ',
      'നീല',
      'തവിട്ട്',
      'ഓറഞ്ച്',
      'പിങ്ക്',
      'പർപ്പിൾ',
      'ചാരനിറം',
    ],
    colors: new Float32Array([
      // കറുപ്പ്
      0, 0, 0,
      // വെള്ള
      1, 0, 0,
      // ചുവപ്പ്
      0.627955, 0.224863, 0.125846,
      // പച്ച
      0.519752, -0.140302, 0.107676,
      // മഞ്ഞ
      0.967983, -0.071369, 0.19857,
      // നീല
      0.452014, -0.032457, -0.311528,
      // തവിട്ട്
      0.470784, 0.070809, 0.08696,
      // ഓറഞ്ച്
      0.792688, 0.056611, 0.161385,
      // പിങ്ക്
      0.867738, 0.07298, 0.009071,
      // പർപ്പിൾ
      0.420914, 0.164704, -0.101472,
      // ചാരനിറം
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'neela',
      'orange',
      'blue',
      'pachha',
      'green',
      'chuvappu',
      'purple',
      'red',
      'manja',
      'yellow',
      'pink',
      'light green',
      'akashaneelam',
      'kadumneela',
      'dark blue',
      'hot pink',
      'turquoise',
      'cornflower blue',
      'ice blue',
      'ilamneela',
      'pinku',
      'magentha',
      'samudraneelam',
      'ilampachha',
      'sky blue',
      'light blue',
      'fuschia',
      'lime green',
    ],
    colors: new Float32Array([
      // neela
      0.625594, -0.052423, -0.196414,
      // orange
      0.699764, 0.144692, 0.140124,
      // blue
      0.608935, -0.048997, -0.208579,
      // pachha
      0.871755, -0.217855, 0.151607,
      // green
      0.837016, -0.19332, 0.103129,
      // chuvappu
      0.634938, 0.231654, 0.096272,
      // purple
      0.608083, 0.21416, -0.207345,
      // red
      0.635983, 0.231271, 0.094699,
      // manja
      0.879887, -0.013821, 0.179958,
      // yellow
      0.914099, -0.041285, 0.187241,
      // pink
      0.662567, 0.271136, -0.091172,
      // light green
      0.878759, -0.19804, 0.109945,
      // akashaneelam
      0.823005, -0.119358, -0.082617,
      // kadumneela
      0.486768, 0.003266, -0.29019,
      // dark blue
      0.464083, -0.03088, -0.303439,
      // hot pink
      0.668489, 0.274334, -0.079654,
      // turquoise
      0.876595, -0.201309, 0.102956,
      // cornflower blue
      0.627796, -0.054119, -0.196714,
      // ice blue
      0.85827, -0.132189, -0.063764,
      // ilamneela
      0.7949, -0.10923, -0.098029,
      // pinku
      0.659666, 0.27108, -0.049243,
      // magentha
      0.682506, 0.272676, -0.141149,
      // samudraneelam
      0.886379, -0.179173, 0.046203,
      // ilampachha
      0.869578, -0.222329, 0.153118,
      // sky blue
      0.804255, -0.112588, -0.092861,
      // light blue
      0.869565, -0.140662, -0.045717,
      // fuschia
      0.648979, 0.263781, -0.005826,
      // lime green
      0.924333, -0.134571, 0.19031,
    ]),
  },
  };

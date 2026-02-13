import type { ColorDictionary } from '../types.ts';

export const en: ColorDictionary = {
  locale: 'en',
  source: 'css+basic',
  basic: {
    names: [
      'black', 'white', 'red', 'green', 'yellow',
      'blue', 'brown', 'orange', 'pink', 'purple', 'grey',
    ],
    colors: new Float32Array([
      // black
      0, 0, 0,
      // white
      1, 0, 0,
      // red
      0.627955, 0.224863, 0.125846,
      // green
      0.519752, -0.140302, 0.107676,
      // yellow
      0.967983, -0.071369, 0.19857,
      // blue
      0.452014, -0.032457, -0.311528,
      // brown
      0.470784, 0.070809, 0.08696,
      // orange
      0.792688, 0.056611, 0.161385,
      // pink
      0.867738, 0.07298, 0.009071,
      // purple
      0.420914, 0.164704, -0.101472,
      // grey
      0.599871, 0, 0,
    ]),
  },
  extended: {
    names: [
      'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure',
      'beige', 'bisque', 'blanchedalmond', 'blueviolet', 'burlywood',
      'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue',
      'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan',
      'darkgoldenrod', 'darkgray', 'darkgreen', 'darkkhaki', 'darkmagenta',
      'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon',
      'darkseagreen', 'darkslateblue', 'darkslategray', 'darkturquoise', 'darkviolet',
      'deeppink', 'deepskyblue', 'dimgray', 'dodgerblue', 'firebrick',
      'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite',
      'gold', 'goldenrod', 'greenyellow', 'honeydew', 'hotpink',
      'indianred', 'indigo', 'ivory', 'khaki', 'lavender',
      'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral',
      'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightpink',
      'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightsteelblue',
      'lightyellow', 'lime', 'limegreen', 'linen', 'magenta',
      'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple',
      'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred',
      'midnightblue', 'mintcream', 'mistyrose', 'moccasin', 'navajowhite',
      'navy', 'oldlace', 'olive', 'olivedrab', 'orangered',
      'orchid', 'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred',
      'papayawhip', 'peachpuff', 'peru', 'plum', 'powderblue',
      'rebeccapurple', 'rosybrown', 'royalblue', 'saddlebrown', 'salmon',
      'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver',
      'skyblue', 'slateblue', 'slategray', 'snow', 'springgreen',
      'steelblue', 'tan', 'teal', 'thistle', 'tomato',
      'turquoise', 'violet', 'wheat', 'whitesmoke', 'yellowgreen',
    ],
    colors: new Float32Array([
      // aliceblue
      0.975143, -0.005501, -0.011404,
      // antiquewhite
      0.946692, 0.00793, 0.030054,
      // aqua
      0.905399, -0.149444, -0.039398,
      // aquamarine
      0.914995, -0.127986, 0.024897,
      // azure
      0.988951, -0.015041, -0.004571,
      // beige
      0.963574, -0.009585, 0.031352,
      // bisque
      0.932856, 0.016026, 0.048885,
      // blanchedalmond
      0.948439, 0.009296, 0.043962,
      // blueviolet
      0.533765, 0.130318, -0.213705,
      // burlywood
      0.80454, 0.022221, 0.07462,
      // cadetblue
      0.657681, -0.061722, -0.02041,
      // chartreuse
      0.890263, -0.190507, 0.183924,
      // chocolate
      0.634398, 0.099074, 0.119193,
      // coral
      0.735113, 0.128225, 0.108538,
      // cornflowerblue
      0.674622, -0.021289, -0.139745,
      // cornsilk
      0.977301, -0.003531, 0.03709,
      // crimson
      0.571189, 0.208438, 0.076225,
      // cyan
      0.905399, -0.149444, -0.039398,
      // darkblue
      0.287824, -0.020667, -0.198369,
      // darkcyan
      0.576522, -0.09516, -0.025087,
      // darkgoldenrod
      0.65207, 0.019377, 0.130772,
      // darkgray
      0.734809, 0, 0,
      // darkgreen
      0.436018, -0.117699, 0.090329,
      // darkkhaki
      0.767474, -0.024571, 0.09491,
      // darkmagenta
      0.446798, 0.174833, -0.107712,
      // darkolivegreen
      0.495521, -0.052899, 0.072315,
      // darkorange
      0.750544, 0.094166, 0.152364,
      // darkorchid
      0.541115, 0.150601, -0.170167,
      // darkred
      0.399857, 0.143184, 0.080134,
      // darksalmon
      0.750736, 0.083603, 0.068657,
      // darkseagreen
      0.750865, -0.065077, 0.046026,
      // darkslateblue
      0.414343, 0.034491, -0.119977,
      // darkslategray
      0.402963, -0.036306, -0.010245,
      // darkturquoise
      0.771929, -0.125934, -0.037646,
      // darkviolet
      0.51491, 0.166898, -0.200239,
      // deeppink
      0.654935, 0.260965, -0.013929,
      // deepskyblue
      0.75535, -0.095216, -0.120301,
      // dimgray
      0.520807, 0, 0,
      // dodgerblue
      0.652006, -0.054933, -0.18201,
      // firebrick
      0.496771, 0.160367, 0.081059,
      // floralwhite
      0.986233, 0.001343, 0.014156,
      // forestgreen
      0.557805, -0.134605, 0.101826,
      // fuchsia
      0.701674, 0.274566, -0.169156,
      // gainsboro
      0.89449, 0, 0,
      // ghostwhite
      0.981119, 0.00259, -0.008899,
      // gold
      0.886771, -0.016925, 0.181398,
      // goldenrod
      0.751572, 0.015389, 0.146126,
      // greenyellow
      0.913049, -0.15012, 0.178797,
      // honeydew
      0.984842, -0.020746, 0.014322,
      // hotpink
      0.728297, 0.195155, -0.027446,
      // indianred
      0.615441, 0.133439, 0.054533,
      // indigo
      0.338982, 0.094162, -0.152551,
      // ivory
      0.995976, -0.005653, 0.018783,
      // khaki
      0.913489, -0.024852, 0.109128,
      // lavender
      0.930902, 0.007365, -0.025915,
      // lavenderblush
      0.968335, 0.017343, -0.001486,
      // lawngreen
      0.881753, -0.189779, 0.182177,
      // lemonchiffon
      0.97781, -0.012259, 0.056911,
      // lightblue
      0.856233, -0.037679, -0.031231,
      // lightcoral
      0.724641, 0.128565, 0.049426,
      // lightcyan
      0.977858, -0.030688, -0.009172,
      // lightgoldenrodyellow
      0.975007, -0.015436, 0.049487,
      // lightgray
      0.866863, 0, 0,
      // lightgreen
      0.868003, -0.126184, 0.091382,
      // lightpink
      0.847388, 0.084716, 0.013549,
      // lightsalmon
      0.793755, 0.092147, 0.084215,
      // lightseagreen
      0.691201, -0.112819, -0.017791,
      // lightskyblue
      0.820619, -0.051824, -0.079056,
      // lightslategray
      0.61902, -0.011989, -0.030206,
      // lightsteelblue
      0.813623, -0.011055, -0.041356,
      // lightyellow
      0.992007, -0.011841, 0.038463,
      // lime
      0.86644, -0.233888, 0.179498,
      // limegreen
      0.741874, -0.182207, 0.138128,
      // linen
      0.960238, 0.006529, 0.015858,
      // magenta
      0.701674, 0.274566, -0.169156,
      // maroon
      0.376692, 0.134889, 0.075492,
      // mediumaquamarine
      0.776686, -0.107762, 0.02129,
      // mediumblue
      0.383453, -0.027534, -0.264276,
      // mediumorchid
      0.62558, 0.153305, -0.132207,
      // mediumpurple
      0.626914, 0.070937, -0.141215,
      // mediumseagreen
      0.684042, -0.130523, 0.060867,
      // mediumslateblue
      0.604473, 0.05181, -0.18684,
      // mediumspringgreen
      0.866806, -0.190175, 0.081097,
      // mediumturquoise
      0.786802, -0.113865, -0.023287,
      // mediumvioletred
      0.553367, 0.218072, -0.039682,
      // midnightblue
      0.288119, 0.006928, -0.143459,
      // mintcream
      0.991172, -0.011939, 0.003241,
      // mistyrose
      0.940012, 0.027196, 0.012844,
      // moccasin
      0.929622, 0.010124, 0.066774,
      // navajowhite
      0.916402, 0.015881, 0.071258,
      // navy
      0.27115, -0.01947, -0.186877,
      // oldlace
      0.972341, 0.002529, 0.02141,
      // olive
      0.580665, -0.042812, 0.119116,
      // olivedrab
      0.599484, -0.081377, 0.11069,
      // orangered
      0.660199, 0.186949, 0.13287,
      // orchid
      0.702132, 0.154887, -0.094152,
      // palegoldenrod
      0.921048, -0.018201, 0.077703,
      // palegreen
      0.903543, -0.131545, 0.095273,
      // paleturquoise
      0.906909, -0.060753, -0.017527,
      // palevioletred
      0.677923, 0.138207, 0.001642,
      // papayawhip
      0.95808, 0.006622, 0.037681,
      // peachpuff
      0.911253, 0.026585, 0.053788,
      // peru
      0.678193, 0.057283, 0.108563,
      // plum
      0.783284, 0.089908, -0.059408,
      // powderblue
      0.875083, -0.045226, -0.021796,
      // rebeccapurple
      0.440272, 0.088177, -0.133864,
      // rosybrown
      0.692744, 0.051944, 0.017446,
      // royalblue
      0.559848, -0.011821, -0.187862,
      // saddlebrown
      0.470784, 0.070809, 0.08696,
      // salmon
      0.735002, 0.133699, 0.07127,
      // sandybrown
      0.783997, 0.064012, 0.109587,
      // seagreen
      0.568526, -0.107547, 0.050266,
      // seashell
      0.976018, 0.007639, 0.012033,
      // sienna
      0.526482, 0.081962, 0.080837,
      // silver
      0.807796, 0, 0,
      // skyblue
      0.814817, -0.057156, -0.05868,
      // slateblue
      0.543567, 0.045877, -0.164966,
      // slategray
      0.592504, -0.01141, -0.028743,
      // snow
      0.988937, 0.005097, 0.001582,
      // springgreen
      0.87493, -0.205813, 0.113971,
      // steelblue
      0.588001, -0.040817, -0.090566,
      // tan
      0.786187, 0.016928, 0.061535,
      // teal
      0.543123, -0.089647, -0.023634,
      // thistle
      0.833293, 0.036386, -0.024577,
      // tomato
      0.696219, 0.16523, 0.104541,
      // turquoise
      0.822334, -0.130229, -0.011597,
      // violet
      0.761899, 0.156465, -0.100798,
      // wheat
      0.908833, 0.00746, 0.061044,
      // whitesmoke
      0.970151, 0, 0,
      // yellowgreen
      0.784852, -0.109642, 0.147442,
    ]),
  },
};

// /* eslint-disable prettier/prettier */

const x = {}
export default x

// const endsWith = {
//   b: '',
//   bb: '',
//   bs: '',
//   c: 'k',
//   cs: '',
//   cte: 't',
//   d: '',
//   dd: '',
//   ds: '',
//   ent: '',
//   er: 'e',
//   es: '',
//   fs: '',
//   g: '',
//   gs: '',
//   ie: 'i',
//   oue: 'u',
//   p: '',
//   pp: '',
//   ps: '',
//   st: 'st',
//   t: '',
//   ts: '',
//   tt: '',
//   ue: 'i~',
//   x: '',
//   z: '',
//   üe: 'i~',
// }

// const vowels = {
//   a: true,
//   e: true,
//   i: true,
//   o: true,
//   u: true,
//   ë: true,
//   î: true,
//   ï: true,
//   ô: true,
//   û: true,
//   ü: true,
//   œ: true,
// }

// const consonants = {
//   b: true,
//   d: true,
//   f: true,
//   g: true,
//   h: true,
//   j: true,
//   k: true,
//   l: true,
//   m: true,
//   n: true,
//   p: true,
//   q: true,
//   r: true,
//   s: true,
//   t: true,
//   v: true,
//   w: true,
//   x: true,
//   y: true,
//   z: true,
//   ç: true,
// }

// const voicelessConsonant = {
//   f: true,
//   h: true,
//   k: true,
//   p: true,
//   s: true,
// }

// const special = {
//   ' ': () => ' ',
//   "'": () => "'",
//   '-': () => '-',
//   a: () => 'a',
//   aa: () => 'a',
//   aan: () => 'a&',
//   ae: () => 'e',
//   aen: () => 'a&',
//   ai: () => 'e',
//   aie: () => 'E',
//   aim: () => 'E&',
//   ain: () => 'E&',
//   am: (l, i) => {
//     if (consonants[i + 2]) {
//       return 'a&'
//     }
//     return 'am'
//   },
//   an: (l, i) => {
//     if (consonants[i + 2]) {
//       return 'a&'
//     }
//     if (i == l.length - 1) {
//       return 'a&'
//     }
//     return 'an'
//   },
//   ao: () => 'ao',
//   aon: () => 'a&',
//   aou: () => 'au',
//   au: (l, i) => {
//     if (l[i + 1] == 'r') {
//       return 'o~'
//     }
//     return 'o'
//   },
//   aw: () => 'o',
//   ay: (l, i) => {
//     if (i == l.length - 1) {
//       return 'E'
//     }
//     return 'Ey'
//   },
//   aye: () => 'Eyi',
//   aë: () => 'ayE',
//   aën: () => 'a&',
//   aî: () => 'E',
//   aï: () => 'ayi',
//   b: (l, i) => {
//     if (voicelessConsonant[l[i + 1]]) {
//       return 'p'
//     }
//     return 'b'
//   },
//   bb: (l, i) => {
//     if (voicelessConsonant[l[i + 2]]) {
//       return 'p'
//     }
//     return 'b'
//   },
//   c: (l, i) => {
//     if (l[i + 1] && l[i + 1].match(/[eiy]/)) {
//       return 's'
//     }
//     return 'k'
//   },
//   cc: (l, i) => {
//     if (l[i + 2] && l[i + 2].match(/[eiy]/)) {
//       return 'ks'
//     }
//     return 'k'
//   },
//   ch: () => 'x',
//   cqu: () => 'k',
//   ct: () => 'kt',
//   d: () => 'd',
//   dd: () => 'd',
//   e: () => 'e',
//   ea: () => 'i',
//   eau: () => 'o',
//   ee: () => 'i',
//   ei: () => 'E',
//   eim: (l, i) => {
//     if (i == l.length - 1) {
//       return 'E&'
//     }
//     if (consonants[l[i + 1]]) {
//       return 'E&'
//     }
//     return 'eim'
//   },
//   ein: (l, i) => {
//     if (i == l.length - 1) {
//       return 'E&'
//     }
//     if (consonants[l[i + 1]]) {
//       return 'E&'
//     }
//     return 'ein'
//   },
//   em: (l, i) => {
//     if (i == l.length - 1) {
//       return 'a&'
//     }
//     if (consonants[l[i + 1]]) {
//       return 'a&'
//     }
//     if (l[i - 1] && l[i - 1].match(/[éiy]/)) {
//       return 'E&'
//     }
//     return 'em'
//   },
//   en: (l, i) => {
//     if (i == l.length - 1) {
//       return 'a&'
//     }
//     if (consonants[l[i + 1]]) {
//       return 'a&'
//     }
//     if (l[i - 1] && l[i - 1].match(/[éiy]/)) {
//       return 'E&'
//     }
//     return 'en'
//   },
//   eoi: () => 'wa',
//   eu: () => 'a~',
//   eun: (l, i) => {
//     if (i == l.length - 1) {
//       return 'e~&'
//     }
//     if (consonants[l[i + 1]]) {
//       return 'e~&'
//     }
//     return 'eun'
//   },
//   ew: () => 'yu',
//   ey: (l, i) => {
//     if (i == l.length - 1) {
//       return 'E'
//     }
//     return 'Ey'
//   },
//   eî: () => 'E',
//   eû: () => 'a~',
//   f: () => 'f',
//   ff: () => 'f',
//   g: (l, i) => {
//     if (l[i + 1] && l[i + 1].match(/[eiy]/)) {
//       return 'j'
//     }
//     return 'g'
//   },
//   ge: (l, i) => {
//     if (l[i + 2] && l[i + 2].match(/[aou]/)) {
//       return 'j'
//     }
//     return 'ge'
//   },
//   gg: (l, i) => {
//     if (l[i + 2] && l[i + 2].match(/[eiy]/)) {
//       return 'gj'
//     }
//     return 'g'
//   },
//   gn: () => 'ny',
//   gu: (l, i) => {
//     if (l[i + 2] && l[i + 2].match(/[eiy]/)) {
//       return 'g'
//     }
//     return 'gu'
//   },
//   h: () => '',
//   i: (l, i) => {
//     if (vowels[l[i + 1]]) {
//       return 'y'
//     }
//     return 'i'
//   },
//   il: (l, i) => {
//     if (vowels[l[i - 1]]) {
//       return 'y'
//     }
//     return 'il'
//   },
//   ilh: (l, i) => {
//     if (vowels[l[i - 1]]) {
//       if ('u' == l[i - 1]) {
//         return 'iy'
//       }
//       return 'y'
//     } else {
//       return 'ilh'
//     }
//   },
//   ill: (l, i) => {
//     if (vowels[l[i - 1]]) {
//       return 'y'
//     } else {
//       return 'iy'
//     }
//   },
//   im: (l, i) => {
//     if (consonants[l[i + 2]]) {
//       return 'E&'
//     }
//     if (i == l.length - 2) {
//       return 'E&'
//     }
//     return 'im'
//   },
//   in: (l, i) => {
//     if (consonants[l[i + 2]]) {
//       return 'E&'
//     }
//     if (i == l.length - 2) {
//       return 'E&'
//     }
//     return 'in'
//   },
//   j: () => 'j',
//   k: () => 'k',
//   l: () => 'l',
//   ll: () => 'l',
//   m: () => 'm',
//   mm: () => 'm',
//   n: () => 'n',
//   ng: () => 'q',
//   nn: () => 'n',
//   o: () => 'o', // ?
//   oe: () => 'o~ye',
//   oi: () => 'wa',
//   oie: () => 'wa',
//   oin: (l, i) => {
//     if (consonants[l[i + 2]]) {
//       return 'wE&'
//     }
//     if (i == l.length - 2) {
//       return 'wE&'
//     }
//     return 'oin'
//   },
//   om: () => 'o~&',
//   on: () => 'o~&',
//   oo: () => 'oOo',
//   ou: (l, i) => {
//     if (vowels[l[i + 1]]) {
//       return 'w'
//     }
//     if ('h' == l[i + 1] && vowels[l[i + 2]]) {
//       return 'w'
//     }
//     return 'u'
//   },
//   ow: () => 'o',
//   oy: () => 'way',
//   oê: () => 'wa',
//   oë: () => 'o~yE',
//   oën: (l, i) => {
//     if (consonants[l[i + 2]]) {
//       return 'wE&'
//     }
//     if (i == l.length - 2) {
//       return 'wE&'
//     }
//     return 'oyen'
//   },
//   oî: () => 'wa',
//   oï: () => 'o~yi',
//   où: (l, i) => {
//     if (vowels[l[i + 1]]) {
//       return 'w'
//     }
//     if ('h' == l[i + 1] && vowels[l[i + 2]]) {
//       return 'w'
//     }
//     return 'u'
//   },
//   oû: () => 'u',
//   p: () => 'p',
//   ph: () => 'f',
//   pp: () => 'p',
//   pt: () => 'pt',
//   q: () => 'k',
//   qu: () => 'k',
//   r: () => 'r~',
//   rr: () => 'r~',
//   s: (l, i) => {
//     if (i == 0) {
//       return 's'
//     }
//     if (consonants[l[i - 1]] || consonants[l[i + 1]]) {
//       return 's'
//     }
//     if (l[i - 1] == '&') {
//       return 's'
//     }
//     if (i == l.length - 1) {
//       return ''
//     }
//     return 'z'
//   },
//   sc: (l, i) => {
//     if (l[i + 2] && l[i + 2].match(/[eiy]/)) {
//       return 's'
//     }
//     return 'sk'
//   },
//   sch: () => 'x',
//   ss: () => 's',
//   t: () => 't',
//   tch: () => 'tx',
//   th: () => 't',
//   ti: (l, i) => {
//     if (vowels[l[i + 2]]) {
//       if (i == 0) {
//         return 'ty'
//       }
//       if (l[i - 1] && l[i - 1].match(/[sx]/)) {
//         return 'ty'
//       }
//       return 'sy'
//     }
//     return 'ti'
//   },
//   tt: () => 't',
//   u: () => 'i~',
//   ue: () => 'i~E',
//   um: (l, i) => {
//     if (i == l.length - 2) {
//       return 'e~&'
//     }
//     if (consonants[l[i + 2]]) {
//       return 'e~&'
//     }
//     return 'um'
//   },
//   un: (l, i) => {
//     if (i == l.length - 2) {
//       return 'e~&'
//     }
//     if (consonants[l[i + 2]]) {
//       return 'e~&'
//     }
//     return 'un'
//   },
//   uy: () => 'i~y',
//   v: () => 'v',
//   w: () => 'w',
//   x: (l, i) => {
//     if (i == 0) {
//       return 'ks'
//     }
//     if (voicelessConsonant[l[i - 1]] || voicelessConsonant[l[i + 1]]) {
//       return 'ks'
//     }
//     // todo: phonologically finally
//     if (i == l.length - 1) {
//       return ''
//     }
//     return 'gz'
//   },
//   xc: (l, i) => {
//     if (l[i + 2] && l[i + 2].match(/[eiy]/)) {
//       return 'ks'
//     }
//     return 'ksk'
//   },
//   y: (l, i) => {
//     if (vowels[l[i + 1]]) {
//       return 'y'
//     }
//     return 'i'
//   },
//   ym: (l, i) => {
//     if (i == l.length - 2) {
//       return 'e~&'
//     }
//     if (consonants[l[i + 2]]) {
//       return 'e~&'
//     }
//     return 'ym'
//   },
//   yn: (l, i) => {
//     if (i == l.length - 2) {
//       return 'E&'
//     }
//     if (consonants[l[i + 2]]) {
//       return 'E&'
//     }
//     return 'yn'
//   },
//   z: () => 'z',
//   à: () => 'a',
//   â: () => 'a',
//   æ: () => 'e',
//   ç: () => 's',
//   è: () => 'E',
//   é: () => 'e',
//   ée: () => 'e',
//   ê: () => 'E',
//   î: () => 'i',
//   în: (l, i) => {
//     if (consonants[l[i + 2]]) {
//       return 'E&'
//     }
//     if (i == l.length - 2) {
//       return 'E&'
//     }
//     return 'in'
//   },
//   ï: () => 'y',
//   ô: () => 'o',
//   û: () => 'i~',
//   üe: () => 'i~E',
//   ÿ: () => 'i',
//   œ: () => 'e~',
//   œu: () => 'e~', // ?
// }

// // TODO: e

// const endsWithPattern = new RegExp(
//   '(' + Object.keys(endsWith).join('|') + ')' + '$',
// )

// const form = s => {
//   let end = []
//   let start = []
//   if (s.match(endsWithPattern)) {
//     let str = endsWith[RegExp.$1]
//     end.push(str)
//     s = s.substr(0, s.length - 1 - str.length)
//   }
//   let i = 0
//   let r = s
//   while (r.length) {
//     let found = false
//     x: for (let k in special) {
//       if (r.indexOf(k) === 0) {
//         let f = special[k]
//         let v = f(s, i)
//         i += k.length
//         start.push(v)
//         r = r.substr(k.length)
//         found = true
//         break x
//       }
//     }
//     if (!found) {
//       throw `oops ${start.join('')}${end.join('')} from ${s}`
//     }
//   }
//   return `${start.join('')}${end.join('')}`
// }

// export default form

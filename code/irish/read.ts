const x = {}
export default x

// const broad = {
//   bhf: 'w',
//   bp: 'b',
//   bh: 'w',
//   b: 'b',
//   ch: 'H',
//   c: 'k',
//   dh: 'r~',
//   dt: 'd',
//   d: 'd',
//   fh: '',
//   f: 'f',
//   gc: 'g',
//   gh: 'r~',
//   g: 'g',
//   h: '',
//   ll: 'l',
//   l: 'l',
//   mh: 'w',
//   m: 'm',
//   ng: ['q', 'qg'], // initial vs. other
//   nn: 'n',
//   n: 'n',
//   ph: 'f',
//   p: 'p',
//   r: 'r!',
//   sh: 'h',
//   s: 's',
//   th: 'h',
//   ts: 't',
//   t: 't',
//   v: 'w',
//   zs: 'z',
//   z: 'z',
// }

// const slender = {
//   bhf: 'vY',
//   bh: 'vY',
//   b: 'bY',
//   bp: 'bY',
//   ch: 'hY', // h between vowels
//   c: 'kY',
//   dh: 'Y',
//   dt: 'dY',
//   d: 'dY',
//   fh: '',
//   f: 'fY',
//   gc: 'gY',
//   gh: 'Y',
//   g: 'gY',
//   h: 'h',
//   ll: 'lY',
//   l: 'lY',
//   m: 'mY',
//   mh: 'vY',
//   ng: ['nY', 'nYgY'],
//   nn: 'nY',
//   n: 'nY',
//   ph: 'fY',
//   p: 'pY',
//   rh: 'r!Y',
//   r: 'r!Y',
//   sh: 'h',
//   s: 'x',
//   th: 'h',
//   ts: 'tY',
//   t: 'tY',
//   v: 'vY',
//   zs: 'Y',
//   z: 'j',
// }

// const vowels = {
//   a: (l, i) => {
//     if (l.substr(i + 1, i + 3).match(/^(?:rl|rn|rd|ll|nn|rr)/))
//       return 'aa'
//     if (l.substr(i + 1) == 'm' && l.length - 2 == i + 1) return 'aa'
//     return 'a'
//   },
//   e: () => 'E',
//   i: (l, i) => {
//     if (l.substr(i + 1, i + 3).match(/ll|nn/)) return 'ii'
//     if (l.substr(i + 1) == 'm' && l.length - 2 == i + 1) return 'ii'
//     return 'I'
//   },
//   o: (l, i) => {
//     if (l.substr(i + 1, i + 2).match(/^(?:m|n)/)) return 'O'
//     if (l.substr(i + 1, i + 3).match(/^(?:rl|rn|rd|ll|rr)/)) return 'oo'
//     if (l.substr(i + 1, i + 3).match(/^(?:nn)/)) return 'uu'
//     if (
//       l.substr(i + 1, i + 3).match(/^(?:ng)/) &&
//       l.length - 2 == i + 1
//     )
//       return 'uu'
//     if (l.substr(i + 1, i + 2).match(/m/) && l.length - 1 == i + 1)
//       return 'uu'
//     return 'o~'
//   },
//   u: (l, i) => {
//     if (l.substr(i + 1, i + 3).match(/^(?:rl|rn|rd)/)) return 'uu'
//     return 'O'
//   },
// }

// const extras = {
//   aei: () => 'ee',
//   ae: () => 'ee',
//   ai: (l, i) => {
//     if (l.substr(i + 1, i + 3).match(/^(?:rl|rn|rd|ll|nn|rr)/))
//       return 'aa'
//     return 'a'
//   },
//   aoi: (l, i) => {
//     return 'ii'
//   },
//   ao: (l, i) => {
//     return 'ii'
//   },
//   eai: (l, i) => {
//     if (l.substr(i + 1, i + 3).match(/^(?:rl|rn|rd|ll|nn|rr)/))
//       return 'aa'
//     return 'a'
//   },
//   ea: (l, i) => {
//     if (l.substr(i + 1, i + 3).match(/^(?:rl|rn|rd|ll|nn|rr)/))
//       return 'aa'
//     return 'a'
//   },
//   ei: (l, i) => {
//     if (l.substr(i + 1, i + 3).match(/mh/)) return 'I'
//     if (l.substr(i + 1, i + 2).match(/m|n/)) return 'I'
//     if (l.substr(i + 1, i + 2).match(/nn/)) return 'ii'
//     if (l.substr(i + 1, i + 2).match(/m/) && l.length - 1 == i + 1)
//       return 'ii'
//     if (l.substr(i + 1, i + 3).match(/rl|rn|rd/)) return 'ee'
//     if (l.substr(i + 1, i + 3).match(/ll/)) return 'Ui'
//   },
//   eoi: () => 'oo',
//   eo: () => 'oo',
//   iai: () => 'iU',
//   ia: () => 'iU',
//   io: (l, i) => {
//     if (l.substr(i + 1, i + 2).match(/[zsjxndtrl]/)) return 'I'
//     if (l.substr(i + 1, i + 3) == 'th') return 'I'
//     if (l.substr(i + 1, i + 3) == 'nn') return 'ii'
//     return 'O'
//   },
//   iu: () => 'O',
//   oi: (l, i) => {
//     if (l.substr(i + 1).match(/^(?:s|cht|rs|rt|rth)/)) return 'o~'
//     if (l.substr(i + 1).match(/^(?:n|m|mh)/)) return 'I'
//     if (l.substr(i + 1).match(/^(?:ll)/)) return 'Ui'
//     if (l.substr(i + 1).match(/^(?:nn)/)) return 'ii'
//     if (l.substr(i + 1, i + 2).match(/m/) && l.length - 1 == i + 1)
//       return 'ii'
//     if (l.substr(i + 1).match(/^(?:rl|rn|rd)/)) return 'oo'
//     return 'E'
//   },
//   uai: () => 'uU',
//   ua: () => 'uU',
//   ui: (l, i) => {
//     if (l.substr(i + 1).match(/^(?:cht|rs|rt)/)) return 'O'
//     if (l.substr(i + 1).match(/^(?:ll|nn)/)) return 'ii'
//     if (l.substr(i + 1, i + 2).match(/m/) && l.length - 1 == i + 1)
//       return 'ii'
//     if (l.substr(i + 1).match(/^(?:rl|rn|rd)/)) return 'uu'
//     return 'I'
//   },
//   aoú: () => 'iiuu',
//   aío: () => 'ii',
//   aí: () => 'ii',
//   ái: () => 'aa',
//   á: () => 'aa',
//   eái: () => 'aa',
//   éa: () => 'ee',
//   eá: () => 'aa',
//   éi: () => 'ee',
//   é: () => 'ee',
//   iái: () => 'iiaa',
//   iói: () => 'iioo',
//   iúi: () => 'uu',
//   ío: () => 'ii',
//   iá: () => 'iiaa',
//   ió: () => 'iioo',
//   iú: () => 'uu',
//   í: () => 'ii',
//   oío: () => 'ii',
//   ói: () => 'oo',
//   oí: () => 'ii',
//   ó: () => 'oo',
//   úi: () => 'uu',
//   uío: () => 'ii',
//   uái: () => 'uuaa',
//   uói: () => 'uuoo',
//   uí: () => 'ii',
//   uá: () => 'uuaa',
//   uó: () => 'uuoo',
//   ú: () => 'uu',
// }

// const form = s => {
//   let out = []
//   let i = 0
//   let r = s
//   let firstVowel = true
//   while (r.length) {
//     let found = false
//     x: for (let k in broad) {
//       if (r.indexOf(k) === 0) {
//         let start = i == 0
//         i += k.length
//         let next = r[i]
//         let v
//         if (!next || next.match(/[aouáóú]/)) {
//           v = broad[k]
//         } else {
//           v = slender[k]
//         }
//         if (Array.isArray(v)) {
//           if (start) {
//             v = v[0]
//           } else {
//             v = v[1]
//           }
//         }
//         out.push(v)
//         r = r.substr(k.length)
//         found = true
//         break x
//       }
//     }

//     if (!found) {
//       y: for (let k in extras) {
//         if (r.indexOf(k) === 0) {
//           let v = extras[k](s, i)
//           if (firstVowel) {
//             v = v.split('')
//             v[0] = `(${v[0]})`
//             v = v.join('')
//             firstVowel = false
//           }
//           i += k.length
//           out.push(v)
//           r = r.substr(k.length)
//           found = true
//           break y
//         }
//       }
//     }

//     if (!found) {
//       y: for (let k in vowels) {
//         if (r.indexOf(k) === 0) {
//           let v = firstVowel ? `(${vowels[k](s, i)})` : 'U'
//           firstVowel = false
//           i += k.length
//           out.push(v)
//           r = r.substr(k.length)
//           found = true
//           break y
//         }
//       }
//     }

//     if (!found) {
//       throw `oops ${out.join('')} from ${s}`
//     }
//   }
//   return out.join('')
// }

// export default form

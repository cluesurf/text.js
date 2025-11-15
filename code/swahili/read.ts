const x = {}
export default x

// const vowels = {
//   i: 'i',
//   e: 'E',
//   a: 'a',
//   o: 'o~',
//   u: 'u',
// }

// const consonants = {
//   b: 'b?',
//   dh: 'C',
//   d: 'd?',
//   j: 'dj',
//   f: 'f',
//   gh: 'r~',
//   g: 'g?',
//   h: 'h',
//   y: 'y',
//   k: 'k',
//   l: 'l',
//   m: 'm',
//   ng: 'q',
//   n: 'n',
//   "'": "'",
//   p: 'p',
//   r: 'r!',
//   sh: 'x',
//   s: 's',
//   ch: 'tx',
//   th: 'c',
//   t: 't',
//   v: 'v',
//   w: 'w',
//   x: 'H',
//   z: 'z',
// }

// const alphabet = {
//   ...vowels,
//   ...consonants,
// }

// const form = s => {
//   let out = []
//   let i = 0
//   let r = s
//   while (r.length) {
//     let found = false
//     x: for (let k in alphabet) {
//       if (r.indexOf(k) === 0) {
//         let v = alphabet[k]
//         i += k.length
//         out.push(v)
//         r = r.substr(k.length)
//         found = true
//         break x
//       }
//     }
//     if (!found) {
//       throw `oops ${out.join('')} from ${s}`
//     }
//   }
//   return out.join('')
// }

// export default form

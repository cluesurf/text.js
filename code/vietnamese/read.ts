/* eslint-disable prettier/prettier */

const x = {}
export default x
// /**
//  * Vietnamese.
//  */

// const consonants = {
//   b: ['b!', ''],
//   c: ['k', 'k'],
//   ch: ['tx~', 'k'],
//   d: ['z', ''],
//   g: ['r~', ''],
//   gh: ['r~', ''],
//   gi: ['z', ''],
//   h: ['h', ''],
//   k: ['k', ''],
//   kh: ['H', ''],
//   l: ['l', ''],
//   m: ['m', 'm'],
//   n: ['n', 'n'],
//   ng: ['q', 'q'],
//   ngh: ['q', ''],
//   nh: ['ny', 'q'],
//   p: ['', 'p'],
//   ph: ['f', ''],
//   qu: ['kw', ''],
//   r: ['z', '-'],
//   s: ['s', ''],
//   t: ['t', 't'],
//   th: ['th', ''],
//   tr: ['tx~', ''],
//   v: ['v', ''],
//   x: ['s', ''],
//   đ: ['d!', ''],
// }

// const vowels = {
//   a: 'a',
//   e: 'E',
//   i: 'i',
//   o: 'o~',
//   u: 'u',
//   y: 'i',

//   à: 'a_a__',
//   á: 'aa^',
//   â: 'U',
//   ã: "aa^'",
//   è: 'E_E__',
//   é: 'EE^',

//   ê: 'e',
//   ì: 'i_i__',
//   í: 'ii^',
//   ò: 'o~_o~__',
//   ó: 'o~o~^',
//   ô: 'o',

//   õ: "o~o~^'",
//   ù: 'u_u__',
//   ú: 'uu^',
//   ý: 'ii^',
//   ă: 'a',
//   ĩ: "ii^'",

//   ũ: "uu^'",
//   ơ: 'U',
//   ư: 'i~',
//   ạ: "aa_'",
//   ả: 'aa_',
//   ấ: 'UU^',

//   ầ: 'U_U__',
//   ẩ: 'UU_',
//   ẫ: "UU^'",
//   ậ: "UU_'",
//   ắ: 'aa^',
//   ằ: 'a_a__',

//   ẳ: 'aa_',
//   ẵ: "aa^'",
//   ặ: "aa_'",
//   ẹ: "EE_'",
//   ẻ: 'EE_',
//   ẽ: "EE^'",

//   ế: 'ee^',
//   ề: 'e_e__',
//   ể: 'ee_',
//   ễ: "ee^'",
//   ệ: "ee_'",
//   ỉ: 'ii_',

//   ị: "ii_'",
//   ọ: "o~o~_'",
//   ỏ: 'o~o~_',
//   ố: 'oo^',
//   ồ: 'o_o__',
//   ổ: 'oo_',

//   ỗ: "oo^'",
//   ộ: "oo_'",
//   ớ: 'UU^',
//   ờ: 'U_U__',
//   ở: 'UU_',
//   ỡ: "UU^'",

//   ợ: "UU_'",
//   ụ: "uu_'",
//   ủ: 'uu_',
//   ứ: 'i~i~^',
//   ừ: 'i~_i~__',
//   ử: 'i~i~_',

//   ữ: "i~i~^'",
//   ự: "i~i~_'",
//   ỳ: 'i_i__',
//   ỵ: "ii_'",
//   ỷ: 'ii_',
//   ỹ: "ii^'",
// }

// /**
//  * Build trie.
//  */

// /**
//  * Transform the text.
//  */

// const form = s => {
//   let i = 0
//   let r = s
//   let out = []
//   while (r.length) {
//     let found = false
//     x: for (let k in vowels) {
//       if (r.indexOf(k) === 0) {
//         let v = vowels[k]
//         i += k.length
//         out.push(v)
//         r = r.substr(k.length)
//         found = true
//         break x
//       }
//     }

//     if (found) {
//       continue
//     }

//     y: for (let k in consonants) {
//       if (r.indexOf(k) === 0) {
//         let v = consonants[k][r.length == k.length ? 1 : 0]
//         i += k.length
//         out.push(v)
//         r = r.substr(k.length)
//         found = true
//         break y
//       }
//     }

//     if (!found) {
//       throw `oops ${out.join('')} from ${s}`
//     }
//   }
//   return out.join('')
// }

// export default form

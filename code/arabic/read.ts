/* eslint-disable sort-keys/sort-keys-fix */
import symbols from './symbols.json'

export { symbols }

export const consonants = symbols.filter(x =>
  x.roles.includes('consonant'),
)

export const vowels = symbols.filter(
  x => x.roles.includes('vowel') && !x.roles.includes('bound'),
)

export const boundVowels = symbols.filter(
  x => x.roles.includes('vowel') && x.roles.includes('bound'),
)

export const punctuation = symbols.filter(x =>
  x.roles.includes('punctuation'),
)

const precomposedConsonants: Record<string, string> = {
  ﺍ: 'a_',
  ﺎ: 'a_',
}

export const vowelless = `\u0652`

const codeHead = {
  '٠': '0',
  '١': '1',
  '٢': '2',
  '٣': '3',
  '٤': '4',
  '٥': '5',
  '٦': '6',
  '٧': '7',
  '٨': '8',
  '٩': '9',
}

// ```
// import make from '@termsurf/talk'
// make('arabic') //=> ascii

// make.head // forward to ascii
// make.back // backward from ascii
// make.back.mesh['a_']
// make.back.vowel/tone
// make.back.vowel.link // diacritics
// make.back.vowel.site // standalone
// make.back.consonant/vibe
// make.back.bulb // punctuation

// make.back.bulb.open_parenthesis
// ```

// {
//   open_parenthesis: { i: '(', o: '(' },
//   a_long,
//   A_long,
//   A_toneHigh_toneLow2_2,

// }

// {
//   { i: '(', o: '(', name: 'open_parenthesis' },
//   a_long,
//   A_long,
//   A_toneHigh_toneLow2_2,

// }

// const vibeHead = readHead(base, [
//   'c',
//   'C',
// ])

// const codeBase = read(base, )

const vibe: Record<string, string> = {
  '\u0626': "'y",
  '\u0624': "'w",
  '\u064E\u0627': 'a_',
  '\u0650\u0649': 'i_',
  '\u064E\u0649': 'a_',
  '\u0650\u064A': 'i_',
  '\u064F\u0648': 'u_',
  '\u064A\u064E': 'ay',
  '\u0648\u064E': 'aw',

  '\u06a9': 'kh~',

  '\u0649': 'a_',

  ء: "'",

  ا: "'",

  ب: 'b',

  ت: 't',

  ث: 'c',

  ج: 'dj',

  ح: 'hh~',

  خ: 'H',

  د: 'd',

  ذ: 'C',

  ر: 'r',

  ز: 'z',

  س: 's',

  ش: 'x',

  ص: 'sQ~',

  ض: 'dQ~',

  ط: 'tQ~',

  ظ: 'CQ~',

  ع: 'Q',

  غ: 'G',

  ف: 'f',

  ق: 'K',

  ك: 'k',

  ل: 'l',

  م: 'm',

  ن: 'n',

  ه: 'h',

  و: 'w',

  ي: 'y',

  آ: "'a_",
  ٱ: '',

  ة: 'at',

  ال: 'al',

  ﻻ: 'la_',

  ﲓ: 'i_m',

  ﲅ: 'lm',

  ﻯ: 'a',
  ﻰ: 'a',

  '\u0670': 'a_',

  '،': ',',
  '؟': '?',
  '؛': ';',
  '۔': '.',
  '﴾': '{',
  '﴿': '}',

  '\u064e': 'a',
  '\u0650': 'i',
  '\u064f': 'u',
  // '\u0627': 'a_',
  // '\u064a': 'ii',
  // '\u0648': 'uu',
  '\u064b': 'an',
  '\u064d': 'in',
  '\u064c': 'un',

  // ﷲ: 'الله',

  '؀': '#',

  '٪': '%',
  '٫': '.',

  گ: 'g',
  ڨ: 'g',
  ڭ: 'g',
  چ: 'j',
  ڥ: 'v',
  ڤ: 'v',
  پ: 'p',

  '\n': '\n',
  ',': ',',
  ' ': ' ',
  '.': '.',

  '\u06e1': '',
  '\u0652': '',

  '\u0651': '',

  إ: "'i", // Arabic Letter Alef With Hamza Below
  أ: "'",
  '\u200e': '', // ltr marker
}

export const m: Record<string, string> = {
  ...vibe,
  ...precomposedConsonants,
  ...codeHead,
}

const make = (s: string) => {
  let out: Array<string> = []
  let i = 0
  let r = s
  let last: string = ''
  while (r.length) {
    let found = false
    x: for (let k in m) {
      if (r.indexOf(k) === 0) {
        let v =
          k == '\u0651'
            ? (last.split('').pop() as string)
            : (m[k] as string)
        last = v
        i += k.length
        out.push(v)
        r = r.slice(k.length)
        found = true
        break x
      }
    }
    if (!found) {
      throw new Error(
        `oops ${out.join('')} from ${s}, ${r
          ?.codePointAt(0)
          ?.toString(16)}`,
      )
    }
  }
  return out
    .join('')
    .replace(/ii+/g, 'i_')
    .replace(/ee+/g, 'e_')
    .replace(/a_+/g, 'a_')
    .replace(/oo+/g, 'o_')
    .replace(/uu+/g, 'u_')
    .replace(/__+/g, '_')
}

export default make

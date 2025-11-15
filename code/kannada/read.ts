import { build, transform } from '~/base'

export const virama = '\u0ccd'

export const standaloneVowels = {
  ಅ: 'a',
  ಇ: 'i',
  ಉ: 'u',
  ಋ: 'o$',
  ಎ: 'e',
  ಐ: 'ai',
  ಒ: 'o',
  ಔ: 'au',
  ಆ: 'a_',
  ಈ: 'i_',
  ಊ: 'u_',
  ೠ: 'o$_',
  ಏ: 'e_',
  ಓ: 'o_',
}

export const vowelDiacritics = {
  '\u0CBe': 'a_',
  '\u0CBf': 'i',
  '\u0Cc0': 'i_',
  '\u0cc1': 'u',
  '\u0cc2': 'u_',
  '\u0cc3': 'o$',
  '\u0cc4': 'o$_',
  '\u0cc6': 'e',
  '\u0cc7': 'e_',
  '\u0cc8': 'ai',
  '\u0cca': 'o',
  '\u0ccb': 'o_',
  '\u0ccc': 'au',
  '\u0ccd': 'a_',
  '\u0ce2': 'l',
  '\u0ce3': 'll',
}

export const consonants = {
  ಕ: 'ka',
  ಖ: 'kh~a',
  ಗ: 'ga',
  ಘ: 'gh~a',
  ಙ: 'ṅa',
  ಚ: 'txa',
  ಛ: 'txh~a',
  ಜ: 'dja',
  ಝ: 'djh~a',
  ಞ: 'nya',
  ಟ: 'Ta',
  ಠ: 'Th~a',
  ಡ: 'Da',
  ಢ: 'Dh~a',
  ಣ: 'Na',
  ತ: 'ta',
  ಥ: 'th~a',
  ದ: 'da',
  ಧ: 'dh~a',
  ನ: 'na',
  ಪ: 'pa',
  ಫ: 'ph~a',
  ಬ: 'ba',
  ಭ: 'bh~a',
  ಮ: 'ma',
  ಯ: 'ya',
  ರ: 'ra',
  ಱ: 'rra',
  ಲ: 'la',
  ವ: 'va',
  ಶ: 'xa',
  ಷ: 'Xa',
  ಸ: 'sa',
  ಹ: 'hh~a',
  ಳ: 'La',
  ೞ: 'lla',
}

export const numbers = {
  '೦': 0,
  '೧': 1,
  '೨': 2,
  '೩': 3,
  '೪': 4,
  '೫': 5,
  '೬': 6,
  '೭': 7,
  '೮': 8,
  '೯': 9,
}

const vowelTransformer = Object.keys(vowelDiacritics).reduce((m, x) => {
  let render = vowelDiacritics[x]
  m[x] = m => {
    m[m.length - 1] = m[m.length - 1].replace(/a/, '') + render
  }
  return m
}, {})

const m = {
  ...standaloneVowels,
  ...vowelTransformer,
  ...consonants,
  [virama]: m => {
    m[m.length - 1] = m[m.length - 1].replace(/a/, '')
  },
}

const s = build(m)

const form = (t: string) => transform(t, s, m)

export default form

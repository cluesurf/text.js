import { Map, build, transform } from '~/base'

// https://ccat.sas.upenn.edu/plc/tamilweb/

export const virama = '\u0bcd'
export const anusvara = '\u0b82'

export const numerals = {
  '௦': 0,
  '௧': 1,
  '௨': 2,
  '௩': 3,
  '௪': 4,
  '௫': 5,
  '௬': 6,
  '௭': 7,
  '௮': 8,
  '௯': 9,
  '௰': 1,
}

export const vowelDiacritics: Record<string, string> = {
  '\u0BBe': 'a_',
  '\u0BBf': 'i',
  '\u0Bc0': 'i_',
  '\u0Bc1': 'u',
  '\u0Bc2': 'u_',
  '\u0Bc6': 'e',
  '\u0Bc7': 'e_',
  '\u0Bc8': 'ai',
  '\u0Bca': 'o',
  '\u0Bcb': 'o_',
  '\u0Bcc': 'au',
}

export const standaloneVowels: Record<string, string> = {
  அ: 'a',
  ஆ: 'a_',
  இ: 'i',
  ஈ: 'i_',
  உ: 'u',
  ஊ: 'u_',
  எ: 'e',
  ஏ: 'e_',
  ஐ: 'aI',
  ஒ: 'o',
  ஓ: 'o_',
  ஔ: 'aO',
}

export const akku = {
  ஃ: 'aH',
}

export const consonants: Record<string, string> = {
  க: 'ka',
  ஃப: 'fa',
  ஃஜ: 'za',
  ஃக: 'Ha',
  ங: 'Ka',
  ச: 'tHa',
  ஞ: 'ny~a',
  ட: 'Ta',
  ண: 'Na',
  த: 'ta',
  ந: 'na',
  ப: 'pa',
  ம: 'ma',
  ய: 'i$a',
  ர: 'ra',
  ல: 'la',
  வ: 'Va',
  ழ: 'u$a',
  ள: 'La',
  ற: 'ra',
  ன: 'na',
  ஜ: 'dya',
  ஶ: 'Ha',
  ஷ: 'kXa',
  ஸ: 'sa',
  ஹ: 'ha',
}

export const vowelTransformer = Object.keys(
  vowelDiacritics,
).reduce<Map>((m, x) => {
  let render = vowelDiacritics[x]
  m[x] = m => {
    const last = m[m.length - 1]
    if (last) {
      m[m.length - 1] = last.replace(/a/, '') + render
    }
  }
  return m
}, {})

export const characters: Map = {
  ...vowelTransformer,
  ...standaloneVowels,
  ...akku,
  ...consonants,
  ...numerals,
  [anusvara]: m => {
    let last = m[m.length - 1]
    if (last) {
      if (last.endsWith('_')) {
        last = last.replace('_', '')
        last = `${last}&_`
      } else {
        last = `${last}&`
      }
      m[m.length - 1] = last
    }
  },
  [virama]: m => {
    const last = m[m.length - 1]
    if (last) {
      m[m.length - 1] = last.replace(/a/, '')
    }
  },
  ',': ',',
  '.': '',
  '?': '?',
  ';': ';',
  '-': '=-',
  ' ': ' ',
}

const s = build(characters)

const form = (t: string) => transform(t, s, characters)
export default form

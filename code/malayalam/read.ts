import { build, transform } from '~/base'

export const virama = '\u0D4d'

export const anusvara = `ം`
export const visarga = `\u0d03`

export const vowelDiacritics = {
  '\u0D3e': 'a_',
  '\u0D3f': 'i',
  '\u0D40': 'i_',
  '\u0D41': 'u',
  '\u0D42': 'u_',
  '\u0D43': 'u$',
  '\u0D44': 'u$_',
  '\u0D46': 'e',
  '\u0D47': 'e_',
  '\u0D48': 'ai',
  '\u0D4a': 'o',
  '\u0D4b': 'o_',
  '\u0D4c': 'au',
  '\u0D57': 'au',
  '\u0D62': 'l',
  '\u0D63': 'll',
}

export const otherDiacritics = {
  '\u0D11': '&',
  '\u0D12': '&',
  '\u0D13': 'h',
}

export const standaloneVowels = {
  അ: 'a',
  ഇ: 'i',
  ഉ: 'u',
  ഋ: 'u$',
  ഌ: 'l',
  എ: 'e',
  ഒ: 'o',
  ആ: 'a_',
  ഈ: 'i_',
  ഊ: 'u_',
  ൠ: 'u$_',
  ൡ: 'll',
  ഏ: 'e_',
  ഓ: 'o_',
  ഐ: 'ai',
  ഔ: 'au',
}

export const consonants = {
  ക: 'ka',
  ഖ: 'kh~a',
  ഗ: 'ga',
  ഘ: 'gh~a',
  ങ: 'qa',
  ച: 'txa',
  ഛ: 'txh~a',
  ജ: 'dja',
  ഝ: 'djh~a',
  ഞ: 'ny~a',
  ട: 'Ta',
  ഠ: 'Th~a',
  ഡ: 'Da',
  ഢ: 'Dh~a',
  ണ: 'Na',
  ത: 'ta',
  ഥ: 'th~a',
  ദ: 'da',
  ധ: 'dh~a',
  ന: 'na',
  പ: 'pa',
  ഫ: 'ph~a',
  ബ: 'ba',
  ഭ: 'bh~a',
  മ: 'ma',
  യ: 'ya',
  ര: 'ra',
  ല: 'la',
  വ: 'Va',
  ശ: 'xa',
  ഷ: 'Xa',
  സ: 'sa',
  ഹ: 'ha',
  ള: 'La',
  ഴ: 'Ra',
  റ: 'ra',
  ഩ: 'na',
  ഺ: 'ta',
}

export const chilluConsonants = {
  ൿ: 'ka',
  ൾ: 'lla',
  ൽ: 'la',
  ർ: 'ra',
  ൻ: 'na',
  ൺ: 'Na',
}

const vowelTransformer = Object.keys(vowelDiacritics).reduce((m, x) => {
  let render = vowelDiacritics[x]
  m[x] = m => {
    m[m.length - 1] = m[m.length - 1].replace(/a/, '') + render
  }
  return m
}, {})

const m = {
  [visarga]: 'h',
  ...otherDiacritics,
  ...vowelTransformer,
  ...standaloneVowels,
  ...consonants,
  ...chilluConsonants,
  '-': '-',
  [virama]: m => {
    m[m.length - 1] = m[m.length - 1].replace(/a/, '')
  },
  [anusvara]: m => {
    m[m.length - 1] = m[m.length - 1].replace(
      /([aeiou])$/i,
      (_, $1) => `${$1}m`,
    )
  },
}

const s = build(m)

const form = (t: string) => transform(t, s, m)

export default form

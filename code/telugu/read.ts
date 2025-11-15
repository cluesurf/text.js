import { build, transform } from '~/base'

export const virama = '\u0C4d'

export const vowelDiacritics = {
  '\u0C3e': 'a_',
  '\u0C3f': 'i',
  '\u0C40': 'i_',
  '\u0C41': 'u',
  '\u0C42': 'u_',
  '\u0C43': 'u$',
  '\u0C44': 'u$_',
  '\u0C46': 'e',
  '\u0C47': 'e_',
  '\u0C48': 'ay',
  '\u0C4a': 'o',
  '\u0C4b': 'o_',
  '\u0C4c': 'aw',
  '\u0C62': 'l',
  '\u0C63': 'll',
}

export const otherDiacritics = {
  '\u0C03': 'h',
  '\u0C01': '&',
}

export const standaloneVowels = {
  అ: 'a',
  ఇ: 'i',
  ఉ: 'u',
  ఋ: 'r',
  ఌ: 'l',
  ఎ: 'e',
  ఐ: 'ay',
  ఒ: 'o',
  ఔ: 'aw',
  ఆ: 'a_',
  ఈ: 'i_',
  ఊ: 'u_',
  ౠ: 'u$_',
  ౡ: 'll',
  ఏ: 'e_',
  ఓ: 'o_',
}

export const consonants = {
  క: 'ka',
  ఖ: 'kh~a',
  గ: 'ga',
  ఘ: 'gh~a',
  ఙ: 'qa',
  చ: 'txa',
  ఛ: 'txh~a',
  జ: 'dja',
  ఝ: 'djh~a',
  ఞ: 'ny~a',
  ట: 'Ta',
  ఠ: 'Th~a',
  డ: 'Da',
  ఢ: 'Dh~a',
  ణ: 'Na',
  త: 'ta',
  థ: 'th~a',
  ద: 'da',
  ధ: 'dh~a',
  న: 'na',
  ప: 'pa',
  ఫ: 'ph~a',
  బ: 'ba',
  భ: 'bh~a',
  మ: 'ma',
  య: 'ya',
  ర: 'ra',
  ల: 'la',
  వ: 'Va',
  ళ: 'La',
  శ: 'xa',
  ష: 'Xa',
  స: 'sa',
  హ: 'ha',
  ఴ: 'Ra',
  ఱ: 'rra',
  ౚ: 'da',
  ౘ: 'tsa',
  ౙ: 'dza',
}

export const consonantDiacritics = {
  '్క': 'ka',
  '్ఖ': 'kh~a',
  '్గ': 'ga',
  '్ఘ': 'gh~a',
  '్ఙ': 'qa',
  '్చ': 'txa',
  '్ఛ': 'txh~a',
  '్జ': 'dja',
  '్ఝ': 'djh~a',
  '్ఞ': 'ny~a',
  '్ట': 'Ta',
  '్ఠ': 'Th~a',
  '్డ': 'Da',
  '్ఢ': 'Dh~a',
  '్ణ': 'Na',
  '్త': 'ta',
  '్థ': 'th~a',
  '్ద': 'da',
  '్ధ': 'dh~a',
  '్న': 'na',
  '్ప': 'pa',
  '్ఫ': 'ph~a',
  '్బ': 'ba',
  '్భ': 'bh~a',
  '్మ': 'ma',
  '్య': 'ya',
  '్ర': 'ra',
  '్ల': 'la',
  '్వ': 'Va',
  '్ళ': 'La',
  '్శ': 'xa',
  '్ష': 'Xa',
  '్స': 'sa',
  '్హ': 'ha',
}

const vowelTransformer = Object.keys(vowelDiacritics).reduce((m, x) => {
  let render = vowelDiacritics[x]
  m[x] = m => {
    m[m.length - 1] = m[m.length - 1].replace(/a/, '') + render
  }
  return m
}, {})

const m = {
  ...otherDiacritics,
  ...vowelTransformer,
  ...standaloneVowels,
  ...consonants,
  ...consonantDiacritics,
  [virama]: m => {
    m[m.length - 1] = m[m.length - 1].replace(/a/, '')
  },
}

const s = build(m)

const form = (t: string) => transform(t, s, m)

export default form

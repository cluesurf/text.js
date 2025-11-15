// https://en.wikipedia.org/wiki/Gurmukhi

import { Map, basicPunctuation, build, transform } from '~/base'

export const virama = '\u0A4d'
export const tippi = '\u0a70'
export const bindi = '\u0a02'

const standaloneVowels: Map = {
  ਅ: 'U',
  ਆ: 'a_',
  ਇ: 'I',
  ਈ: 'i_',
  ਉ: 'O',
  ਊ: 'u_',
  ਏ: 'e_',
  ਐ: 'E_',
  ਓ: 'o_',
  ਔ: 'o$_',
}

const vowels: Map = {
  '\u0A3e': 'a_',
  '\u0A3f': 'I',
  '\u0A40': 'i_',
  '\u0A41': 'O',
  '\u0A42': 'u_',
  '\u0A47': 'e_',
  '\u0A48': 'E_',
  '\u0A4b': 'o_',
  '\u0A4c': 'o$_',
}

const vowelTransformer = Object.keys(vowels).reduce<Map>((m, x) => {
  let render = vowels[x]
  m[x] = m => {
    const last = m[m.length - 1]
    if (last) {
      m[m.length - 1] = last.replace(/U[_-]?/, '') + render
    } else if (typeof render === 'string') {
      m[m.length - 1] = render
    }
  }
  return m
}, {})

export const blank: Map = {
  ੲ: '',
  ੳ: '',
}

export const consonants: Map = {
  ਕ: 'kU',
  ਖ: 'kh~U',
  ਖ਼: 'HU',
  ਗ: 'gU',
  ਗ਼: 'GU',
  ਘ: 'kU-',
  ਙ: 'qU',
  ਚ: 'txU',
  ਛ: 'txh~U',
  ਜ: 'djU',
  ਜ਼: 'zU',
  ਝ: 'txU-',
  ਞ: 'ny~U',
  ਟ: 'TU',
  ਠ: 'Th~U',
  ਡ: 'DU',
  ਢ: 'TU-',
  ਣ: 'NU',
  ਤ: 'tU',
  ਥ: 'th~U',
  ਦ: 'dU',
  ਧ: 'tU-',
  ਨ: 'nU',
  ਪ: 'pU',
  ਫ: 'ph~U',
  ਫ਼: 'fU',
  ਬ: 'bU',
  ਭ: 'pU-',
  ਮ: 'mU',
  ਯ: 'yU',
  ਰ: 'rU',
  ਲ: 'lU',
  ਲ਼: 'LU',
  ਵ: 'VU',
  ਸ: 'sU',
  ਸ਼: 'xU',
  ਹ: 'hU',
  ੜ: 'RU',
  ਜ਼: 'zU',
  ਫ਼: 'fU',
  ਖ਼: 'kh~U',
  ਸ਼: 'xU',
  ਗ਼: 'GU',
  ਲ਼: 'lU',
}

export const numbers: Map = {
  '੦': '0',
  '੧': '1',
  '੨': '2',
  '੩': '3',
  '੪': '4',
  '੫': '5',
  '੬': '6',
  '੭': '7',
  '੮': '8',
  '੯': '9',
}

const addak = `\u0A71`

const nasal = (m: Array<string>) => {
  const last = m[m.length - 1]
  if (last) {
    if (last.match(/[_-]/)) {
      m[m.length - 1] = last.replace(/(-_|_|-)/, (_, $1) => `&${$1}`)
    } else {
      m[m.length - 1] = `${last}&`
    }
  }
}

const geminated = (m: Array<string>, n: string) => {
  const next = n[0]
  if (next?.match(/[bcdfghjklmnpqrstvwxyz]/i)) {
    m.push(next)
  }
}

const nuktaConsonants: Map = {
  ਫ਼: 'fU',
  ਜ਼: 'zU',
  ਸ਼: 'xU',
  ਖ਼: 'HU',
  ਗ਼: 'GU',
  ਲ਼: 'LU',
}

export const characters: Map = {
  ...blank,
  ...vowelTransformer,
  ...standaloneVowels,
  ...nuktaConsonants,
  ...consonants,
  ...numbers,
  '\u0a3c': '', // ignore nukta on others
  [addak]: geminated,
  [virama]: m => {
    const last = m[m.length - 1]
    if (last) {
      m[m.length - 1] = last.replace(/U[_-]?/, '')
    }
  },
  [tippi]: nasal,
  [bindi]: nasal,
  ੴ: 'Ik o_qka_r',
  '।': '।', // danda to gurmukhi danda
  '॥': '॥', // double danda
  '\u0a03': '.', // visarga is abbreviation
  ...basicPunctuation,
}

const s = build(characters)

const form = (t: string) => transform(t, s, characters)

export default form

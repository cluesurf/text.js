import { Map, Mark, build, transform } from '~/base'
import symbols from './symbols.json'

export const consonants = symbols.filter(x =>
  x.roles?.includes('consonant'),
)

export const boundVowels = symbols.filter(
  x => x.roles?.includes('vowel') && x.roles.includes('bound'),
)

export const vowels = symbols.filter(
  x => x.roles?.includes('vowel') && !x.roles.includes('bound'),
)

export const modifiers = symbols.filter(x =>
  x.roles?.includes('modifier'),
)

export const punctuations = symbols.filter(x =>
  x.roles?.includes('punctuation'),
)

export const numerals = symbols.filter(x =>
  x.roles?.includes('numeral'),
)

export const sounds = symbols.filter(x => x.roles?.includes('sound'))

const boundVowelsMap = boundVowels.reduce((m: Map, x: Mark) => {
  m[x.text] = x.talk!
  return m
}, {})

const vowelsMap = vowels.reduce((m: Map, x: Mark) => {
  m[x.text] = x.talk!
  return m
}, {})

const consonantsMap = consonants.reduce((m: Map, x: Mark) => {
  m[x.text] = x.talk!
  return m
}, {})

const soundsMap = sounds.reduce((m: Map, x: Mark) => {
  m[x.text] = x.talk!
  return m
}, {})

const visarga = modifiers.find(x => x.name!.link === 'visarga')!
const anusvara = modifiers.find(x => x.name!.link === 'anusvara')!
const virama = modifiers.find(x => x.name!.link === 'virama')!

const laghava = punctuations.find(x => x.name!.link === 'laghava')!

const vowelTransformerMap = Object.keys(boundVowelsMap).reduce<Map>(
  (m, x) => {
    let render = boundVowelsMap[x]
    m[x] = m => {
      const last = m[m.length - 1]
      if (last) {
        m[m.length - 1] = last.replace(/a_?/, '') + render
      }
    }
    return m
  },
  {},
)

const map: Map = {
  ...vowelsMap,
  ...vowelTransformerMap,
  ...consonantsMap,
  [visarga.text]: visarga.talk!,
  [laghava.text]: laghava.talk!,
  [anusvara.text]: m => {
    let last = m[m.length - 1]
    if (last) {
      if (last.endsWith('_')) {
        last = last.replace('_', '')
        last = `${last}${anusvara.talk}_`
      } else {
        last = `${last}${anusvara.talk}`
      }
      m[m.length - 1] = last
    }
  },
  ...soundsMap,
  [virama.text]: m => {
    const last = m[m.length - 1]
    if (last) {
      m[m.length - 1] = last.replace(/a_?/, '')
    }
  },
}

const tree = build(map)

const make = (text: string) => transform(text, tree, map)

export default make

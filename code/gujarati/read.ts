import { Map, build, transform } from '~/base'

const virama = '\u0D4d'

const vowelDiacriticsMap = {
  '\u0abe': 'a_',
  '\u0abf': 'i',
  '\u0ac0': 'i_',
  '\u0ac1': 'u',
  '\u0ac2': 'u_',
  '\u0ac3': 'u$',
  '\u0ac4': 'u$_',
  '\u0ac5': 'e&',
  '\u0ac7': 'e',
  '\u0ac8': 'ai',
  '\u0ac9': 'o&',
  '\u0acb': 'o',
  '\u0acc': 'au',
  '\u0ae2': 'l',
  '\u0ae3': 'll',
}

const otherDiacriticsMap = {
  '\u0a81': '&',
  '\u0a82': '&',
  '\u0a83': 'h',
}

const standaloneVowelsMap = {
  અ: 'U',
  આ: 'a',
  ઇ: 'i',
  ઈ: 'i',
  ઉ: 'u',
  ઊ: 'u',
  એ: 'E',
  ઐ: 'Uy',
  ઓ: 'o$',
  ઔ: 'UV',
  અં: 'a',
  ઋ: 'ru',
  ઍ: 'A',
  ઑ: 'o$',
  ર: 'r',
  જ: 'y',
  હ: 'h',
  રૂ: 'ru',
  જી: 'yi',
  હૃ: 'hr',
}

const digitsMap = {
  '૦': '0',
  '૧': '1',
  '૨': '2',
  '૩': '3',
  '૪': '4',
  '૫': '5',
  '૬': '6',
  '૭': '7',
  '૮': '8',
  '૯': '9',
}

const consonantsMap = {
  ક: 'kU',
  ખ: 'khU',
  ગ: 'gU',
  ઘ: 'ghU',
  ઙ: 'qU',
  ચ: 'txU',
  છ: 'txh~U',
  જ: 'djU',
  ઝ: 'djh~U',
  ઞ: 'ny~U',
  ય: 'yU',
  શ: 'xU',
  ટ: 'TU',
  ઠ: 'Th~U',
  ડ: 'DU',
  ઢ: 'Dh~U',
  ણ: 'NU',
  ર: 'rU',
  ષ: 'XU',
  ત: 'tU',
  થ: 'th~U',
  દ: 'dU',
  ધ: 'dh~U',
  ન: 'nU',
  લ: 'lU',
  સ: 'sU',
  પ: 'pU',
  ફ: 'ph~U',
  બ: 'bU',
  ભ: 'bh~U',
  મ: 'mU',
  વ: 'VU',
  હ: 'hU',
  ળ: 'LU',
  ક્ષ: 'kXU',
  જ્ઞ: 'gnU',
}

const vowelTransformerMap = Object.keys(vowelDiacriticsMap).reduce<Map>(
  (m, x) => {
    let render = vowelDiacriticsMap[x]
    m[x] = m => {
      m[m.length - 1] = m[m.length - 1]!.replace(/U/, '') + render
    }
    return m
  },
  {},
)

const map: Map = {
  ...otherDiacriticsMap,
  ...vowelTransformerMap,
  ...standaloneVowelsMap,
  ...consonantsMap,
  [virama]: m => {
    m[m.length - 1] = m[m.length - 1]!.replace(/U/, '')
  },
}

const trie = build(map)

const make = (t: string) => transform(t, trie, map)

export default make

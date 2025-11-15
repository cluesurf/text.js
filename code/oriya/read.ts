import { build, transform } from '~/base'

const virama = '\u0B4d'

const vowelDiacritics = {
  '\u0B3e': 'a_',
  '\u0B3f': 'i',
  '\u0B40': 'i_',
  '\u0B41': 'u',
  '\u0B42': 'u_',
  '\u0B43': 'u$',
  '\u0B44': 'u$_',
  '\u0B47': 'e',
  '\u0B48': 'ai',
  '\u0B4b': 'o',
  '\u0B4c': 'au',
  '\u0B62': 'l',
  '\u0B63': 'll',
}

const standaloneVowels = {
  ଅ: 'a',
  ଇ: 'i',
  ଉ: 'u',
  ଋ: 'u$u',
  ଌ: 'lu',
  ଆ: 'a_',
  ଈ: 'i_',
  ଊ: 'u_',
  ୠ: 'u$_u',
  ୡ: 'llu',
  ଏ: 'e',
  ଓ: 'o',
  ଐ: 'ai',
  ଔ: 'au',
}

const consonants = {
  କ: 'ko$',
  ଖ: 'kh~o$',
  ଗ: 'go$',
  ଘ: 'gh~o$',
  ଙ: 'qo$',
  ଚ: 'txo$',
  ଛ: 'txh~o$',
  ଜ: 'djo$',
  ଝ: 'djh~o$',
  ଞ: 'ny~o$',
  ଟ: 'To$',
  ଠ: 'Th~o$',
  ଡ: 'Do$',
  ଢ: 'Dh~o$',
  ଣ: 'No$',
  ତ: 'to$',
  ଥ: 'th~o$',
  ଦ: 'do$',
  ଧ: 'dh~o$',
  ନ: 'no$',
  ପ: 'po$',
  ଫ: 'ph~o$',
  ବ: 'bo$',
  ଭ: 'bh~o$',
  ମ: 'mo$',
  ଯ: 'djo$',
  ୟ: 'yo$',
  ର: 'ro$',
  ଳ: 'Lo$',
  ଲ: 'lo$',
  ୱ: 'wo$',
  ଶ: 'so$',
  ଷ: 'so$',
  ସ: 'so$',
  ହ: 'ho$',
  ଡ଼: 'Ro$',
  ଢ଼: 'Rh~o$',
  କ୍ଷ: 'kso$',
}

const vowelTransformer = Object.keys(vowelDiacritics).reduce((m, x) => {
  let render = vowelDiacritics[x]
  m[x] = m => {
    m[m.length - 1] = m[m.length - 1].replace(/o~/, '') + render
  }
  return m
}, {})

const m = {
  ...vowelTransformer,
  ...standaloneVowels,
  ...consonants,
  [virama]: m => {
    m[m.length - 1] = m[m.length - 1].replace(/o~/, '')
  },
}

const s = build(m)

const form = (t: string) => transform(t, s, m)

export default form

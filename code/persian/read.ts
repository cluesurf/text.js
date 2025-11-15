import { build, transform, Map } from '~/base'

const consonants: Map = {
  '\u0621': 'ʔ',
  '\u0623': 'ʔ',
  '\u0626': 'ʔ',
  '\u0624': 'ʔ',
  '\u0627': 'ɒ',
  '\u0628': 'b',
  '\u067E': 'p',
  '\u062A': 't',
  '\u062B': 's',
  '\u062C': 'd͡ʒ',
  '\u0686': 't͡ʃ',
  '\u062D': 'h',
  '\u062E': 'x',
  '\u062F': 'd',
  '\u0630': 'z',
  '\u0631': 'r',
  '\u0632': 'z',
  '\u0698': 'ʒ',
  '\u0633': 's',
  '\u0634': 'ʃ',
  '\u0635': 's',
  '\u0636': 'z',
  '\u0637': 't',
  '\u0638': 'z',
  '\u0639': ['ʔ', 'æ', 'a'],
  '\u0641': 'f',
  '\u0642': 'q',
  '\u06A9': 'k',
  '\u06AF': 'ɡ',
  '\u0644': 'l',
  '\u0645': 'm',
  '\u0646': 'n',
  '\u063A': ['ɢ', 'ɣ'],
  '\u0648': ['u', 'ow', 'v', 'o', 'u', 'w', 'aw', 'oː'],
  '\u0647': ['h', 'or', 'a'],
  '\u06CC': ['j', 'i', 'ɒː', 'aj', 'eː', 'ɒː'],
}

const otherCharacters: Map = {
  '\u0622': 'ɒ',
  '\u06C0': 'eje',
  '\u0644': 'lɒ',
  '\u0627': 'lɒ',
}

const symbols: Map = {
  ...consonants,
  ...otherCharacters,
}

const s = build(symbols)

const make = (t: string) => transform(t, s, symbols)

export default make

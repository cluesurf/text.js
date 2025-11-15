import { build, transform } from '~/base'

const consonants = {
  ᨀ: 'ka',
  ᨁ: 'ga',
  ᨂ: 'qa',
  ᨃ: 'qka',
  ᨄ: 'pa',
  ᨅ: 'ba',
  ᨆ: 'ma',
  ᨇ: 'mpa',
  ᨈ: 'ta',
  ᨉ: 'da',
  ᨊ: 'na',
  ᨋ: 'nra',
  ᨌ: 'txa',
  ᨍ: 'dja',
  ᨎ: 'ny~a',
  ᨏ: 'ntxa',
  ᨐ: 'ya',
  ᨑ: 'ra',
  ᨒ: 'la',
  ᨓ: 'wa',
  ᨔ: 'sa',
  ᨕ: 'a',
  ᨖ: 'ha',
}

const vowels = {
  '◌ᨗ': 'i',
  '◌ᨘ': 'u',
  'ᨙ': 'e',
  'ᨚ': 'o',
  '◌ᨛ': 'U',
}

const punctuation = {
  '᨞': ',', // pauses
  '᨟': '', // section
}

const map = {
  ...consonants,
  ...vowels,
  ...punctuation,
}

/**
 * Build trie.
 */

const trie = build(map)

/**
 * Transform the text.
 */

const make = (text: string) => transform(text, trie, map)

export default make

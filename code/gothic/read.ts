/* eslint-disable sort-keys/sort-keys-fix */
// https://en.wiktionary.org/wiki/Category:Gothic_terms_with_IPA_pronunciation

import { build, transform } from '~/base'
import symbolsBase from './symbols.json'

const map = {
  '𐌰': 'a',
  '𐌱': 'b',
  '𐌲': 'g',
  '𐌳': 'd',
  '𐌴': 'e_',
  '𐌵': 'kw~',
  '𐌶': 'z',
  '𐌷': 'h',
  '𐌸': 'c',
  '𐌹': 'i',
  '𐌺': 'k',
  '𐌻': 'l',
  '𐌼': 'm',
  '𐌽': 'n',
  '𐌾': 'y',
  '𐌿': 'U',
  '𐍀': 'p',
  '𐍁': '',
  '𐍂': 'r',
  '𐍃': 's',
  '𐍄': 't',
  '𐍅': 'w',
  '𐍆': 'F',
  '𐍇': 'x',
  '𐍈': 'hw~',
  '𐍉': 'o_',
  '𐍊': '',

  ' ': ' ',
  '\n': '\n',
  '(': '(',
  ')': ')',
  "'": "'",
  ',': ',',
  '.': '.',
  '?': '?',
  '׳': "'",
  '״': '"',
  ':': ':',
  ';': ';',
  '!': '!',
}

const numericsMap = {
  '𐌰': 1,
  '𐌱': 2,
  '𐌲': 3,
  '𐌳': 4,
  '𐌴': 5,
  '𐌵': 6,
  '𐌶': 7,
  '𐌷': 8,
  '𐌸': 9,
  '𐌹': 10,
  '𐌺': 20,
  '𐌻': 30,
  '𐌼': 40,
  '𐌽': 50,
  '𐌾': 60,
  '𐌿': 70,
  '𐍀': 80,
  '𐍁': 90,
  '𐍂': 100,
  '𐍃': 200,
  '𐍄': 300,
  '𐍅': 400,
  '𐍆': 500,
  '𐍇': 600,
  '𐍈': 700,
  '𐍉': 800,
  '𐍊': 900,
}

export const symbols = symbolsBase.map(x => {
  return {
    ...x,
    talk: map[x.text],
    numeric: numericsMap[x.text],
  }
})

export const consonants = symbols.filter(x =>
  x.roles.includes('consonant'),
)

export const vowels = symbols.filter(x => x.roles.includes('vowel'))

const trie = build(map)

const make = (i: string) => transform(i, trie, map)

export default make

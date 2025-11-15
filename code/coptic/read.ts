/* eslint-disable sort-keys/sort-keys-fix */

import { build, transform } from '~/base'
import symbols from './symbols.json'

export { symbols }

export const consonants = symbols.filter(x =>
  x.roles.includes('consonant'),
)

export const vowels = symbols.filter(x => x.roles.includes('vowel'))

export const marks = symbols.filter(x => x.roles.includes('mark'))

const map = {
  ⲁ: 'a',
  ⲃ: 'V',
  ⲅ: 'k',
  ⲇ: 't',
  ⲉ: 'U',
  ⲋ: '',
  ⲍ: 's',
  ⲏ: 'e_',
  ⲑ: 'th~',
  ⲓ: 'i',
  ⲕ: 'k',
  ⲗ: 'l',
  ⲙ: 'm',
  ⲛ: 'n',
  ⲝ: 'ks',
  ⲟ: 'o$',
  ⲡ: 'p',
  ⲣ: 'r',
  ⲥ: 's',
  ⲧ: 't',
  ⲩ: 'w',
  ⲫ: 'ph~',
  ⲭ: 'kh~',
  ⲯ: 'ps',
  ⲱ: 'o_',
  ϣ: 'x',
  ϥ: 'f',
  ϧ: 'H',
  ⳉ: 'H',
  ϩ: 'h',
  ϫ: 'tx',
  ϭ: 'txh~',
  ϯ: 'ti',
}

const trie = build(map)

const make = (text: string) => transform(text, trie, map)

export default make

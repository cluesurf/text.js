import { build, transform } from '~/base'

const alphabet = {
  ࡀ: 'a',
  ࡁ: 'b',
  ࡂ: 'g',
  ࡃ: 'd',
  ࡄ: 'h',
  ࡅ: 'w',
  ࡆ: 'z',
  ࡇ: 'H',
  ࡈ: 'tG~',
  ࡉ: 'y',
  ࡊ: 'k',
  ࡋ: 'l',
  ࡌ: 'm',
  ࡍ: 'n',
  ࡎ: 's',
  ࡏ: 'e',
  ࡐ: 'p',
  ࡑ: 'sG~',
  ࡒ: 'K',
  ࡓ: 'r',
  ࡔ: 'x',
  ࡕ: 't',
  ࡖ: 'C',
}

/**
 * Build trie.
 */

const trie = build(alphabet)

/**
 * Transform the text.
 */

const make = (text: string) => transform(text, trie, alphabet)

export default make

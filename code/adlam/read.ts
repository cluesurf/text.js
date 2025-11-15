import { build, transform } from '~/base'

// https://github.com/keymanapp/keyboards/tree/master/release/d
export const alphabet = {
  '𞤢': 'a',
  '𞤣': 'd',
  '𞤤': 'l',
  '𞤥': 'm',
  '𞤦': 'b',
  '𞤧': 's',
  '𞤨': 'p',
  '𞤩': 'b?',
  '𞤪': 'r',
  '𞤫': 'e',
  '𞤬': 'f',
  '𞤭': 'i',
  '𞤮': 'o$',
  '𞤯': 'd?',
  '𞤰': "'y~",
  '𞤱': 'w',
  '𞤲': 'n',
  '𞤳': 'k',
  '𞤴': 'y',
  '𞤵': 'u',
  '𞤶': 'dj',
  '𞤷': 'tx',
  '𞤸': 'h',
  '𞤹': 'K',
  '𞤺': 'g',
  '𞤻': 'ny~',
  '𞤼': 't',
  '𞤽': 'q',
  '𞤾': 'v',
  '𞤿': 'x',
  '𞥀': 'gb',
  '𞥁': 'z',
  '𞥂': 'kp',
  '𞥃': 'x',
}

const diacritics = {
  '◌𞥄': 'a_',
  '◌𞥅': '_',
  '◌𞥆': '',
  '◌𞥇': "'",
  '◌𞥈': '',
  '◌𞥉': '',
  '◌𞥊': '',
  '𞥋': '',
}

export const numbers = {
  '𞥐': 0,
  '𞥑': 1,
  '𞥒': 2,
  '𞥓': 3,
  '𞥔': 4,
  '𞥕': 5,
  '𞥖': 6,
  '𞥗': 7,
  '𞥘': 8,
  '𞥙': 9,
}

// .	.
// ⹁	,
// :	:
// ⁏	;
// 𞥟 … ؟	¿ … ?
// ! … 𞥞	¡ … !

const map = {
  ...alphabet,
  ...diacritics,
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

import { build, transform } from '~/base'

export const vowels = {
  অ: 'o$',
  ই: 'i',
  উ: 'u',
  ঋ: 'o$i',
  ঌ: 'li',
  আ: 'a',
  ঈ: 'i',
  ঊ: 'u',
  ৠ: 'o$_i',
  ৡ: 'lli',
}

export const diacritics = {
  'া': 'a',
  'ি': 'i',
  'ী': 'i',
  'ু': 'u',
  'ূ': 'u',
  'ৃ': 'o$i',
  'ৄ': 'o$_i',
  'ৢ': 'li',
  'ৣ': 'lli',
}

export const complexVowels = {
  এ: 'e',
  ও: 'o',
  ঐ: 'oi',
  ঔ: 'ou',
}

export const complexDiacritics = {
  'ে': 'e',
  'ৈ': 'o',
  'ো': 'oi',
  'ৌ': 'ou',
}

export const consonants = {
  ক: 'ko$',
  খ: 'kh~o$',
  গ: 'go$',
  ঘ: 'gh~o$',
  ঙ: 'qo$',
  হ: 'ho$',
  চ: 'txo$',
  ছ: 'txh~o$',
  জ: 'djo$',
  ঝ: 'djh~o$',
  ঞ: 'no$',
  য: 'zo$',
  শ: 'xo$',
  ট: 'To$',
  ঠ: 'Th~o$',
  ড: 'Do$',
  ঢ: 'Dh~o$',
  ণ: 'ny~o$',
  র: 'ro$',
  ষ: 'Xo$',
  ত: 'to$',
  থ: 'th~o$',
  দ: 'do$',
  ধ: 'dh~o$',
  ন: 'no$',
  ল: 'lo$',
  স: 'so$',
  প: 'po$',
  ফ: 'ph~o$',
  ব: 'bo$',
  ভ: 'bh~o$',
  ম: 'mo$',
  ৱ: 'wo$',
}

export const postReformConsonants = {
  ড়: 'Ro$',
  ঢ়: 'Rh~o$',
  য়: 'yo$',
}

const map = {
  ...consonants,
  ...vowels,
  ...diacritics,
  ...complexVowels,
  ...complexDiacritics,
  ...postReformConsonants,
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

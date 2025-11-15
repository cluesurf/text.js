/* eslint-disable sort-keys/sort-keys-fix */
import { Map, build, transform } from '~/base'

/**
 * Finnish.
 */

const map: Map = {
  a: 'a',
  b: 'p',
  // c: ['k', 's'],
  c: 'k',
  d: 't',
  e: 'E',
  f: 'f',
  ng: 'q',
  g: 'k',
  h: 'h',
  i: 'i',
  l: 'l',
  m: 'm',
  n: 'n',
  o: 'o',
  q: 'k',
  r: 'r',
  t: 't',
  u: 'u',
  v: 'V',
  w: 'V',
  x: 'ks',
  y: 'i$',
  z: 'ts',
  å: 'o',
  ä: 'A',
  ö: 'a$',
  š: 's',
  ž: 'j',
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

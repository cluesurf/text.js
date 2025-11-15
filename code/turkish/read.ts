import { build, transform } from '~/base'

const m = {
  a: 'a',
  b: 'b',
  c: 'dj',
  ç: 'tx',
  d: 'd',
  e: 'e',
  f: 'f',
  g: 'g',
  ğ: m => {
    let i = m.length - 1
    let last = m[i]
    m[i] = `${last}${last}`
  },
  h: 'h',
  ı: 'O',
  i: 'i',
  j: 'j',
  k: 'k',
  l: 'l',
  m: 'm',
  n: 'n',
  o: 'o',
  ö: 'e$',
  p: 'p',
  r: 'r',
  s: 's',
  ş: 'x',
  t: 't',
  u: 'u',
  ü: 'i$',
  v: 'v',
  y: 'y',
  z: 'z',
  q: 'K',
  w: 'w',
  x: 'ks',
}

/**
 * Build trie.
 */

const s = build(m)

/**
 * Transform the text.
 */

const form = i => transform(i, s, m)

export default form

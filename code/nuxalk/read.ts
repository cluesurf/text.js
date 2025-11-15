import { build, transform } from '~/base'

const map = {
  a: 'a',
  c: 'xʲ',
  cw: 'xʷ',
  h: 'h',
  i: 'i',
  k: 'kʲʰ',
  "k'": 'kʼʲ',
  kw: 'kʷʰ',
  "kw'": 'kʼʷ',
  l: 'l',
  lh: 'ɬ',
  m: 'm',
  n: 'n',
  p: 'pʰ',
  "p'": 'pʼ',
  q: 'qʰ',
  "q'": 'qʼ',
  qw: 'qʷʰ',
  "qw'": 'qʼʷ',
  s: 's',
  t: 'tʰ',
  "t'": 'tʼ',
  tl: 't͡ɬʰ',
  "tl'": 't͡ɬʼ',
  ts: 't͡sʰ',
  "ts'": 't͡sʼ',
  u: 'u',
  w: 'w',
  x: 'χ',
  xw: 'χʷ',
  y: 'j',
  '7': 'ʔ',
}

const s = build(map)

const form = (t: string) => transform(t, s, map)

export default form

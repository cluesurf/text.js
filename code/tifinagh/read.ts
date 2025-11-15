import { build, transform } from '~/base'

export const alphabet = {
  ⴰ: 'A',
  ⴱ: 'b',
  ⴳ: 'g',
  ⴳⵯ: 'gw~',
  ⴷ: 'd',
  ⴹ: 'dQ~',
  ⴻ: 'U',
  ⴼ: 'f',
  ⴽ: 'k',
  ⴽⵯ: 'kw~',
  ⵀ: 'h',
  ⵃ: 'H',
  ⵄ: 'Q',
  ⵅ: 'H',
  ⵇ: 'k',
  ⵉ: 'i',
  ⵊ: 'j',
  ⵍ: 'l',
  ⵎ: 'm',
  ⵏ: 'n',
  ⵓ: 'w',
  ⵔ: 'r',
  ⵕ: 'rQ~',
  ⵖ: 'G',
  ⵙ: 's',
  ⵚ: 'sQ~',
  ⵛ: 'x',
  ⵜ: 't',
  ⵟ: 'tQ~',
  ⵡ: 'w',
  ⵢ: 'y',
  ⵣ: 'z',
  ⵥ: 'zQ~',
  ⴲ: 'V',
  ⴴ: 'y',
  ⴺ: 'CQ~',
  ⴿ: 'H',
  ⵒ: 'p',
  ⵝ: 'c',
  ⵠ: 'v',
  ⴵ: 'dj',
  ⵁ: 'h',
  ⵞ: 'tx',
}

const m = {
  ...alphabet,
}

const s = build(m)

const form = (t: string) => transform(t, s, m)

export default form

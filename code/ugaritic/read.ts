import { build, transform } from '~/base'

export const north = {
  𐎀: "'a",
  𐎁: 'b',
  𐎂: 'g',
  𐎃: 'H',
  𐎄: 'd',
  𐎅: 'h',
  𐎆: 'w',
  𐎇: 'z',
  𐎈: 'hh~',
  𐎉: 'tQ~',
  𐎊: 'y',
  𐎋: 'k',
  𐎌: 'x',
  𐎍: 'l',
  𐎎: 'm',
  𐎏: 'C',
  𐎐: 'n',
  𐎑: 'cQ~',
  𐎒: 's',
  𐎓: 'Q',
  𐎔: 'p',
  𐎕: 'sQ~',
  𐎖: 'K',
  𐎗: 'r',
  𐎘: 'c',
  𐎙: 'G',
  𐎚: 't',
  𐎛: "'i",
  𐎜: "'u",
  𐎝: 'su',
}

export const south = {
  𐎅: 'h',
  𐎍: 'l',
  𐎈: 'hh~',
  𐎎: 'm',
  𐎖: 'q',
  𐎆: 'w',
  𐎌: 'x',
  𐎗: 'r',
  𐎚: 't',
  𐎒: 's',
  𐎋: 'k',
  𐎐: 'n',
  𐎃: 'H',
  𐎁: 'b',
  𐎔: 'p',
  𐎀: "'a",
  𐎓: 'Q',
  𐎑: 'cQ~',
  𐎂: 'g',
  𐎄: 'd',
  𐎙: 'G',
  𐎉: 'tQ~',
  𐎇: 'z',
  𐎏: 'C',
  𐎊: 'y',
  𐎘: 'c',
  𐎕: 'sQ~',
  𐎛: "'i",
  𐎜: "'u",
  𐎝: 'su',
}

export const punctuation = {
  '𐎟': ' ',
}

export const symbols = {
  ...north,
  ...punctuation,
}

/**
 * Build trie.
 */

const trie = build(symbols)

/**
 * Transform the text.
 */

const make = (text: string) => transform(text, trie, symbols)

export default make

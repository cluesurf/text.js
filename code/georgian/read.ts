import { build, transform } from '~/base'
import symbolsBase from './symbols.json'

const numeralsMap = {
  ა: 1,
  ბ: 2,
  გ: 3,
  დ: 4,
  ე: 5,
  ვ: 6,
  ზ: 7,
  ჱ: 8,
  თ: 9,
  ი: 10,
  კ: 20,
  ლ: 30,
  მ: 40,
  ნ: 50,
  ჲ: 60,
  ო: 70,
  პ: 80,
  ჟ: 90,
  რ: 100,
  ს: 200,
  ტ: 300,
  ჳ: 400,
  უ: 400,
  ფ: 500,
  ქ: 600,
  ღ: 700,
  ყ: 800,
  შ: 900,
  ჩ: 1000,
  ც: 2000,
  ძ: 3000,
  წ: 4000,
  ჭ: 5000,
  ხ: 6000,
  ჴ: 7000,
  ჯ: 8000,
  ჰ: 9000,
  ჵ: 10000,
}

const symbols = symbolsBase.map(x => {
  return {
    ...x,
    numeric: numeralsMap[x.text],
  }
})

export { symbols }

export const consonants = symbols.filter(x =>
  x.roles.includes('consonant'),
)

export const vowels = symbols.filter(x => x.roles.includes('vowel'))

export const punctuation = symbols.filter(x =>
  x.roles.includes('punctuation'),
)

const map = {
  ა: 'a',
  ბ: 'b',
  გ: 'g',
  დ: 'd',
  ე: 'E',
  ვ: 'v',
  ზ: 'z',
  თ: 'th~',
  ი: 'i',
  კ: 'k!',
  ლ: 'l',
  მ: 'm',
  ნ: 'n',
  ო: 'o$',
  პ: 'p!',
  ჟ: 'j',
  რ: 'r',
  ს: 's',
  ტ: 't!',
  უ: 'u',
  ფ: 'ph~',
  ქ: 'kh~',
  ღ: 'G',
  ყ: 'K!',
  შ: 'x',
  ჩ: 'txh~',
  ც: 'tsh~',
  ძ: 'dz',
  წ: 'ts!',
  ჭ: 'tx!',
  ხ: 'H',
  ჯ: 'dj',
  ჰ: 'h',
  '-': '',
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

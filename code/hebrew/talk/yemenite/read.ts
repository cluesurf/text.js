import { Map, Mark, build, load, transform } from '~/base/index.js'
import TALK from './text.json'
import TEXT from '../../symbols.json'

const talk = TALK as any
const text = TEXT as any

load(talk, text)

const consonants = talk
  .filter(x => x.role.includes('consonant'))
  .reduce((m: Map, x: Mark) => {
    m[x.text] = x.talk ?? ''
    return m
  }, {})

const vowels = talk
  .filter(x => x.role.includes('vowel'))
  .reduce((m: Map, x: Mark) => {
    m[x.text] = x.talk ?? ''
    return m
  }, {})

const modifiers = talk
  .filter(x => x.role.includes('modifier'))
  .reduce((m: Map, x: Mark) => {
    m[x.text] = x.talk ?? ''
    return m
  }, {})

const punctuations = talk
  .filter(x => x.role.includes('punctuation'))
  .reduce((m: Map, x: Mark) => {
    m[x.text] = x.talk ?? ''
    return m
  }, {})

const map = {
  ...vowels,
  ...consonants,
  ...punctuations,
  ...modifiers,
}

/**
 * Build trie.
 */

const tree = build(map)

/**
 * Transform the text.
 */

const make = (i: string) =>
  transform(i, tree, map).replace(/'+/g, "'").replace(/_+/g, '_')

export default make

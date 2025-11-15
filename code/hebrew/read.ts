import { Map, Mark, build, transform } from '~/base/index.js'
import marks from './symbols.json'

const boundVowelsFromCode = marks
  .filter(x => x.role?.includes('vowel') && x.role.includes('bound'))
  .reduce((m: Map, x: Mark) => {
    m[x.text] = x.talk!
    return m
  }, {})

const consonantsFromCode = marks
  .filter(x => x.role?.includes('consonant'))
  .reduce((m: Map, x: Mark) => {
    m[x.text] = x.talk!
    return m
  }, {})

const punctuationsFromCode = marks
  .filter(x => x.role?.includes('punctuation'))
  .reduce((m: Map, x: Mark) => {
    m[x.text] = x.talk!
    return m
  }, {})

const modifiersFromCode = marks
  .filter(x => x.role?.includes('modifier'))
  .reduce((m: Map, x: Mark) => {
    m[x.text] = x.talk!
    return m
  }, {})

const mapFromCode: Map = {
  ...boundVowelsFromCode,
  ...consonantsFromCode,
  ...punctuationsFromCode,
  ...modifiersFromCode,
}

const treeFromCode = build(mapFromCode)

const make = (t: string) => transform(t, treeFromCode, mapFromCode)

export default make

import { Map, Mark, build, transform } from '~/base'

const alphabet = {
  ա: 'a',
  բ: 'b',
  գ: 'g',
  դ: 'd',
  ե: 'E',
  զ: 'z',
  է: 'E',
  ը: 'U',
  թ: 'th~',
  ժ: 'j',
  ի: 'i',
  լ: 'l',
  խ: 'H',
  ծ: 'ts',
  կ: 'k',
  հ: 'h',
  ձ: 'dz',
  ղ: 'S',
  ճ: 'tx',
  մ: 'm',
  յ: 'y',
  ն: 'n',
  շ: 'x',
  ո: 'o$',
  չ: 'txh~',
  պ: 'p',
  ջ: 'dj',
  ռ: 'r',
  ս: 's',
  վ: 'v',
  տ: 't',
  ր: 'u$',
  ց: 'tsh~',
  ւ: 'w',
  ու: 'u',
  փ: 'ph~',
  ք: 'kh~',
  օ: 'o',
  ֆ: 'f',
  և: 'Ev',
}

const map: Map = {
  ...alphabet,
}

const tree = build(map)

const make = (text: string) => transform(text, tree, map)

export default make

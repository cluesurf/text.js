/* eslint-disable @typescript-eslint/no-unsafe-argument */
import size from './index.js'

test('קג', size.hebrew.make(123))

test('๑๒๓', size.thai.make(123))
test(123, size.thai.read('๑๒๓'))

function test(a: unknown, b: unknown) {
  if (a !== b) {
    throw new Error(`${a} != ${b}`)
  }
}

console.log('test completion')

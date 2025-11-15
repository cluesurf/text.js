const list = ['᠐', '᠑', '᠒', '᠓', '᠔', '᠕', '᠖', '᠗', '᠘', '᠙']

const listMake = list.reduce<Record<string, string>>((m, x, i) => {
  m[i] = x
  return m
}, {})

const listRead = list.reduce<Record<string, string>>((m, x, i) => {
  m[x] = String(i)
  return m
}, {})

export function make(n: number) {
  const y = String(n)
    .split('')
    .map(x => listMake[x])
  return y.join('')
}

export function read(text: string) {
  const y = text.split('').map(x => listRead[x])
  return y.join('')
}

// https://en.wikipedia.org/wiki/Thai_numerals

export const listMake: Record<string, string> = {
  0: '๐',
  1: '๑',
  2: '๒',
  3: '๓',
  4: '๔',
  5: '๕',
  6: '๖',
  7: '๗',
  8: '๘',
  9: '๙',
}

export const listRead = Object.keys(listMake).reduce((m, x) => {
  const k = listMake[x]
  if (k) {
    m[k] = x
  }
  return m
}, {} as Record<string, string>)

export function make(n: number) {
  return String(n)
    .split('')
    .map(x => listMake[x])
    .join('')
}

export function read(text: string) {
  return Number(
    text
      .split('')
      .map(x => listRead[x])
      .join(''),
  )
}

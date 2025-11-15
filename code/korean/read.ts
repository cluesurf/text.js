/**
 * Korean.
 */

export const vowels: Record<string, string> = {
  ㅏ: 'a',
  ㅐ: 'E',
  ㅑ: 'ya',
  ㅒ: 'yE',
  ㅓ: 'U',
  ㅔ: 'e',
  ㅕ: 'yU',
  ㅖ: 'ye',
  ㅗ: 'o',
  ㅘ: 'wa',
  ㅙ: 'wE',
  ㅚ: 'a$',
  ㅛ: 'yo',
  ㅜ: 'u',
  ㅝ: 'wU',
  ㅞ: 'we',
  ㅟ: 'i$',
  ㅠ: 'yu',
  ㅡ: 'O',
  ㅢ: 'Gi',
  ㅣ: 'i',
}

export const consonants: Record<string, [string, string]> = {
  ㄱ: ['k', 'k.'],
  ㄲ: ['k@', 'k.'],
  ㄴ: ['n', 'n'],
  ㄷ: ['t', 't.'],
  ㄸ: ['t@', ''],
  ㄹ: ['r', 'L'],
  ㅁ: ['m', 'm'],
  ㅂ: ['p', 'p.'],
  ㅃ: ['p@', ''],
  ㅅ: ['s', 't.'],
  ㅆ: ['s@', 't.'],
  ㅇ: ['', 'q'],
  ㅈ: ['txy~', 't.'],
  ㅉ: ['t@xy~', ''],
  ㅊ: ['txy~h~', 't.'],
  ㅋ: ['kh~', 'k.'],
  ㅌ: ['th~', 't.'],
  ㅍ: ['ph~', 'p.'],
  ㅎ: ['h', 't.'],
}

export const initial = [
  'ㄱ',
  'ㄲ',
  'ㄴ',
  'ㄷ',
  'ㄸ',
  'ㄹ',
  'ㅁ',
  'ㅂ',
  'ㅃ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅉ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
]

export const medial = [
  'ㅏ',
  'ㅐ',
  'ㅑ',
  'ㅒ',
  'ㅓ',
  'ㅔ',
  'ㅕ',
  'ㅖ',
  'ㅗ',
  'ㅘ',
  'ㅙ',
  'ㅚ',
  'ㅛ',
  'ㅜ',
  'ㅝ',
  'ㅞ',
  'ㅟ',
  'ㅠ',
  'ㅡ',
  'ㅢ',
  'ㅣ',
]

export const finals = [
  '',
  'ㄱ',
  'ㄲ',
  'ㄳ',
  'ㄴ',
  'ㄵ',
  'ㄶ',
  'ㄷ',
  'ㄹ',
  'ㄺ',
  'ㄻ',
  'ㄼ',
  'ㄽ',
  'ㄾ',
  'ㄿ',
  'ㅀ',
  'ㅁ',
  'ㅂ',
  'ㅄ',
  'ㅅ',
  'ㅆ',
  'ㅇ',
  'ㅈ',
  'ㅊ',
  'ㅋ',
  'ㅌ',
  'ㅍ',
  'ㅎ',
]

export const list: Array<{ s: string; t: string }> = []
export const map: Record<string, string> = {}

initial.forEach((i, ii) => {
  medial.forEach((m, mi) => {
    finals.forEach((f, fi) => {
      let v = ii * 588 + mi * 28 + fi + 44032
      let s = String.fromCodePoint(v)
      list.push({ s, t: `${i}${m}${f}` })
    })
  })
})

list.sort((a, b) => b.t.length - a.t.length)
list.forEach(({ s, t }) => (map[s] = t))

// first divide into hangul jamo https://en.wikipedia.org/wiki/Korean_language_and_computers#Hangul_in_Unicode

/**
 * Transform the text.
 */

const form = (s: string) => {
  let i = 0
  let r = s
  let syllables: Array<[string, string, string]> = []

  while (r.length) {
    let found = false

    o: for (let k in map) {
      if (r.indexOf(k) === 0) {
        let v = map[k]
        i += k.length
        r = r.slice(k.length)
        if (!v) {
          throw new Error(k)
        }
        syllables.push(v.split('') as [string, string, string])
        found = true
        break o
      }
    }

    if (!found) {
      throw new Error()
    }
  }

  let out: Array<string> = []

  while (syllables.length) {
    let r = syllables.shift()
    if (!r) {
      continue
    }
    let ri = r[0]
    let rm = r[1]
    let rf = r[2]
    let next = syllables[0] && syllables[0][0]

    if (ri) {
      const c = consonants[ri]
      if (c) {
        let v = c[0]
        out.push(v)
      }
    }

    if (rm) {
      let v = vowels[rm]!
      out.push(v)
    }

    if (rf) {
      const c = consonants[ri]
      if (c) {
        let v = c[1]
        out.push(v)
      }
    }
  }

  return out.join('')
}

export default form

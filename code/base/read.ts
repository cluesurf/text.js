export type Map = Record<
  string,
  | string
  | number
  | Array<string>
  | ((m: Array<string>, n: string) => void)
>

export type Mark = {
  text: string // traditional text
  talk?: string // pronunciation text
  name?: {
    base?: string // Traditional name
    head: string // English
  }
  roles?: Array<string>
  link?: string
}

export type Tree = {
  nest: {
    [key: string]: Tree | boolean
  }
  last?: boolean
  stem?: Tree
}

export function makeBack(site: Record<string, string>) {
  return Object.keys(site).reduce<Record<string, string>>((m, x) => {
    const v = site[x]
    if (v) {
      m[v] = x
    }
    return m
  }, {})
}

/**
 * Transform input text to output using map.
 */

export function transform(i: string, s: Tree, m: Map) {
  let o: Array<string> = []
  let w = 0

  while (w < i.length) {
    let r = s
    let v = w

    char: while (true) {
      const c = i.charAt(v).toLowerCase()
      const d = r.nest[c]
      if (typeof d === 'object') {
        r = d
        v++
      } else {
        break char
      }
    }

    if (!r.last) {
      stem: while (r.stem) {
        r = r.stem
        v--
        if (r.last) {
          break stem
        }
      }

      if (!r.last) {
        const t = i.charAt(w).toLowerCase()
        const h = t.codePointAt(0)?.toString(16)
        const e = '\\u' + '0000'.substring(0, 4 - (h ?? '').length) + h
        console.log(r)
        throw new Error(`${w}:${e}:${t}`)
      }
    }

    const z = i.slice(w, v).toLowerCase()
    const k = m[z]

    if (typeof k == 'function') {
      k(o, i.slice(v))
    } else if (typeof k === 'string') {
      o.push(k)
    } else if (Array.isArray(k) && k[0]) {
      o.push(k[0]!)
    }

    w = v
  }

  return o.join('')
}

/**
 * Build Tree.
 */

export function build(m: Map) {
  let s: Tree = { nest: {} }

  for (let key in m) {
    let v = key.toLowerCase().split('')
    let r = s
    while (v.length) {
      const x = v.shift()
      if (x) {
        if (!r.nest[x]) {
          r.nest[x] = { stem: r, nest: {} }
        }
        const w = r.nest[x]
        if (typeof w === 'object') {
          r = w
        }
      }
    }
    r.last = true
  }

  return s
}

export function load(talk: Array<any>, text: Array<any>) {
  for (const a of talk) {
    const b = text.find(x => x.link === a.link)!
    a.text = b.text
    a.role = b.role
  }
}

export const basicPunctuation = {
  ' ': ' ',
  '.': '.',
  '-': '-',
  '?': '?',
  '!': '!',
  ',': ',',
  ';': ';',
  ':': ':',
  '(': '(',
  ')': ')',
}

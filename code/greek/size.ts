const NUMBER1 = ['α', 'β', 'γ', 'δ', 'ε', 'ϛ', 'ζ', 'η', 'θ']

const NUMBER10 = ['ι', 'κ', 'λ', 'μ', 'ν', 'ξ', 'ο', 'π', 'ϟ']

const NUMBER100 = ['ρ', 'σ', 'τ', 'υ', 'φ', 'χ', 'ψ', 'ω', 'ϡ']

export function make(n: number) {
  const a = Math.floor(n / 100)
  const x = n % 100
  const b = Math.floor(n / 10)
  const y = x % 10

  const s = []
  if (a) {
    s.push(NUMBER100[a - 1])
  }
  if (b) {
    s.push(NUMBER10[b - 1])
  }
  if (y) {
    s.push(NUMBER1[y - 1])
  }

  return s.join('')
}

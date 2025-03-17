import { build, transform } from '~/base'

const letters = {
    Α : 'ælfə',
    Β : 'biːt',
    Γ : 'ɡæmə',
    Δ : 'dɛlt',
    Η : 'iːtə',
    Θ : 'θiːt',
    Ι : 'aɪˈoʊ',
    Κ : 'kæpə',
    Λ : 'læmd',
    Μ : 'mjuː',
    Ν : 'njuː',
    Ρ : 'roʊ',
    Τ : 'taʊ',
    Τ : 'tɔː'
}


const symbols = {
    ...letters
}

const s = build(symbols)
const make = (t: string) => transform(t, s, s)

export default make
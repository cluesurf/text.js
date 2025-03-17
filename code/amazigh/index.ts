import { build, transform } from '~/base'

const letters={
    ⴰ :'æ',
    ⴱ :'b',
    ⴳ :'ɡ',
    ⴳⵯ :'ɡʷ',
    ⴷ :'d',
    ⴹ :'dˤ',
    ⴻ :'ə',
    ⴼ :'f',
    ⴽ :'k',
    ⴽⵯ :'kʷ',
    ⵀ :'h',
    ⵃ :'ħ',
    ⵄ :'ʕ',
    ⵅ :'χ',
    ⵇ :'q',
    ⵉ :'i',
    ⵊ :'ʒ',
    ⵍ :'l',
    ⵎ :'m',
    ⵏ :'n',
    ⵓ :'w',
    ⵔ :'r',
    ⵕ :'rˤ',
    ⵖ :'ɣ',
    ⵙ :'s',
    ⵚ :'sˤ',
    ⵛ :'ʃ',
    ⵜ :'t',
    ⵟ :'tˤ',
    ⵡ :'w',
    ⵢ :'j',
    ⵣ :'z',
    ⵥ :'zˤ'
}


const symbols = {
    ...letters
}

const s = build(symbols)
const make = (t: string) => transform(t, s, s)

export default make
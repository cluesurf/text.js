import { build, transform } from '~/base'

const alphabet = {
    ܒ݁	: 'b',
    ܓ݁  : 'ɡ',
    ܕ݁	: 'd',
    ܟ݁	: 'k',
    ܦ݁	: 'p',
    ܬ݁	: 't',
    ܒ݂	: 'v',
    ܒ݂	: 'w',
    ܓ݂	: 'ɣ',
    ܕ݂	: 'ð',
    ܟ݂	: 'x',
    ܦ݂ 	: 'f',
    ܦ̮	: 'w',
    ܬ݂	: 'θ',

}

const symbols = {   
    ...alphabet
}

const s = build(symbols)
const make = (t: string) => transform(t, s, s)

export default make
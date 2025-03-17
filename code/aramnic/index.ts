import { build, transform } from '~/base'

const AramaicAlphabet = {

    𐡀 : 'ʔ',
    𐡀 : 'aː',
    𐡀 : 'eː',
    c : 'b',
    c : 'b',
    𐡂 : 'ɡ',
    𐡂 : 'ɣ',
    𐡃 : 'd',
    𐡃 : 'ð',
    𐡄 : 'h',
    𐡅 : 'w',
    𐡅 : 'oː',
    𐡅 : 'uː',
    𐡆 : 'z',
    𐡇 : 'ħ',
    𐡈 : 'tˤ',
    𐡉 : 'j',
    𐡉 : 'iː',
    𐡉 : 'eː',
    𐡊 : 'k',
    𐡊 : 'x',
    𐡋 : 'l',
    𐡌 : 'm',
    𐡍 : 'n',
    𐡎 : 's',
    𐡏 : 'ʕ',
    𐡐 : 'p',
    𐡐 : 'f',
    𐡑 : 'sˤ',
    𐡒 : 'q',
    𐡓 : 'r',
    𐡔 : 'ʃ',
    𐡕 : 't',
    𐡕 : 'θ'

}


const SyriacAlphabet = {

   ܒ : 'b',
   ܒ : 'b',
   ܓ : 'ɡ',
   ܓ : 'ɣ',
   ܕ : 'd',
   ܕ : 'ð',
   ܗ : 'h',
   ܘ : 'w',
   ܘ : 'oː',
   ܘ : 'uː',
   ܙ : 'z',
   ܚ : 'ħ',
   ܛ : 'tˤ',
   ܝ : 'j',
   ܝ : 'iː',
   ܝ : 'e:',
   ܟ : 'k',
   ܟ : 'x',
   ܠ : 'l',
   ܡ : 'm',
   ܢ : 'n',
   ܣ : 's',
   ܥ : 'ʕ',
   ܦ : 'p',
   ܦ : 'f',
   ܨ : 'sˤ',
   ܩ : 'q',
   ܪ : 'r',
   ܫ : 'ʃ',
   ܬ : 't',
   ܬ : 'θ',

}




const symbols = {
    ...AramaicAlphabet,
    ...SyriacAlphabet
}
const s = build(symbols)
const make = (t: string) => transform(t, s, s)

export default make
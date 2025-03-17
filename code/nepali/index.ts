import { build, transform } from '~/base'

const consonants = {

    क :'kʌ',
    ख :'kʰʌ',
    ख  :'xʌ',
    ग  :'ɡʌ',
    घ :'ɡʱʌ',
    घ  :'ɣʌ',
    ङ  :'ŋʌ',
    च :'t͡sʌ',
    छ :'t͡sʰʌ',
    ज :'d͡zʌ',
    झ :'d͡zʱʌ',
    ञ  :'nʌ',
    ट  :'ʈʌ',
    ठ :'ʈʰʱʌ',
    ड  :'ɖʌ',
    ढ :'ɖʱʱʌ',
    ण  :'nʌ',
    ण  :'ɳʌ',
    त  :'tʌ',
    थ :'tʰʱʌ',
    द  :'dʌ',
    ध :'dʱʱʌ',
    न  :'nʌ',
    प  :'pʌ',
    फ :'pʰʱʌ',
    फ  :'ɸʌ',
    ब  :'bʌ',
    भ :'bʱʱʌ',
    भ  :'βʌ',
    म  :'mʌ',
    य  :'jʌ',
    र  :'rʌ',
    ल  :'lʌ',
    व  :'wʌ',
    श  :'sʌ',
    ष  :'sʌ',
    ष :'kʰʱʌ',
    स  :'sʌ',
    ह  :'ɦʌ',

}

const symbols = {
    ...consonants
}

const s = build(symbols)
const make = (t: string) => transform(t, s, s)

export default make
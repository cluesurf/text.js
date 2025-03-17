import { build, transform } from '~/base'


const Consonants = {

    क : 'kə',
    ख : 'kʰə',
    ग : 'ɡə',
    घ : 'ɡʱə',
    ङ : 'ŋə',
    च : 't͡ɕə',
    च : 't͡sə',
    छ : 't͡ɕʰə',
    ज : 'd͡ʑə',
    ज : 'd͡zə',
    झ : 'd͡ʑʱə',
    झ : 'd͡zʱə',
    ञ : 'ɲə',
    ट : 'ʈə',
    ठ : 'ʈʰə',
    ड : 'ɖə',
    ढ : 'ɖʱə',
    ण : 'ɳə',
    त : 'tə',
    थ : 'tʰə',
    द : 'də',
    ध : 'dʱə',
    न : 'nə',
    प : 'pə',
    फ : 'pʰə',
    फ : 'fə',
    ब : 'bə',
    भ : 'bʱə',
    म : 'mə',
    य : 'jə',
    र : 'ɾə',
    ल : 'lə',
    व : 'ʋə',
    श : 'ʃə',
    ष : 'ʂə',
    स : 'sə',
    ह : 'ɦə',
    ळ : 'ɭə',
    क्ष : 'kɕə',
    ज्ञ: 'dɲə',


}


const Vowels = {

    अ :	'ə',
    आ :	'a',
    इ :	'i',
    ई :	'i',
    उ :	'u',
    ऊ :	'u',
    ऋ :	'r',
    ए :	'e',
    ऐ :	'ə',
    ओ :	'o',
    औ : 'ə',
    अं : 'ə',
    अः : 'ə'

}

const symbols = {
    ...Consonants,
    ...Vowels,
}
const s = build(symbols)
const make = (t: string) => transform(t, s, s)

export default make
import { build, transform, Map } from '~/base'

const Capitalconsonants: Map = {
    А : 'a',
    Б : 'b',
    Б : 'bʲ',
    В : 'v',
    В : 'vʲ',
    Г : 'ɡ',
    Г : 'gʲ',
    Д : 'd',
    Д : 'dʲ',
    Е : 'je',
    Е : 'ʲe',
    Е : 'e',
    Ё : 'jo',
    Ё : 'ʲɵ',
    Ж : 'ʐ',
    З : 'z',
    З : 'zʲ',
    И : 'i',
    И : 'ʲi',
    И : 'ɨ',
    Й : 'j',
    К : 'k',
    К : 'kʲ',
    Л : 'ɫ',
    Л : 'lʲ',
    М : 'm',
    М : 'mʲ',
    Н : 'n',
    Н : 'nʲ',
    О : 'o',
    П : 'p',
    П : 'pʲ',
    Р : 'r',
    Р : 'rʲ',
    С : 's',
    С : 'sʲ',
    Т : 't',
    Т : 'tʲ',
    У : 'u',
    Ф : 'f',
    Ф : 'fʲ',
    Х : 'x',
    Х : 'xʲ',
    Ц : 't͡s',
    Ч : 't͡ɕ',
    Ш : 'ʂ',
    Щ : 'ɕː',
    Щ : 'ɕ',
    Ъ : '∅',
    Ы : 'ɨ',
    Ь : 'ʲ',
    Э : 'ɛ',
    Ю : 'ju',
    Ю : 'ʲu',
    Я : 'ja',
    Я : 'ʲa',


}

const Smallconsonants: Map = {

    а : 'a',
    б : 'b',
    б : 'bʲ',
    в : 'v',
    в : 'vʲ',
    г : 'ɡ',
    г : 'gʲ',
    д : 'd',
    д : 'dʲ',
    е : 'je',
    е : 'ʲe',
    е : 'e',
    ё : 'jo',
    ё : 'ʲɵ',
    ж : 'ʐ',
    з : 'z',
    з : 'zʲ',
    и : 'i',
    и : 'ʲi',
    и : 'ɨ',
    й : 'j',
    к : 'k',
    к : 'kʲ',
    л : 'ɫ',
    л : 'lʲ',
    м : 'm',
    м : 'mʲ',
    н : 'n',
    н : 'nʲ',
    о : 'o',
    п : 'p',
    п : 'pʲ',
    р : 'r',
    р : 'rʲ',
    с : 's',
    с : 'sʲ',
    т : 't',
    т : 'tʲ',
    у : 'u',
    ф : 'f',
    ф : 'fʲ',
    х : 'x',
    х : 'xʲ',
    ц : 't͡s',
    ч : 't͡ɕ',
    ш : 'ʂ',
    щ : 'ɕː',
    щ : 'ɕ',
    ъ : '∅',
    ы : 'ɨ',
    ь : 'ʲ',
    э : 'ɛ',
    ю : 'ju',
    ю : 'ʲu',
    я : 'ja',
    я : 'ʲa',

}

const HistoricConsonantsCapital: Map = {

    І : 'i',
    І : 'ʲi',
    І : 'j',
    Ѣ : 'e',
    Ѣ : 'ʲe',
    Ѳ : 'f',
    Ѳ : 'fʲ',
    Ѳ : 'θ',
    Ѵ : 'i',
    Ѵ : 'ʲi',

}

const HistoricConsonantsSmall: Map = {

  і : 'i',
  і : 'ʲi',
  і : 'j',
  ѣ : 'e',
  ѣ : 'ʲe',
  ѳ : 'f',
  ѳ : 'fʲ',
  ѳ : 'θ',
  ѵ : 'i',
  ѵ : 'ʲi',

}

const LettersEliminatedBefore1750Capital: Map = {
    Ѕ : 'z',
    Ѕ : 'zʲ',
    Ѯ : 'ks',
    Ѯ : 'ksʲ',
    Ѱ : 'ps',
    Ѱ : 'psʲ',
    Ѡ : 'o',
    Ѫ : 'u',
    Ѫ : 'ʲu',
    Ѧ : 'ʲa',
    Ѭ : 'ju',
    Ѩ : 'ja',

}

const LettersEliminatedBefore1750Small: Map = {
    ѕ : 'z',
    ѕ : 'zʲ',
    ѯ : 'ks',
    ѯ : 'ksʲ',
    ѱ : 'ps',
    ѱ : 'psʲ',
    ѡ : 'o',
    ѫ : 'u',
    ѫ : 'ʲu',
    ѧ : 'ʲa',
    ѭ : 'ju',
    ѩ : 'ja',

}


const symbols: Map = {
    ...Capitalconsonants ,
    ...Smallconsonants,
    ...HistoricConsonantsCapital,
    ...HistoricConsonantsSmall,
    ...LettersEliminatedBefore1750Capital,
    ...LettersEliminatedBefore1750Small

}
  
const s = build(symbols)

const make = (t: string) => transform(t, s, symbols)

export default make
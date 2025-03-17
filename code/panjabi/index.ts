import { build, transform } from '~/base'


const vowelDiacritics = {
  
    ਕ  : '[ə]',
    ਕਾ  : '[aː]~[äː]',
    ਕਿ  : '[ɪ]',
    ਕੀ  : '[iː]',    
    ਕੁ  : '[ʊ]',
    ਕੂ  : '[uː]',
    ਕੇ  : '[eː]',
    ਕੈ  : '[ɛː]~[əi]',
    ਕੋ  : '[oː]',
    ਕੌ  : '[ɔː]~[əu]'
}


const symbols = {
    ...vowelDiacritics
}

const s = build(symbols)
const make = (t: string) => transform(t, s, s)

export default make
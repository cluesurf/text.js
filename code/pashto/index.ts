import { build, transform, Map } from '~/base'


const PashtoAlph: Map = { 
    ټ: 'ʈ',
    ډ: 'ɖ',
    ړ: 'ɭ̆',
    ڼ: 'ɳ',
    ښ: 'ʂ',
    ښ: 'ç',
    ږ: 'ʐ',
    ږ: 'ʝ',
    څ: 't͡s',
    ځ: 'd͡z',

}

const PashtoAllAlpha: Map = {
    
     ا :'ɑ' 
   ب :'b', 
   پ :'p',    
   ت :'t̪', 
   ټ :'ʈ', 
   ث :'s', 
   ج :'d͡ʒ', 
   چ :'t͡ʃ', 
   ح :'h', 
   خ :'x', 
   څ :'t͡s', 
   ځ :'d͡z', 
   د :'d̪', 
   ډ :'ɖ', 
   ذ :'z', 
   ر :'r', 
   ړ :'ɽ', 
   ز :'z', 
   ژ :'ʒ', 
   ږ :'ʐ', 
   س :'s', 
   ش :'ʃ', 
   ښ :'ʂ', 
   ص :'s', 
   ض :'z', 
   ط :'t', 
   ظ :'z', 
   ع :'ɑ', 
   غ :'ɣ', 
   ف :'f', 
   ق :'q', 
   ک :'k', 
   ګ :'ɡ', 
   ل :'l', 
   م :'m', 
   ن :'n', 
   ڼ :'ɳ', 
   و :'w', 
   ه :'h', 
   ء :'ʔ', 
   ی :'i', 
   ې :'e', 
   ے :'aj', 
   ۓ :'əj', 
   ػ :'əj', 
}


const symbols: Map = {
    ...PashtoAlph,
    ...PashtoAllAlpha

}
  
const s = build(symbols)

const make = (t: string) => transform(t, s, symbols)

export default make
﻿import { build, transform } from '~/base'

const letters = {

    A :' a',
    a :' a',
    B :' b',
    b :' b',
    C :' t͡ʃ',
    H :' t͡ʃ',
    c :' t͡ʃ',
    h :' t͡ʃ',
    D :' d',
    d :' d',
    E :' e',
    e :' e',
    F :' f',
    f :' f',
    G :' g',
    g :' g',
    G :' ɡ͡ɓ~',
    B :' ɡ͡ɓ~',
    g :' ɡ͡ɓ~',
    b :' ɡ͡ɓ~',
    G :' ɣ',
    H :' ɣ',
    g :' ɣ',
    h :' ɣ',
    G :' ɡʷ',
    W :' ɡʷ',
    g :' ɡʷ',
    w :' ɡʷ',
    H :' ɦ',
    h :' ɦ',
    I :' i',
    i :' i',
    Ị :' ɪ̙',
    ị :' ɪ̙',
    J :' d͡ʒ',
    j :' d͡ʒ',
    K :' k',
    k :' k',
    K :' k͡p~',
    P :' k͡p~',
    k :' k͡p~',
    p :' k͡p~',
    K :' kʷ',
    W :' kʷ',
    k :' kʷ',
    w :' kʷ',
    L :' l',
    l :' l',
    M :' m',
    m :' m',
    N :' n',
    n :' n',
    Ṅ :' ŋ',
    ṅ :' ŋ',
    N :' ŋʷ',
    W :' ŋʷ',
    n :' ŋʷ',
    w :' ŋʷ',
    N :' ɲ',
    Y :' ɲ',
    n :' ɲ',
    y :' ɲ',
    O :' o',
    o :' o',
    Ọ :' ɔ̙',
    ọ :' ɔ̙',
    P :' p',
    p :' p',
    R :' ɹ~ɾ',
    r :' ɹ~ɾ',
    S :' s',
    s :' s',
    S :' ʃ',
    H :' ʃ',
    s :' ʃ',
    h :' ʃ',
    T :' t',
    t :' t',
    U :' u',
    u :' u',
    Ụ :' ʊ̙',
    ụ :' ʊ̙',
    V :' v',
    v :' v',
    W :' w',
    w :' w',
    Y :' j',
    y :' j',
    Z :' z',
    z :' z',
}

const symbols = {
    ...letters
}

const s = build(symbols)
const make = (t: string) => transform(t, s, s)

export default make
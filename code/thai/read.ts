import { build, transform } from '~/base'

const otherDiacritics = {
  '\u0E31': '', // add to shorten consonant
  '\u0E47': '', // vowel shortener
}

const toneDiacritics = {
  '\u0E48': '_',
  '\u0E49': m => {
    let i = m.length - 1
    let last = m[i]
    m[i] = `${last}^${last}_`
  },
  '\u0E4a': '^',
}

const standaloneVowels = {
  '\u0E30': 'a',
  '\u0E32': 'a_',
}

const vowelDiacritics = {
  '\u0E33': 'am',
  '\u0E34': 'i',
  '\u0E35': 'ii',
  '\u0E36': 'ue',
  '\u0E37': 'ue_',
  '\u0E38': 'u',
  '\u0E39': 'u_',
  '\u0E30': 'a',
}

const trueConsonantClusters = {
  กร: 'kra',
  ขร: 'kh~ra',
  คร: 'kh~ra',
  ตร: 'tra',
  ปร: 'pra',
  ผร: 'ph~ra',

  กล: 'kla',
  ขล: 'kh~la',
  คล: 'kh~la',
  ตล: 'tla',
  ปล: 'pla',
  ผล: 'ph~la',

  กว: 'kwa',
  ขว: 'kh~wa',
  คว: 'kh~wa',
  ตว: 'twa',
  ปว: 'pwa',
  ผว: 'ph~wa',
}

const falseConsonantClusters = {
  ทร: 'sa',
  จร: 'txy~a',
  ซร: 'sa',
  สร: 'sa',
  ศร: 'sa',
}

// https://www.facebook.com/GreenTooth.GT/posts/-thai-consonant-clusters-%E0%B8%AD%E0%B8%B1%E0%B8%81%E0%B8%A9%E0%B8%A3%E0%B8%84%E0%B8%A7%E0%B8%9A-%C3%A0ks%C9%94%CC%86%CB%90nk%CA%B0%C3%BB%CB%90aptwo-consonants-appearing-together/125726026488373/
// https://www.clickthai-online.com/basics/doublecons.html

const consonants = {
  ก: m => (m.length === 0 ? m.push('ka') : m.push('k')),
  ข: m => (m.length === 0 ? m.push('kh~a') : m.push('k')),
  ฃ: m => (m.length === 0 ? m.push('kh~a') : m.push('k')),
  ค: m => (m.length === 0 ? m.push('kh~a') : m.push('k')),
  ฅ: m => (m.length === 0 ? m.push('kh~a') : m.push('k')),
  ฆ: m => (m.length === 0 ? m.push('kh~a') : m.push('k')),
  ง: m => (m.length === 0 ? m.push('qa') : m.push('q')),
  จ: m => (m.length === 0 ? m.push('txy~a') : m.push('t')),
  ฉ: 'txy~h~a',
  ช: m => (m.length === 0 ? m.push('txy~h~a') : m.push('t')),
  ซ: m => (m.length === 0 ? m.push('sa') : m.push('t')),
  ฌ: 'txy~h~a',
  ญ: m => (m.length === 0 ? m.push('ya') : m.push('n')),
  ฎ: m => (m.length === 0 ? m.push('da') : m.push('t')),
  ฏ: m => (m.length === 0 ? m.push('ta') : m.push('t')),
  ฐ: m => (m.length === 0 ? m.push('th~a') : m.push('t')),
  ฑ: m => (m.length === 0 ? m.push('th~a') : m.push('t')),
  ฒ: m => (m.length === 0 ? m.push('th~a') : m.push('t')),
  ณ: m => (m.length === 0 ? m.push('na') : m.push('n')),
  ด: m => (m.length === 0 ? m.push('da') : m.push('t')),
  ต: m => (m.length === 0 ? m.push('ta') : m.push('t')),
  ถ: m => (m.length === 0 ? m.push('th~a') : m.push('t')),
  ท: m => (m.length === 0 ? m.push('th~a') : m.push('t')),
  ธ: m => (m.length === 0 ? m.push('th~a') : m.push('t')),
  น: m => (m.length === 0 ? m.push('na') : m.push('n')),
  บ: m => (m.length === 0 ? m.push('ba') : m.push('p')),
  ป: m => (m.length === 0 ? m.push('pa') : m.push('p')),
  ผ: 'ph~a',
  ฝ: 'fa',
  พ: m => (m.length === 0 ? m.push('ph~a') : m.push('p')),
  ฟ: m => (m.length === 0 ? m.push('fa') : m.push('p')),
  ภ: m => (m.length === 0 ? m.push('ph~a') : m.push('p')),
  ม: m => (m.length === 0 ? m.push('ma') : m.push('m')),
  ย: 'ya',
  ร: m => (m.length === 0 ? m.push('ra') : m.push('n')),
  ล: m => (m.length === 0 ? m.push('la') : m.push('n')),
  ว: 'wa',
  ศ: m => (m.length === 0 ? m.push('sa') : m.push('t')),
  ษ: m => (m.length === 0 ? m.push('sa') : m.push('t')),
  ส: m => (m.length === 0 ? m.push('sa') : m.push('t')),
  ห: 'h~a',
  ฬ: m => (m.length === 0 ? m.push('la') : m.push('n')),
  อ: "'a",
  ฮ: 'h~a',
}

let md5 = require('./md5')

let salt = 'yjdafjpo'
let regex = /(.)\1{2}/
let startingPositions = []
let keys = []

function stretchMD5 (str, n = 0) {
  if (n === 2016) {
    return md5(str)
  } else {
    return stretchMD5(md5(str), n + 1)
  }
}

let i = 21125
while (keys.length < 15) {
  i++
  let hash = stretchMD5(salt + i)
  let match = hash.match(regex)
  if (match) {
    startingPositions.push([ i, match[1] ])
  }
  startingPositions.filter(sp => i - sp[0] < 1000 && i !== sp[0]).forEach(sp => {
    let regex = new RegExp(`(${sp[1]})\\1{4}`)
    let match = hash.match(regex)
    if (match && !keys.includes(sp[0])) {
      keys.push(sp[0])
      console.log('key!', sp[0], 'bc of ', i, 'total keys', keys.length)
    }
  })
}
keys.sort().forEach((key, i) => console.log(i, key))
// shoe dog
// the gene
// the undoing project
// hillbilly elegy
// a rising man
// 812:

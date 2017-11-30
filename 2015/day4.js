const md5 = require('blueimp-md5')
const input = 'iwrupvqb'

const test1 = 'abcdef'
const test2 = 'pqrstuv'

const zeroFinder = (input, length) => {
  let n = 0
  const zeros = '0'.repeat(length)
  while (true) {
    let hash = md5(input + n)
    if (hash.slice(0, length) === zeros) {
      return n
    } else {
      n++
    }
  }
}
console.log(zeroFinder(input, 6))

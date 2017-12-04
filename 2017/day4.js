const wrap = require('./wrap')

const code = data => {
  const lines = data.split("\n")
  const valid = lines.filter(line => {
    const words = line.split(/\s+/)
    return words.every((word, i) => {
      return words.every((otherWord, j) => {
        return j === i || word !== otherWord
      })
    })
  })
  console.log(valid.length)
}
const test = `aa bb cc dd ee
aa bb cc dd aa
aa bb cc dd aaa`
wrap('day4', code)
//console.log(code(test))

const part2 = data => {
  const lines = data.split("\n").filter(line => line.length)
  const valid = lines.filter(line => {
    const words = line.split(/\s+/)
    return words.every((word, i) => {
      return words.every((otherWord, j) => {
        return j === i || word.split('').sort().join('') !== otherWord.split('').sort().join('')
      })
    })
  })
  console.log(valid.length)
}
wrap('day4', part2)

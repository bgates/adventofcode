const wrap = require('./wrap')

const noWordMatch = (word, i, words) => (
  words.every((otherWord, j) => (
    j === i || word !== otherWord
  ))
)

const validIf = (data, validation) => {
  const valid = data
    .split("\n")
    .filter(line => line.length)
    .filter(line => line.split(/\s+/).every(validation))
  console.log(valid.length)
}

const part1 = data => validIf(data, noWordMatch)
wrap('day4', part1)

const alphabetized = word => word.split('').sort().join('') 

const noAnagrams = (word, i, words) => (
  words.every((otherWord, j) => (
    j === i || alphabetized(word) !== alphabetized(otherWord)
  ))
)

const part2 = data => validIf(data, noAnagrams)
wrap('day4', part2)

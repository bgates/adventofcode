const fs = require('fs')
const input = fs.readFileSync('./input/day16.txt', 'utf8').trim().split("\n")

const giver = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
}
const sues = input.map(line => JSON.parse(`{${line.match(/Sue \d+: (.*)/)[1].replace(/(\w+)/g, '"$1"')}}`))
const sue = sues.find(sue => (
  Object.keys(sue).every(prop => {
    if (prop === 'cats' || prop === 'trees') {
      return Number(sue[prop]) > giver[prop]
    } else if (prop === 'pomeranians' || prop === 'goldfish') {
      return Number(sue[prop]) < giver[prop]
    } else {
      return Number(sue[prop]) === giver[prop]
    }
  })
))
console.log(sues.indexOf(sue) + 1)

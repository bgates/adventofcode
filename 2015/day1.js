const fs = require('fs')
const input = fs.readFileSync(`./input/day1.txt`, 'utf8').trim()

const floorFinder = input => input.split('').reduce((total, char) => total + (char === '(' ? 1 : -1), 0)
console.log(floorFinder(input))


const basementFinder = input => {
  const inputs = input.split('')
  let floor = 0, i = 0
  while (floor > -1) {
    inputs[i] === '(' ? floor++ : floor--
    i++
  }
  return i
}
console.log(basementFinder(input))



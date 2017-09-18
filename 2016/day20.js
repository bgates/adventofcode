let testInput = `5-8
0-2
4-7`.split("\n")
let input = require('./input/day20').split("\n")

function compare (a, b) {
  return a.min - b.min
}
let ranges = input.map(str => {
  if (parseInt(str) === 0)
    console.log('str', str, 'min', parseInt(str), 'max', parseInt(str.replace(/\d+-/,'')))
  return {min: parseInt(str), max: parseInt(str.replace(/\d+-/,'')) }
}).sort(compare)

let start = ranges.shift()
let all = [start]
let current = all[all.length - 1]

ranges.forEach(range => {
  current = all[all.length - 1]
  if (range.min <= current.max + 1) {
    current.max = Math.max(current.max, range.max)
  } else {
    all.push(range)
  }
})
console.log(all.length)
let blocked = all.reduce((total, range) => total + range.max - range.min + 1, 0)
console.log(4294967295 - blocked)


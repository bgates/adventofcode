const wrap = require('./wrap')


const steps = (positions, ranges, directions, max, debug = false) => {
  let total = 0
  for (let i = 0; i < max; i++) {
    if (debug) console.log(i, positions)
    if (positions[i] === 0) {
      total += i * ranges[i] + 1
    }
    Object.keys(positions).forEach(n => {
      positions[n] = positions[n] + directions[n]
      if (positions[n] === ranges[n] - 1) {
        directions[n] = -1
      } else if (positions[n] === 0) {
        directions[n] = 1
      }
    })
  }
  return total
}
const part1 = delay => (data, debug = false)=> {
  const lines = data.trim().split("\n")
  const ranges = lines.reduce((obj, line) => {
    const [index, range] = line.split(": ")
    obj[index] = Number(range)
    return obj
  }, {})
  let initial = lines.reduce((obj, line) => {
    const [index, range] = line.split(": ")
    obj[index] = 0
    return obj
  }, {})
  let directions = lines.reduce((obj, line) => {
    const [index, range] = line.split(": ")
    obj[index] = 1
    return obj
  }, {})
  let positions = Object.assign({}, initial)
  const max = Math.max(...Object.keys(positions))
  steps(positions, ranges, directions, delay)
  //console.log(positions)
  let total = steps(positions, ranges, directions, max + 1, debug)
  return total
}
const test = `0: 3
1: 2
4: 4
6: 4`
part1(test)
console.log(wrap(13, part1(0)))

const part2 = (data) => {
  const lines = data.trim().split("\n")
  const ranges = lines.reduce((obj, line) => {
    const [index, range] = line.split(": ")
    obj[index] = Number(range)
    return obj
  }, {})
  let looking = true
  let delay = 0
  const indexes = Object.keys(ranges).map(Number)
  while (looking) {
    if (indexes.every(i => (delay + i) % (2 * (ranges[i] - 1)) !== 0)) {
      looking = false
    } else {
      delay++
    }
  }
  return delay
}
console.log(part2(test))
console.log(wrap(13, part2))

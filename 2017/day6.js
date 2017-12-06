const input = '0	5	10	0	11	14	13	4	11	8	8	7	1	4	12	11'

const test = '0 2 7 0'

const nextIndex = (i, arr) => i === arr.length - 1 ? 0 : i + 1 

const code = (data, breakWithoutRepeat = true) => {
  const arr = data.split(/\s+/).map(Number)
  let seen = { [arr]: true }
  let count = 0
  let foundRepeat
  while (true) {
    let max = Math.max(...arr)
    const index = arr.indexOf(max)
    arr[index] = 0
    let next = nextIndex(index, arr)
    while (max > 0) {
      arr[next]++
      max--
      next = nextIndex(next, arr)
    }
    count++
    if (seen[arr]) {
      if (foundRepeat || breakWithoutRepeat) {
        break
      } else {
        foundRepeat = true
        seen = {}
        count = 0
      }
    }
    seen[arr] = true
  }
  return count
}
const log = console.log
log(code(test))
log(code(input))
log(code(test, false)) // part2
log(code(input, false))

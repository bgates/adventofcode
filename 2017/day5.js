const wrap = require('./wrap')

let test = `0
3
0
1
-3`

const shared = (data, callback) => {
  let arr = data.split("\n").filter(n => n).map(Number)
  let current = 0
  let steps = 0
  while (true) {
    let next = arr[current] + current 
    arr[current] += callback(arr[current])
    steps++
    current = next
    if (current >= arr.length || current < 0) {
      break
    }
  }
  console.log(steps)
}

const part1 = data => {
  shared(data, n => 1)
}

part1(test)
wrap(5, part1)

const part2 = data => {
  shared(data, n => n >= 3 ? -1 : 1)
}

part2(test)
wrap(5, part2)

const input = '0	5	10	0	11	14	13	4	11	8	8	7	1	4	12	11'

const test = '0 2 7 0'

const part1 = data => {
  const arr = data.split(/\s+/).map(Number)
  let seen = { [arr.join(',')]: true }
  let count = 0
  let repeat
  while (true) {
    if (repeat !== undefined) {
      repeat++
    }
    let max = Math.max(...arr)
    const index = arr.indexOf(max)
    arr[index] = 0
    let next = index === arr.length - 1 ? 0 : index + 1
    while (max > 0) {
      arr[next]++
      max--
      next = next === arr.length - 1 ? 0 : next + 1
    }
    count++
    if (seen[arr.join(',')]) {
      //break
      if (repeat) {
        break
      } else {
        repeat = 0
        seen = { [arr.join(',')]: true }
      }
    }
    seen[arr.join(',')] = true
  }
  console.log(count, repeat)
}
part1(test)
part1(input)

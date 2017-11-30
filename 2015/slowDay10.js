//let input = '1'.split('').map(Number)
let input = '3113322113'.split('').map(Number)

const lookAndSay = arr => {
  return arr.reduce((total, char, i) => {
    const last = total.length - 1
    const lastCount = last - 1
    if (i === 0) {
      return [1, char]
    } else if (char === total[last]) {
      return total.slice(0, lastCount).concat(total[lastCount] + 1, char)
    } else {
      return total.concat(1, char)
    }
  }, [])
}
for (let i = 0; i < 50; i++) {
  console.log(i)
  input = lookAndSay(input)
}
console.log(input.length)

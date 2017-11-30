const input = require('./input/day7')
const test = `123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i`


const calculate = (input, value, obj) => {
  const operators = {
    AND: (x, y) => x & y,
    OR:  (x, y) => x | y,
    LSHIFT: (x, y) => x << y,
    RSHIFT: (x, y) => x >>> y
  }

  let instructions = {}
  const rhsAndLhs = instruction => {
    const [_, lhs, rhs] = instruction.match(/(.+) -> (.+)/)
    const notMatch = lhs.match(/NOT (\w+)/)
    const shiftMatch = lhs.match(/(\w+)?\s?(LSHIFT|RSHIFT) (\w+)/)
    const boolMatch = lhs.match(/(\w+)?\s?(AND|OR) (\w+)/)
    instructions[rhs] = [lhs, notMatch, shiftMatch, boolMatch]
  }

  input.split("\n").forEach(rhsAndLhs)
  const gateTo = val => {
    if (obj[val]) return obj[val]
    const valNum = Number(val)
    if (valNum >= 0) return valNum
    const instruction = instructions[val]
    const [lhs, notMatch, shiftMatch, boolMatch] = instruction
    const lhsNum = Number(lhs)
    if (lhsNum >= 0) {
      obj[val] = lhsNum
    } else if (obj[lhs] >= 0) {
      obj[val] = obj[lhs]
    } else if (notMatch) {
      const [_, x] = notMatch
      obj[val] = ~gateTo(x) + 65536
    } else if (shiftMatch) {
      const [_, x, cmd, y] = shiftMatch
      obj[val] = operators[cmd](gateTo(x), Number(y))
    } else if (boolMatch) {
      const [_, x, cmd, y] = boolMatch
      obj[val] = operators[cmd](gateTo(x), gateTo(y))
    } else {
      obj[val] = gateTo(lhs)
    }
    return obj[val]
  }
  return gateTo(value)
}
let obj = {}
const a = calculate(input, 'a', obj)
console.log(a)
obj = { b: a }
const newA = calculate(input, 'a', obj)
console.log(newA)


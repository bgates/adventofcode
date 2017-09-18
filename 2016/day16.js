let input = '11011110011011101'.split('').map(n => parseInt(n))
let length = 35651584//272
//let input = '10000'.split('').map(n => parseInt(n))
//let length = 20
while (input.length < length) {
  let start = input.length
  input.push(0)
  for (var i = start - 1; i >= 0; i--) {
    input.push(input[i] ? 0 : 1)
  }
}
console.log('through part 1')
function switchDigit (n) {
  return n === 1 ? 0 : 1
}
function oneForSame (a, b) {
  return a === b ? 1 : 0
}
function _checksum (input) {
  let output = []
  for (let i = 0; i < input.length; i += 2) {
    output.push(oneForSame(...input.slice(i, i + 2)))
  }
  return output
}
function checksum (input) {
  let check = _checksum(input)
  console.log('finished _checksum w length', input.length)
  return check.length % 2 === 0 ? checksum(check) : check
}
input = input.slice(0, length)
console.log(checksum(input).join(''))

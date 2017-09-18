let testInput = `
ADVENT //ADVENT
A(1x5)BC //ABBBBBC
(3x3)XYZ //XYZXYZXYZ
A(2x2)BCD(2x2)EFG
(6x1)(1x3)A
X(8x2)(3x3)ABCY
`.split("\n").filter(line => line.length)

let input = require('./input/day9')
let output = parse(input.trim())
console.log(output)

function parse (line) {
  let regex = /\(((\d+)x(\d+))\)/
  if (line === '')
    return 0
  let output = line.match(/[^(]*/)[0].length
  line = line.slice(output)
  let match
  if (match = line.match(regex)) {
    //[0] is whole, 2 is 1st num, 3 is 2nd
    line = line.substr(match[0].length)
    let repeat = line.substr(0, parseInt(match[2]))
    if (repeat.match(regex)) {
      output += parse(repeat) * parseInt(match[3])
    } else {
      output += parseInt(match[2]) * parseInt(match[3])
    }
    line = line.substr(parseInt(match[2]))
    //for (var n = 0; n < parseInt(match[3]); n++) {
    //  output += repeat.length
    //}
  }
  return output + parse(line)
}

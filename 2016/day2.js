let input = require('./input/day2')
var input2 = `ULL
RRDDD
LURDL
UUUUD`

var keypad = [
 [1, 2, 3],
 [4, 5, 6],
 [7, 8, 9]
]
var complexKeypad = [
  [null, null, 1],
  [null, 2,    3,   4],
  [5,    6,    7,   8,  9],
  [null, 'A',  'B', 'C'],
  [null, null, 'D']
]
var position = [2, 0]
var lines = input.split("\n")

var code = lines.map(lineToPosition).map(positionToNumber)
console.log(code.join(''))

function lineToPosition (line) {
  console.log('newline')
  let letters = line.split('')
  return letters.reduce(lettersToNumber, position)
}
function lettersToNumber (pos, move) {
  switch (move) {
    case 'U':
      console.log('U')
      position = upFrom(pos)
      break;
    case 'D':
      console.log('D')
      position = downFrom(pos)
      break;
    case 'R':
      console.log('R')
      position = rightFrom(pos)
      break;
    case 'L':
      console.log('L')
      position = leftFrom(pos)
      break;
  }
  console.log('move ', move, 'to pos ', position, positionToNumber(position))
  return position
}
function upFrom (position) {
  return move(position, -1, 0)
}
function move(position, vertical, horizontal) {
  if (position[0] + vertical < 0 || position[1] + horizontal < 0
     || position[0] + vertical > 4)
    return position
  var newNumber = complexKeypad[position[0] + vertical][position[1] + horizontal]
  if (newNumber){
    return [position[0] + vertical, position[1] + horizontal]}
  return position
}
function downFrom (position) {
  return move(position, 1, 0)
}
function rightFrom (position) {
  return move(position, 0, 1)
}
function leftFrom (position) {
  return move(position, 0, -1)
}
function positionToNumber (position) {
  return complexKeypad[position[0]][position[1]]
}

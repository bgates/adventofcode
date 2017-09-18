let input = require('./input/day21').reverse()

/*let input = `swap position 4 with position 0
swap letter d with letter b
reverse positions 0 through 4
rotate left 1 step
move position 1 to position 4
move position 3 to position 0
rotate based on position of letter b
rotate based on position of letter d`.split("\n")
*/
//let code = 'abcdefgh'
let code = 'fbgdceah'
//let code = 'ghfacdbe'
console.log('start: ', code)
function parse (line, i) {
  let match
  if (match = line.match(/swap position (\d+) with position (\d+)/)) {
    update(swap, match[1], match[2])
  } else if (match = line.match(/swap letter (\w) with letter (\w)/)) {
    let firstPosition = code.indexOf(match[1])
    let secondPosition = code.indexOf(match[2])
    update(swap, firstPosition, secondPosition)
  } else if (match = line.match(/reverse .* (\d+) through (\d+)/)) {
    update(reverse, match[1], match[2])
  } else if (match = line.match(/rotate (left|right) (\d+)/)) {
    if (match[1] === 'left') {
      update(reverseRotateLeft, match[2])
    } else {
      update(reverseRotateRight, match[2])
    }
  } else if (match = line.match(/rotate .* letter (\w)/)) {
    update(reversePositionRotate, match[1])
  } else if (match = line.match(/position (\d+) to position (\d+)/)) {
    update(reverseMove, match[1], match[2])
  }
  console.log(line)
  console.log('post ', code)
}
function update (callback, a, b) {
  code = code.split('')
  if (typeof a === 'string' && a.charCodeAt(0) < 97) {
    a = parseInt(a)
    b = parseInt(b)
  }
  callback(a, b)
  code = code.join('')
}
function move (start, finish) {
  let letter = code.splice(start, 1)
  code.splice(finish, 0, letter)
}
function reverseMove (start, finish) {
  move(finish, start)
}
function rotateLeft (n) {
  for (var i = 0; i < n; i++) {
    code.push(code.shift())
  }
}
function reverseRotateLeft (n) {
  rotateRight(n)
}
function reverseRotateRight (n) {
  rotateLeft(n)
}
function rotateRight (n) {
  for (var i = 0; i < n; i++) {
    code.unshift(code.pop())
  }
}
function swap (a, b) {
  let savedB = code[b]
  code[b] = code[a]
  code[a] = savedB
}
function reverse (a, b) {
  let slice = code.slice(a, b + 1)
  let rev = slice.reverse()
  code.splice(a, b - a + 1, ...rev)
}
function positionRotate (char) {
  let index = code.indexOf(char)
  let count = index + (index >= 4 ? 2 : 1)
  rotateRight(count)
}
function reversePositionRotate (char) {
  let index = code.indexOf(char)
  let hash = { 0: 1, 1: 1, 2: 6, 3: 2, 4: 7, 5: 3, 6: 0, 7: 4 }
  let count = hash[index]
  rotateLeft(count)
}
input.forEach(parse)
//let hash = { 0: 1, 1: 3, 2: 5, 3: 7, 4: 2, 5: 4, 6: 6, 7: 0 }
// to 0 from 7, L 1
// to 1 from 0, L 1
// to 2 from 4, L 6
// to 3 from 1, L 2
// to 4 from 5, L 8
// to 5 from 2, L 3
// to 6 from 6  L 0
// to 7 from 3, L 4

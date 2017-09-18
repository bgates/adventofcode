let input = require('./input/day8').split("\n").filter(line => line.length)

/*let input = `
rect 3x2
rotate column x=1 by 1
rotate row y=0 by 4
rotate column x=1 by 1O
`.split("\n").filter(line => line.length)*/

let display = Array(6).fill().map(()=>Array(50))
display.forEach(array => array.fill('.'))

function parse (line) {
  let dimensions = line.match(/(\d+)/g).map(n => parseInt(n))
  if (line.includes('rect')) {
    rect(...dimensions)
  } else if (line.includes('row')) {
    updateRow(...dimensions)
  } else {
    updateColumn(...dimensions)
  }
}
function rect (x, y) {
  for (var i = 0; i < x; i++) {
    for (var j = 0; j < y; j++) {
      display[j][i] = '#'
    }
  }
}
function updateColumn (x, distance) {
  let col = display.map(row => row[x])
  for (var i = 0; i < col.length; i++) {
    let position = (col.length - distance + i) % col.length
    display[i][x] = col[position]
  }
}
function updateRow (y, distance) {
  let row = display[y].map(char => char)
  for (var i = 0; i < row.length; i++) {
    let position = (row.length - distance + i) % row.length
    display[y][i] = row[position]
  }
}
function stringify (array) {
  return array.map(row => row.join('')).join("\n")
}
function updateAndShow (line) {
  parse(line)
  console.log(stringify(display), "\n\n")
}
input.forEach(updateAndShow)
let lit = display.reduce((tot, row) => tot + row.filter(cell => cell === '#').length, 0)
console.log(lit)

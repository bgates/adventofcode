let input = require('./input/day22').map(line => line.split(/\s+/))
.map(arr => {
  return { used: parseInt(arr[2]), avail: parseInt(arr[3]) }
})

console.log(input[0])
console.log(input.length)
console.log(input.filter(node => node.used).length)

function compareCapacity (a, b) {
  return a.used - b.used
}
function compareSpace (a, b) {
  return b.avail - a.avail
}
console.log(input.sort(compareCapacity).slice(0, 20))
console.log(input.sort(compareSpace).slice(0, 20))
let pairs = input.filter(node => node.used > 0).reduce((total, node, i) => {
  return total + input.reduce((subtotal, secondNode, j) => {
    return subtotal + (j !== i && node.used <= secondNode.avail ? 1 : 0)
  }, 0)
}, 0)
console.log(pairs)
console.log(input.filter(node => node.used > 0 && node.used <= 90).length)
console.log(input.length)

let grid = require('./input/day22').map(line => line.split(/\s+/))
.map(arr => {
  return { text: arr[0], used: parseInt(arr[2]), avail: parseInt(arr[3]) }
})
let display = []
grid.forEach(node => {
  let x = node.text.match(/x(\d+)/)[1]
  let y = node.text.match(/y(\d+)/)[1]
  let char = (x === '34' && y === '0') ? 'G' : node.used > 100 ? '#' : node.avail > 50 ? '_' : '.'
  if (!display[y]) {
    display[y] = []
  }
  display[y][x] = char
})
console.log(display.map(line => line.join('')).join("\n"))

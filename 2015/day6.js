const input = require('./input/day6')

const size = 1000
const followDirections = (input, grid, instructions, reducer)=> {
  const handleInstruction = (x1, x2, y1, y2, callback) => {
    grid.forEach((row, i) => {
      if (i >= x1 && i <= x2) {
        row.forEach((elm, j) => {
          if (j >= y1 && j <= y2) {
            grid[i][j] = callback(grid[i][j])
          }
        })
      }
    })
  }
  input.split("\n").forEach(direction => {
    const [_, instruction, x1, y1, x2, y2] = direction.match(/(\D+)(\d+),(\d+) through (\d+),(\d+)/)
    handleInstruction(x1, x2, y1, y2, instructions[instruction])
  })
  return grid.reduce(reducer, 0)
}

let grid = (new Array(size)).fill(false).map(elm => (new Array(size)).fill(false))

const instructions = {
  'turn off ': () => false,
  'turn on ':  () => true,
  'toggle ':  (x) => !x
}

const reducer = (total, row) => row.filter(elm => elm).length + total
console.log(followDirections(input, grid, instructions, reducer))

let newGrid = (new Array(size)).fill(false).map(elm => (new Array(size)).fill(0))

const newInstructions = {
  'turn off ': x => x ? x - 1 : 0,
  'turn on ':  x => x + 1,
  'toggle ':  x => x + 2
}

const newReducer = (total, row) => total + row.reduce((rowTotal, elm) => rowTotal + elm, 0)
console.log(followDirections(input, newGrid, newInstructions, newReducer))




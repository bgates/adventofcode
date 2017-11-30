let grid = require('./input/day18')
  .split("\n")
  .map(line => (
    line.split('')
        .map(char => char === '#' ? true : false)
  ))
const length = grid[0].length - 1
const height = grid.length - 1
grid[0][0] = true
grid[0][length] = true
grid[height][0] = true
grid[height][length] = true
let test = `##.#.#
...##.
#....#
..#...
#.#..#
####.#`
  .split("\n")
  .map(line => (
    line.split('')
        .map(char => char === '#' ? true : false)
  ))
const neighborCount = (total, curr) => curr ? ++total : total

const sliceBoundaries = (length, j) => [Math.max(j - 1, 0), Math.min(length, j + 2)]

const sideNeighbors = (arr, j) => (
  (arr[j - 1] ? 1 : 0) +
  (arr[j + 1] ? 1 : 0) 
)

const lowNeighbors = (grid, arr, j) => (
  sideNeighbors(arr, j) +
  grid[1].slice(...sliceBoundaries(arr.length, j))
    .reduce(neighborCount, 0)
)

const topNeighbors = (grid, arr, j) => (
  sideNeighbors(arr, j) +
  grid[grid.length - 2].slice(...sliceBoundaries(arr.length, j))
    .reduce(neighborCount, 0)
)

const midNeighbors = (grid, arr, i, j) => (
  sideNeighbors(arr, j) +
  grid[i - 1].slice(...sliceBoundaries(arr.length, j))
  .concat(
    grid[i + 1].slice(...sliceBoundaries(arr.length, j))
  ).reduce(neighborCount, 0)
)

const neighbors = (grid, arr, i, j) => (
  i === 0 ? lowNeighbors(grid, arr, j) :
  i === grid.length - 1 ? topNeighbors(grid, arr, j) :
  midNeighbors(grid, arr, i, j)
)

const turnOn = (grid, arr, char, i, j) => (
  !char && neighbors(grid, arr, i, j) === 3
)

const stayOn = (grid, arr, char, i, j) => (
  char && [2, 3].includes(neighbors(grid, arr, i, j))
)

const corner = (i, j, height, length) => (
  (i === 0 && (j === 0 || j === length)) || 
  (i === height && (j === 0 || j === length))
)

const next = grid => (
  grid.map((arr, i) => (
    arr.map((char, j) => (
      turnOn(grid, arr, char, i, j) || 
      stayOn(grid, arr, char, i, j)) || 
      corner(i, j, grid.length - 1, arr.length - 1)
    )
  ))
)

for(let i = 0; i <= 100; i++) {
  console.log(i)
  console.log(grid.reduce((tot, row) => tot + row.reduce(neighborCount, 0), 0))
  //console.log(test.map(row => row.map(char => char ? '#' : '.', '').join('')).join("\n"))
  grid = next(grid)
}

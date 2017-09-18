let favoriteNumber = 1362

function poly (x, y) {
  return x*x + 3*x + 2*x*y + y + y*y + favoriteNumber
}
function binary (n) {
  return (n >>> 0).toString(2)
}
function evenBits (b) {
  return b.replace(/0/g, '').length
}
function isWall (x, y) {
  return evenBits(binary(poly(x, y))) % 2 !== 0
}
function graphic (x, y) {
  return isWall(x, y) ? '#' : '.'
}
let map = []
for (var y = 0; y < 50; y++) {
  map.push([])
  for (var x = 0; x < 50; x++) {
    map[y].push(isWall(x, y))
  }
}
console.log(map.map(line => line.map(bool => bool ? '#': '.').join('')).join("\n"))
function flatten (array) {
  return array.reduce((total, arr) => total.concat(arr), [])
}
function adjacentOpen (location) {
  let [x, y] = location
  return [ [x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1] ].filter(positiveAndOpen)
}
function positiveAndOpen (location) {
  let [x, y] = location
  return x > -1 && y > -1 && !map[y][x]
}
function addUniqueToHistory (coordinates) {
  if (history[coordinates]) {
    return false
  } else {
    return history[coordinates] = true
  }
}
let position = [1, 1]
let currentGen = [position]
let history = { position: true }
let goal = [31, 39]
let steps = 0
while (steps < 50) {
  steps++
  console.log(steps)
  let nextGen = flatten(currentGen.map(adjacentOpen)).filter(addUniqueToHistory)
  //if (nextGen.some(atGoal)) {
  //  console.log(steps)
    //break
  //}
  currentGen = nextGen
  console.log(Object.keys(history).length)
}
console.log(Object.keys(history).length)
function atGoal (location) {
  let [x, y] = location
  return x === goal[0] && y === goal[1]
}
//135, 139...how could it be between those?

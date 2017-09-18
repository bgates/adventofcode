let directions = require('./input/day1')

let heading = 0
let n = 0
let e = 0
let locations = [[0, 0]]

function changeHeading (turn) {
  if (turn === 'R') {
    heading += 90
  } else {
    heading -= 90
  }
  heading += 360
  heading %= 360
}
function sharedVertical () {
  return locations.filter(location => location[1] === e)
}
function sharedHorizontal () {
  return locations.filter(location => location[0] === n)
}
function check(possibleMatches, x, y) {
  if (possibleMatches.some(match => match[0] === x && match[1] === y)) {
    console.log("DONE", x, y)
  } else {
    locations.push([x, y])
  }
}
function goNorth (distance, location) {
  n += distance
  let possibleMatches = sharedVertical()
  for (var i = location[0]; i < n; i++) {
    check(possibleMatches, i, e)
  }
}
function goEast (distance, location) {
  e += distance
  let possibleMatches = sharedHorizontal()
  for (var i = location[1]; i < e; i++) {
    check(possibleMatches, n, i)
  }
}
function goSouth (distance, location) {
  n -= distance
  let possibleMatches = sharedVertical()
  for (var i = location[0]; i > n; i--) {
    check(possibleMatches, i, e)
  }
}
function goWest (distance, location) {
  e -= distance
  let possibleMatches = sharedHorizontal()
  for (var i = location[1]; i > e; i--) {
    check(possibleMatches, n, i)
  }
}
function advance (distance) {
  let location = locations[locations.length - 1]
  if (heading === 0) {
    goNorth(distance, location)
  } else if (heading === 90) {
    goEast(distance, location)
  } else if (heading === 180) {
    goSouth(distance, location)
  } else if (heading === 270) {
    goWest(distance, location)
  }
}
function step (direction) {
  let turn = direction.slice(0,1)
  let distance = parseInt(direction.slice(1))
  changeHeading(turn)
  advance(distance)
  console.log('at ', n, e)
}
directions.some(step)
console.log(Math.abs(n) + Math.abs(e))

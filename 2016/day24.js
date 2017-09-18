let input = require('./input/day24')

let canon = {}
let start = {}
let map = input.map((line, y) => {
  return line.split('').map((space, x) => {
    if (space === "#") {
      return false
    } else {
      if (parseInt(space) == space) {
        if (space === "6") {
          start.x = x
          start.y = y
          canon[`${x}:${y}:0`] = 1
        }
      }
      return space
    }
  })
})
let length = 1

function nextTo (location) {
  return [
    {x: 1, y: 0},
    {x: -1, y: 0},
    {x: 0, y: -1},
    {x: 0, y: 1} ].map(movement => {
      return {
        x: movement.x + location.x,
        y: movement.y + location.y,
        prevX: location.x,
        prevY: location.y,
        sites: location.sites,
        turnAround: location.isSite
      }
    }).filter(space => map[space.y] && map[space.y][space.x])
      .filter(space => space.x !== location.prevX ||
              space.y !== location.prevY ||
              location.isSite)
}
function rehydrate (string) {
  let array = string.split(":")
  return {
    x: parseInt(array[0]),
    y: parseInt(array[1]),
    sites: array[2],
    prevX: parseInt(array[3]),
    prevY: parseInt(array[4]),
    turnAround: array[5] === "true",
    isSite: array[6] === "true"
  }
}
let max = 0
let ongoing = true
while(ongoing) {
  length++
    console.log(length)
  let locations = Object.keys(canon).map(rehydrate)
  locations.forEach(location => {
    let adjacent = nextTo(location)
    adjacent.forEach(space => {
      let content = map[space.y][space.x]
      if (content === "0") {
        console.log(length)
        ongoing = false
      }
      if (content !== '.' && !space.sites.includes(content)) {
        space.sites = space.sites.split('').concat(content).sort().join('')
        if (space.sites.length === 8) {
          if (space.x === start.x && space.y === start.y) {
          //  console.log('finished: ', length)
            ongoing = false
          } else {
            for (let _key in canon) {
              delete canon[_key]
            }
            console.log('canon emptied; should start from here:', space.x, space.y)
          }
        }
        space.isSite = true
      }
      let key = `${space.x}:${space.y}:${space.sites}:${space.prevX}:${space.prevY}:${space.turnAround}:${space.isSite}`
      if (!canon[key] || canon[key] > length) {
        canon[key] = length
      }
    })
  })
}
// in fact I do care, in that repeats are bad news
// at least two paths hitting the same point w the same visited sites
// are redundant
// I don't care about path; I just want to know current location

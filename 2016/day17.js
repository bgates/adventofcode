let md5 = require('./md5')
let input = 'qtetzkpl'

let start = [0, 0]

let paths = [ {string: '', position: start} ]
let pathLength = 0
let directions = ["U", "D", "L", "R"]
let maximumPath
let longestPath

function complete (path) {
  return path.position[0] === 3 && path.position[1] === 3
}
function move(direction, position) {
  if (direction === 'U' && position[1] !== 0) {
    return [position[0], position[1] - 1]
  } else if (direction === 'D' && position[1] !== 3) {
    return [position[0], position[1] + 1]
  } else if (direction === 'L' && position[0] !== 0) {
    return [position[0] - 1, position[1]]
  } else if (direction === 'R' && position[0] !== 3) {
    return [position[0] + 1, position[1]]
  }
}
while(!maximumPath) {
  maximumPath = true
  paths.filter(path => path.string.length === pathLength && !complete(path)).forEach(path => {
    let string = input + path.string
    let hash = md5(string)
    directions.forEach((direction, i)=> {
      //console.log('direction', direction)
      let newPosition = move(direction, path.position)
      if (newPosition) {
        if (['b', 'c', 'd', 'e', 'f'].includes(hash[i])) {
          //console.log('add', path.string + direction, newPosition)
          let newPath = { string: path.string + direction, position: newPosition }
          if (complete(newPath)) {
            longestPath = newPath.string.length
            console.log(longestPath, newPath.position)
          }
          paths.push(newPath)
          maximumPath = false
        }

      }
    })
  })
  pathLength++
}
console.log(longestPath)


// given a path, take the hash of that path+input
// look at 1st 4 char for up/down/left/right
// reject paths that lead off grid
// for each open door, create new path by appending to current path
// repeat for next gen


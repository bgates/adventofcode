const containers = require('./input/day17')
  .split("\n")
  .map(Number)
  .sort((a, b) => a - b)
//const containers = [20, 15, 10, 5, 5].sort((a, b) => a - b)
const goal = 150
// make a obj w 2 keys at each level: 0 and a capacity.
// sum of the keys to that level is 150? value is true; stop
// sum of the keys to that level > 150? value is false; stop
// sum of the keys to that level < 150? value is an obj
//
let solutions = []
const value = (list, i, totalCapacity, used) => {
  const nextCapacity = list[i]
  const newTotalCapacity = totalCapacity + nextCapacity
  if (newTotalCapacity === goal) {
    const solution = used.concat(nextCapacity)
    solutions.push(solution)
    while (list[i + 1] === nextCapacity) {
      solutions.push(solution)
      i++
    }
    return true
  } else if (newTotalCapacity > goal || i + 1 === list.length) {
    return false
  } else {
    return { 
      0: value(list, i + 1, totalCapacity, used),
      [nextCapacity]: value(list, i + 1, newTotalCapacity, used.concat(nextCapacity))
    }
  }
}
const object = { 
  0: value(containers, 1, 0, []),
  [containers[0]]: value(containers, 1, containers[0], [containers[0]])
}
const min = solutions.reduce((min, curr) => Math.min(min, curr.length), solutions[0].length)
console.log(min)
console.log(solutions.filter(solution => solution.length === min).length)

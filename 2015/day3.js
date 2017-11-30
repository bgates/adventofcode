const input = require('./input/day3')

const recipients = input => {
  const directions = input.split('')
  let x = 0, y = 0, houses = { '0,0': true }
  const move = {
    '^': () => y++,
    'v': () => y--,
    '<': () => x--,
    '>': () => x++
  }
  directions.forEach(direction => {
    move[direction]()
    houses[`${x},${y}`] = true
  })
  return Object.keys(houses).length
}
console.log(recipients(input))

const recipients2 = input => {
  const directions = input.split('')
  let x = 0, y = 0, roboX = 0, roboY = 0, houses = { '0,0': true }
  const move = {
    '^': bool => bool ? y++ : roboY++,
    'v': bool => bool ? y-- : roboY--,
    '<': bool => bool ? x-- : roboX--,
    '>': bool => bool ? x++ : roboX++
  }
  directions.forEach((direction, i)=> {
    const bool = i % 2 === 0
    move[direction](bool)
    bool ? houses[`${x},${y}`] = true : houses[`${roboX},${roboY}`] = true
  })
  return Object.keys(houses).length
}
console.log(recipients2(input))

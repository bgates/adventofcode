const myInput = require('./input/day2.js')
const myBoxes = myInput.split("\n")

const useDimensions = (input, callback) => input.split("\n").reduce((total, box) => {
    const dimensions = box.split('x').map(Number).sort((a, b) => a - b)
    return total + callback(...dimensions)
}, 0)
const wrap = (a, b, c) => 2 * (b * c + a * c) + 3 * a * b

console.log(useDimensions(myInput, wrap))

const ribbon = (a, b, c) => a * b * c + 2 * a + 2 * b
console.log(useDimensions(myInput, ribbon))


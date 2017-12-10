const text = '94,84,0,79,2,27,81,1,123,93,218,23,103,255,254,243'
const input = text.split(',').map(Number)

let list = []
let max = 256
let skipSize = 0
for (let i = 0; i < max; i++) list.push(i)

/*
 * 0 0
 * 3 1
 * 3 2
 */
//let lengths = input// [3,4,1,5]
let currentPosition = 0
const loop = (lengths, list) => {
  let arr
  for (let i = 0; i < lengths.length; i++) {
    const length = lengths[i]
    if ( length > 1 ) {
      if (currentPosition + length <= list.length) {
        arr = list.slice(currentPosition, currentPosition + length).reverse()
        list = [ 
          ...list.slice(0, currentPosition), 
          ...arr, 
          ...list.slice(currentPosition + length) ]
      } else {
        arr = [
          ...list.slice(currentPosition), 
          ...list.slice(0, currentPosition + length - list.length)]
        arr = arr.reverse()
        const endCount = list.length - currentPosition
        const startCount = arr.length - endCount
        list = [ 
          ...arr.slice(-startCount),
          ...list.filter(n => !arr.includes(n)), 
          ...arr.slice(0, endCount)]
      }
    }
    currentPosition = (currentPosition + length + skipSize) % list.length
    skipSize++
  }
  return list
}
list = loop(input, list)
console.log(list[0] * list[1])

const lengths = text.split('').map(c => c.charCodeAt(0)).concat(17, 31, 73, 47, 23)
list = []
for (let i = 0; i < max; i++) list.push(i)
currentPosition = 0
skipSize = 0

for(let n = 0; n < 64; n++) list = loop(lengths, list)

let dense = []
while (list.length) {
  dense.push(list.splice(0, 16).reduce((total, n) => total ^ n))
}
console.log(dense.map(d => d.toString(16).padStart(2, '0')).join(''))

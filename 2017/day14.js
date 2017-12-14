const input = "jzgqcdpd"

const hash = input => {
  let currentPosition = 0
  let skipSize = 0
  const lengths = input.split('')
    .map(c => c.charCodeAt(0)).concat(17, 31, 73, 47, 23)
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

  let list = []
  for (let i = 0; i < 256; i++) list.push(i)
  for (let n = 0; n < 64; n++) list = loop(lengths, list)
  let dense = []
  while (list.length) {
    dense.push(list.splice(0, 16).reduce((total, n) => total ^ n))
  }
  const hex = dense.map(d => d.toString(16).padStart(2, '0')).join('')
  const bin = hex.split('').map(x => (parseInt(x, 16).toString(2).padStart(4, '0'))).join('')
  return bin
}

const test = "flqrgnkx"

let squares = 0
let grid = []
for (let i = 0; i < 128; i++) {
  const bin = hash(`${input}-${i}`)
  grid.push(bin.split('').map(Number))
  if (i < 8) {
    console.log(bin.split('').slice(0, 8).map(c => c === '1' ? '#' : '.').join(''))

  }
  const ones = bin.split('').map(Number).filter(n => n).join('').length
  const zeros = bin.split('').map(Number).filter(n => n === 0).join('').length
  squares += ones
}
console.log(squares)

let regions = {}
let nextRegion = 1
grid.forEach((row, i)=> {
  row.forEach((square, j) => {
    if (square) {
      let [a, b, c, d] = [`${i - 1},${j}`, `${i + 1},${j}`, `${i},${j + 1}`, `${i},${j - 1}`]
      let region = regions[a] || regions[b] || regions[c] || regions[d]
      if (region) {
        regions[`${i},${j}`] = region;
        [b, c, d].forEach(x => {
          if (regions[x] && regions[x] !== region) {
            let temp = regions[x]
            Object.keys(regions).forEach(key => {
              if (regions[key] === temp) regions[key] = region
            })
          }
        })
      } else {
        regions[`${i},${j}`] = nextRegion
        nextRegion++
      }
    }
  })
})
console.log(Object.values(regions).sort().map((n, i, a) => n === a[i - 1] ? undefined : n).filter(n => n).length)

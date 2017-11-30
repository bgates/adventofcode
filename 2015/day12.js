const data = require('./input/day12')

const string = JSON.stringify(data)

const list = string.replace(/[^0-9,-]/g,'').replace(/,{2,}/g,',')

const array = JSON.parse(`[${list}]`).map(Number)
console.log(array.reduce((total, n) => total + n))

const sum = object => {
  if (typeof object === 'string') {
    return 0
  } else if (typeof object === 'number') {
    return object
  } else if (Array.isArray(object)) {
    return object.reduce((total, n) => total + sum(n), 0)
  } else if (Object.values(object).includes('red')) {
    return 0
  } else {
    return Object.keys(object).reduce((total, key) => total + sum(object[key]), 0)
  }
}
console.log(sum(data))

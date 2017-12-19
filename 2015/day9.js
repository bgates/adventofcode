const fs = require('fs')
const distances = fs.readFileSync('./input/day9.txt', 'utf8').trim().split("\n")

let options = {}
distances.forEach(distance => {
  const [from, _, to, __, km] = distance.split(' ')
  options[from] = options[from] || {}
  options[to] = options[to] || {}
  options[from][to] = Number(km)
  options[to][from] = Number(km)
})
const cities = Object.keys(options)

const routesStartingWith = cityArray => {
  const remainingCities = cities.filter(city => !cityArray.includes(city))
  if (remainingCities.length === 1) {
    return cityArray.concat(remainingCities)
  } else {
    return remainingCities.map(city => routesStartingWith(cityArray.concat(city)))
  }
}

const flatten = array => {
  if (Array.isArray(array[0][0])) {
    return array.reduce((total, elm) => total.concat(flatten(elm)), [])
  } else {
    return array
  }
}
const routes = flatten(cities.map(city => routesStartingWith([city])))

const routeLengths = routes.map(route => (
  route.reduce((distance, city, i) => (
    i === 0 ? distance : distance + options[route[i - 1]][city]
  ), 0)
))
const shortest = routeLengths.reduce((acc, curr) => Math.min(acc, curr))
const longest = routeLengths.reduce((acc, curr) => Math.max(acc, curr))
console.log(shortest, longest)

const happiness = require('./input/day13').split("\n")

let options = {}
happiness.forEach(preference => {
  const [_, name, direction, amount, other] = preference.match(/(\w+) would (\w+) (\d+) happiness units by sitting next to (\w+)/)
  options[name] = options[name] || {}
  options[name][other] = Number(amount) * (direction === 'lose' ? -1 : 1)
})
const people = Object.keys(options)
options['me'] = {}
people.forEach(person => { options[person]['me'] = 0; options['me'][person] = 0 })
const peopleAndMe = people.concat('me')

const seatsStartingWith = (personArray, people) => {
  const remainingPeople = people.filter(person => !personArray.includes(person))
  if (remainingPeople.length === 1) {
    return personArray.concat(remainingPeople)
  } else {
    return remainingPeople.map(person => seatsStartingWith(personArray.concat(person), people))
  }
}

const flatten = array => {
  if (Array.isArray(array[0][0])) {
    return array.reduce((total, elm) => total.concat(flatten(elm)), [])
  } else {
    return array
  }
}
const seatingArrangements = (people) => flatten(people.map(person => seatsStartingWith([person], people)))

const happinesses = people => seatingArrangements(people).map(seats => (
  seats.reduce((happiness, person, i) => {
    const last = seats.length - 1
    const [prev, next] = i === 0 ? [last, 1] : i === last ? [last - 1, 0] : [i - 1, i + 1]
    const option = options[person]
    return happiness + option[seats[prev]] + option[seats[next]]
  }, 0)
))
const happiest = happinesses(people).reduce((acc, curr) => Math.max(acc, curr))
console.log(happiest)
const happiestWithMe = happinesses(peopleAndMe).reduce((acc, curr) => Math.max(acc, curr))
console.log(happiestWithMe)

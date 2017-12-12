const wrap = require('./wrap')

const addRelationship = (obj, a) => (b, addingReverse = false) => {
  obj[a] = obj[a] || []
  if (!obj[a].includes(b)) obj[a].push(b)
  if (!addingReverse) addRelationship(obj, b)(a, true)
}

const groupBuilder = (relationships, inGroup = {}) => val => {
  inGroup[val] = true 
  relationships[val].forEach(n => inGroup[n] = true)
  relationships[val].forEach(n => {
    relationships[n]
      .filter(m => !inGroup[m])
      .forEach(groupBuilder(relationships, inGroup))
  })
  return inGroup
}

const prep = data => {
  const lines = data.trim().split("\n")
  const relationships = lines.reduce((obj, line) => {
    let [n, rest] = line.split(' <-> ')
    rest.split(', ').forEach(addRelationship(obj, n))
    return obj
  }, {})
  return { lines, relationships }
}
const part1 = data => {
  const { relationships } = prep(data)
  console.log(Object.keys(groupBuilder(relationships)(0)).length)
}

const part2 = data => {
  const { lines, relationships } = prep(data)
  let accountedFor = {}
  const groups = lines.reduce((total, _, n) => {
    if (!accountedFor[n]) {
      Object.assign(accountedFor, groupBuilder(relationships)(n))
      return total + 1
    } else {
      return total
    }
  }, 0)
  console.log(groups)
}
const test = `0 <-> 2
1 <-> 1
2 <-> 0, 3, 4
3 <-> 2, 4
4 <-> 2, 3, 6
5 <-> 6
6 <-> 4, 5`

part1(test)
wrap(12, part1)
wrap(12, part2)

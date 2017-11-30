const weights = `1
3
5
11
13
17
19
23
29
31
41
43
47
53
59
61
67
71
73
79
83
89
97
101
103
107
109
113`.split("\n").map(Number)

const sum = (total, n) => total + n
const product = (product, n) => product * n
const total = weights.reduce(sum, 0)
const groupWeight = total / 4

const shuffle = array => {
  let tmp, current, top = array.length

  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1))
    tmp = array[current]
    array[current] = array[top]
    array[top] = tmp
  }

  return array
}

const groupings = []
  for (let i = 0; i < 2000000000; i++) {
    let testWeights = shuffle(weights)
    let groupWeights = [0, 0, 0]
    let k = 0
    let groups = []
    let tooHeavy = false
    for (let j = 0; j < 3 && !tooHeavy; j++) {
      let start = k
      for(;(groupWeights[j] < groupWeight) && (k < testWeights.length) && !tooHeavy;k++) {
        groupWeights[j] += testWeights[k]
      }
      if (groupWeights[j] > groupWeight) {
        tooHeavy = true
        continue
      }
      groups.push(testWeights.slice(start, k + 1))
    }
    if (tooHeavy) continue
    groups.push(testWeights.slice(k, testWeights.length))
    if (!groupWeights.every(weights => weights === groupWeight)) continue
    const lengths = groups.map(group => group.length).sort((a, b) => a - b)
    if (lengths[0] < lengths[1]) {
      groupings.push(groups.find(group => group.length === lengths[0]))
    } else {
      const minEntangle = groups
        .filter(group => group.length === lengths[0])
        .map(group => group.reduce(product, 1))
        .sort((a, b) => a - b)[0]
    groupings.push(groups.find(group => group.reduce(product, 1) === minEntangle))
  }
}
const length = Math.min(...groupings.map(group => group.length))
const smallest = groupings.filter(group => group.length === length)
console.log(smallest.map(group => ({ group, tangle: group.reduce(product, 1) })).sort((a, b) => a.tangle - b.tangle)[0])
console.log(smallest.length)


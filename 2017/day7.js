const wrap = require('./wrap')

const code = (data) => {
  const lines = data.split("\n").filter(n => n.length)
  let names = []
  let supported = []
  lines.forEach(line => {
    let name = line.match(/(\w+)/)[1]
    names.push(name)
    if (line.match('->')) {
      let supports = line.split('-> ')[1].split(', ')
      supported = [...supported, ...supports]
    }
  })
  const name = names.find(name => !supported.includes(name))
  console.log(name)
  return name
}

wrap('day7', code)

const supporting = (weights, supports, name) => {
  return weights[name] + (supports[name] || []).reduce((total, other) => (
    total + supporting(weights, supports, other)
  ), 0)
}

const part2 = data => {
  const start = code(data)
  const lines = data.split("\n").filter(n => n.length)
  let weights = {}
  let supports = {}
  lines.forEach(line => {
    let name = line.match(/(\w+)/)[1]
    weight = Number(line.match(/(\d+)/)[1])
    weights[name] = weight
    if (line.match('->')) {
      supports[name] = line.split('-> ')[1].split(', ') 
    }
  })
  var wrongWeight
  var supporter = start
  while (supporter && !wrongWeight) {
    let siblings = supports[supporter]
    if (!supports[supporter]) {
      wrongWeight = supporter
    } else {
      let sibWeight = siblings.map(sib => supporting(weights, supports, sib))
      let nextSupporter = siblings[sibWeight.indexOf(sibWeight.find(weight => weight !== sibWeight.reduce((total, n) => total + n, 0) / sibWeight.length))]
      if (!nextSupporter) {
        wrongWeight = supporter
      } else {
        supporter = nextSupporter
      }
    }

  }
  let parent = Object.keys(supports).find(name => supports[name].includes(wrongWeight))
  let rightWeight = supports[parent].find(name => name !== wrongWeight)
  let right = supporting(weights, supports, rightWeight)
  let wrong = supporting(weights, supports, wrongWeight)
  console.log(right - wrong - weights[wrongWeight])
  console.log(right , wrong , weights[wrongWeight])
}
wrap('day7', part2)

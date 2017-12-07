const wrap = require('./wrap')

const code = (data) => {
  const lines = data.split("\n").filter(n => n.length)
  let names = []
  let supported = []
  lines.forEach(line => {
    names.push(line.match(/(\w+)/)[1])
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


const part2 = data => {
  const start = code(data)
  const lines = data.split("\n").filter(n => n.length)
  let weights = {}
  let supportedBy = {}
  lines.forEach(line => {
    let name = line.match(/(\w+)/)[1]
    weight = Number(line.match(/(\d+)/)[1])
    weights[name] = weight
    if (line.match('->')) {
      supportedBy[name] = line.split('-> ')[1].split(', ') 
    } else {
      supportedBy[name] = []
    }
  })
  var imbalanced, parent
  var supporter = start
  const supporting = name => {
    return weights[name] + supportedBy[name].reduce((total, other) => (
      total + supporting(other)
    ), 0)
  }
  while (supporter && !imbalanced) {
    let siblings = supportedBy[supporter]
    if (supportedBy[supporter].length == 0) {
      imbalanced = supporter
    } else {
      let sibWeight = siblings.map(supporting)
      let avgWeight = sibWeight.reduce((total, n) => total + n, 0) /
        sibWeight.length
      let nonAvgSib = sibWeight.find(weight => weight !== avgWeight)
      let nextSupporter = siblings[sibWeight.indexOf(nonAvgSib)]
      if (!nextSupporter) {
        imbalanced = supporter
      } else {
        parent = supporter
        supporter = nextSupporter
      }
    }
  }
  const balanced = (supporting(parent) - weights[parent] - supporting(imbalanced)) / (supportedBy[parent].length - 1)
  console.log(weights[imbalanced] - supporting(imbalanced) + balanced)
}
wrap('day7', part2)

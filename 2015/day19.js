const { transformString, molecule } = require('./input/day19')

const test = `H => HO
H => OH
O => HH`
const prepTransforms = str => {
  const obj = {}
  str.split("\n").forEach(line => {
    const [key, val] = line.split(" => ")
    if (obj[key]) {
      obj[key].push(val)
    } else {
      obj[key] = [val]
    }
  })
  return obj
}
const transforms = prepTransforms(transformString)

const findMolecules = (transforms, molecule) => {
  const distinct = []
  Object.keys(transforms).forEach(replaceable => {
    transforms[replaceable].forEach(replacement => {
      const regex = new RegExp(replaceable, 'g')
      const matches = molecule.match(regex)
      if (matches) {
        matches.forEach((_, i) => {
          let count = -1
          const medicine = molecule.replace(regex, match => {
            count++
            return (i === count) ? replacement : match
          }) 
          if (!distinct.includes(medicine)) distinct.push(medicine)
        })
      }
    })
  })
  return distinct
}
console.log(findMolecules(prepTransforms(test), 'HOH'))
console.log(findMolecules(transforms, molecule).length)

const regexes = {}
Object.keys(transforms).forEach(r => regexes[r] = new RegExp(r, 'g'))
const replaceables = Object.keys(transforms)

const breadthFirst = (seen, level, goal, step) => {
  console.log(step, level.length)
  const nextLevel = []
  let count
  const matchMaker = (k, replacement) => match => {
    count++
    return (k === count) ? replacement : match
  }
  for (let i = 0; i < level.length; i++) {
    const option = level[i]
    for (let j = 0; j < replaceables.length; j++) {
      const replaceable = replaceables[j]
      const matches = option.match(regexes[replaceable])
      if (matches) {
        for (let k = 0; k < matches.length; k++) {
          for (let m = 0; m < transforms[replaceable].length; m++) {
            const replacement = transforms[replaceable][m]
            count = -1
            const molecule = option.replace(regexes[replaceable], matchMaker(k, replacement)) 
            if (molecule === goal) {
              return step
            } else if (!seen[molecule]) {
              seen[molecule] = true
              if (molecule.length < goal.length) nextLevel.push(molecule)
            }
          }
        }
      }
    }
  }
  return breadthFirst(seen, nextLevel, goal, step + 1)
}
const solution = breadthFirst({}, ['e'], molecule, 1)
console.log(solution)
//ugh, part 2 didn't work. had to 'cheat' and look up solution, which by hand isn't bad.

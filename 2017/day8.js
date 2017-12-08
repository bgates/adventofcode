let wrap = require('./wrap')

const compare = (comparison, v1, v2) => {
  if (comparison === '>') {
    return v1 > v2
  } else if (comparison === '<') {
    return v1 < v2
  } else if (comparison === '>=') {
    return v1 >= v2
  } else if (comparison === '<=') {
    return v1 <= v2
  } else if (comparison === '==') {
    return v1 == v2
  } else if (comparison === '!=') {
    return v1 != v2
  }
}

const change = (obj, reg, dir, amt) => {
  if (dir === 'inc') {
    obj[reg] = obj[reg] + Number(amt)
  } else if (dir === 'dec') {
    obj[reg] = obj[reg] - amt
  }
}

const part1 = data => {
  let lines = data.split("\n").filter(n => n)
  let max = 0
  let registers = {}
  lines.forEach(line => {
    let [_, reg, dir, amt, reg2, comparison, amt2] = line.match(/(\w+) (\S+) (-?\d+) if (\w+) (\S+) (-?\d+)/)
    registers[reg] = registers[reg] || 0
    registers[reg2] = registers[reg2] || 0
    if (compare(comparison, registers[reg2], amt2)) {
      change(registers, reg, dir, amt)
      max = Math.max(max, registers[reg])
    }
  })
  console.log(Math.max(...Object.values(registers)))
  console.log(max)
}

const test = `b inc 5 if a > 1
a inc 1 if b < 5
c dec -10 if a >= 1
c inc -20 if c == 10`
part1(test)

wrap(8, part1)

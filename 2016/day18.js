function isTrap (previousRow, index) {
  let left   = index > 0 ? previousRow[index - 1] : false
  let center = previousRow[index]
  let right  = previousRow[index + 1]
  return (
    (left && center && !right) ||
    (!left && center && right) ||
    (left && !center && !right) ||
    (!left && !center && right)
  )
}
let input = '^.^^^.^..^....^^....^^^^.^^.^...^^.^.^^.^^.^^..^.^...^.^..^.^^.^..^.....^^^.^.^^^..^^...^^^...^...^.'
let output = [input.split('').map(char => char === '^')]

for (var i = 1; i < 400000; i++) {
  let previousRow = output[i - 1]
  let row = previousRow.map((_, i) => isTrap(previousRow, i))
  output.push(row)
}
let safeSpaces = output.reduce((tot, row) => row.filter(n => !n).length + tot, 0)
console.log(safeSpaces)

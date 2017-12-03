const input = 277678

const fromCorner = (n, input) => {
  const length = n - 1, square = n ** 2
  const lastCorner = [0, 1, 2, 3].find(c => square - (c + 1) * length <= input)
  return Math.abs((square - (2 * lastCorner + 1) * length / 2) - input)
}
const part1 = input => {
  let n = 3
  while (n ** 2 < input) {
    n += 2
  }
  console.log((n - 1)/ 2 + fromCorner(n, input)) 
}

part1(12)
part1(23)
part1(1024)
part1(input)

const neighborSum = (x, y, points) => (
  [x - 1, x, x + 1].filter(n => points[n]).reduce((total, x) => (
    total + [y - 1, y, y + 1].reduce((tot2, y) => (
      tot2 + (points[x][y] || 0)
    ), 0)
  ), 0)
)

const setPoint = (points, x, y, input) => {
  points[x] = points[x] || {}
  points[x][y] = neighborSum(x, y, points)
  if (points[x][y] > input && points.continue) {
    console.log(points[x][y])
    points.continue = false
  }
}

const part2 = input => {
  let x = 0, y = 0, side = 1
  let points = { 0: { 0: 1 }, continue: true}
  while (points.continue) {
    side += 2
    const sideMax = side / 2 - 1, sideMin = -side / 2 + 1
    while (x < sideMax) {
      x++
      setPoint(points, x, y, input)
    }
    while (y < sideMax) {
      y++
      setPoint(points, x, y, input)
    }
    while ( x > sideMin) {
      x--
      setPoint(points, x, y, input)
    }
    while (y > sideMin){
      y--
      setPoint(points, x, y, input)
    }
  }
}
part2(input)

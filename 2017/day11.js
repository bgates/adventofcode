const wrap = require('./wrap')

const mutate = (obj, directions) => {
  directions.slice(0, 3).forEach((dir, i)=> {
    while (obj[dir]  && obj[directions[i + 3]]) {
      obj[dir]--
      obj[directions[i + 3]]--
    }
  });
  ['n', 's'].forEach(dir => {
    while (obj[dir + 'e'] && obj[dir + 'w']) {
      obj[dir + 'e']--
      obj[dir + 'w']--
      obj[dir]++
    }
  });
  directions.forEach((dir, i) => {
    while (obj[dir] && obj[directions[i + 2]]) {
      obj[dir]--
      obj[directions[i + 2]]--
      obj[directions[i + 1]]++
    }
  })
}

const setup = (data, cb) => {
  const steps = data.trim().split(',')
  const directions = 'n,ne,se,s,sw,nw'.split(',')
  const obj = directions.reduce(cb(steps), {})
  return { steps, directions, obj }
}

const propSum = obj => Object.values(obj).reduce((tot, n) => tot + n, 0)
const part1 = data => {
  const cb = steps => (o, dir) => Object.assign({}, o, { [dir]: steps.filter(s => s === dir).length })
  let { steps, directions, obj } = setup(data, cb)
  mutate(obj, directions)
  console.log(propSum(obj))
}

part1('ne,ne,ne')
part1('ne,ne,sw,sw')
part1('ne,ne,s,s')
part1('se,sw,se,sw,sw')

wrap(11, part1)

part2 = data => {
  const cb = () => (obj, d) => Object.assign({}, obj, { [d]: 0 })
  let { steps, directions, obj } = setup(data, cb)
  let max = 0
  let final = steps.reduce((acc, s, i) => {
    acc[s]++
    mutate(acc, directions)
    max = Math.max(max, propSum(acc))
    return acc
  }, obj)
  console.log(max)
}

wrap(11, part2)

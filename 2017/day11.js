const wrap = require('./wrap')

const part1 = data => {
  let steps = data.trim().split(',')

  const directions = 'n,ne,se,s,sw,nw'.split(',')
  let obj = directions.reduce((o, dir) => Object.assign({}, o, { [dir]: steps.filter(s => s === dir).length }), {})
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
  let ans = Object.assign({}, obj, { total: Object.values(obj).reduce((tot, n) => tot + n, 0) })
  console.log(ans.total)
  return ans
}

  
console.log(part1('ne,ne,ne'))
console.log(part1('ne,ne,sw,sw'))
console.log(part1('ne,ne,s,s'))
console.log(part1('se,sw,se,sw,sw'))


console.log(wrap(11, part1))

part2 = data => {
  let steps = data.trim().split(',')
  const directions = 'n,ne,se,s,sw,nw'.split(',')
  const start = directions.reduce((obj, d) => Object.assign({}, obj, { [d]:0 }), {})
  let max = 0
  let final = steps.reduce((obj, s, i) => {
    obj[s]++
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
    max = Math.max(max, Object.values(obj).reduce((tot, n) => tot + n, 0))
    return obj
  }, start)
  console.log(max)
  console.log(final)
}
wrap(11, part2)


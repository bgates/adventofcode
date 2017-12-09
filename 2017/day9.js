const wrap = require('./wrap')

const part1 = data => {
  data = data.replace(/!./g,'').replace(/<.*?>/g, '')
  let outer = 0
  const score = data.split('').reduce((total, char) => {
    if (char === '{') {
      outer++
    } else if (char === '}') {
      total += outer 
      outer--
    }
    return total
  }, 0)
  console.log(score)
}

part1('<>')
part1('<random characters>')
part1('<<<<<>')
part1('<{!>}>')
part1('<!!>')
part1('<!!!>>')
part1('<{o"i!a,<{i<a>')

part1('{}')
part1('{{{}}}')
part1('{{},{}}')
part1('{{{},{},{{}}}}')
part1('{<a>,<a>,<a>,<a>}')
part1('{{<ab>},{<ab>},{<ab>},{<ab>}}')
part1('{{<!!>},{<!!>},{<!!>},{<!!>}}')
part1('{{<a!>},{<a!>},{<a!>},{<ab>}}')
wrap(9, part1)

const part2 = data => {
  data = data.replace(/!./g,'')
  const withoutCancel = data.length
  const final = data.replace(/<.*?>/g,'<>').length
  console.log(withoutCancel - final)
}
part2('<>')
part2('<random characters>')
part2('<<<<>')
part2('<{!>}>')
part2('<!!>')
part2('<!!!>>')
part2('<{o"i!a,<{i<a>')
wrap(9, part2)

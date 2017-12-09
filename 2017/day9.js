const wrap = require('./wrap')

const part1 = data => {
  data = data.replace(/!./g,'')
  data = data.replace(/<.*?>/g, '')
  const chars = data.split('')
  let outer = 0
  let score = 0
  chars.forEach(char => {
    if (char === '{') {
      outer++
    } else if (char === '}') {
      score += outer 
      outer--
    }
  })
  console.log(score)
}

/*wrap(9, part1)
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
//wrap(9, part1)*/

const part2 = data => {
  const str = data
  const orig = data.length
  data = data.replace(/!./g,'')
  const withoutCancel = orig - data.length
  const withoutBracket = data.replace(/<.*?>/g,'<>').length
  data = data.replace(/<.*?>/g, '')
  const final = data.length
  console.log(str, orig - withoutBracket - withoutCancel)
}
part2('<>')
part2('<random characters>')
part2('<<<<>')
part2('<{!>}>')
part2('<!!>')
part2('<!!!>>')
part2('<{o"i!a,<{i<a>')
wrap(9, part2)

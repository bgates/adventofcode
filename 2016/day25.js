let register = { a: 0, b: 0, c: 0, d: 0 }

function copy(x, y) {
  if (parseInt(x) == x) {
    register[y] = parseInt(x)
  } else {
    register[y] = register[x]
  }
  index++
}

function inc (x, z = 1) {
  if (parseInt(z) == z) {
    register[x] += parseInt(z)
  } else {
    register[x] += register[z]
  }
  index++
}

function dec (x) {
  register[x]--
  index++
}

function jnz (x, y) {
  if ((register[x] && register[x] > 0) ||
      (parseInt(x) == x && parseInt(x)> 0)) {
    index += parseInt(y)
  } else {
    index++
  }
}
function out (x) {
  output.push(register[x])
  //console.log(output.join(''))
}
let output = []
let index = 0

let input = require('./input/day25')
/*
input.forEach((_, i) => {
  console.log(i, input[i])
  if (i > 1) {
    let first = input[i - 2].match(/(\w*) (.*)/)
    let second = input[i - 1].match(/(\w*) (.*)/)
    let third = input[i].match(/(\w*) (.*)/)
    console.log(first, second, third)
    if (first && first[1] === 'inc'
        && second && second[1] === 'dec'
        && third && third[1] === 'jnz'
        && third[2].includes(second[2]) && third[2].includes('-2')) {
      input[i - 1] = `${input[i - 2]} ${second[2]}`
      input[i] = `cpy 0 ${second[2]}`
      input[i - 2] = 'pass .'
      console.log('new at ', i, input[i])
    }
  }
})
console.log(input)
*/
for (let i = 1; i < 1000; i++) {
  execute(50000, i)
  console.log('testing', i,'...', output.length)
  output = []
}

function execute (n, i) {
  register['a'] = i
  register['b'] = 0
  register['c'] = 0
  index = 0
  let count = 0
  while (index < input.length && count < n) {
    count++
    let instruction = input[index].match(/(\w*) (.*)/)
    if (instruction[1] === 'cpy') {
      copy(...instruction[2].split(' '))
    } else if (instruction[1] === 'inc') {
      inc(...instruction[2].split(' '))
    } else if (instruction[1] === 'dec') {
      dec(instruction[2])
    } else if (instruction[1] === 'jnz'){
      jnz(...instruction[2].split(' '))
    } else if (instruction[1] === 'out') {
      out(instruction[2])
      if (output.length > 1 && output[0] !== output[1]) {
        console.log("SUCCESS SUCCESS SUCCESS", i)
        throw (e)
      } else {
        console.log("FAIL", i)
        break
      }
    } else {
      index++
    }
  }

}
// if jnz = n < 0, n commands are repeated
//
// inc d
// dec c
// jnz c -2
// the effect of the repeated commands is to dec c, so the
// commands will be repeated c times, which means d ends up
// +c and c ends up 0
//
// cpy a c
// inc a
// dec b
// jnz b -2
// cpy c b
// dec d
// jnz d -6
// the inner loop repeats b times, so a ends up +b and b ends up 0
// the outer loop repeats d times, and each time c ends up at a
// and then inner loop (a gets +b) and then c gets copied to b

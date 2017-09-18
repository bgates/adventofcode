let register = { a: 12, b: 0, c: 0, d: 0 }

function copy(x, y) {
  if (parseInt(x) == x) {
    register[y] = parseInt(x)
  } else {
    register[y] = register[x]
  }
  index++
}

function inc (x, y = 1, z = 1) {
  if (register[y]) {
    y = register[y]
  }
  if (register[z]) {
    z = register[z]
  }
  register[x] += y * z
  index += (y > 1 ? 5 : 1)
}

function dec (x) {
  register[x]--
  index++
}
function jnz (x, y) {
  if (register[x] || (parseInt(x) == x && parseInt(x) !== 0)) {
    if (register[y]) {
      y = register[y]
    } else {
      y = parseInt(y)
    }
    index += y
  } else {
    index++
  }
}
function toggle (a) {
  let i = index + register[a]
  if (i >= input.length || i < 0 || i === index) {
    console.log('skip', index)
    index++
    return
  }
  let instruction = input[i].split(' ')
  if (instruction[0] === 'inc') {
    input[i] = `dec ${instruction[1]}`
  } else if (instruction[0] === 'dec'  || typeof instruction[2] === 'undefined') {
    input[i] = `inc ${instruction[1]}`
  } else if (instruction[0] === 'jnz') {
    input[i] = `cpy ${instruction[1]} ${instruction[2]}`
  } else {
    input[i] = `jnz ${instruction[1]} ${instruction[2]}`
  }
  console.log(register, input.slice(index))
  index++
}
let index = 0
let count = 0
let input = require('./input/day23')
/*input.forEach((_, i) => {
  //console.log(i, input[i])
  if (i > 1) {
    let first = input[i - 2].match(/(\w*) (.*)/)
    let second = input[i - 1].match(/(\w*) (.*)/)
    let third = input[i].match(/(\w*) (.*)/)
    //console.log(first, second, third)
    if (first && first[1] === 'inc'
        && second && second[1] === 'dec'
        && third && third[1] === 'jnz'
        && third[2].includes(second[2]) && third[2].includes('-2')) {
      input[i - 1] = `${input[i - 2]} ${second[2]}`
      input[i] = `cpy 0 ${second[2]}`
      input[i - 2] = 'pass .'
      //console.log('new at ', i, input[i])
    }
  }
})
*/
//console.log(input)

while (index < input.length) {
  let instruction
  try{
    instruction = input[index].match(/(\w*) (.*)/)
  } catch(e) {
    console.log('catch', register, index)
  }
  if (instruction[1] === 'tgl') {
    toggle(instruction[2])
  } else if (instruction[1] === 'cpy') {
    copy(...instruction[2].split(' '))
  } else if (instruction[1] === 'inc') {
    inc(...instruction[2].split(' '))
  } else if (instruction[1] === 'dec') {
    dec(instruction[2])
  } else if (instruction[1] === 'jnz'){
    jnz(...instruction[2].split(' '))
  } else {
    console.log(instruction, 'no match')
    index++
  }
  count++
    //console.log(count, index, instruction[0], register)
}
console.log(count, index, register['a'])
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

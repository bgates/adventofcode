
const startA = 783
const startB = 325
const factorA = 16807
const factorB = 48271

const div = 2147483647

const mult = (a, b) => {
  let result = 0
  do {
    if (a & 1) {
      result += b
    }
    a /= 2
    b += b
  } while (a >= 1)
  return result
}

const modulo = n => {
  return n % div
  let p = div
  while(p < n) p <<= 1
  while(p >= div) {
    if(n >= p) {
      n -=p
    }
    p >>= 1
  }
  return n
}

const leastSignificantBits = n => n & 0x0000ffff

let a = startA
let b = startB
let sum = 0
  /*
for (let i = 0, max = 40 * 10 ** 6;i < max; i++) {
  a = modulo(mult(a , factorA))
  b = modulo(mult(b, factorB))
  if (leastSignificantBits(a) === leastSignificantBits(b)) {
    sum++
  }
}
console.log(sum)
*/
let as = []
let bs = []
a = startA
b = startB
const max = 5 * 10 ** 6
while(as.length < max || bs.length < max) {
  a = modulo(mult(a, factorA))
  b = modulo(mult(b, factorB))
  if ((a & 3) === 0) {
    as.push(a)
  }
  if ((b & 7) === 0) {
    bs.push(b)
  }
}
sum = 0
for (let i = 0; i < max; i++) {
  if (leastSignificantBits(as[i]) === leastSignificantBits(bs[i])) {
    sum++
  }
}
console.log(sum)

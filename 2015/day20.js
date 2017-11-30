const input = 33100000

//https://gist.github.com/jonathanmarvens/7206278
const primeFactorization = (number, result = []) => {
  const root = Math.sqrt(number)
  let x = 2
  if (number % x) {
    x = 3
    while ((number % x) && ((x = (x + 2)) < root)) {}
  }
  x = (x <= root) ? x : number
  result.push(x)
  return (x === number) ? result : primeFactorization((number / x), result)
}
//https://math.stackexchange.com/questions/22721/is-there-a-formula-to-calculate-the-sum-of-all-proper-divisors-of-a-number

const factorSum = factors => {
  let nextPower = 2
  let newFactors = []
  for (let i = 0; i < factors.length; i++) {
    if (i === 0) {
      newFactors.push(1 + factors[i])
    } else if (factors[i] === factors[i - 1]) {
      newFactors[newFactors.length-1] = newFactors[newFactors.length-1] + factors[i - 1]**nextPower
      nextPower++
    }
    else { 
      newFactors.push(factors[i] + 1)
      nextPower = 2
    }
  }
  return newFactors.reduce((product, n) => product * n, 1)
}

const giftCounter = () => {
  for (let i = 1; i < input; i++) {
    let gifts = factorSum(primeFactorization(i)) * 11
    for (let j = 1; j <= i / 50; j++) {
      if (i % j === 0) gifts -= j * 11
    }
    console.log({ i, gifts })
    if (gifts >= input) return i
  }
}
//console.log(giftCounter())
// if an elf stops after 50 houses, that means a factor n is gone if i > 50 * n
console.log(primeFactorization(786240))
console.log(factorSum(primeFactorization(786240)) * 11)
let sum = 0
for (let i = 1; i < 78624 / 5; i++) {
  if (786240 % i === 0) {
    sum += 11 * i
    console.log({i, sum})
  }
}
console.log(sum)

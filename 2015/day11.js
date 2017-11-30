const hasStraight = arr => (
  arr.some((n, i, chars) => (
    i > 1 && n - 1 === chars[i - 1] && n - 2 === chars[i - 2]
  ))
)

const illegalCodes = ['i', 'o', 'l'].map(letter => letter.charCodeAt(0))
const noIllegals = arr => (
  illegalCodes.every(letter => !arr.includes(letter))
)

const twoPair = arr => (
  arr.some((n, i, chars) => (
    i > 0 && n === chars[i - 1] && arr.some((m, j) => (
      j > 2 && m !== n && m === chars[j - 1]
    ))
  ))
)

const toCharCode = str => (
  str.split('').map(char => char.charCodeAt(0)).filter(char => char > 96)
)
const fromCharCode = arr => (
  arr.map(String.fromCharCode).join('')
)

const firstTest = toCharCode('hijklmmn')
console.log(hasStraight(firstTest))
console.log(!noIllegals(firstTest))

const secondTest = toCharCode('abbceffg')
console.log(twoPair(secondTest))
console.log(!hasStraight(secondTest))

const legal = codes => noIllegals(codes) && hasStraight(codes) && twoPair(codes)

const increment = charCodeArr => {
  const lastPosition = charCodeArr.length - 1
  const allButLast = charCodeArr.slice(0, lastPosition)
  const last = charCodeArr[lastPosition]
  if (last === 122) { //'z'.charCodeAt(0)
    return increment(allButLast).concat(97) //'a'.charCodeAt(0)
  } else {
    return allButLast.concat(last + 1)
  }
}

//const pwd = 'abcdefgh'
const pwd = 'hepxxyzz'
const nextPassword = password => {
  let code = toCharCode(password)
  while (!legal(code)) {
    code = increment(code)
  }
  return fromCharCode(code)
}
const nextPwd = nextPassword(pwd)
console.log(nextPwd)
console.log(nextPassword(fromCharCode(increment(toCharCode(nextPassword(pwd))))))

// for some reason, I couldn't automate the incrementing between passwords
// without filtering out spurious char codes - how did those get there?
// 

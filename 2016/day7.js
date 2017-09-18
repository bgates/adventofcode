let input = require('./input/day7')

let innerRegex = /\[(.*?)\]/g
let outerRegex = /\[.*?\]/

function supportTLS (str) {
  let hypernet = hypernetSeq(str)
  let seq = supernetSeq(str)
  return !hypernet.some(isABBA) && seq.some(isABBA)
}
function supportSSL (str) {
  console.log('str', str)
  let hypernet = hypernetSeq(str)
  console.log('hyper', hypernet)
  let seq = supernetSeq(str)
  console.log('super', seq)
  let abaArrays = seq.map(findABA)
  return hypernet.some(h => hasBAB(h, abaArrays))
}
function findABA (str) {
  return str.split('').map((letter, i, arr) => {
    if (letter === arr[i + 2]) {
      return letter + arr[i + 1] + letter
    }
  }).filter(letter => letter)
}
function hasBAB (str, choiceArrays) {
  return choiceArrays.some(array => array.some(choice => str.includes(choice[1] + choice[0] + choice[1])))
}
function supernetSeq (str) {
  return str.split(outerRegex)
}
function hypernetSeq (str) {
  let hypernet = []
  let match = innerRegex.exec(str)
  while (match != null) {
    hypernet.push(match[1])
    match = innerRegex.exec(str)
  }
  return hypernet
}
function isABBA (str) {
  for (var i = 0; i < str.length - 3; i++) {
    if (hasABBA(str.substr(i, 4)))
      return true
  }
  return false
}
function hasABBA (str) {
  return str.substr(0, 2) !== str.substr(2, 2) && isPalindrome(str)
}
function isPalindrome (str) {
  return str.substr(0, 2) === str.substr(2, 2).split('').reverse().join('')
}
//console.log(input.filter(supportTLS).length)
console.log(input.filter(supportSSL).length)

const fs = require('fs')
const strings = fs.readFileSync('./input/day8.txt', 'utf-8').split("\n").filter(n => n)

const length = strings.reduce((total, str) => total + str.length, 0)
const rewrite = str => (
  String(str.split('').slice(1, -1).join('').replace(/\\\"|\\\\|\\x\w\w/g, '.')).length
)

const length2 = strings.reduce((total, str) => total + rewrite(str), 0)

const encode = str => (
  String('"' + str.replace(/\\/g, '\\\\').replace(/"/g, '\\"') + '"')
)
console.log(strings.map(encode))
console.log(strings.map(encode).map(s => s.length))
const length3 = strings.map(encode).reduce((total, str) => total + str.length, 0)
//const length3 = strings.reduce((total, str) => total + str.replace(/"/g, "\\\").length, 0)
console.log(length, length2, length3, length - length2, length3 - length)

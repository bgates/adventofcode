const assert = require('assert')
const input = require('./input/day5')

const vowels = 'aeiou'.split('')
const threeVowels = string => string.split('').filter(char => vowels.includes(char)).length > 2

const doubleLetter = string => string.match(/([a-z])\1/)

const illegalPairs = ['ab', 'cd', 'pq', 'xy']
const rando = string => !illegalPairs.some(pair => string.includes(pair))

const nice = string => threeVowels(string) && doubleLetter(string) && rando(string)

assert(nice('ugknbfddgicrmopn'))
assert(nice('aaa'))
assert(!nice('jchzalrnumimnmhp'))
assert(!nice('haegwjzuvuyypxyu'))
assert(!nice('dvszwmarrgswjxmb'))

console.log(input.split("\n").reduce((total, str) => nice(str) ? ++total : total, 0))

const twoPair = string => string.match(/([a-z]{2}).*\1/)

const spacedRepeat = string => string.match(/([a-z]).\1/)

const newNice = string => twoPair(string) && spacedRepeat(string)

console.log(input.split("\n").reduce((total, str) => newNice(str) ? ++total : total, 0))

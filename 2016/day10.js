let input = require('./input/day10').split("\n").filter(line => line.length)
let testInput = `
value 5 goes to bot 2
bot 2 gives low to bot 1 and high to bot 0
value 3 goes to bot 1
bot 1 gives low to output 1 and high to bot 0
bot 0 gives low to output 2 and high to output 0
value 2 goes to bot 2
`.split("\n").filter(line => line.length)

let bots = []
let output = []
let history = []
initialize(input)
proceed(input)
console.log(history.map((h, i) => h.includes(61) && h.includes(17) ? `${i}: ${h}` : ``).filter(n => n.length).join("\n"))
console.log(output.slice(0, 3).map(arr => arr[0]).reduce((tot, n) => tot * n))

function initialize (input) {
  input.filter(line => line.match(/value/)).forEach(setValue)
}
function setValue (line) {
  let match = line.match(/value (\d+) goes to bot (\d+)/)
  let value = parseInt(match[1]), botIndex = parseInt(match[2])
  bots[botIndex] = bots[botIndex] || []
  history[botIndex] = history[botIndex] || []
  bots[botIndex].push(value)
  history[botIndex].push(value)
}
function proceed (input) {
  while (bots.some(bot => bot && bot.length)) {
    input.filter(line => line.match(/gives/)).forEach(give)
    console.log('*****************************')
  }
}
function give (line) {
  let botIndex = parseInt(line.match(/bot (\d+) gives/)[1])
  if (!bots[botIndex] || bots[botIndex].length != 2)
    return
  console.log('giving', bots[botIndex])
  var lowRecipient = line.match(/low to (\w+) (\d+)/)

  var highRecipient = line.match(/high to (\w+) (\d+)/)
  let low = Math.min(...bots[botIndex])
  let high = Math.max(...bots[botIndex])

  let lowIndex = parseInt(lowRecipient[2])
  lowRecipient = lowRecipient[1] === 'output' ? output : bots
  let highIndex = parseInt(highRecipient[2])
  highRecipient = highRecipient[1] === 'output' ? output : bots

  lowRecipient[lowIndex] = lowRecipient[lowIndex] || []
  lowRecipient[lowIndex].push(low)
  if (lowRecipient === bots) {
    history[lowIndex] = history[lowIndex] || []
    history[lowIndex].push(low)
  }

  highRecipient[highIndex] = highRecipient[highIndex] || []
  highRecipient[highIndex].push(high)
  if (highRecipient === bots) {
    history[highIndex] = history[highIndex] || []
    history[highIndex].push(high)
  }
  bots[botIndex] = []
}

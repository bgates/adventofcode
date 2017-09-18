let md5 = require('./md5')

let input = 'ugkcyxxg'

let pwd = ''
let arr = new Array(8)
let i = 0
let cinema = '________'.split('')

function randomString () {
  return String.fromCharCode(33 + Math.floor(Math.random() * 100))
}
while (true) {
  let hash = md5(input + i)
  if (hash.match(/^0{5}/)) {
    let char = hash.charAt(5)
    //pwd += char
    if (char.match(/[0-7]/)) {
      let index = parseInt(char)
      arr[index] = arr[index] || hash.charAt(6)
      for (let j = 0; j < arr.length; j++) {
        cinema[j] = arr[j] || '_'
      }
      if (!cinema.includes('_')) {
        break
      }
    }
  }
  if (i % 100 === 0)
    console.log(cinema.join('').replace(/_/g, randomString))
  /*if (pwd.length === 8) {
    break
  }*/
  i++
}
console.log(cinema.join(''))

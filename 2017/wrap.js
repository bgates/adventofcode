const fs = require('fs')

const wrap = (filename, callback) => {
  try {  
    const data = fs.readFileSync(`./input/${filename}.txt`, 'utf8')
    callback(data)
  } catch(e) {
      console.log('Error:', e.stack)
  }
}
module.exports = wrap

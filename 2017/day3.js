const input = 277678

const part1 = input => {
  let n = 3
  let fromCorner
  while (n ** 2 < input) {
    n += 2
  }
  const length = n - 1
  const sq = n ** 2
  if (sq - length <= input) {
    fromCorner = Math.abs((sq - length / 2 ) - input)
  } else if (sq - 2 * length <= input) {
    fromCorner = Math.abs((sq - 1.5 * length) - input)
  } else if (sq - 3 * length <= input) {
    fromCorner = Math.abs((sq - 2.5 * length) - input)
  } else {
    fromCorner = Math.abs((sq - 3.5 * length) - input)
  }
  console.log(length / 2 + fromCorner) 
}
// lengths 1;3;5;7
// perim 0;2*n+2*(n-2)
// biggest 9;25;25+24=49
//code1(input)
part1(12)
part1(23)
part1(1024)
part1(input)

  // corners side 3 are 2,4,6,8
  // side 5 are 12,16,20,24
const corner = (i, side, endPrev) => (
  [1, 2, 3, 4].find(cornerNumber => endPrev + cornerNumber * (side  - 1) === i)
)

const code2 = (input) => {
  let side = 1
  let array = [1]
  while (array[array.length - 1] < input) {
    side += 2
    const startPrev = side > 4 ? (side - 4) ** 2 : 0
    const endPrev = (side - 2) ** 2 - 1
    const startCurrent = (side - 2) ** 2
    const endCurrent = side ** 2 - 1
    let lastCorner
    for (let i = startCurrent; i <= endCurrent; i++ ) {
      if (corner(i, side, endPrev)) {
        lastCorner = i
      }
      if (i === endCurrent) {
        array[i] = array[endPrev] 
          + array[startCurrent]
          + array[i - 1]
      } else if (i === startCurrent) {
        array[i] = (side - 4 >= 0 ? array[startPrev] : 0) 
          + array[i - 1]
      } else if (i === lastCorner) {
        const cornerNumber = corner(i, side, endPrev)
        const matchingCorner = endPrev - (4 - cornerNumber) * (side - 3)
        array[i] = array[matchingCorner] 
          + array[i - 1]
      } else if (i - 1 === lastCorner) {
        const cornerNumber = corner(i - 1, side, endPrev)
        const matchingCorner = endPrev - (4 - cornerNumber) * (side - 3)
        array[i] = array[matchingCorner] 
          + (i < 6 ? 0 : array[matchingCorner + 1])
          + array[i - 1] 
          + array[i - 2] 
      } else if (corner(i + 1, side, endPrev)) {
        const cornerNumber = corner(i + 1, side, endPrev)
        const matchingCorner = endPrev - (4 - cornerNumber) * (side - 3)
        array[i] = array[matchingCorner] 
          + array[matchingCorner - 1] 
          + array[i - 1]
          + (cornerNumber === 4 ? array[matchingCorner + 1] : 0)
      } else if (i - 1 === startCurrent) {
        array[i] = array[startPrev] +
          array[startPrev + 1] +
          array[i - 1] +
          array[i - 2]
      } else {
        let matchingCorner
        const cornerNumber = corner(lastCorner, side, endPrev)
        if (cornerNumber) {
          matchingCorner = endPrev - (4 - cornerNumber) * (side - 3)
        } else {
          matchingCorner = startPrev
        }
        const distanceFromCorner = i - (lastCorner || startCurrent)
        array[i] = array[matchingCorner + distanceFromCorner] +
          array[matchingCorner + distanceFromCorner - 1] + 
          array[matchingCorner + distanceFromCorner - 2] +
          array[i - 1]
      }
      if (array[i] > input) {
        console.log(array[i])
      }
    }
  }
}
code2(277678)

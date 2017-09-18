let rawInput = `Disc #1 has 13 positions; at time=0, it is at position 1.
Disc #2 has 19 positions; at time=0, it is at position 10.
Disc #3 has 3 positions; at time=0, it is at position 2.
Disc #4 has 7 positions; at time=0, it is at position 1.
Disc #5 has 5 positions; at time=0, it is at position 3.
Disc #6 has 17 positions; at time=0, it is at position 5.`.split("\n")

let input = rawInput.map(line => line.match(/.+\d.+\s(\d+).+\s(\d+)/))
                    .map(match => [match[1], match[2]])
                    //let input = [[5, 4], [2, 1]]
input.push([11, 0])
console.log(input)
let starts = input.map(arr => parseInt(arr[1]))
let positions = input.map(arr => parseInt(arr[0]))

let time = 0

while (true) {
  time++
  if (starts.every((start, i) => {
    return (time + start + i + 1) % positions[i] === 0
  })) {
    console.log('DONE', time)
    break
  }
}


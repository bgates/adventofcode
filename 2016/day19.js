let input = 3018458
//let input = 5
//let input = 20

let elves = new Array(input)
for (var i = 0; i < input; i++) {
  elves[i] = {id: i, present: true}
}
/*
while (elves.length > 1) {
  let removeFirst = elves.length % 2 > 0
  elves = elves.filter((elf, i) => i % 2 == 0)
  if (removeFirst) {
    elves.shift()
  }
}
console.log(elves[0].id + 1)
*/

while (elves.length > 1) {
  console.log(elves.length)
  let whole = elves.length
  let half = whole / 2
  if (whole % 2 > 0) {
    elves.splice(parseInt(half), 1)
    elves.push(elves.shift())
    continue
  }
  let count = 0
  for (let i = 0; i < half; i+= 3) {
    let next = half + i
    elves[next].present = false
    if (elves[next + 1]) {
      elves[next + 1].present = false
      count++
    }
    count++
  }
  let head = elves.splice(0, count)
  elves = elves.filter(elf => elf.present).concat(head)

}
console.log(elves)
  /*
   * 1 2 3 4 5  index 0 + 2
   * 1 2 4 5    index 1 + 2
   * 1 2 4      index 2 + 1 => 0
   * 2 4        index 0 + 1
   * 2
   *
   * 1 2_3_ 45
   * 2 4 _5_ 1
   * 4 _1_ 2
   *
   * 1 2345 _6_ 789x
   * 2 345_7_ 89x1
   * 3 458 _9_ x12
   * 4 58_x_ 123
   * 5 81 _2_ 34
   * 8 1_3_ 45
   * 1 4 _5_ 8
   * 4 _8_ 1
   * 1 _4_
   *
   * 1 23456789.10 _11_ 12.13.14.15.16.17.18.19.20
   * 2 3456789.10_12_ 13.14.15.16.17.18.19.20.1
   * 3 456789.10.13 _14_ 15.16.17.18.19.20.1.2
   * 4 56789.10.13_15_ 16.17.18.19.20.1.2.3
   * 5 6789.10.13.16 _17_ 18.19.20.1.2.3.4
   * 6 789.10.13.16_18_ 19.20.1.2.3.4.5
   * 7 89.10.13.16.19 _20_ 1.2.3.4.5.6
   * 8 9.10.13.16.19_1_ 2.3.4.5.6.7
   * 9 10.13.16.19.2 _3_ 4.5.6.7.8
   * 10 13.16.19.2_4_ 5.6.7.8.9
   * 13 16.19.2.5 _6_ 7.8.9.10 9 10 16 19
   * 16 19.2.5_7_ 8.9.10.13
   * 19 2.5.8 _9_ 10.13.16
   * 2 5.8_10_ 13.16.19
   * 5 8.13 _16_ 19.2
   * 8 13_19_ 2.5
   * 13 2 _5_ 8
   * 2 _8_ 13
   * if start has even: eliminate index=length/2, index+1, skip index+2
   * if start has odd: eliminate index=length/2 floor, go to even
   */

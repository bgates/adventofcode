const input = `Sprinkles: capacity 2, durability 0, flavor -2, texture 0, calories 3
Butterscotch: capacity 0, durability 5, flavor -3, texture 0, calories 3
Chocolate: capacity 0, durability 0, flavor 5, texture -1, calories 8
Candy: capacity 0, durability -1, flavor 0, texture 5, calories 8`

// capacity 2 * s > 0
// s > 0
// durability 5 * b - ca > 0
// 5 * b > ca
// b > ca / 5
// flavor -2 * s -3 * b + 5 * c > 0
// 5 * c > 2 * s + 3 * b
// texture 5 * ca - c > 0
// 5 * ca > c
// ca > c / 5
//
// s > 0
// 25 * b > c
const total = 100
let max = 0
for (let s = 1; s < 98; s++) {
  for (let b = 1; b < 98; b++) {
    for (let c = 1; c < 98; c++) {
      let ca = 100 - s - b - c
      if (ca < 5 * b && c < 5 * ca && 8 * (c + ca) + 3 * (b + s) === 500) {
        const value = (2 * s) * (5 * b - ca) * (5 * c - 3 * b - 2 * s) * (5 * ca - c)
        if (value > max) {
          max = value
          console.log({s, b, c, ca, max})
        }
      }
    }
  }
}

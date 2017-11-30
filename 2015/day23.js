`jio a, +8
inc b
jie a, +4
tpl a
inc a
jmp +2
hlf a
jmp -7`

//let a = 20895 
let a = 1
a = 9*(3*(3*(3*(3*(81*a + 2)+1)+2)+2)+1)
console.log(a)
let b = 0
while (a !== 1) {
  b++
  if (a % 2 === 0) {
    a /= 2
  } else {
    a = a * 3 + 1
  }
}
console.log(b)

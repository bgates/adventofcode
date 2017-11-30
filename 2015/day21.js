const matcher = str => {
  const [_, cost, damage, armor] = str.match(/ (\d+)\s+(\d+)\s+(\d+)/)
  return { cost, damage, armor }
}
const weaponString = `Dagger        8     4       0
Shortsword   10     5       0
Warhammer    25     6       0
Longsword    40     7       0
Greataxe     74     8       0`


const armorString = `Leather      13     0       1
Chainmail    31     0       2
Splintmail   53     0       3
Bandedmail   75     0       4
Platemail   102     0       5
none          0     0       0`

const ringString = `Damage+1    25     1       0
Damage+2    50     2       0
Damage+3   100     3       0
Defense+1   20     0       1
Defense+2   40     0       2
Defense+3   80     0       3
none         0     0       0
none         0     0       0`

const addProp = prop => objects => objects.reduce(
  (total, object) => total + Number(object[prop]), 0)

const combine = (...objects) => (
  { 
    cost: addProp('cost')(objects),
    damage: addProp('damage')(objects),
    armor: addProp('armor')(objects)
  }
)

const weapons = weaponString.split("\n").map(matcher)
const armor   = armorString.split("\n").map(matcher)
const rings   = ringString.split("\n").map(matcher)

const options = weapons.reduce((all, weapon) => (
  [ ...all, ...armor.reduce((fAll, arm) => (
    [...fAll, ...rings.reduce((allRings, ring) => (
      [ ...allRings, ...rings.filter(r => r !== ring).reduce((allRings2, ring2) => (
        [ ...allRings2, combine(weapon, arm, ring, ring2) ]
      ), []) ]
    ), []) ]
  ), []) ]
),[])
const sortedOptions = options.sort((a, b) => a.cost - b.cost)

// boss: 103hp,9d,2armor
const boss = { hp: 103, damage: 9, armor: 2 }
const myHP = 100

for (let damage = 1; damage <= boss.damage; damage++) {
  const roundsToBeKilled = Math.ceil(myHP / damage)
  let myRequiredDamage = 1
  while (true) {
    if (Math.ceil(boss.hp / myRequiredDamage) <= roundsToBeKilled) break
    myRequiredDamage++
  }
  console.log({ damage, myRequiredDamage })
  const bestOption = sortedOptions.filter(option => (
    option.damage >= myRequiredDamage + boss.armor &&
    option.armor >= boss.damage - damage
  ))[0]
  console.log(bestOption)
}

const reversedOptions = sortedOptions.reverse()
for (let damage = 1; damage <= boss.damage; damage++) {
  const roundsToBeKilled = Math.ceil(myHP / damage)
  let myRequiredDamage = 1
  while (true) {
    if (Math.ceil(boss.hp / myRequiredDamage) <= roundsToBeKilled) break
    myRequiredDamage++
  }
  console.log({ damage, myRequiredDamage })
  const bestOption = reversedOptions.filter(option => (
    option.damage < myRequiredDamage + boss.armor &&
    option.armor == boss.damage - damage
  ))[0]
  console.log(bestOption)
}

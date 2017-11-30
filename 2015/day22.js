const spells = [
  { cost: 53, damage: 4, name: 'missile' },
  { cost: 73, damage: 2, heal: 2, name: 'drain' },
  { cost: 113, armor: 7, duration: 6, name: 'shield' },
  { cost: 173, damage: 3, duration: 6, name: 'poison' },
  { cost: 229, mana: 101, duration: 5, name: 'recharge' }
]                             

const me = { hp: 50, mana: 500, armor: 0 }
const boss = { hp: 51, damage: 9 }

const castRandom = (allSpells, effects, me) => {
  const ongoing = effects.filter(effect => effect.duration > 1)
  const spells = allSpells
    .filter(spell => !ongoing.find(effect => effect.cost === spell.cost))
    .filter(spell => spell.cost <= me.mana)
  if (spells.length) {
    const spell = spells[Math.floor(spells.length * Math.random())]
    return Object.assign({}, spell)
  } else {
    return null
  }
}

const apply = (spell, me, boss) => {
  boss.hp -= spell.damage || 0
  me.hp += spell.heal || 0
  //me.hp = Math.min(me.hp, 50)
  me.mana += spell.mana || 0
  if (spell.armor) {
    me.armor = spell.armor
  }
  if (spell.duration) {
    spell.duration -= 1
  }
}

const battle = (me, boss) => {
  let cost = 0
  let effects = []
  while (me.hp > 0) {
    me.hp -= 1
    if (!me.hp) return null
    const spell = castRandom(spells, effects, me)
    if (!spell) return null
    me.mana -= spell.cost 
    cost += spell.cost
    effects.forEach(effect => apply(effect, me, boss))
    effects = effects.filter(effect => effect.duration)
    me.armor = 0
    if (spell.duration) {
      effects.push(spell)
    } else {
      apply(spell, me, boss)
    }
    effects.forEach(effect => apply(effect, me, boss))
    effects = effects.filter(effect => effect.duration)
    if (boss.hp <= 0) {
      return cost
    } else {
      me.hp -= boss.damage - me.armor
    }
  }
  return null
}
const testMe = { hp: 10, mana: 250 }
const testBoss = { hp: 14, damage: 8 }
battle(testMe, testBoss)
const results = []
for (let i = 0; i < 5000000; i++) {
  const newMe = Object.assign({}, me)
  const newBoss = Object.assign({}, boss)
  results.push(battle(newMe, newBoss))
}
console.log(Math.min(...results.filter(result => result)))
console.log(results.filter(r => r).length)

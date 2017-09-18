let levels = [
  ["E", "PoG", "TmG", "Tm", "PmG", "RuG", "Ru", "CoG", "Co", "Lm", "LmG", "Di", "DiG"],
  ["Po", "Pm"],
  [],
  []
]
let testLevels = [
  ["E", "H", "Li"],
  ["HG"],
  ["LiG"],
  []
]

let count = 0
let nthGen = [levels]
let nextGen
let history = {}
history[canonicalState(levels)] = true

while (true) {
  count++
  console.log(count)
  nextGen = nthGen
  nextGen = flatten(nextGen.map(possibleStates))
            .filter(valid)
            .filter(canonicalFormNotInHistory)
  if (nextGen.some(complete)) {
    console.log(count)
    break
  }
  nthGen = nextGen
  if (nthGen.length === 0) {
    console.log(count)
    break
  }
}
function canonicalState (state) {
  return state.map(distancesToChips).concat(currentFloorIndex(state))
}
function joinLevel (level) {
  return level.join()
}
function distancesToChips (level, _, state) {
  let levelStrings = state.map(joinLevel)
  let index = state.indexOf(level.join())
  return level.filter(isChip)
              .map(chip => [index, state.indexOf(state.filter(level => level.includes(chip + 'G'))[0])]).sort()
}
function isChip (item) {
  return !item.includes('G') && item !== 'E'
}
function complete (state) {
  return state.every(completeLevel)
}
function completeLevel (level, index, state) {
  return !level.length || index === state.length - 1
}
function canonicalFormNotInHistory (state) {
  let canon = canonicalState(state)
  if (history[canon]) {
    return false
  } else {
    history[canon] = true
    return true
  }
}
function allGeneratorsMatched (level) {
  return level.every(generatorMatched)
}
function generatorMatched(item, _, level) {
  return item.includes('G') || level.includes(item + 'G') || item === 'E'
}
function noGenerators (level) {
  return !level.some(isGenerator)
}
function isGenerator (item) {
  return item.includes('G')
}
// given where elevator is, find all combos of items that are legal to move:
// on elevator floor, chip or 2 chips or chip+matching gen
// move each of those up or down and eliminate dead ones

function flatten (array) {
  return array.reduce((total, arr) => total.concat(arr), [])
}
function currentFloorIndex (state) {
  return state.findIndex(hasE)
}
function hasE (floor) {
  return floor.includes('E')
}
function possibleMoves (state) {
  let index = currentFloorIndex(state)
  let moves = movableItems(state, index)
  if (index === 0) {
    return moves.map(items => { return {items: items, to: 1}})
  } else if (index === state.length - 1) {
    return moves.map(items => { return {items: items, to: index - 1}})
  } else {
    return moves.map(items => { return {items: items, to: index + 1}})
    .concat(moves.map(items => { return {items: items, to: index - 1}}))
  }
}
function movableItems (state, index) {
  let floor = state[index]
  let chips = floor.filter(item => !item.includes('G') && item !== 'E')
  let gens  = floor.filter(item => !chips.includes(item) && item !== 'E')
  return movableWithChip(chips, gens).concat(movableGenerators(gens))
}
function movableWithChip (chips, gens) {
  let moves = []
  for (var i = 0; i < chips.length; i++) {
    moves.push([chips[i]])
    if (gens.includes(chips[i] + 'G')) {
      moves.push([chips[i], chips[i] + 'G'])
    }
    for (var j = i + 1; j < chips.length; j++) {
      moves.push([chips[i], chips[j]])
    }
  }
  return moves
}
function movableGenerators (gens) {
  let moves = []
  for (var i = 0; i < gens.length; i++) {
    moves.push([gens[i]])
    for (var j = i + 1; j < gens.length; j++) {
      moves.push([gens[i], gens[j]])
    }
  }
  return moves
}
function possibleStates (state) {
  return possibleMoves(state).map(move => nextState(state, move.items, move.to))
}
function nextState (previousState, movedItems, nextFloorIndex) {
  let currentIndex = currentFloorIndex(previousState)
  let provisionalState = previousState.map((floor, index) => {
    if (index === currentIndex) {
      let newFloor = floor.filter(item => item !== 'E' && !movedItems.includes(item))
      return validLevel(newFloor) ? newFloor : null
    } else if (index === nextFloorIndex) {
      let newFloor = floor.concat(...movedItems).concat('E')
      return validLevel(newFloor) ? newFloor : null
    } else {
      return floor
    }
  })
  return provisionalState.some(isNull) ? null : provisionalState
}
function valid (state) {
  return state
}
function validLevel (level) {
  return allGeneratorsMatched(level) || noGenerators(level)
}
function isNull (level) {
  return !level
}

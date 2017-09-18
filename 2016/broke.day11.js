let levels = [
  ["E", "PoG", "TmG", "Tm", "PmG", "RuG", "Ru", "CoG", "Co"],
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

function flatten (array) {
  return array.reduce((total, arr) => total.concat(...arr), [])
}

let ElevatorProblem = function (input) {
  this.levels = input
  this.count = 0
}

ElevatorProblem.prototype.run = function () {
  while (this.notFinished()) {
    this.step()
  }
}
ElevatorProblem.prototype.notFinished = function () {
  return flatten(this.levels).length !== this.top().length
}
ElevatorProblem.prototype.top = function () {
  return this.levels[this.levels.length - 1]
}
ElevatorProblem.prototype.currentFloor = function () {
  return this.levels.filter(floor => floor.includes("E"))[0]
}
ElevatorProblem.prototype.lowerFloors = function () {
  let index = this.currentFloorIndex()
  return this.levels.filter((_, i) => i < index)
}
ElevatorProblem.prototype.currentFloorIndex = function () {
  return this.levels.findIndex(level => level.includes("E"))
}

ElevatorProblem.prototype.step = function () {
  this.count++
  let higherFloor = this.higher()
  if (this.noChipsBelow()) {
    if (this.onTop()) {
      let chip = this.findLowerableChip()
      this.move(chip, this.lower())
    } else {
      let chipsWithClearPath = this.findMovableChips()
      if (chipsWithClearPath.length > 1) {
        this.move(chipsWithClearPath.slice(0, 2), higherFloor)
      } else {
        let chipAndGenerator = this.findMovableChipAndGenerator()
        let movable = chipAndGenerator.length ? chipAndGenerator : chipsWithClearPath
        this.move(movable, higherFloor)
      }
    }
  } else {
    let chipAndGenerator = this.findMovableChipAndGenerator()
    if (chipAndGenerator.length) {
      if (higherFloor.filter(item => item.includes('G')).length) {
        this.move(chipAndGenerator, higherFloor)
      } else {
        let chipWithClearPath = this.findMovableChips().slice(0, 1)
        this.move(chipWithClearPath, this.lower())
      }
    } else {
      let chip = this.findLowerableChip()
      this.move(chip, this.lower())
    }
  }
}
ElevatorProblem.prototype.noChipsBelow = function () {
  return !this.lowerFloors().some(floor => floor.some(item => !item.includes('G')))
}
ElevatorProblem.prototype.findMovableChips = function () {
  if (this.onTop()) {
    return []
  } else {
    let higherFloor = this.higher()
    return this.currentFloorChips().filter(item => higherFloor.includes(item + 'G') || !higherFloor.some(_item => _item.includes('G')))
  }
}
ElevatorProblem.prototype.findLowerableChip = function () {
  let lower = this.lower()
  if (!lower.filter(item => item.includes('G')).length) {
    return this.currentFloorChips().slice(0, 1)
  } else {
    return this.currentFloorChips().filter(item => lower.some(_item => _item.includes(item))).slice(0, 1)
  }
}
ElevatorProblem.prototype.currentFloorChips = function () {
  return this.currentFloor().filter(item => item !== 'E' && !item.includes('G'))
}
ElevatorProblem.prototype.findMovableChipAndGenerator = function () {
  if (this.onTop()) {
    return []
  } else {
    let floorContents = this.currentFloor()
    let generators = floorContents.filter(item => item.includes('G'))
    let chips = floorContents.filter(item => !item.includes('G') && generators.some(g => g.includes(item)))
    return chips[0] && generators[0] ? [chips[0], generators[0]] : []
  }
}
ElevatorProblem.prototype.onTop = function () {
  return !this.higher()
}
ElevatorProblem.prototype.higher = function () {
  return this.levels[this.currentFloorIndex() + 1]
}
ElevatorProblem.prototype.lower = function () {
  return this.levels[this.currentFloorIndex() - 1]
}
ElevatorProblem.prototype.move = function (items, level) {
  let currentFloor = this.currentFloor()
  let index = this.currentFloorIndex()
  items.push("E")
  items.forEach(item => {
    level.push(item)
  })
  this.levels[index] = currentFloor.filter(item => !items.includes(item))
}
let sol = new ElevatorProblem(levels)
sol.run()
console.log(sol.count)
module.exports = ElevatorProblem

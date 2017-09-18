let ElevatorProblem = require('./day11')
let assert = require('assert')

describe('elevator', function () {
  describe('when 1 chip can be advanced', function (){
    it('#1 advances 1 chip', function () {
      let testInput = [
        ["E", "H", "Li"], ["HG"], ["LiG"], []
      ]
      let test = new ElevatorProblem(testInput)
      test.step()
      assert(test.levels[0].includes('Li'))
      assert(test.levels[1].includes('H'))
    })
  })
  describe('when 2 chips can be advanced', function(){
    it('#5 advances chips to 2nd level', function () {
      let testInput = [
        ["E", "H", "Li"], [], ["HG", "LiG"], []
      ]
      let test = new ElevatorProblem(testInput)
      test.step()
      assert(test.levels[1].includes("H") && test.levels[1].includes("Li"))
    })
    it('#6 advances chips to 3rd level', function () {
      let testInput = [
        [], ["E", "H", "Li"], ["HG", "LiG"], []
      ]
      let test = new ElevatorProblem(testInput)
      test.step()
      assert.equal(test.levels[2].length, 5)
    })
    it('#7 advances chips to top level', function () {
      let testInput = [
        [], [], ["E", "H", "Li", "HG", "LiG"], []
      ]
      let test = new ElevatorProblem(testInput)
      test.step()
      let topLevel = test.levels[3]
      assert(topLevel.includes("H") && topLevel.includes("Li"))
    })
    it('#11 advances chips to top level', function () {
      let testInput = [
        [], [], ["E", "H", "Li"], ["HG", "LiG"]
      ]
      let test = new ElevatorProblem(testInput)
      test.step()
      assert.equal(test.levels[3].length, 5)
    })
  })
  it('#2 moves chip with generator', function () {
    let testInput = [
      ["Li"], ["E", "H", "HG"], ["LiG"], []
    ]
    let test = new ElevatorProblem(testInput)
    test.step()
    assert(test.levels[2].includes("H") && test.levels[2].includes("HG"))
  })
  it('#9 moves chip with generator', function () {
    let testInput = [
      [], [], ["E", "H", "HG", "LiG"], ["Li"]
    ]
    let test = new ElevatorProblem(testInput)
    test.step()
    let topLevel = test.levels[3]
    assert(topLevel.includes("H") && topLevel.includes("HG"))
  })
  describe('when there is a clear path to a lower level chip', function () {
    it('#3 goes down with a chip', function () {
      let testInput = [
        ["Li"], [], ["E", "H", "HG", "LiG"], []
      ]
      let test = new ElevatorProblem(testInput)
      test.step()
      assert(test.levels[1].includes("H"))
    })
    it('#4 goes down with a chip', function () {
      let testInput = [
        ["Li"], ["E", "H"], ["HG", "LiG"], []
      ]
      let test = new ElevatorProblem(testInput)
      test.step()
      assert(test.levels[0].includes("H"))
    })
    it('#8 goes down with a chip', function () {
      let testInput = [
        [], [], ["HG", "LiG"], ["E", "H", "Li"]
      ]
      let test = new ElevatorProblem(testInput)
      test.step()
      assert(test.levels[2].includes("H"))
    })
    it('#10 goes down with a chip', function () {
      let testInput = [
        [], [], ["Li"], ["E", "H", "HG", "LiG"]
      ]
      let test = new ElevatorProblem(testInput)
      test.step()
      assert(test.levels[2].includes("H"))
    })
  })
  describe('when it runs to completion', function () {
    it('takes 11 steps', function () {
      let testInput = [
        ["E", "H", "Li"], ["HG"], ["LiG"], []
      ]
      let test = new ElevatorProblem(testInput)
      test.run()
      assert.equal(test.count, 11)
    })
  })
})

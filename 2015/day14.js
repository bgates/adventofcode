const input = `Vixen can fly 8 km/s for 8 seconds, but then must rest for 53 seconds.
Blitzen can fly 13 km/s for 4 seconds, but then must rest for 49 seconds.
Rudolph can fly 20 km/s for 7 seconds, but then must rest for 132 seconds.
Cupid can fly 12 km/s for 4 seconds, but then must rest for 43 seconds.
Donner can fly 9 km/s for 5 seconds, but then must rest for 38 seconds.
Dasher can fly 10 km/s for 4 seconds, but then must rest for 37 seconds.
Comet can fly 3 km/s for 37 seconds, but then must rest for 76 seconds.
Prancer can fly 9 km/s for 12 seconds, but then must rest for 97 seconds.
Dancer can fly 37 km/s for 1 seconds, but then must rest for 36 seconds.`

const test = `Comet can fly 14 km/s for 10 seconds, but then must rest for 127 seconds.
Dancer can fly 16 km/s for 11 seconds, but then must rest for 162 seconds.`
const allStats = {}
const race = 2503
input.split("\n").forEach(line => {
  const [_, name, _speed, _duration, _rest] = line.match(/(\w+) can fly (\d+).+for (\d+) .+for (\d+) s/)
  const [speed, duration, rest] = [_speed, _duration, _rest].map(Number)
  const interval = duration + rest
  allStats[name] = { speed, duration, rest, interval }
})

const distance = Object.keys(allStats).reduce((winner, name) => {
  const { duration, interval, speed } = allStats[name]
  const travelTime = duration * parseInt(race / interval) + Math.min(race % interval, duration)
  const distance = travelTime * speed
  return Math.max(winner, distance)
}, 0)

const reindeer = Object.keys(allStats)
reindeer.forEach(name => {
  allStats[name].distance = 0
  allStats[name].points = 0
})
for (let i = 1; i<=race; i++) {
  reindeer.forEach(name => {
    const { speed, interval, duration } = allStats[name]
    if (i % interval && i % interval <= duration) {
      allStats[name].distance += speed
    }
  })
  const leader = reindeer.reduce((distance, name) => Math.max(distance, allStats[name].distance), 0)
  reindeer.forEach(name => {
    if (allStats[name].distance === leader) {
      allStats[name].points++
    }
    const { distance, points } = allStats[name]
  })
}
console.log(allStats)

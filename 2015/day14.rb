reindeer = 'Vixen can fly 8 km/s for 8 seconds, but then must rest for 53 seconds.
Blitzen can fly 13 km/s for 4 seconds, but then must rest for 49 seconds.
Rudolph can fly 20 km/s for 7 seconds, but then must rest for 132 seconds.
Cupid can fly 12 km/s for 4 seconds, but then must rest for 43 seconds.
Donner can fly 9 km/s for 5 seconds, but then must rest for 38 seconds.
Dasher can fly 10 km/s for 4 seconds, but then must rest for 37 seconds.
Comet can fly 3 km/s for 37 seconds, but then must rest for 76 seconds.
Prancer can fly 9 km/s for 12 seconds, but then must rest for 97 seconds.
Dancer can fly 37 km/s for 1 seconds, but then must rest for 36 seconds.'.split("\n").map do |line|
  speed, duration, rest = line.match(/(\d+) km.* (\d+) .* (\d+)/)[1..3].map(&:to_i)
  { speed: speed, duration: duration, rest: rest, travel: 0, current_duration: 0, current_rest: 0, score: 0 }
end

2503.times do |i|
  reindeer.each do |rd|
    if rd[:current_duration] < rd[:duration]
      rd[:travel] += rd[:speed]
      rd[:current_duration] += 1
    else
      rd[:current_rest] += 1
      if rd[:current_rest] == rd[:rest]
        rd[:current_duration] = 0
        rd[:current_rest] = 0
      end
    end
  end
  lead = reindeer.map{|rd| rd[:travel] }.max
  reindeer.each{|rd| rd[:score] += 1 if rd[:travel] == lead }
end
puts reindeer.max_by{|rd| rd[:travel] }
puts reindeer.max_by{|rd| rd[:score] }

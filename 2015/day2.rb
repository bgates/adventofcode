input = File.read('./input/day2.txt')

wrapping = input.split("\n").reduce(0) do |total, line|
  sides = line.split('x').map(&:to_i)
  areas = sides.combination(2).map{ |a, b| a * b }
  extra = areas.min
  total + areas.reduce(extra) { |total, area| total + 2 * area}
end

puts wrapping

ribbon = input.split("\n").reduce(0) do |total, line|
  sides = line.split('x').map(&:to_i)
  ribbon = sides.combination(2).map{ |a, b| a + b }.min * 2
  bow = sides.reduce(1) {|total, side| total * side}
  total + ribbon + bow
end

puts ribbon

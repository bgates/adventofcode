input = File.read("./input/day3.txt")

data = input.split("\n").map{|line| line.strip.split(/\s+/).map(&:to_i)}

def valid_count(data)
  valid = data.find_all do |line| 
    short_sides = line.reject{|num| num == line.max}
    short_sides.reduce{|tot, n| tot + n} > line.max || short_sides.length < 2
  end
  puts valid.length
end

valid_count(data)

by_column = data.reduce([[], [], []]){|output, row| (0..2).map{|n| output[n].push(row[n])}}
  .reduce{|total, arr| total.concat(arr)}.each_slice(3).to_a

valid_count(by_column)

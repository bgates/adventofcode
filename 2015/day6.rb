input = File.read('./input/day6.txt')

grid = {}
1000.times.each_with_object(grid) do |i, obj|
  1000.times.each_with_object(obj) do |j, obj|
    obj["#{i},#{j}"] = false
  end
end

def parse(line)
  line.match(/(\d+),(\d+) through (\d+),(\d+)/)[1..4].map(&:to_i)
end
input.split("\n").each_with_object(grid) do |line, obj|
  x1, y1, x2, y2 = parse line
  (x1..x2).each do |x|
    (y1..y2).each do |y|
      obj["#{x},#{y}"] = if line.include? 'on'
                            true
                          elsif line.include? 'off'
                            false
                          else
                            !obj["#{x},#{y}"]
                          end
    end
  end
end
puts grid.values.select{|v| v}.length

1000.times.each_with_object(grid) do |i, obj|
  1000.times.each_with_object(obj) do |j, obj|
    obj["#{i},#{j}"] = 0
  end
end

input.split("\n").each_with_object(grid) do |line, obj|
  x1, y1, x2, y2 = parse line
  (x1..x2).each do |x|
    (y1..y2).each do |y|
      key = "#{x},#{y}"
      obj[key] = if line.include? 'on'
                   obj[key] + 1
                 elsif line.include? 'off'
                   obj[key] > 0 ? obj[key] - 1 : 0
                 else
                   obj[key] + 2
                 end
    end
  end
end
puts grid.values.reduce(0){ |total, n| total + n }

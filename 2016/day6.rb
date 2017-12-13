input = File.read('./input/day6.txt').split("\n").map{|line| line.strip}

start = Array.new(input[0].length).fill{[]}
columns = input.reduce(start) do |total, row|
  start.length.times{|n| total[n].push(row[n])}
  total
end
code = columns.reduce("") do |total, column|
  frequencies = column.reduce({}) do |obj, char|
    obj[char] ? obj[char] += 1 : obj[char] = 1
    obj
  end
  total + column.uniq.max_by{|char| frequencies[char]}
end
puts code
code = columns.reduce("") do |total, column|
  frequencies = column.reduce({}) do |obj, char|
    obj[char] ? obj[char] += 1 : obj[char] = 1
    obj
  end
  total + column.uniq.min_by{|char| frequencies[char]}
end
puts code

input = File.read('./input/day8.txt').split("\n")

test = '""
"abc"
"aaa\"aaa"
"\x27"'.split("\n")

def difference(input)
  input.inject(0){ |total, line| total + line.length - eval(line).length }
end

puts difference test
puts difference input

def part2(input)
  input.inject(0) do |total, line|
    total + line.gsub(/\\x[a-f0-9]{2}/, '||XXX').gsub(/"/,'|"').gsub(/\\/, '||').length + 2 - line.length
  end
end

puts part2 test
puts part2 input

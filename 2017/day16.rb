input = File.read('./input/day16.txt').split(',')

def dance(input, programs)
  input.each do |instruction|
    case instruction[0]
    when 'x'
      first, second = instruction.sub('x', '').split('/').map(&:to_i)
      tmp = programs[first]
      programs[first] = programs[second]
      programs[second] = tmp
    when 's'
      n = instruction.sub('s', '').to_i
      n.times{ programs.unshift programs.pop  }
    when 'p'
      first, second = instruction.sub('p', '').split('/')
      second = second[0].chr if second.bytes.length > 1
      firstIndex = programs.index(first)
      secondIndex = programs.index(second)
      programs[firstIndex] = second
      programs[secondIndex] = first
    end
  end
  programs
end

programs = ('a'..'p').to_a
puts dance(input, programs).join


programs = ('a'..'p').to_a
start = ('a'..'p').to_a
i = 0
while i == 0 || programs != start do
  i += 1
  programs = dance(input, programs)
end
puts i
40.times{ programs = dance(input, programs) }
puts programs.join

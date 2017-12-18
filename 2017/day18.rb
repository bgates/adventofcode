input = File.read('./input/day18.txt').strip.split("\n")

class Base
  def number_from(obj, val)
    if val.to_i.to_s == val
      val.to_i
    else
      obj[val] || 0
    end
  end

  def set_register(line, obj, register, val)
    obj[register] ||= 0
    if line.include? 'set'
      obj[register] = number_from(obj, val)
    elsif line.include? 'add'
      obj[register] += number_from(obj, val)
    elsif line.include? 'mul'
      obj[register] *= number_from(obj, val)
    elsif line.include? 'mod'
      obj[register] %= number_from(obj, val)
    end
  end

  def index_increment(line, register, obj, val)
    line.include?('jgz') && number_from(obj, register) > 0 ? number_from(obj, val) : 1
  end
end

class Part1 < Base
  def initialize
    @sounds = []
    @obj = {}
    @index = 0
  end

  def recover?(line)
    line.include?('rcv') && @sounds.last && @sounds.last != 0
  end

  def sound?(line, val)
    line.include?('snd') && @obj[val]
  end

  def operate(input)
    while (@index >= 0 && @index < input.length) do
      line = input[@index]
      register, val = line.match(/(\S+) (\S+)$/)[1..2]
      set_register(line, @obj, register, val)

      break(@sounds.last) if recover?(line)

      @sounds.push(@obj[val]) if sound?(line, val)

      @index += index_increment(line, register, @obj, val)
    end
  end
end

test = 'set a 1
add a 2
mul a a
mod a 5
snd a
set a 0
rcv a
jgz a -1
set a 1
jgz a -2'.split("\n")

puts Part1.new.operate test
puts Part1.new.operate input

class Part2 < Base
  def initialize
    @programs = [0, 1].map{|n| { 'p' => n, wait: false, queue: [], sent: 0, index: 0 } }
  end

  def inactive?(program, input)
    program[:wait] || program[:index] < 0 || program[:index] > input.length
  end

  def handle_reception(program, val)
    if program[:queue].empty?
      program[:wait] = true
    else
      program[val] = program[:queue].pop
    end
  end
  
  def handle_send(program, other, val)
    program[:sent] += 1
    other[:queue].unshift number_from(program, val)
    other[:wait] = false
  end

  def process(program, other, input)
    line = input[program[:index]] 
    register, val = line.match(/(\S+) (\S+)$/)[1..2]
    set_register(line, program, register, val)

    handle_send(program, other, val) if line.include? 'snd'
    handle_reception(program, val) if line.include? 'rcv' 
    
    program[:index] += index_increment(line, register, program, val) unless program[:wait]
  end

  def duet(input)
    while @programs.any?{ |program| !inactive?(program, input) } do
      @programs.permutation.each{ |a, b| process(a, b, input) unless inactive?(a, input) }
    end
    @programs[1][:sent]
  end
end

duet_test = 'snd 1
snd 2
snd p
rcv a
rcv b
rcv c
rcv d'.split("\n")
puts Part2.new.duet duet_test
puts Part2.new.duet input

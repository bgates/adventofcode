input = File.read('./input/day7.txt').strip.split("\n")

class Circuit
  attr_reader :wires

  GATES = { AND: :&, LSHIFT: :<<, OR: :|, RSHIFT: :>>, NOT: :~ }

  def initialize(input)
    @input = input
    @wires = input.each_with_object({}) do |line, obj|
      obj[line.split(' -> ')[1].strip] = nil
    end
  end

  def actual(n)
    n.to_i.to_s == n ? n.to_i : @wires[n]
  end

  def try(a, b, gate)
    if a =~ /NOT/
      key = a.sub('NOT ', '')
      ~@wires[key] + 65536 if @wires[key]
    else
      if !actual(a).nil? && !actual(b).nil?
        actual(a).send gate, actual(b)
      end
    end
  end

  def solve
    while (@wires['a'].nil?) do
      puts @wires.values.reject(&:nil?).length
      @input.each do |line|
        signal, wire = line.split(' -> ')
        next if @wires[wire]
        GATES.each do |key, val|
          a, b = signal.split(" #{key} ")
          @wires[wire] = try(a, b, val) if signal.include? "#{key}"
        end
        
        @wires[wire] = actual(signal) if actual(signal)
      end
    end
  end

  def override(a, b)
    tmp = @wires[a]
    @wires.each {|k, v| wires[k] = nil }
    @wires[b] = tmp
  end
end

test_data = '123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i'.split("\n")
test = Circuit.new(test_data)
#test.solve
#puts test.wires

actual = Circuit.new(input)
actual.solve
puts actual.wires['a']
actual.override('a', 'b')
actual.solve
puts actual.wires['a']

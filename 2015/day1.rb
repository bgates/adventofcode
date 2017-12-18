input = File.read('./input/day1.txt')

up, down = input.strip.split('').partition{ |c| c == '(' }.map(&:length)
puts up - down

def findBasement(input)
  floor = 0
  input.strip.split('').each_with_index do |c, i|
    floor += c == '(' ? 1 : -1
    return i + 1 if floor < 0
  end
end

puts findBasement input

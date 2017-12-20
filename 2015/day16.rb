input = File.read('./input/day16.txt')

match = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
}

sue = input.strip.split("\n").find do |line|
  line.scan(/(\w+): (\d+),?$?/).none? do |(key, val)|
    match[key.to_sym] != val.to_i
  end
end
puts sue

real_sue = input.strip.split("\n").find do |line|
  line.scan(/(\w+): (\d+),?$?/).none? do |(key, val)|
    if %w(cats trees).include?(key)
      match[key.to_sym] >= val.to_i
    elsif %w(pomeranians goldfish).include?(key)
      match[key.to_sym] <= val.to_i
    else
      match[key.to_sym] != val.to_i
    end
  end
end
puts real_sue

data = File.read('./input/day13.txt').strip.split("\n")

happinesses = data.each_with_object({}) do |line, obj|
  person, n, neighbor = line.match(/(\w+) .* (\d+) .* (\w+)\.$/)[1..3]
  n = -1 * n.to_i if line.include? 'lose'
  obj[person] ||= {}
  obj[person][neighbor] = n.to_i
end

guests = happinesses.keys 

def best(guests, happinesses)
  guests.permutation.map do |row|
    row.each_with_index.reduce(0) do |total, (guest, i)| 
      if guest == 'me'
        total
      else
        prev = i == 0 ? row.length - 1 : i - 1
        succ = i == row.length - 1 ? 0 : i + 1
        (happinesses[guest][row[i - 1]] || 0) + (happinesses[guest][row[succ]] || 0) + total
      end
    end
  end.max
end
puts best(guests, happinesses)
puts best(guests.push('me'), happinesses)

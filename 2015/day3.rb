input = File.read('./input/day3.txt').strip.split('')

def atLeastOnce(input)
  x, y = [0, 0]
  recipients = { { x: x, y: y } => true }
  input.each_with_object(recipients) do |move, recipients|
    case move
    when '<'
      x -= 1
    when '>'
      x += 1
    when '^' 
      y += 1
    when 'v'
      y -= 1
    end
    recipients[{x: x, y: y}] = true
  end
  return recipients
end

puts atLeastOnce(input).keys.length

santa, roboSanta = input.partition.each_with_index{|_, i| i.odd?}

puts atLeastOnce(santa).merge(atLeastOnce(roboSanta)).keys.length

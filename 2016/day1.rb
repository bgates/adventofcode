directions = File.read('./input/day1.txt').strip.split(', ')

def nextLocation(heading, distance, location)
  case heading
  when 0
    { y: location[:y] + distance, x: location[:x] }
  when 90
    { y: location[:y], x: location[:x] + distance }
  when 180
    { y: location[:y] - distance, x: location[:x] }
  when 270
    { y: location[:y], x: location[:x] - distance }
  end
end

def parseMove(move, heading)
  direction, distance = move.split('', 2)
  heading = ((direction === 'R' ? heading + 90 : heading - 90) + 360) % 360
  [distance.to_i, heading]
end

heading = 0
destination = directions.reduce({ x: 0, y: 0 }) do |location, move|
  distance, heading = parseMove(move, heading)
  nextLocation(heading, distance, location)
end

puts destination[:y].abs + destination[:x].abs

def step(heading, location)
  case heading
  when 0
    { y: location[:y] + 1, x: location[:x] }
  when 90
    { y: location[:y], x: location[:x] + 1 }
  when 180
    { y: location[:y] - 1, x: location[:x] }
  when 270
    { y: location[:y], x: location[:x] - 1 }
  end
end

heading = 0
visited = {}
destination = directions.reduce({ x: 0, y: 0 }) do |location, move|
  done = false
  distance, heading = parseMove(move, heading)
  distance.times do
    location = step(heading, location)
    if visited[location]
      done = true
      break(location)
    else
      visited[location] = true
    end
  end
  if done 
    break(location) 
  else 
    location 
  end
end
puts destination[:y].abs + destination[:x].abs

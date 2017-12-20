test = 'p=<-6,0,0>, v=< 3,0,0>, a=< 0,0,0>    
p=<-4,0,0>, v=< 2,0,0>, a=< 0,0,0>
p=<-2,0,0>, v=< 1,0,0>, a=< 0,0,0>
p=< 3,0,0>, v=<-1,0,0>, a=< 0,0,0>'

input = File.read('./input/day20.txt')

def closest(input)
  particles = input.strip.split("\n").each_with_index.map do |line, i|
    px, py, pz, vx, vy, vz, ax, ay, az = line.match(/p=< ?(-?\d+),(-?\d+),(-?\d+).*v=< ?(-?\d+),(-?\d+),(-?\d+).*a=< ?(-?\d+),(-?\d+),(-?\d+)/)[1..9].map(&:to_i)
    { pos: { x: px, y: py, z: pz }, v: { x: vx, y: vy, z: vz }, a: { x: ax, y: ay, z: az }, i: i }
  end
  2000.times do |n|
    puts particles.length
    unless particles.map{|p| p[:pos]}.uniq.length == particles.length
      collisions = particles.select{|p1| particles.any?{|p2| p2[:pos] == p1[:pos] && p2[:i] != p1[:i]}}
      particles.reject!{|p| collisions.include? p }
    end
    particles.each do |p|
      a = p[:a]
      p[:v] = { x: a[:x] + p[:v][:x], y: a[:y] + p[:v][:y], z: a[:z] + p[:v][:z] }
      p[:pos] = { x: p[:pos][:x] + p[:v][:x], y: p[:pos][:y] + p[:v][:y], z: p[:pos][:z] + p[:v][:z] }
    end
  end
  puts particles.min_by{|p| p[:pos][:x].abs + p[:pos][:y].abs + p[:pos][:z].abs }[:i]
  puts particles.length
end

closest(input)

grid = '...###.#.#.##...##.#..##.
.#...#..##.#.#..##.#.####
#..#.#...######.....#####
.###.#####.#...#.##.##...
.#.#.##......#....#.#.#..
....##.##.#..##.#...#....
#...###...#.###.#.#......
..#..#.....##..####..##.#
#...#..####.#####...#.##.
###.#.#..#..#...##.#..#..
.....##..###.##.#.....#..
#.....#...#.###.##.##...#
.#.##.##.##.#.#####.##...
##.#.###..#.####....#.#..
#.##.#...#.###.#.####..##
#.##..#..##..#.##.####.##
#.##.#....###.#.#......#.
.##..#.##..###.#..#...###
#..#.#.#####.....#.#.#...
.#####..###.#.#.##..#....
###..#..#..##...#.#.##...
..##....##.####.....#.#.#
..###.##...#..#.#####.###
####.########.#.#..##.#.#
#####.#..##...####.#..#..'

test_data = '..#
#..
...'

class Virus
  attr_reader :infections
  
  def initialize(data)
    @grid = data.split("\n").map{|line| line.split('').map{|char| char == '#'}}
    @y = (@grid.length / 2.0).floor
    @x = (@grid[@y].length / 2.0).floor
    @orientation = 0
    @infections = 0
  end

  def turn(dir)
    directions = { right: 1, left: -1, none: 0, back: 2 }
    @orientation += 90 * directions[dir]
    @orientation %= 360
  end

  def clean_or_infect
    @infections += 1 if !@grid[@y][@x]
    @grid[@y][@x] = !@grid[@y][@x]
  end

  def work
    turn(@grid[@y][@x] ? :right : :left)
    clean_or_infect
    move
  end

  def move
    case @orientation
    when 0
      move_up
    when 180
      move_down
    when 90
      move_right
    when 270
      move_left
    end
  end

  def move_up
    @y -= 1
    if @y < 0
      @y = 0
      @grid.unshift blank_row
    end
  end

  def move_down
    @y += 1
    @grid.push blank_row if @y == @grid.length
  end

  def move_right
    @x += 1
    @grid.each{|row| row.push false } if @x == @grid[0].length
  end

  def move_left
    @x -= 1
    if @x < 0
      @x = 0
      @grid.each{|row| row.unshift false }
    end
  end

  def blank_row
    Array.new(@grid[0].length) { false }
  end

  def to_s
    @grid.each_with_index.map do |line, i| 
      line.each_with_index.map do |char, j|
        if i == @y && j == @x 
          'X'
        else
          char ? '#' : '.'
        end
      end.join('')
    end.join("\n")
  end
end

test = Virus.new(test_data)
70.times { test.work }
puts test.to_s
puts test.infections

actual = Virus.new(grid)
10_000.times { actual.work }
puts actual.infections

class EvolvedVirus < Virus

  def clean_or_infect
    @infections += 1 if @grid[@y][@x] == :weakened
    states = [false, :weakened, true, :flagged, false]
    @grid[@y][@x] = states[states.index(@grid[@y][@x]) + 1]
  end

  def work
    turn(direction)
    clean_or_infect
    move
  end

  def direction
    case @grid[@y][@x]
    when true
      :right
    when false
      :left
    when :weakened
      :none
    when :flagged
      :back
    end
  end
end

ev = EvolvedVirus.new(test_data)
#10000000.times {ev.work}
puts ev.infections
actual_ev = EvolvedVirus.new(grid)
10000000.times { actual_ev.work}
puts actual_ev.infections

input = File.read('./input/day18.txt')

class Grid
  def initialize(input)
    @cells = input.split("\n").map{|line| line.split('').map{ |c| c == '#' }}
  end

  def step
    @cells = @cells.each_with_index.map{|line, i| line.each_with_index.map{|c, j| next_char(c, i, j) }}
  end

  def next_char(c, i, j)
    top = i == 0 ? [] : @cells[i - 1]
    bottom = i == @cells.length - 1 ? [] : @cells[i + 1]
    left = j == 0 ? nil : j - 1
    right = j == @cells[0].length - 1 ? nil : j + 1
    neighbors = [(top[left] if left), top[j], (top[right] if right),
     (@cells[i][left] if left), (@cells[i][right] if right),
     (bottom[left] if left), bottom[j], (bottom[right] if right)].reject{|c| !c }.length
    neighbors == 3 || (c && neighbors == 2)
  end

  def to_s
    @cells.map{|line| line.map{|c| c ? '#' : '.'}.join}.join("\n")
  end

  def count
    @cells.reduce(0){|total, line| line.reject{|c| !c}.length + total }
  end
end

test_data = '.#.#.#
...##.
#....#
..#...
#.#..#
####..'
test = Grid.new(test_data)
5.times{ test.step; puts test }
actual = Grid.new(input)
100.times{ actual.step }
puts actual.count

class CornerGrid < Grid
  def initialize(input)
    super(input)
    turn_on_corners
  end

  def step
    super
    turn_on_corners
  end
 
  def turn_on_corners
    last = @cells[0].length - 1
    @cells[0][0] = true
    @cells[0][last] = true
    @cells[@cells.length - 1][0] = true
    @cells[@cells.length - 1][last] = true
  end
end

corner = CornerGrid.new(input)
100.times { corner.step }
puts corner.count

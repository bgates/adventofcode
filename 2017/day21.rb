rules = File.read('./input/day21.txt')

alt_rules = '../.# => ##./#../...
.#./..#/### => #..#/..../..../#..#'

class Image
  attr_reader :grid

  START = '.#.
          ..#
          ###'
  
  def initialize(rules)
    @rules = rules.split("\n").each_with_object({}) do |line, obj|
      before, after = line.split(' => ')
      obj[before] = after
    end
    @grid = START.split("\n").map{|line| line.strip.split('') }
  end

  def orientations(grid)
    [
      grid.join('/'),
      grid.map(&:reverse).join('/'),
      grid.reverse.join('/'),
      grid.reverse.map(&:reverse).join('/'),
      transpose(grid).map(&:join).join('/'),
      transpose(grid).map(&:join).reverse.join('/'),
      transpose(grid).map(&:reverse).map(&:join).join('/'),
      transpose(grid).map(&:reverse).map(&:join).reverse.join('/'),
    ]
  end

  def transpose(grid)
    grid.map{|line| line.split('')}.transpose
  end

  def enhance(subgrid)
    @rules[orientations(subgrid).find{ |g| @rules[g] }].split('/').map{|line| line.split('')}
  end

  def subgrids(n)
    @grid.each_slice(n).each_with_object([]) do |rows, arr|
      enhanced_rows = rows[0].each_with_index.each_with_object([]) do |(_, i), obj|
        next unless i % n == 0
        enhance(rows.map{|row| row[i..i + n - 1].join('') }).each_with_index do |enhanced, j|
          (obj[j] ||= []).concat enhanced
        end
      end
      arr.concat enhanced_rows
    end
  end

  def update
    @grid = @grid.length.even?? subgrids(2) : subgrids(3)
  end

  def to_s
    @grid.map{|line| line.join('')}.join("\n")
  end

  def pixel_count
    @grid.sum{|line| line.select{|char| char == '#'}.length}
  end
end

img = Image.new(rules)
18.times {|n| puts n; img.update }
puts img.pixel_count

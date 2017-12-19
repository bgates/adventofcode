input = File.read('./input/day19.txt')
test_data = '     |          
     |  +--+    
     A  |  C    
 F---|----E|--+ 
     |  |  |  D 
     +B-+  +--+ '

class Path
  attr_reader :letters, :steps

  def initialize(input)
    @lines = input.split("\n")
    @y = 0
    @x = @lines[@y].index('|')
    @direction = :down
    @letters = ''
    @steps = 0
  end

  def step_forward
    if @direction == :down
      @y += 1
    elsif @direction == :up
      @y -= 1
    elsif @direction == :right
      @x += 1
    else
      @x -= 1
    end
  end

  def turn_right_or_left
    if @lines[@y][@x - 1] != ' '
      @x -= 1
      @direction = :left
    else
      @x += 1
      @direction = :right
    end
  end

  def turn_up_or_down
    if @lines[@y - 1] && @lines[@y - 1][@x] != ' '
      @y -= 1
      @direction = :up
    else
      @y += 1
      @direction = :down
    end
  end

  def turn
    if [:up, :down].include?(@direction)
      turn_right_or_left
    else
      turn_up_or_down
    end
  end

  def move(char)
    if char != '+'
      step_forward
    else
      turn
    end
  end

  def step
    @steps += 1
    char = @lines[@y][@x]
    @letters << char if ('A'..'Z').include?(char)
    move(char)
    @finished = is_finished? || char == 'L'
  end

  def is_finished?
    (@x == 0 && [@lines[@y][@x + 1], @lines[@y + 1][@x], @lines[@y - 1][@x]].reject{|c| c == ' '}.length == 1) ||
    (@x == @lines[0].length - 1 && [@lines[@y][@x - 1], @lines[@y + 1][@x], @lines[@y - 1][@x]].reject{|c| c == ' '}.length == 1) ||
    (@y == 0 && [@lines[@y][@x + 1], @lines[@y][@x - 1], @lines[@y - 1][@x]].reject{|c| c == ' '}.length == 1) ||
    (@y == @lines.length && [@lines[@y][@x + 1], @lines[@y][@x - 1], @lines[@y + 1][@x]].reject{|c| c == ' '}.length == 1) 
  end

  def walk
    while !@finished do
      step
    end
  end
end

test = Path.new(test_data)
test.walk
puts test.letters
puts test.steps

actual = Path.new(input)
actual.walk
puts actual.letters
puts actual.steps

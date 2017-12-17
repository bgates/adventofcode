input = 355
test = 3

class Spinlock
  attr_accessor :buffer

  def initialize(step)
    @step = step
    @position = 0
    @buffer = [0]
    @value = 0
  end

  def move
    sum = (@position + @step) % @buffer.length
    if sum >= @buffer.length
      @position = sum - @buffer.length
    else
      @position = sum
    end
    @value += 1
    if @position == @buffer.length - 1
      @buffer << @value
    else
      @buffer = @buffer.slice(0, @position).concat(@buffer.slice(@position, @buffer.length).unshift(@value))
      #@buffer.insert(@position + 1, @value) <= same but slower
    end
    @position += 1
  end

  def insert
    sum = (@position + @step) % @buffer.length
    if sum >= @buffer.length
      @position = sum - @buffer.length
    else
      @position = sum
    end
    @value += 1
    @position += 1
    if @position == 1
      @buffer = [0, @value].concat(@buffer.slice(1, @buffer.length))
    else
      @buffer << @value
    end
  end
end

first = Spinlock.new input
2017.times{first.move}
puts first.buffer[first.buffer.index(2017) + 1]

second = Spinlock.new input
50_000_000.times{second.insert}
puts second.buffer[1]

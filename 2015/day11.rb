input = 'hepxcrrq'

class Password
  def initialize(str)
    @pwd = str.split('')
  end

  def has_straight?
    @pwd.each_with_index.any?{|char, i| @pwd[i + 1] == char.succ && @pwd[i + 2] == char.succ.succ }
  end

  def not_confusing?
    @pwd.none?{|char| %w(i o l).include? char }
  end

  def two_pair?
    ('a'..'z').any? do |char| 
      pwd.include?(char * 2) && ('a'..'z').reject{|c| c == char }.any?{|c| pwd.include?(c * 2)}
    end
  end

  def pwd
    @pwd.join
  end

  def valid?
    has_straight? && not_confusing? && two_pair?
  end

  def next
    loop do
      @pwd = pwd.succ.split('')
      break if valid?
    end
  end
end

pwd = Password.new(input)
pwd.next
puts pwd.pwd
pwd.next
puts pwd.pwd

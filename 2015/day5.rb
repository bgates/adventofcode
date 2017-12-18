input = File.read('./input/day5.txt')

class String

  def is_nice?
    has_three_vowels? && has_repeated_letter? && no_illegal_sequences?
  end

  def has_three_vowels?
    split('').select{|char| %w(a e i o u).include? char}.length > 2
  end

  def has_repeated_letter?
    ('a'..'z').any? { |letter| self.include?(letter * 2) }
  end

  def no_illegal_sequences?
    %w(ab cd pq xy).none?{|pair| self.include?(pair)}
  end
end

puts input.split("\n").select(&:is_nice?).length

class String
  def is_nice?
    has_repeated_pair? && has_repeat_after_other_letter?
  end

  def has_repeated_pair?
    ('a'..'z').any? { |letter| has_pair?(letter) && sub(letter * 2, '').has_pair?(letter) }
  end

  def has_pair?(letter)
    includes?(letter * 2)
  end

  def has_repeat_after_other_letter?
    ('a'..'z').any? { |letter| ('a'..'z').reject(letter).any?{|other| include? "#{letter}#{other}#{letter}"} }
  end
end

puts input.split("\n").select(&:is_nice?).length

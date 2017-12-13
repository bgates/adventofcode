input = File.read('./input/day7.txt').split("\n")

class Array

  def has_palindrome?
    self.any? do |seq|
      match = false
      arr = seq.split('')
      arr.each_with_index do |_, i|
        slice = arr.slice(i, 4)
        match = true if slice.palindrome?
      end
      match
    end
  end

  def palindrome?
    self[0] == self[3] && self[1] == self[2] && self[0] != self[1]
  end

  def aba
    self.reduce([]) do |answer, seq|
      arr = seq.split('')
      arr.each_with_index do |_, i|
        slice = arr.slice(i, 3)
        answer.push(slice.join) if slice.aba?
      end
      answer
    end
  end

  def aba?
    self[0] == self[2] && self[0] != self[1]
  end

end

class String
  def bab
    self[1] + self[0] + self[1]
  end
end

def tls_count(arr)
  arr.find_all do |line|
    abba = line.split(/\[.+?\]/).has_palindrome?
    hyper = line.scan(/\[(.+?)\]/).map(&:first).has_palindrome?
    abba && !hyper
  end.length
end
test = "abba[mnop]qrst
abcd[bddb]xyyx
aaaa[qwer]tyui
ioxxoj[asdfgh]zxcvbn".split("\n")
puts tls_count test
puts tls_count input

def ssl_count(arr)
  arr.find_all do |line|
    aba = line.split(/\[.+?\]/).aba
    line.scan(/\[(.+?)\]/).map(&:first).any?{|str| aba.any?{|seq| str.include?(seq.bab)} }
  end.length
end
puts ssl_count input

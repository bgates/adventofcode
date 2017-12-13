input = File.read("./input/day4.txt").split("\n")

def is_real(line)
  all_chars = line.match(/([^0-9]+)/)[0].gsub('-', '').split('')
  frequencies = all_chars.reduce({}) do |obj, char|
    obj[char] ? obj[char] += 1 : obj[char] = 1
    obj
  end
  checksum = line.match(/\[(.+)\]/)[1]
  sorted_chars = all_chars.uniq.sort_by{|c| [-frequencies[c], c] }.join('')
  sorted_chars.start_with? checksum
end

puts input.find_all{|line| is_real(line)}.reduce(0){|tot, line| line.match(/(\d+)/)[1].to_i + tot}

desired = "northpole"

possibles = (0..25).map do |n|
  current = desired
  n.times { current = current.split('').map{|c| c == "z" ? "a" : c == " " ? " " : c.succ}.join }
  current.gsub(" ", "-")
end

index = input.find_index{|line| possibles.any?{|possible| line.start_with?(possible)}}
puts input[index].match(/(\d+)/)[1]

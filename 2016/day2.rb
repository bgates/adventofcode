input = File.read('./input/day2.txt')

keypad = "123
456
789"

test = "ULL
RRDDD
LURDL
UUUUD"

def move(row, col, keypad, char)
  if char == 'U'
    attempt_row, attempt_col = row - 1, col
  elsif char == 'L'
    attempt_row, attempt_col = row, col - 1
  elsif char == 'R'
    attempt_row, attempt_col = row, col + 1
  elsif char == 'D'
    attempt_row, attempt_col = row + 1, col
  end
  if attempt_row >= 0 && 
      attempt_col >= 0 && 
      keypad[attempt_row] && ![nil, " "].include?(keypad[attempt_row][attempt_col])
    return [attempt_row, attempt_col]
  else
    return [row, col]
  end
end

def part1(instructions, keypad)
  instructions = instructions.split("\n").map{|line| line.split("")}
  keypad = keypad.split("\n").map{|line| line.split("")}
  row = keypad.index(keypad.find{|row| row.include?("5")})
  col = keypad[row].index("5")
  code = ""
  instructions.each do |chars|
    chars.each do |char|
      row, col = move(row, col, keypad, char)
    end
    code += keypad[row][col]
  end
  code
end

puts part1(test, keypad)
puts part1(input, keypad)

badKeypad = "  1  
 234 
56789
 ABC 
  D"
puts part1(test, badKeypad)
puts part1(input, badKeypad)

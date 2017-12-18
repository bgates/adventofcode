require 'digest/md5'

input = 'iwrupvqb'

def findAdventCoin(input, nZeroes)
  i = 0
  startSeq = '0' * nZeroes
  while true do
    break(i) if Digest::MD5.hexdigest(input + i.to_s).start_with?(startSeq)
    i += 1
  end
end

puts findAdventCoin input, 5
puts findAdventCoin input, 6

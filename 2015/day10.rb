input = '3113322113'.split('')

def cycle(input)
  input.each_with_index.each_with_object([]) do |pair, arr|
    n, i = pair
    if arr.last && arr.last.keys[0] == n
      arr.push({ n => arr.pop[n] + 1 })
    else
      arr.push({ n => 1 })
    end
  end.map{|h| h.map{|k, v| "#{v}#{k}"}}.flatten.join.split('')
end

test = ['1']
40.times{ input = cycle(input) }
puts input.length
10.times { input = cycle(input) }
puts input.length

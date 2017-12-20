input = 'Sprinkles: capacity 2, durability 0, flavor -2, texture 0, calories 3
Butterscotch: capacity 0, durability 5, flavor -3, texture 0, calories 3
Chocolate: capacity 0, durability 0, flavor 5, texture -1, calories 8
Candy: capacity 0, durability -1, flavor 0, texture 5, calories 8'

# 5 * c - 3 * b - 2 * s > 0
# 2 * s > 0
# 5 * b - ca > 0
# 5 * ca - c > 0
#
# the code below should work, but it's too slow
# puts (0..100).to_a.repeated_permutation(4).to_a.reject do |(s, b, ch, ca)|
#   s + b + ch + ca != 100 
# end.max_by do |(s, b, ch, ca)|
#   (s * 2) * (5 * b - ca) * (5 * c - 3 * b - 2 * s) * (5 * ca - c)
# end
#
# ca < 5b
# c < 5ca
# c < 25b
score = (1..100).to_a.each_with_object([]) do |b, arr|
  (0..[100, 5 * b].min).to_a.each_with_object(arr) do |ca, _arr|
    (0..[100, 5 * ca].min).to_a.each_with_object(_arr) do |c, __arr|
      (0..100).to_a.each do |s| 
        __arr.push([s, b, c, ca]) if (s + b + c + ca == 100) && (3 * (s + b) + 8 * (c + ca) == 500)
      end
    end
  end
end.map do |(s, b, c, ca)|
  (s * 2) * (5 * b - ca) * (5 * c - 3 * b - 2 * s) * (5 * ca - c)
end.max
puts score

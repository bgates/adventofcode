containers = '11
30
47
31
32
36
3
1
5
3
32
36
15
11
46
26
28
1
19
3'.split("\n").map(&:to_i).sort

sum = containers.inject(0){|t,n| t + n}

min = 20 - (1..20).to_a.find{ |n| sum - containers[0..n].inject(0){|t,n| t+n} <= 150 }
max = (1..20).to_a.find{ |c| containers[0..c].inject(0){|t,n| t+n} >= 150 }

def viable?(combination)
  combination.reduce(0){|t,n| t + n} == 150 
end

ans = (min..max).to_a.inject(0) do |tot, n|
  tot + containers.combination(n).reduce(0) do |all, combo|
    viable?(combo) ? all += 1 : all
  end
end
puts ans

min_num = (min..max).to_a.find do |n|
  containers.combination(n).any?{|combo| viable?(combo)}
end
combos = containers.combination(min_num).select{ |combo| viable?(combo) }
puts combos.length

require 'json'
data = JSON.parse(File.read('./input/day12.json'))

def sum(obj)
  if obj.is_a? Numeric
    obj
  elsif obj.is_a?(String) || obj.nil?
    0
  elsif obj.is_a? Array
    obj.reduce(0){|total, elm| total + sum(elm) }
  elsif obj.values.any?{|key| key == 'red'}
    0
  else
    obj.values.reduce(0){|total, elm| total + sum(elm) }
  end
end

puts sum(data)

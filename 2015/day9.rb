input = File.read('./input/day9.txt')

test_input = 'London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141'

class Route
  def initialize(input)
    @paths = paths_from input
    @cities = @paths.map{|p| p[:cities] }.flatten.uniq
  end

  def paths_from(input)
    input.split("\n").map do |line|
      cities, distance = line.split(' = ')
      cities = cities.split(' to ')
      { cities: cities, distance: distance.to_i }
    end
  end

  def routes
    @cities.permutation
      .map{ |list| order_paths(list) }
      .reject{ |route| too_short(route) }.map do |route|
        route.reduce(0){|total, path| total + path[:distance] }
      end
  end

  def max
    routes.max
  end

  def min
    routes.min
  end

  def order_paths(list)
    list.each_with_index.map do |city, i|
      @paths.find{|path| path[:cities].include?(city) && path[:cities].include?(list[i - 1]) } unless i == 0
    end.compact
  end

  def too_short(route)
    route.length < @cities.length - 1
  end
end

test = Route.new(test_input)
puts test.min
actual = Route.new(input)
puts actual.min
puts test.max
puts actual.max

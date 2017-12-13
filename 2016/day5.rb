require 'digest'
input = "ugkcyxxp"

password = ''
i = 0
while password.length < 8 
  hash = Digest::MD5.hexdigest "#{input}#{i}"
  if hash.start_with? "00000"
    password += hash[5]
  end
  i += 1
end
puts password

password = []
i = 0
while password.find_all{|c| c}.length < 8
  hash = Digest::MD5.hexdigest "#{input}#{i}"
  if hash.start_with?("00000") && (0..7).map(&:to_s).include?(hash[5])
    password[hash[5].to_i] = hash[6]
  end
  puts password.map{|c| c || '_'}.join
  i += 1
end
puts password


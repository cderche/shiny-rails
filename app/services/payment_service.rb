require 'payture'

class PaymentService

  def init(data)
    puts "DATA: #{data}"
    puts "Merchant: #{ENV['PAYTURE_ADD']}"
    w = Payture::Wallet.new(ENV['PAYTURE_HOST'])
    w.init(ENV['PAYTURE_ADD'], data)
  end

end

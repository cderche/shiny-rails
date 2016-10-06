require 'payture'

class PaymentService

  def init(data)
    w = Payture::Wallet.new(ENV['PAYTURE_HOST'])
    w.init(ENV['PAYTURE_ADD'], data)
  end

end

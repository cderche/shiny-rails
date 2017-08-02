require 'payture'

class PaytureWalletService

  def self.charge(invoice)
    payload = {
      OrderId:      invoice.token,
      VWUserLgn:    invoice.booking.user.email,
      VWUserPsw:    invoice.booking.user.payture_token,
      Amount:       invoice.amount * 100,
      CardId:       invoice.booking.card_token
    }
    payture = Payture::Wallet.new(ENV['PAYTURE_HOST'])
    data = payture.pay(ENV['PAYTURE_PAY'], payload)
    update_status(invoice, data)
  end

  private

  def self.update_status(invoice, data)
    if data['Pay']['Success'] == 'True'
      invoice.update(status: :charged)
      return true
    elsif data[:ErrCode]
      invoice.update(status: data[:ErrCode].downcase.to_sym)
      return false
    else
      invoice.update(status: :failed)
      return false
    end
  end

end

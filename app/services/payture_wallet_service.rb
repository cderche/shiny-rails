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
    else
      invoice.update(status: data[:ErrCode].downcase.to_sym)
    end
  end

end

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
    success = data['Pay']['Success'] == 'True'
    update_status(invoice, success)
    success
  end

  private

  def self.update_status(invoice, success)
    if success
      invoice.update(status: :processing)
    else
      invoice.update(status: :failed)
    end
  end

end

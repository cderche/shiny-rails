require 'payture'

class CardService

  def self.list(user)
    getList(user)
  end

  private

  def self.getList(user)
    payload = {
      VWUserLgn: user.email,
      VWUserPsw: user.payture_token
    }
    payture = Payture::Card.new(ENV['PAYTURE_HOST'])
    data = payture.list(ENV['PAYTURE_ADD'], payload)
    items = data['GetList']['Item']
    return [] if !items
    return items if items.is_a? Array
    [items]
  end

end

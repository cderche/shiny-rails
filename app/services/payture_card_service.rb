require 'payture'

class PaytureCardService

  def self.list(user)
    getList(user)
  end

  def self.add_card_url(user)
    payload = {
      OrderId:      SecureRandom.uuid   ,
      SessionType:  'Block'             ,
      VWUserLgn:    user.email          ,
      VWUserPsw:    user.payture_token  ,
      Amount:       100
    }
    payture = Payture::Wallet.new(ENV['PAYTURE_HOST'])
    result = payture.init(ENV['PAYTURE_ADD'], payload)

    URI::HTTPS.build({
      host: ENV['PAYTURE_HOST']       ,
      path: '/vwapi/Pay'              ,
      query: { SessionId: result['Init']['SessionId'] }.to_query
    }).to_s
  end

  def self.remove_card(user, card_id)
    payload = {
      VWUserLgn:    user.email          ,
      VWUserPsw:    user.payture_token  ,
      CardId:       card_id
    }
    payture = Payture::Card.new(ENV['PAYTURE_HOST'])
    data = payture.remove(ENV['PAYTURE_ADD'], payload)
    data['Remove']['Success'] == 'True'
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

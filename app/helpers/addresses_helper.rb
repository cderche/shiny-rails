module AddressesHelper
  def payment_gateway(cart)
    data = {
      OrderId:      cart.token          ,
      SessionType:  'Block'             ,
      VWUserLgn:    cart.address.email  ,
      VWUserPsw:    cart.address.token  ,
      Amount:       '100'               ,
      Language:     I18n.locale         ,
    }

    service = PaymentService.new
    res = service.init(data)
    sessionId = res['Init']['SessionId']

    uri = URI::HTTP.build({
      host: ENV['PAYTURE_HOST'] ,
      path: '/vwapi/Pay'        ,
      query: {
        SessionId:  sessionId               ,
        date:       cart.date               ,
        time:       cart.time               ,
        duration:   cart.duration           ,
        frequency:  I18n.t(cart.frequency)  ,
        cost:       cart.cost               ,
        real:       cart.real               ,
        disc:       cart.disc               ,
      }.to_query
    })

    uri.to_s
  end
end

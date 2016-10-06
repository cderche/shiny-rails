module AddressesHelper
  def payment_gateway(cart)
    data = {
      OrderId:      cart.token          ,
      SessionType:  'Block'             ,
      VWUserLgn:    cart.address.email  ,
      VWUserPsw:    cart.address.token  ,
      Amount:       '100'               ,
    }

    service = PaymentService.new
    res = service.init(data)
    sessionId = res['Init']['SessionId']

    uri = URI::HTTP.build({
      host: ENV['PAYTURE_HOST'] ,
      path: '/vwapi/Pay'        ,
      query: {
        SessionId:  sessionId   ,
        Date:       cart.date   ,
        Time:       cart.time   ,
      }.to_query
    })

    uri.to_s
  end
end

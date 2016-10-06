require 'faker'

Given(/^a Notification of type "([^"]*)"$/) do |notif_type|
  @cart = Cart.create!
  @cart.build_address({ email: Faker::Internet.safe_email }).save

  @nHash = {
    notification: {
      OrderId:          @cart.token                         ,
      SessionType:      'Block'                             ,
      VWUserLgn:        @cart.address.email                 ,
      VWUserPsw:        @cart.address.token                 ,
      Amount:           '100'                               ,
      TransactionDate:  Time.now                            ,
      CardHolder:       Faker::Name.name                    ,
      IsAlfa:           false                               ,
      CardName:         Faker::Business.credit_card_number  ,
      CardId:           SecureRandom.uuid                   ,
      DateTime:         DateTime.now.to_i                   ,
      Success:          true                                ,
      Notification:     notif_type                          ,
      MerchantContract: ENV['PAYTURE_ADD']                  ,
    }
  }
end

When(/^the platform receives the Notification$/) do
  post notifications_path(@nHash)
end

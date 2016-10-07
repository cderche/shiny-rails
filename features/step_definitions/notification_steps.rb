require 'faker'

Given(/^I receive a notification of "([^"]*)"$/) do |notif|
  cart    = create(:cart)
  address = create(:address, cart: cart)
  hash    = {
    OrderId:          cart.token                          ,
    SessionType:      'Block'                             ,
    VWUserLgn:        cart.address.email                  ,
    VWUserPsw:        cart.address.token                  ,
    Amount:           '100'                               ,
    TransactionDate:  Time.now                            ,
    CardHolder:       Faker::Name.name                    ,
    IsAlfa:           false                               ,
    CardName:         Faker::Business.credit_card_number  ,
    CardId:           SecureRandom.uuid                   ,
    DateTime:         DateTime.now.to_i                   ,
    Success:          true                                ,
    Notification:     notif                               ,
    MerchantContract: ENV['PAYTURE_ADD']                  ,
  }
  post notifications_path(hash)
end

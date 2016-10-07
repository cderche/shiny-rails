require 'faker'

FactoryGirl.define do
  category = ['CustomerAddSuccess'].sample
  data = {
    OrderId:          Faker::Code.asin                    ,
    SessionType:      ['Block', 'Pay', 'Add'].sample      ,
    VWUserLgn:        Faker::Internet.email               ,
    VWUserPsw:        Faker::Internet.password            ,
    Amount:           Faker::Number.between(100, 100000)  ,
    TransactionDate:  Faker::Time.backward(14)            ,
    CardHolder:       Faker::Name.name                    ,
    IsAlfa:           Faker::Boolean.boolean              ,
    CardName:         Faker::Business.credit_card_number  ,
    CardId:           SecureRandom.uuid                   ,
    DateTime:         Faker::Time.backward(14)            ,
    Success:          Faker::Boolean.boolean              ,
    Notification:     category                            ,
    MerchantContract: Faker::App.name                     ,
  }

  factory :notification do
    category  category
    data      data
  end
end

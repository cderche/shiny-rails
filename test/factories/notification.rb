require 'faker'

FactoryGirl.define do
  factory :notification do
    OrderId           { Faker::Code.asin                    }
    SessionType       ['Block', 'Pay', 'Add'].sample
    VWUserLgn         { Faker::Internet.email               }
    VWUserPsw         { Faker::Internet.password            }
    Amount            { Faker::Number.between(100, 100000)  }
    TransactionDate   { Faker::Time.backward(14)            }
    CardHolder        { Faker::Name.name                    }
    IsAlfa            { Faker::Boolean.boolean              }
    CardName          { Faker::Business.credit_card_number  }
    CardId            SecureRandom.uuid
    DateTime          { Faker::Time.backward(14)            }
    Success           { Faker::Boolean.boolean              }
    Notification      ['CustomerAddSuccess'].sample
    MerchantContract  { Faker::App.name                     }
  end
end

require 'faker'

FactoryGirl.define do
  factory :cart do
    frequency { [:week, :fortnight, :once].sample }
    date      { Faker::Date.forward(23)           }
    time      { Faker::Time.forward(23)           }
    duration  { Faker::Number.between(2, 10)      }
    ironing   { Faker::Boolean.boolean            }
    pets      { Faker::Boolean.boolean            }
  end
end

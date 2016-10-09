require 'faker'

FactoryGirl.define do
  factory :address do
    firstname { Faker::Name.first_name            }
    lastname  { Faker::Name.last_name             }
    city      { Faker::Address.city               }
    postcode  { Faker::Address.postcode           }
    phone     { Faker::PhoneNumber.cell_phone     }
    email     { Faker::Internet.email             }
    street    { Faker::Address.street_name        }
    block     { Faker::Address.building_number    }
    house     { Faker::Address.building_number    }
    building  { Faker::Address.building_number    }
    apartment { Faker::Address.secondary_address  }
    notes     { Faker::Lorem.sentence             }
    terms     true
  end
end

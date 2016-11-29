class Service < ApplicationRecord
  include Translatable

  has_many :bookings
end

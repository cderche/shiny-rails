class Frequency < ApplicationRecord
  include Translatable

  has_many :bookings
end

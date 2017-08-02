class Promo < ApplicationRecord

  validates :code, uniqueness: true

  has_many :bookings
end

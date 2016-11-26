class Service < ApplicationRecord
  has_many :bookings
  # has_and_belongs_to_many :extras
end

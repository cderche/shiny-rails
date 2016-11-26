class Extra < ApplicationRecord
  has_many :addons
  has_many :bookings, through: :addons
  # has_and_belongs_to_many :services
end

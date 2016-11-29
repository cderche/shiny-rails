class Extra < ApplicationRecord
  include Translatable

  has_many :addons
  has_many :bookings, through: :addons
end

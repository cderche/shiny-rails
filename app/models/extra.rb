class Extra < ApplicationRecord
  include Translatable

  has_many :addons    , dependent: :destroy
  has_many :bookings  , through: :addons
end

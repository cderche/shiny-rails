class Cart < ApplicationRecord
  has_secure_token

  has_one :address

  validates :frequency, presence: true
  validates :date,      presence: true
  validates :time,      presence: true
  validates :duration,  presence: true
end

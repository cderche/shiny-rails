class Cart < ApplicationRecord
  validates :frequency, presence: true
  validates :duration, presence: true
  validates :date, presence: true
  validates :time, presence: true
end

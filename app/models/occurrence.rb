class Occurrence < ApplicationRecord
  belongs_to :booking
  belongs_to :user
  belongs_to :professional

  enum status: [:active, :cancelled]
end

class Invoice < ApplicationRecord
  belongs_to :booking

  enum status: [:draft]
end

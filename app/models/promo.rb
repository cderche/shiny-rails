class Promo < ApplicationRecord

  validates :code, uniqueness: true 
end

class Cart < ApplicationRecord
  has_secure_token

  has_one :address
end

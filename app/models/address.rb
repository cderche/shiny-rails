class Address < ApplicationRecord
  has_secure_token

  belongs_to :cart
end

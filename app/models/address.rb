class Address < ApplicationRecord
  has_secure_token

  belongs_to :cart

  validates :firstname, presence: true
  validates :lastname,  presence: true
  validates :email,     presence: true
  validates :phone,     presence: true
  validates :street,    presence: true

end

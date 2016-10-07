class Order < ApplicationRecord
  has_many    :notifications
  belongs_to  :cart
  belongs_to  :address
end

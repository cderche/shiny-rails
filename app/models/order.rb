class Order < ApplicationRecord
  belongs_to :notification
  belongs_to :cart
  belongs_to :address
end

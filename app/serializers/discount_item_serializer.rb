class DiscountItemSerializer < ActiveModel::Serializer
  attributes :id
  has_one :discount
  has_one :cart
end

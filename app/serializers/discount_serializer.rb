class DiscountSerializer < ActiveModel::Serializer
  attributes :id, :coupon, :discount_type, :amount, :category
end

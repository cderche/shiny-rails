class DiscountItem < ApplicationRecord
  belongs_to :discount
  belongs_to :cart

  def total_discount
    total_discount = discount.amount
    total_discount = discount.amount * cart.total_line_items_price if discount.discount_type.to_sym == :percentage
    total_discount
  end
end

class Cart < ApplicationRecord
  has_many :line_items, dependent: :destroy
  has_many :products, through: :line_items

  def add_product(product)
    current_item = line_items.find_by(product: product)
    if current_item
      current_item.quantity += 1 if product.quantity_based?
    else
      current_item = line_items.build(product: product)
    end
    current_item
  end

  def total_price
    line_items.to_a.sum { |item| item.total_price }
  end
end

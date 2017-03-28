class Cart < ApplicationRecord
    has_many :line_items, dependent: :destroy
    has_many :products, through: :line_items

    has_many :discount_items, dependent: :destroy
    has_many :discounts, through: :discount_items

    def add_product(product)
        current_item = line_items.find_by(product: product)
        if current_item
            current_item.quantity += 1 if product.quantity_based?
        else
            current_item = line_items.build(product: product)
        end
        current_item
    end

    def add_discount(discount)
        current_item = discount_items.find_by(discount: discount)
        unless current_item
            if discount.category.to_sym == :frequency
                e_discount = discounts.find_by(category: :frequency)
                if e_discount
                    e_discount_item = discount_items.find_by(discount: e_discount)
                    discount_items.delete(e_discount_item)
                end
            end
            current_item = discount_items.build(discount: discount)
        end
        current_item
    end

    def total_line_items_price
        line_items.sum(&:total_price)
    end

    def total_discount
        total_discount = discount_items.sum(&:total_discount)
        total_discount = total_line_items_price if total_discount > total_line_items_price
        total_discount
    end

    def total_price
        total_line_items_price - total_discount
    end
end

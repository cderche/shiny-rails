require 'test_helper'

class LineItemTest < ActiveSupport::TestCase
  # VALIDATIONS
  test "line item attributes must not be empty" do
    line_item = LineItem.new
    assert line_item.invalid?
    assert line_item.errors[:product].any?
    assert line_item.errors[:cart].any?
  end

  test "adding products" do
    @cart = carts(:one)

    # Quanity based products (existing)
    # Should increase @line_item.quantity
    # Should not increase LineItem.count
    @product    = @cart.products.where(quantity_based: true).first
    @line_item  = @cart.line_items.where(product: @product).first
    assert_difference '@line_item.quantity', 1 do
      assert_difference 'LineItem.count', 0 do
        @cart.add_product(@product).save
        @line_item.reload
      end
    end

    # Non-quantity based products (existing)
    # Should not modify anything
    @product    = @cart.products.where(quantity_based: false).first
    @line_item  = @cart.line_items.where(product: @product).first
    assert_difference '@line_item.quantity', 0 do
      assert_difference 'LineItem.count', 0 do
        @cart.add_product(@product).save
        @line_item.reload
      end
    end

    # Quantity based products (non-existing)
    # Should increase the LineItem.count
    @product = (Product.where(quantity_based: true) - @cart.products).first
    assert_difference 'LineItem.count', 1 do
      @cart.add_product(@product).save
    end

    # Non-Quantity based products (non-existing)
    # Should increase the LineItem.count
    @product = (Product.where(quantity_based: false) - @cart.products).first
    assert_difference 'LineItem.count', 1 do
      @cart.add_product(@product).save
    end
  end
end

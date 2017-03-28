require 'test_helper'

class DiscountItemTest < ActiveSupport::TestCase
  test "Adding a frequency discount will replace any prior ones" do
    @cart = carts(:one)
    @exi_f_discount = @cart.discounts.find_by(category: :frequency)
    assert_equal 1, @cart.discounts.where(category: :frequency).count

    @new_f_discount = (Discount.where(category: :frequency) - [@exi_f_discount]).first

    assert_difference 'DiscountItem.count', 0 do
      assert_difference '@cart.discounts.count', 0 do
        @discount_item = @cart.add_discount(@new_f_discount)
        @discount_item.save
      end
    end
    assert_equal @new_f_discount, @cart.discounts.find_by(category: :frequency)
  end

  test "Minimum total_price is 0" do
    @cart = carts(:one)
    assert_difference '@cart.discounts.count', 1 do
      @discount = discounts(:off100)
      @discount_item = @cart.add_discount(@discount)
      @discount_item.save
    end
    assert_equal @cart.total_line_items_price, @cart.total_discount
    assert_equal 0, @cart.total_price
  end

  test "Can't add a duplicate discount to an order" do
    @cart = carts(:one)
    @discount = @cart.discounts.first

    assert_difference '@cart.discounts.count', 0 do
      @discount_item = @cart.add_discount(@discount)
      @discount_item.save
    end
  end
end

require 'test_helper'

class DiscountItemsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @discount_item = discount_items(:one)
  end

  # test "should get index" do
  #   get discount_items_url
  #   assert_response :success
  # end
  #
  # test "should get new" do
  #   get new_discount_item_url
  #   assert_response :success
  # end
  #
  test "should not create discount_item if it exists already" do
    assert_difference 'DiscountItem.count', 0 do
      post discount_items_url, params: { discount_item: { cart_id: @discount_item.cart_id, discount_id: @discount_item.discount_id } }
    end

    assert_redirected_to cart_url(@discount_item.cart, locale: I18n.locale)
  end

  test "should create discount_item" do
    @discount = discounts(:off100)
    assert_difference 'DiscountItem.count', 1 do
      post discount_items_url, params: { discount_item: { cart_id: @discount_item.cart_id, discount_id: @discount.id } }
    end

    assert_redirected_to cart_url(@discount_item.cart, locale: I18n.locale)
  end

  # test "should show discount_item" do
  #   get discount_item_url(@discount_item)
  #   assert_response :success
  # end
  #
  # test "should get edit" do
  #   get edit_discount_item_url(@discount_item)
  #   assert_response :success
  # end

  test "should update discount_item" do
    patch discount_item_url(@discount_item), params: { discount_item: { cart_id: @discount_item.cart_id, discount_id: @discount_item.discount_id } }
    assert_redirected_to cart_url(@discount_item.cart, locale: I18n.locale)
  end

  test "should destroy discount_item" do
    @cart = @discount_item.cart
    assert_difference('DiscountItem.count', -1) do
      delete discount_item_url(@discount_item)
    end

    assert_redirected_to cart_url(@discount_item.cart, locale: I18n.locale)
  end
end

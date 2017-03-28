require 'test_helper'

class DiscountsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @discount = discounts(:coupon)
  end

  test "should get index" do
    get discounts_url
    assert_response :success
  end

  test "should get new" do
    get new_discount_url
    assert_response :success
  end

  test "should create discount" do
    @discount_attributes = {
      name_en: 'New Discount',
      description_en: 'A description',
      coupon: 'COUPON',
      category: :coupon,
      discount_type: :percentage,
      amount: 0.5
    }

    assert_difference('Discount.count') do
      post discounts_url, params: { discount: @discount_attributes }
    end

    assert_redirected_to discount_url(Discount.last, locale: I18n.locale)
  end

  test "should show discount" do
    get discount_url(@discount)
    assert_response :success
  end

  test "should get edit" do
    get edit_discount_url(@discount)
    assert_response :success
  end

  test "should update discount" do
    patch discount_url(@discount), params: { discount: { amount: @discount.amount, category: @discount.category, coupon: @discount.coupon, discount_type: @discount.discount_type } }
    assert_redirected_to discount_url(@discount, locale: I18n.locale)
  end

  test "should not destroy discount if it is being used" do
    assert_difference('Discount.count', 0) do
      delete discount_url(@discount)
    end
    assert_redirected_to discounts_url(locale: I18n.locale)
  end

  test "should destroy discount if it is unused" do
    @discount = discounts(:off100)
    assert_difference('Discount.count', -1) do
      delete discount_url(@discount)
    end

    assert_redirected_to discounts_url(locale: I18n.locale)
  end
end

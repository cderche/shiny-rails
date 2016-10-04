require 'test_helper'

class CartsControllerTest < ActionDispatch::IntegrationTest
  test "show get show" do
    get cart_url
    assert_response :success
  end
end

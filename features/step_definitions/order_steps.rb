def create_order
  cart          = FactoryGirl.create(:cart)
  address       = FactoryGirl.create(:address, cart: cart)
  order         = FactoryGirl.create(:order, cart: cart, address: address)
  notification  = FactoryGirl.create(:notification, order: order)
end

Given(/^I have "([^"]*)" orders$/) do |count|
  count.to_i.times do |n|
    create_order
  end
end

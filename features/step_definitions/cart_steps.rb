Given(/^I have a valid Cart$/) do
  @cart = Cart.create!
end

Then(/^I should have (\d+) Cart$/) do |count|
  expect(Cart.count).to eq(count.to_i)
end

Then(/^I should have a address for my Cart$/) do
  expect(@cart.address).not_to eq(nil)
end

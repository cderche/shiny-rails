Then(/^I should be redirected to a payment gateway$/) do
  expect(current_url).to include(ENV['PAYTURE_HOST'])
end

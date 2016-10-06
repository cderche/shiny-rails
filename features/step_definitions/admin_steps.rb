Given(/^there is an admin with the email "([^"]*)" and password "([^"]*)"$/) do |email, password|
  Admin.create!(email: email, password: password, password_confirmation: password)
end

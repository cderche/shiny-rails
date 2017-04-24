Given(/^I visit "([^"]*)"$/) do |path|
  visit eval(path)
end

Given(/^I click on "([^"]*)"$/) do |text|
  click_on I18n.t(text)
end

Then(/^"([^"]*)" should be visible$/) do |ref|
  expect(find(ref).visible?).to be_truthy
end

Then(/^"([^"]*)" should be hidden$/) do |ref|
  expect(find(ref, visible: false).visible?).to be_falsey
end

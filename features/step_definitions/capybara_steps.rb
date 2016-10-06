When(/^I go to "([^"]*)"$/) do |page_name|
  visit path_to(page_name)
end

When(/^I choose "([^"]*)" as the "([^"]*)"$/) do |value, field|
  choose(field, option: value)
end

When(/^I choose "([^"]*)"$/) do |field|
  choose(field)
end

When(/^I select "([^"]*)" as the "([^"]*)" date$/) do |date, field|
  date = Date.parse(date)
  select(date.year.to_s, from: "#{field}_1i")
  select(Date::MONTHNAMES[date.month], from: "#{field}_2i")
  select(date.day.to_s, from: "#{field}_3i")
  # select_date(date, from: field)
end

When(/^I select "([^"]*)" as the "([^"]*)" time$/) do |time, field|
  time = Time.parse(time)
  select(time.hour.to_s, from: "#{field}_4i")
  select(time.min.to_s, from: "#{field}_5i")
  # select_time(time, from: field)
end

When(/^I select "([^"]*)" as the "([^"]*)"$/) do |value, field|
  select(value, from: field)
end

When(/^I check "([^"]*)"$/) do |field|
  check(field)
end

When(/^I fill in "([^"]*)" as the "([^"]*)"$/) do |value, field|
  fill_in(field, with: value)
end

When(/^I press "([^"]*)"$/) do |button|
  click_button(button)
end

Then(/^I should see "([^"]*)"$/) do |text|
  page.should have_content(text)
end

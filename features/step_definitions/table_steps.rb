Then(/^I should see table "([^"]*)" with "([^"]*)" rows$/) do |table_name, count|
  count = count.to_i
  within("table##{table_name}") do
    expect(page).to have_xpath(".//tr", count: count)
  end
end

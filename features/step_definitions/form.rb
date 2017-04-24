When(/^I fill in "([^"]*)" in "([^"]*)"$/) do |value, id|
  fill_in id, with: value
end

When(/^I submit the form "([^"]*)"$/) do |ref|
  within ref do
    if page.has_css?('input[name="commit"]')
      find('input[name="commit"]').click
    elsif has_css?('button[type="submit"]')
      page.find('button[type="submit"]').click
    end
  end
end

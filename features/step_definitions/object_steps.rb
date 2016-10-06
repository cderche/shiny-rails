Then(/^I should have "([^"]*)" of "([^"]*)"$/) do |count, className|
  classModel = Object.const_get className
  expect(classModel.count).to eq(count.to_i)
end

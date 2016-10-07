require 'faker'

def create_visitor
  password = Faker::Internet.password
  @visitor = {
    email:                  Faker::Internet.email ,
    password:               password              ,
    password_confirmation:  password              ,
  }
end

def create_admin
  create_visitor
  create(:admin, @visitor)
end

def admin_sign_in
  visit path_to("admin_sign_in")
  fill_in("admin[email]", with: @visitor[:email])
  fill_in("admin[password]", with: @visitor[:password])
  click_button "Log in"
  expect(current_path).to eq(admin_dashboard_path)
end

Given(/^I have signed in as a admin$/) do
  create_admin
  admin_sign_in
end

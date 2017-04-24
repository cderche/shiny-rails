Given(/^I am a guest$/) do
  current_driver = Capybara.current_driver
  begin
    Capybara.current_driver = :rack_test
    page.driver.submit :delete, destroy_user_session_path, {}
  ensure
    Capybara.current_driver = current_driver
  end
end

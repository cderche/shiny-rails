Feature: Admin sign on
  Admin should be able to sign in

Scenario: Admin signs on and goes to dashboard
  Given there is an admin with the email "admin@example.com" and password "password"
  When I go to "admin_sign_on"
  And I fill in "admin@example.com" as the "admin[email]"
  And I fill in "password" as the "admin[password]"
  And I press "Sign In"
  Then I should see "Admin Dashboard"

Feature: Website
  Guests should be able to access the website

Scenario: Access the website
  When I go to "homepage"
  Then I should see "Welcome to Shiny!"

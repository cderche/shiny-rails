Feature: Website
  Guests should be able to build a cart

Scenario: Create a valid Cart for Cleaner
  When I go to "clean"
  And I choose "week" as the "cart[frequency]"
  And I fill in "23/11/2016" as the "cart[date]"
  And I fill in "10:30" as the "cart[time]"
  And I select "4.5" as the "cart[duration]"
  And I check "cart[ironing]"
  And I press "Reserve"
  Then I should have 1 Cart

@mechanize
Scenario: Create valid Address for a Cart
  Given I have a valid Cart
  And I go to "address"
  When I fill in "John" as the "address[firstname]"
  And I fill in "Doe" as the "address[lastname]"
  And I fill in "j@doe.com" as the "address[email]"
  And I fill in "123456789" as the "address[phone]"
  And I fill in "New Street" as the "address[street]"
  And I fill in "1" as the "address[block]"
  And I fill in "2" as the "address[house]"
  And I fill in "3" as the "address[building]"
  And I fill in "4" as the "address[apartment]"
  And I fill in "This is a note." as the "address[notes]"
  And I check "address[terms]"
  And I press "Proceed"
  Then I should be redirected to a payment gateway
  And I should have a address for my Cart

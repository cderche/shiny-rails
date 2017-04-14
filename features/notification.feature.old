Feature: Website
  Orders should only be created after card added

Scenario: Create a order based after receiving a notification
  Given I receive a notification of "CustomerAddSuccess"
  Then I should have "1" of "Notification"
  Then I should have "1" of "Order"

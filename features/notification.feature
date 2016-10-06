Feature: Website
  Orders should only be created after card added

Scenario: Create order from notification
  Given a Notification of type "CustomerAddSuccess"
  When the platform receives the Notification
  Then I should have "1" of "Notification"
  Then I should have "1" of "Order"

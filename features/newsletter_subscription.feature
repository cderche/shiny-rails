Feature: Guest can subscribe to the newsletter

  @selenium
  Scenario: Guest can subscribe to the newsletter
    Given I am a guest
    When I visit "root_path"
    Then "#newsletter_form" should be visible
    And "#newsletter_message" should be hidden
    When I fill in "guest@test.com" in "email"
    And I submit the form "#newsletter_form"
    Then "#newsletter_message" should be visible

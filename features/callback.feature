Feature: Guest can request a callback

  @selenium
  Scenario: Guest can request a callback
    Given I am a guest
    When I visit "root_path"
    Then "#callback_modal" should be hidden
    And "#callback_message" should be hidden
    When I click on "beta.section1.button2"
    Then "#callback_modal" should be visible
    When I fill in "9999999999" in "phone"
    And I submit the form "#callback_form"
    Then "#callback_message" should be visible

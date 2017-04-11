Feature: Guest can request a callback

  Scenario: Guest can request a callback
    Given I am a guest
    And I visit "beta_path"
    When I fill in "+79999999999" in "callback_phone"
    And I submit the form "callback_form"
    Then I should be visible <%= t('beta.modal1.thank_you.title') %>
    And I should be visible <%= t('beta.modal1.thank_you.subtitle') %>

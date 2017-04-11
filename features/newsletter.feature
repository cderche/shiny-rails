Feature: Guest can sign up for the newsletter

  Scenario: Guest can sign up for the newsletter
    Given I am a guest
    And I visit "beta_path"
    When I fill in "guest@guest.com" in "newsletter_email"
    And I submit the form "newsletter_form"
    Then I should be visible <%= t('beta.section6.thank_you.title') %>
    And I should be visible <%= t('beta.section6.thank_you.subtitle') %>

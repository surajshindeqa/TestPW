Feature: User Login

  Scenario: User login to Audirie with valid credentials
    Given User navigate to Audirie platform
    When User enters valid credentials
    Then User gets logged in successfully

Feature: Aged Care Simulation

  Scenario: TESTPREFIX Automated Test for Aged Care Simulation
    Given TESTPREFIX Transcript is fetched
    When TESTPREFIX User launches simulation
    Then TESTPREFIX User responds to Avatar
    Then TESTPREFIX Verify the Avatar response with expected response
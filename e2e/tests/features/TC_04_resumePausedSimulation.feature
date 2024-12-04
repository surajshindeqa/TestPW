Feature: Aged Care Simulation

Scenario: Resume a paused Aged Care simulation and pause a second time.

    Given User is logged in
    When User resumes paused Aged Care simulation
    Then Simulation should repeat the last sentence from last time.
    Then Simulation should be able to be paused.
    Then Dashboard should state simulation is paused again.
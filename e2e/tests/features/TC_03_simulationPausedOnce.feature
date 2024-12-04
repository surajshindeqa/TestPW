Feature: Aged Care Simulation

Scenario: Run through an Aged Care simulation and pause it once in the simulation.
    Given User logged in to Audirie platform
    When User launches Aged Care simulation from dashboard
    Then User respond to Avatar 
    Then User pause simulation
    Then Dashboard should state simulation is paused
Feature: Login API Testing

  Scenario: Verify login API with valid credentials
    Given I set the login API endpoint
    When I send a POST request with email "gyanaprakashkhnadual@gmail.com" and password "Gyana@123"
    Then the response status code should be 200
    And the response should contain a token

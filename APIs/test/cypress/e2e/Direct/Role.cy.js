describe('API Test for /v1/role endpoint', () => {
  it('should successfully GET role data', () => {
    cy.request({
      method: 'GET',
      url: 'https://pxxxinvsvu.us-east-1.awsapprunner.com/v1/role',
      headers: {
        // Add any required headers here
        // 'Authorization': 'Bearer your_token_here',
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      // Verify response status code
      expect(response.status).to.eq(200);
      
      
      // You can add more specific assertions based on your API's expected behavior
    });
  });

  // Add more test cases as needed, for example:
  it('should handle unauthorized requests appropriately', () => {
    cy.request({
      method: 'GET',
      url: 'https://pxxxinvsvu.us-east-1.awsapprunner.com/v1/role',
      failOnStatusCode: false, // This allows Cypress to proceed even if status is not 2xx
      headers: {
        // Omit authorization header to test unauthorized access
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      // Verify appropriate status code for unauthorized access
      // This could be 401, 403, or whatever your API returns
      expect(response.status).to.be.oneOf([401, 403]);
    });
  });
});
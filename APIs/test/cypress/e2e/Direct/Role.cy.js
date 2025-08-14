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
      
      // Verify response has body
      expect(response.body).to.not.be.null;
      
      // Verify response structure (adjust based on your actual API response)
      if (response.body.length > 0) {
        // If response is an array of roles
        expect(response.body[0]).to.have.property('id');
        expect(response.body[0]).to.have.property('name');
        // Add more properties as needed
      } else if (typeof response.body === 'object') {
        // If response is a single object
        expect(response.body).to.have.property('id');
        expect(response.body).to.have.property('name');
        // Add more properties as needed
      }
      
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
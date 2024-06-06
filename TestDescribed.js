describe('Create Account on Secure Compliance Platform', () => {
  beforeEach(() => {
    cy.visit('/signup'); // Assuming the sign-up page URL is '/signup'
  });

  it('Fill in Registration Form', () => {
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="username"]').type('testuser');
    cy.get('input[name="password"]').type('password123');
    cy.get('input[name="confirm-password"]').type('password123');
  });

  it('Submit Registration Form', () => {
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/success'); // Assuming successful registration redirects to '/success'
    cy.contains('Registration successful').should('be.visible');
  });

  after(() => {
    // Optionally include cleanup steps to delete the test account created during testing
    cy.request({
      method: 'DELETE',
      url: '/api/accounts', // Assuming an API endpoint for deleting accounts
      body: {
        username: 'testuser' // Assuming the username of the test account
      },
      headers: {
        'Authorization': 'Bearer <your_access_token>' // Include authorization token if required
      }
    }).then(response => {
      expect(response.status).to.eq(200);
    });
  });
});

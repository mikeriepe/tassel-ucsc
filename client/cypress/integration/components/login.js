describe('Login Tests', () => {
  it('Login page renders', () => {
    cy.visit('/');

    cy.get('button[aria-label="Login page button"]').click();
    cy.focused().click();
    cy.contains('Login').click();

    cy.url().should('include', '/login');
    cy.get('[aria-label="Login form"]').should('be.visible');
  });

  it('Invalid login', () => {
    cy.get('input:visible[aria-label="Input text"]').click();
    cy.get('input:visible[aria-label="Input text"]').type('invalid@yahoo.com');

    cy.get('input:visible[aria-label="Input password"]').click();
    cy.get('input:visible[aria-label="Input password"]').type('spaghettirulez');

    cy.get('button[aria-label="Login button"]').click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal('Invalid Username or Password. Please Try Again.');
    });
  });

  it('Valid login', () => {
    cy.get('input:visible[aria-label="Input text"]').clear();
    cy.get('input:visible[aria-label="Input text"]').click();
    cy.get('input:visible[aria-label="Input text"]').type('dev18@gmail.com');

    cy.get('input:visible[aria-label="Input password"]').clear();
    cy.get('input:visible[aria-label="Input password"]').click();
    cy.get('input:visible[aria-label="Input password"]').type('pass');

    cy.get('button[aria-label="Login button"]').click();
    cy.url().should('include', '/myprofile');
  });
});

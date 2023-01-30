describe('renders the homepage', () =>{
  it('renders correctly', () =>{
    cy.visit('/');
    cy.get('#landingTitle').should('exist');
  });
});

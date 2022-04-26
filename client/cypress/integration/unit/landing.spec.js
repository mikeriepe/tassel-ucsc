// Not much we can do with unit testing for front end.
// Many front end components rely on data from server
describe('renders the homepage', () =>{
  it('renders correctly', () =>{
    cy.visit('/');
    cy.get('#landingTitle').should('exist');
  });
});

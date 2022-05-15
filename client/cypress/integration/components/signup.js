describe('Signup Tests', () => {
  it('Signup page renders', () => {
    cy.visit('/');

    cy.get('button[aria-label="Signup page button"]').click();
    cy.focused().click();
    cy.contains('Join Now').click();

    cy.url().should('include', '/signup');
    cy.get('[aria-label="Signup form"]').should('be.visible');
  });

  it('Invalid signup: no inputs', () => {
    cy.get('button:visible[aria-label="Next step button"]').click();
    cy.get('button:visible[aria-label="Next step button"]').click();

    cy.get('button[aria-label="Signup button"]').click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal(
          'Required fields need to be filled or invalid inputs',
      );
    });
  });

  it('Invalid signup: incomplete inputs', () => {
    cy.get('button:visible[aria-label="Back step button"]').click();
    cy.get('button:visible[aria-label="Back step button"]').click();

    cy.get('input:visible[placeholder="Bob"]').click();
    cy.get('input:visible[placeholder="Bob"]').type('Albert');

    cy.get('input:visible[placeholder="Smith"]').click();
    cy.get('input:visible[placeholder="Smith"]').type('Einstein');

    cy.get('button:visible[aria-label="Next step button"]').click();
    cy.get('button:visible[aria-label="Next step button"]').click();

    cy.get('button[aria-label="Signup button"]').click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal(
          'Required fields need to be filled or invalid inputs',
      );
    });
  });

  it('Invalid signup: invalid inputs', () => {
    cy.get('button:visible[aria-label="Back step button"]').click();

    cy.contains('Invalid UCSC email').should('not.be.visible');
    cy.get('input:visible[placeholder="bobsmith@ucsc.edu"]').click();
    cy.get('input:visible[placeholder="bobsmith@ucsc.edu"]').type('invalid');
    cy.contains('Invalid UCSC email').should('be.visible');

    cy.contains('Invalid graduation year').should('not.be.visible');
    cy.get('input:visible[placeholder="1997"]').click();
    cy.get('input:visible[placeholder="1997"]').type('invalid');
    cy.contains('Invalid graduation year').should('be.visible');

    cy.get('button:visible[aria-label="Next step button"]').click();

    cy.contains('Invalid email').should('not.be.visible');
    cy.get('input:visible[placeholder="bobsmith@gmail.com"]').click();
    cy.get('input:visible[placeholder="bobsmith@gmail.com"]').type('invalid');
    cy.contains('Invalid email').should('be.visible');

    cy.contains('8+ Characters, 1 Capital Letter').should('not.be.visible');
    cy.get('input:visible[placeholder="8+ Characters, 1 Capital Letter"]')
        .click();
    cy.get('input:visible[placeholder="8+ Characters, 1 Capital Letter"]')
        .type('invalid');
    cy.contains('8+ Characters, 1 Capital Letter').should('be.visible');

    cy.get('button[aria-label="Signup button"]').click();
    cy.on('window:alert', (text) => {
      expect(text).to.equal(
          'Required fields need to be filled or invalid inputs',
      );
    });
  });

  it('Valid signup', () => {
    cy.get('input:visible[aria-label="Input text"]').clear();
    cy.get('input:visible[aria-label="Input password"]').clear();

    cy.get('button:visible[aria-label="Back step button"]').click();

    cy.get('input:visible[aria-label="Input text"]').clear({multiple: true});

    cy.get('button:visible[aria-label="Back step button"]').click();

    cy.get('input:visible[aria-label="Input text"]').clear({multiple: true});

    cy.get('input:visible[placeholder="Bob"]').click();
    cy.get('input:visible[placeholder="Bob"]').type('Abe');

    cy.get('input:visible[placeholder="Smith"]').click();
    cy.get('input:visible[placeholder="Smith"]').type('Lincoln');

    cy.get('button:visible[aria-label="Next step button"]').click();

    cy.get('input:visible[placeholder="bobsmith@ucsc.edu"]').click();
    cy.get('input:visible[placeholder="bobsmith@ucsc.edu"]').type('a@ucsc.edu');
    cy.contains('Invalid UCSC email').should('not.be.visible');

    cy.get('input:visible[placeholder="1997"]').click();
    cy.get('input:visible[placeholder="1997"]').type('1997');
    cy.contains('Invalid graduation year').should('not.be.visible');

    cy.get('button:visible[aria-label="Next step button"]').click();

    cy.get('input:visible[placeholder="bobsmith@gmail.com"]').click();
    cy.get('input:visible[placeholder="bobsmith@gmail.com"]')
        .type('a@gmail.com');
    cy.contains('Invalid email').should('not.be.visible');

    cy.contains('8+ Characters, 1 Capital Letter').should('not.be.visible');
    cy.get('input:visible[placeholder="8+ Characters, 1 Capital Letter"]')
        .click();
    cy.get('input:visible[placeholder="8+ Characters, 1 Capital Letter"]')
        .type('Abelincolnrulez');
  });
});

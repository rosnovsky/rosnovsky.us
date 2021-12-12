// eslint-disable-next-line prettier/prettier
export {};

context('Home Page', () => {
  it('has no accessibility violations on load', () => {
    cy.visit(`http://localhost:3000`);
    cy.injectAxe();
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'check' does not exist on type 'ReturnType<... Remove this comment to see the full error message
    cy.checkA11y(null, {
      includedImpacts: ['critical'],
    });
  });
  it('has correct title', () => {
    cy.get('h1').should('contain', 'Rosnovsky Park™');
  });
  it('has 5 main menu items', () => {
    cy.get('[data-test="menu-item"]').should('have.length', 5);
  });
  it('all 5 main menu work', () => {
    cy.get('[aria-label="Home"]').click();
    cy.url().should('include', '/');

    cy.get('[aria-label="Blog"]').click();
    cy.url().should('include', '/blog');
    cy.get('[aria-label="Home"]').click();

    cy.get('[aria-label="About"]').click();
    cy.url().should('include', '/about');
    cy.get('[aria-label="Home"]').click();

    cy.get('[aria-label="Stats"]').click();
    cy.url().should('include', '/stats');
    cy.get('[aria-label="Home"]').click();

    // Figure out how we test Auth0 here
    // cy.get('[aria-label="Login"]').click();
    // cy.url().should('include', 'https://auth.rosnovsky.us/u/login/identifier');
    // cy.go('back');
  });
  it('has dark mode toggle working', () => {
    cy.get('html').should('have.class', 'light');
    cy.get('[data-testid="toggle-btn"]').click();
    cy.get('html').should('have.class', 'dark');
    cy.get('[data-testid="toggle-btn"]').click();
    cy.get('html').should('have.class', 'light');
  });

  // it('has Featured Posts', () => {
  //   cy.get('[aria-label="Featured Posts"]').should('have.length', 1);
  //   userEvent.tab();
  // });

  // it('has Featured Projects', () => {
  //   cy.get('[aria-label="Featured Projects"]').should('have.length', 1);
  //   userEvent.tab();
  // });

  // it('has Subscribe card', () => {
  //   cy.get('[aria-label="Subscribe Card"]').should('have.length', 1);
  //   userEvent.tab();
  // });

  // it('has Last Played widget', () => {
  //   cy.get('[aria-label="Last Played"]').should('have.length', 1);
  //   userEvent.tab();
  // });

  // it('has correct footer', () => {
  //   cy.get('footer').should('have.length', 1);
  //   cy.get('footer').should('contain', 'Rosnovsky Park™');
  //   cy.get('footer').should('contain', '© 2021');
  //   cy.get('footer').should('contain', 'All rights reserved');
  // });

  it('has Status indicator', () => {
    cy.get('[data-testid="status-indicator"]').should('have.length', 1);
  });

  //   it('has correct copyright', () => {
  //     cy.get('footer').should('contain', 'Rosnovsky Park™');
  //     cy.get('footer').should('contain', '© 2021');
  //     cy.get('footer').should('contain', 'All rights reserved');
  //   });

  //   it('has correct social media links', () => {
  //     cy.get('[aria-label="Twitter"]').should('have.length', 1);
  //     cy.get('[aria-label="Facebook"]').should('have.length', 1);
  //     cy.get('[aria-label="Instagram"]').should('have.length', 1);
  //     cy.get('[aria-label="YouTube"]').should('have.length', 1);
  //   });

  //   it('has Stillaguamish Land acknowledgement', () => {
  //     cy.get('[aria-label="Stillaguamish Land"]').should('have.length', 1);
  //   });
  // });
});

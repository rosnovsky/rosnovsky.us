/// <reference types="cypress"/>

context('Land Page Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Land page is reacheable form the Home Page', () => {
    cy.viewport(1280, 720);
    cy.get('#land').contains('Land Acknowledgment', { timeout: 5000 }).click();
    cy.url().should('include', '/land');
    cy.screenshot({ capture: 'fullPage', overwrite: true });
  });
});

export {};

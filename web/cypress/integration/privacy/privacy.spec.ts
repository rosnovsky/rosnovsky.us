/// <reference types="cypress"/>

context('Privacy Page Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Privacy page is reacheable form the Home Page', () => {
    cy.get('#menu').contains('Privacy', { timeout: 3000 }).click();
    cy.url().should('include', '/privacy');
  });
});

export {};

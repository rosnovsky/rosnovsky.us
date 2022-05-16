/// <reference types="cypress"/>

context('About Page Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('About page is reacheable form the Home Page', () => {
    cy.get('#menu').contains('About', { timeout: 3000 }).click();
    cy.url().should('include', '/about');
  });
});

export {};

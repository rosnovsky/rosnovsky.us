/// <reference types="cypress"/>

context('Hiking Map Page Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Hiking Map page is reacheable form the Home Page', () => {
    cy.get('#footer-menu').contains('Hiking Map', { timeout: 5000 }).click();
    cy.url().should('include', '/maps/hikes');
  });
});

export {};

/// <reference types="cypress"/>

context('Page Not Page Tests', () => {
  it('should render the 404 page if Page not found', () => {
    cy.visit('http://localhost:3000/randomPage', { failOnStatusCode: false });
    cy.get('h2').contains('Page Not Found');
  });

  it('should render the 404 page if Post not found', () => {
    cy.visit('http://localhost:3000/blog/randomPost', {
      failOnStatusCode: false,
    });
    cy.get('h2').contains('Page Not Found');
  });

  it('should render the 404 page if Category not found', () => {
    cy.visit('http://localhost:3000/category/randomCategory', {
      failOnStatusCode: false,
    });
    cy.get('h2').contains('Page Not Found');
  });
});

export {};

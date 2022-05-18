/// <reference types="cypress"/>

context('Blog Page Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/blog');
  });

  it('should render 8 blog posts', () => {
    cy.get('#blogPosts').children().should('have.length', 8);
  });
});

export {};

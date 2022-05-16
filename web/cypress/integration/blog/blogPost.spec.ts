/// <reference types="cypress"/>

context('Blog Post Page Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/blog/journaling');
  });

  it('renders Journaling blog post page', () => {
    cy.get('h2').should('contain', 'Journaling');
  });
});

export {};

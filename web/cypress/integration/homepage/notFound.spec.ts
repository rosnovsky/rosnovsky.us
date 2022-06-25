/// <reference types="cypress"/>

context('Page Not Page Tests', () => {
  it('should render the 404 page if Page not found', () => {
    cy.visit('http://localhost:3000/randomPage', { failOnStatusCode: false });
    cy.get('h2').contains('Oh no! Error 404');
  });

  it('should render the 404 page if Post not found', () => {
    cy.visit('http://localhost:3000/blog/randomPost', {
      failOnStatusCode: false,
    });
    cy.get('h2').contains('Oh no! Error 404');
  });

  it('should render the 404 page if Category not found', () => {
    cy.visit('http://localhost:3000/category/randomCategory', {
      failOnStatusCode: false,
    });
    cy.get('h2').contains('Oh no! Error 404');
  });
  it('should render the 404 page if Book not found', () => {
    cy.visit('http://localhost:3000/library/book/123', {
      failOnStatusCode: false,
    });
    cy.get('h2').contains('Oh no! Error 404');
  });
  it('should render the 404 page if Author not found', () => {
    cy.visit('http://localhost:3000/library/author/randomAuthor', {
      failOnStatusCode: false,
    });
    cy.get('h2').contains('Oh no! Error 404');
  });
  it('should render the 404 page if Publisher not found', () => {
    cy.visit('http://localhost:3000/library/publisher/randomPublisher', {
      failOnStatusCode: false,
    });
    cy.get('h2').contains('Oh no! Error 404');
  });
});

export {};

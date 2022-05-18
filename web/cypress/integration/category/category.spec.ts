/// <reference types="cypress"/>

context('Category Page Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/category/blog');
  });

  it('should render the Category Page', () => {
    cy.get('h1').contains('Rosnovsky Park');
  });

  it('should render the Nav Bar according to viewport', () => {
    cy.viewport(720, 500);
    const menuSmall = cy.get('#menu').children();

    menuSmall.should('contain', 'Blog');
    menuSmall.should('contain', 'About');
    menuSmall.should('contain', 'Log In', { timeout: 2000 });
    cy.get('#menu').children().contains('Privacy').should('not.be.visible');
    cy.get('#menu').children().contains('Land').should('not.be.visible');

    cy.viewport(1000, 900);
    const menu = cy.get('#menu').children();

    menu.should('contain', 'Blog').should('be.visible');
    menu.should('contain', 'About').should('be.visible');
    menu.should('contain', 'Privacy').should('be.visible');
    menu.should('contain', 'Log In').should('be.visible');
    cy.get('#menu').children().contains('Land').should('not.be.visible');

    cy.viewport(1920, 1080);
    const menuLarge = cy.get('#menu').children();

    menuLarge.should('contain', 'Blog').should('be.visible');
    menuLarge.should('contain', 'About').should('be.visible');
    menuLarge.should('contain', 'Privacy').should('be.visible');
    menuLarge.should('contain', 'Land').should('be.visible');
    menuLarge.should('contain', 'Log In').should('be.visible');
  });

  it('should render the Blog heading', () => {
    cy.get('h2').contains('Rosnovsky Park™ Blog');
  });

  it('should render the Search Bar', () => {
    cy.get('input[type="search"]').should(
      'have.attr',
      'placeholder',
      'Looking for something?'
    );
  });
  it('should render 15 blog posts', () => {
    cy.get('#blogPosts').children().should('have.length', 15);
  });

  it('should render the Newsletter section', () => {
    cy.get('#newsletterSection').should('exist');
  });

  it('should render the Stats section', () => {
    cy.get('#stats').children().should('have.length', 4);
  });

  it('should render the Footer section', () => {
    cy.get('#footer').should('exist');
  });
});

export {};

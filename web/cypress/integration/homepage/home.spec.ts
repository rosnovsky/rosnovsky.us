/// <reference types="cypress"/>

context('Home Page Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should render the home', () => {
    cy.get('h1').contains('Rosnovsky Park');
    cy.screenshot({ capture: 'fullPage', overwrite: true });
  });

  it('should render the Nav Bar according to viewport', () => {
    cy.viewport(720, 500);
    const menuSmall = cy.get('#menu').children();

    cy.get('#menu').screenshot('menu/viewport/small', {
      capture: 'fullPage',
      overwrite: true,
    });
    menuSmall.should('contain', 'Blog');
    menuSmall.should('contain', 'About');
    menuSmall.should('contain', 'Log In', { timeout: 2000 });
    cy.get('#menu').children().contains('Hiking Map').should('not.be.visible');

    cy.viewport(1000, 900);
    const menu = cy.get('#menu').children();
    cy.get('#menu').screenshot('menu/viewport/normal', {
      capture: 'fullPage',
      overwrite: true,
    });

    menu.should('contain', 'Blog').should('be.visible');
    menu.should('contain', 'About').should('be.visible');
    menu.should('contain', 'Log In').should('be.visible');
    menu.should('contain', 'Hiking Map').should('be.visible');

    cy.viewport(1920, 1080);
    const menuLarge = cy.get('#menu').children();
    cy.get('#menu').screenshot('menu/viewport/large', {
      capture: 'fullPage',
      overwrite: true,
    });
    menuLarge.should('contain', 'Blog').should('be.visible');
    menuLarge.should('contain', 'About').should('be.visible');
    menuLarge.should('contain', 'Hiking Map').should('be.visible');
    menuLarge.should('contain', 'Log In').should('be.visible');
  });

  it('should render the Welcome section', () => {
    cy.get('h2')
      .contains("Hi, I'm Art. We need to talk.")
      .should('exist')
      .screenshot({ capture: 'fullPage', overwrite: true });
    cy.get('#welcome')
      .contains(
        "Or maybe we don't. In any case, I write about web development, hiking, and random hobbies I pick up every now and then."
      )
      .should('exist')
      .screenshot({ capture: 'fullPage', overwrite: true });
    cy.findByRole('button', { name: /Check it out/i })
      .should('exist')
      .screenshot({ capture: 'fullPage', overwrite: true });
    cy.findByRole('presentation')
      .should('exist')
      .screenshot({ capture: 'fullPage', overwrite: true });
    cy.get('#ukrainianFlag')
      .should('exist')
      .screenshot({ capture: 'fullPage', overwrite: true });
  });

  it('should render the Blog heading', () => {
    cy.get('h2')
      .contains('Rosnovsky Park™ Blog')
      .screenshot({ capture: 'fullPage', overwrite: true });
  });

  it('should render the Search Bar', () => {
    cy.get('input[type="search"]').should(
      'have.attr',
      'placeholder',
      'Looking for something?'
    );
    cy.get('input[type="search"]')
      .parent()
      .parent()
      .screenshot({ capture: 'fullPage', overwrite: true });
  });

  it('should render 6 blog posts', () => {
    cy.get('#blogPosts').children().should('have.length', 6);
    cy.get('#blogPosts').screenshot({ capture: 'fullPage', overwrite: true });
  });

  it('should render the Newsletter section', () => {
    cy.get('#newsletterSection')
      .should('exist')
      .screenshot({ capture: 'fullPage', overwrite: true });
  });

  it('should render the Stats section', () => {
    cy.get('#stats').children().should('have.length', 4);
    cy.get('#stats').screenshot({ capture: 'fullPage', overwrite: true });
  });

  it('should render the Footer section', () => {
    cy.get('#footer')
      .should('exist')
      .screenshot({ capture: 'fullPage', overwrite: true });
  });
});

export {};

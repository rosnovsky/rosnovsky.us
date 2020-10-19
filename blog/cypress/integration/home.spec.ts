import { assert } from "console"

describe('Home page renders', () => {
  it('should render Rosnovsky Park', () => {
    cy.visit('/')
    cy.contains('a', "Archive")
    cy.contains('h1',"Rosnovsky Park™")
    cy.contains('a',"Rosnovsky Park™")
  })
  it('home page should contain 6 blog posts', () => {
    cy.visit('/')
    cy.contains("Latest blog posts")
    .siblings(1).children().should('have.length', 7)
  })
  it('should have working Archive link', () => {
    cy.visit('/')
    cy.contains('a', 'Archive')
    .click()
    cy.location().should((loc) => {
    expect(loc.pathname).to.eq('/archive/')
    })
  })
  it('Archive page has at least 6 blog posts', () => {
    cy.visit('/archive')
    cy.get('.blog-post-preview-grid-module--grid--2Cso-')
    .children().its('length').should('be.gte', 6)
  })
  it('should include copyright notice', () => {
    cy.visit('/')
    cy.contains(`© 2003-${new Date().getFullYear()}, Art Rosnovsky`)
    })
})

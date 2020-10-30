describe('Home page renders', () => {
  it('should render Rosnovsky Park', () => {
    cy.visit('/')
    cy.contains('a', "Archive")
    cy.contains('h1',"Rosnovsky Park")
    cy.contains('a',"Rosnovsky Park")
  })
  it('home page should contain 6 blog posts', () => {
    cy.visit('/')
    cy.contains("Latest blog posts")
    .siblings(1).children().its('length').should('be.gte', 10)
  })
  it('home page includes Covid Tracker', () => {
    cy.visit('/')
    cy.contains("COVID-19: US Stats")
    .siblings(1).children().children().should('have.length', 3)
  })
  it('should have working Archive link', () => {
    cy.visit('/')
    cy.contains('a', 'Archive')
    .click()
    cy.location().should((loc) => {
    expect(loc.pathname).to.eq('/archive')
    })
  })
  it('Archive page has at least 6 blog posts', () => {
    cy.visit('/archive')
    cy.contains('h1', "Archive")
    .get('.mt-12').children().its('length').should('be.gte', 10)
  })
  it('should include copyright notice', () => {
    cy.visit('/')
    cy.contains(`© 2003-${new Date().getFullYear()}, Art Rosnovsky`)
    })
})

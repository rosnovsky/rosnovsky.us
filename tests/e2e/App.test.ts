context("App page", () => {
  beforeEach(() => {
    cy.visit(`http://0.0.0.0:1234`)
    cy.injectAxe()
    cy.wait(100)
  })
  it("has no accessibility violations on load", () => {
    cy.checkA11y()
  })
  it("has a header which can be minimized", () => {
    cy.get("[aria-label='Hide header']").focus().click()

    cy.focused().should('have.attr', 'data-testid', 'main')

  })
})

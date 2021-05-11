/// <reference types="cypress" />

context('app', () => {
  beforeEach(() => {
    cy.visit(`http://zj9495:zj9495@localhost:8888/transmission/web`)
    cy.verifyConnected()
  })

  it('should use the auto theme at first boot', () => {
    cy.clearLocalStorage();
    cy.reload();
    cy.getByTestId("theme-toggle-button").find("[data-test-id=auto]").should('be.exist');
  })
})
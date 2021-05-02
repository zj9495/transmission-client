/// <reference types="cypress" />

context('app', () => {
  beforeEach(() => {
    cy.visit(`http://zj9495:zj9495@localhost:8888/transmission/web`)
  })

  it('boot', () => {
    cy.verifyConnected()
  })
})
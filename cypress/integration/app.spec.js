/// <reference types="cypress" />

context('app', () => {
  beforeEach(() => {
    cy.visit('http://zj9495:zj9495@localhost:3000/transmission-client')
  })

  it('boot', () => {
    cy.contains('Transmission')
  })
})
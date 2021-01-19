/// <reference types="cypress" />

context('i18n', () => {
  beforeEach(() => {
    cy.visit(`http://zj9495:zj9495@localhost:8888/transmission-client`)
  })

  it('test', () => {
    cy.contains('Transmission')
    cy.get('#switch-language').click()
    cy.get('#lang-item-en').click()
  })
})
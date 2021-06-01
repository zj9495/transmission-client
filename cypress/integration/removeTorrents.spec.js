/// <reference types="cypress" />

import { addTestTorrent } from "./common"
import { TEST_TORRENT } from "../fixtures/constants"

context('app', () => {
  beforeEach(() => {
    cy.visit(`http://zj9495:zj9495@localhost:8888/transmission/web`)
    cy.verifyConnected()
  })

  it('remove torrent', () => {
    addTestTorrent()

    cy.contains(TEST_TORRENT.NAME).closest('.MuiDataGrid-row').find('input[type=checkbox]').check()
    cy.getByTestId('delete-btn').click()
    cy.contains('Remove confirm')
    cy.get('[data-testid=delete-local-data] [type=checkbox]').check()
    cy.contains('OK').click()
    cy.contains('Removing...')
    cy.contains('Successfully removed!')
    cy.contains(TEST_TORRENT.NAME).should('not.exist')
  })

  it('should clear the selection after by multiple delete', () => {
    addTestTorrent()
    
    cy.contains(TEST_TORRENT.NAME).closest('.MuiDataGrid-row').find('input[type=checkbox]').check()
    cy.get('.MuiDataGrid-columnsContainer input[type=checkbox]').should('be.checked')

    cy.getByTestId('delete-btn').click()
    cy.contains('Remove confirm')
    cy.get('[data-testid=delete-local-data] [type=checkbox]').check()
    cy.contains('OK').click()
    cy.contains('Successfully removed!')

    cy.get('.MuiDataGrid-columnsContainer input[type=checkbox]').should('not.checked')
    cy.getByTestId('delete-btn').should('be.disabled')
  })
})
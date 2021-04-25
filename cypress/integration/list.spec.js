/// <reference types="cypress" />

import { removeTestTorrent, addTestTorrent } from "./common"
import { TEST_TORRENT } from "../fixtures/constants"

context('test torrent list', () => {
  beforeEach(() => {
    cy.visit(`http://zj9495:zj9495@localhost:8888/transmission-client`)
    cy.verifyConnected()
    addTestTorrent(false)
  })

  afterEach(() => {
    removeTestTorrent()
  })

  it('should format ratio if ratio < 0', () => {
    cy.contains(TEST_TORRENT.NAME).closest('.MuiDataGrid-row').find('[data-field=uploadRatio]').contains('0')
  })
})
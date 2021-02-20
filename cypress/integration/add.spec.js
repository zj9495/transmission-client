/// <reference types="cypress" />
import locale from "../../src/i18n/lang/en"

const DOWNLOAD_DIR = "/downloads/complete"
const TORRENT = {
  URL: "https://www.hdarea.co/download.php?id=39380&passkey=ddeb644cd5dac0c3c3b00152e415fdf8",
  NAME: "Beethoven - Piano Trio in C minor, Triple Concerto [Oborin, Oistrakh, Knushevitskiy] (2011) [FLAC]"
}

context('app', () => {
  beforeEach(() => {
    cy.visit(`http://zj9495:zj9495@localhost:8888/transmission-client`)
    cy.verifyConnected()
  })

  it('test add a torrent from url', () => {
    cy.getByTestId('add-btn').click()
    cy.contains(locale["toolbar.addTorrent"])
    cy.getByTestId('download-dir').clear()
    cy.getByTestId('download-dir').type(DOWNLOAD_DIR)
    cy.getByTestId('torrent-link').type(TORRENT.URL)
    cy.getByTestId('add-form-submit').click()
    cy.contains('[data-testid=message-bar]', locale["message.adding"])
    cy.contains('[data-testid=message-bar]', locale["message.added"])
    cy.contains(TORRENT.NAME)

    // remove torrent
    cy.contains(TORRENT.NAME).closest('.MuiDataGrid-row').find('input[type=checkbox]').check()
    cy.getByTestId('delete-btn').click()
  })
})
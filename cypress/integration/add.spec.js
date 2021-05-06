/// <reference types="cypress" />

import { removeTestTorrent } from "./common"

const DOWNLOAD_DIR = "/downloads/complete"
const TORRENT = {
  URL: "https://www.hdarea.co/download.php?id=39380&passkey=ddeb644cd5dac0c3c3b00152e415fdf8",
  NAME: "Beethoven - Piano Trio in C minor, Triple Concerto [Oborin, Oistrakh, Knushevitskiy] (2011) [FLAC]"
}

context('app', () => {
  beforeEach(() => {
    cy.visit(`http://zj9495:zj9495@localhost:8888/transmission/web`)
    cy.verifyConnected()
  })

  it('test add a torrent from url - basic mode', () => {
    cy.getByTestId('add-btn').click()
    cy.contains('Add Torrent')
    cy.getByTestId('download-dir').clear()
    cy.getByTestId('download-dir').type(DOWNLOAD_DIR)
    cy.getByTestId('torrent-link').type(TORRENT.URL)
    cy.get('[data-testid=advanced-mode]').uncheck()
    cy.contains('OK').click()
    cy.contains('Adding...')
    cy.contains('Successfully added!')
    cy.contains(TORRENT.NAME)
    cy.contains(TORRENT.NAME).closest('.MuiDataGrid-row').find('[data-field=status]').contains('Downloading')

    // should remove the test torrent before exit
    removeTestTorrent()
  })

  it('test add a torrent from url - advanced mode', () => {
    cy.getByTestId('add-btn').click()
    cy.contains('Add Torrent')
    cy.getByTestId('download-dir').clear()
    cy.getByTestId('download-dir').type(DOWNLOAD_DIR)
    cy.getByTestId('torrent-link').type(TORRENT.URL)
    cy.get('[data-testid=advanced-mode]').check()
    cy.contains('Next').click()
    cy.contains('Adding...')
    cy.contains(TORRENT.NAME)
    cy.contains('Paused')
    // cy.contains(TORRENT.NAME).closest('.MuiDataGrid-row').find('[data-field=status]').contains('Paused')
    cy.contains('OK').click()
    cy.contains(TORRENT.NAME).closest('.MuiDataGrid-row').find('[data-field=status]').contains('Downloading')

    // should remove the test torrent before exit
    removeTestTorrent()
  })

  it('should remove the torrent after cancel download - advanced mode', () => {
    cy.getByTestId('add-btn').click()
    cy.contains('Add Torrent')
    cy.getByTestId('download-dir').clear()
    cy.getByTestId('download-dir').type(DOWNLOAD_DIR)
    cy.getByTestId('torrent-link').type(TORRENT.URL)
    cy.get('[data-testid=advanced-mode]').check()
    cy.contains('Next').click()
    cy.contains('Adding...')
    cy.contains(TORRENT.NAME)
    cy.contains('Cancel').click()
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
    cy.contains(TORRENT.NAME).should('not.exist')
  })

  it('test auto start - basic mode', () => {
    cy.getByTestId('add-btn').click()
    cy.contains('Add Torrent')
    cy.getByTestId('download-dir').clear()
    cy.getByTestId('download-dir').type(DOWNLOAD_DIR)
    cy.getByTestId('torrent-link').type(TORRENT.URL)
    cy.get('[data-testid=advanced-mode]').uncheck()
    cy.get('[data-testid=auto-start]').check()
    cy.contains('OK').click()
    cy.contains('Adding...')
    cy.contains('Successfully added!')
    cy.contains(TORRENT.NAME)
    cy.contains(TORRENT.NAME).closest('.MuiDataGrid-row').find('[data-field=status]').contains('Downloading')

    // should remove the test torrent before exit
    removeTestTorrent()
  })

  it('test disable auto start - basic mode', () => {
    cy.getByTestId('add-btn').click()
    cy.contains('Add Torrent')
    cy.getByTestId('download-dir').clear()
    cy.getByTestId('download-dir').type(DOWNLOAD_DIR)
    cy.getByTestId('torrent-link').type(TORRENT.URL)
    cy.get('[data-testid=advanced-mode]').uncheck()
    cy.get('[data-testid=auto-start]').uncheck()
    cy.contains('OK').click()
    cy.contains('Adding...')
    cy.contains('Successfully added!')
    cy.contains(TORRENT.NAME)
    cy.contains(TORRENT.NAME).closest('.MuiDataGrid-row').find('[data-field=status]').contains('Paused')

    // should remove the test torrent before exit
    removeTestTorrent()
  })

  it('test auto start - advanced mode', () => {
    cy.getByTestId('add-btn').click()
    cy.contains('Add Torrent')
    cy.getByTestId('download-dir').clear()
    cy.getByTestId('download-dir').type(DOWNLOAD_DIR)
    cy.getByTestId('torrent-link').type(TORRENT.URL)
    cy.get('[data-testid=advanced-mode]').check()
    cy.contains('Next').click()
    cy.contains('Adding...')
    cy.contains(TORRENT.NAME)
    cy.contains('Paused')
    // cy.contains(TORRENT.NAME).closest('.MuiDataGrid-row').find('[data-field=status]').contains('Paused')
    cy.get('[data-testid=auto-start]').check({ force: true })
    cy.contains('OK').click()
    cy.contains(TORRENT.NAME).closest('.MuiDataGrid-row').find('[data-field=status]').contains('Downloading')

    // should remove the test torrent before exit
    removeTestTorrent()
  })

  it('test disable auto start - advanced mode', () => {
    cy.getByTestId('add-btn').click()
    cy.contains('Add Torrent')
    cy.getByTestId('download-dir').clear()
    cy.getByTestId('download-dir').type(DOWNLOAD_DIR)
    cy.getByTestId('torrent-link').type(TORRENT.URL)
    cy.get('[data-testid=advanced-mode]').check()
    cy.contains('Next').click()
    cy.contains('Adding...')
    cy.contains(TORRENT.NAME)
    cy.contains('Paused')
    // cy.contains(TORRENT.NAME).closest('.MuiDataGrid-row').find('[data-field=status]').contains('Paused')
    cy.get('[data-testid=auto-start]').uncheck({ force: true })
    cy.contains('OK').click()
    cy.contains(TORRENT.NAME).closest('.MuiDataGrid-row').find('[data-field=status]').contains('Paused')

    // should remove the test torrent before exit
    removeTestTorrent()
  })
})
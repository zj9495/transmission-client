/// <reference types="cypress" />

import { DOWNLOAD_DIR, TEST_TORRENT } from "../../fixtures/constants"

export const addTestTorrent = (autoStart = true) => {
  cy.getByTestId("add-btn").click();
  cy.getByTestId("download-dir").clear();
  cy.getByTestId("download-dir").type(DOWNLOAD_DIR);
  cy.getByTestId("torrent-link").type(TEST_TORRENT.URL);
  cy.get("[data-testid=advanced-mode]").uncheck();
  if (autoStart) {
    cy.get("[data-testid=auto-start]").check();
  } else {
    cy.get("[data-testid=auto-start]").uncheck();
  }
  cy.get("[data-testid=auto-start]").uncheck();
  cy.contains("OK").click();
  cy.contains("Successfully added!");
  cy.contains(TEST_TORRENT.NAME);
};

export const removeTestTorrent = () => {
  cy.contains(TEST_TORRENT.NAME).closest('.MuiDataGrid-row').find('input[type=checkbox]').check()
  cy.getByTestId('delete-btn').click()
  cy.get('[data-testid=delete-local-data] [type=checkbox]').check()
  cy.contains('OK').click()
  cy.contains(TEST_TORRENT.NAME).should('not.exist')
};

export const getUrl = () => {
  console.log('TEST_URL: ');
  const { env } = Cypress
  // result example: protocol://user:password@host:port/path
  return `${env('protocol')}://${env('user')}:${env('password')}@${env('host')}:${env('port')}${env('path')}`
}

export const TEST_URL = getUrl()
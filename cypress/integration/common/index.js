/// <reference types="cypress" />

import { DOWNLOAD_DIR, TEST_TORRENT } from "../../fixtures/constants"

export const addTestTorrent = () => {
  cy.getByTestId("add-btn").click();
  cy.getByTestId("download-dir").clear();
  cy.getByTestId("download-dir").type(DOWNLOAD_DIR);
  cy.getByTestId("torrent-link").type(TEST_TORRENT.URL);
  cy.get("[data-testid=advanced-mode] [type=checkbox]").uncheck();
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
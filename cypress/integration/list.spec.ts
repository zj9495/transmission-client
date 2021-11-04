/// <reference types="cypress" />

import { removeTestTorrent, addTestTorrent, TEST_URL } from "./common";
import { TEST_TORRENT, COLUMNS } from "../fixtures/constants";

context("test torrent list", () => {
  beforeEach(() => {
    cy.visit(TEST_URL);
    cy.verifyConnected();
  });

  it("should format ratio if ratio < 0", () => {
    addTestTorrent(false);

    cy.getByTestId("torrent-table")
      .contains(TEST_TORRENT.NAME)
      .closest(".MuiDataGrid-row")
      .find("[data-field=uploadRatio]")
      .contains("0");

    removeTestTorrent();
  });

  it("test the default display columns", () => {
    cy.viewport(1920, 1080);

    COLUMNS.DISPLAY.forEach((name) => {
      // should be display
      cy.get(`[data-field=${name}]`).should("be.exist");
    });
    COLUMNS.HIDE.forEach((name) => {
      // should not be display
      cy.get(`[data-field=${name}]`).should("not.exist");
    });
  });
});

/// <reference types="cypress" />

import { removeTestTorrent, TEST_URL } from "./common";
import { TEST_TORRENT, TEST_TORRENT_2 } from "../fixtures/constants";

const DOWNLOAD_DIR = "/downloads/complete";

context("app", () => {
  beforeEach(() => {
    cy.visit(TEST_URL);
    cy.verifyConnected();
  });

  it("test add a torrent from url - basic mode", () => {
    cy.getByTestId("add-btn").click();
    cy.contains("Add Torrent");
    cy.getByTestId("download-dir").clear();
    cy.getByTestId("download-dir").type(DOWNLOAD_DIR);
    cy.getByTestId("torrent-link").type(TEST_TORRENT.URL);
    cy.getByTestId("advanced-mode").uncheck();
    cy.contains("OK").click();
    cy.contains("Adding...");
    cy.contains("Successfully added!");
    cy.getByTestId("torrent-table").contains(TEST_TORRENT.NAME);
    cy.getByTestId("torrent-table")
      .contains(TEST_TORRENT.NAME)
      .closest(".MuiDataGrid-row")
      .find("[data-field=status]")
      .contains("Downloading");

    // should remove the test torrent before exit
    removeTestTorrent();
  });

  it("test add a torrent from url - advanced mode", () => {
    cy.getByTestId("add-btn").click();
    cy.contains("Add Torrent");
    cy.getByTestId("download-dir").clear();
    cy.getByTestId("download-dir").type(DOWNLOAD_DIR);
    cy.getByTestId("torrent-link").type(TEST_TORRENT.URL);
    cy.getByTestId("advanced-mode").check();
    cy.contains("Next").click();
    cy.contains("Adding...");
    cy.getByTestId("torrent-table").contains(TEST_TORRENT.NAME);
    cy.contains("Paused");
    // cy.getByTestId("torrent-table").contains(TEST_TORRENT.NAME).closest('.MuiDataGrid-row').find('[data-field=status]').contains('Paused')
    cy.contains("OK").click();
    cy.getByTestId("torrent-table")
      .contains(TEST_TORRENT.NAME)
      .closest(".MuiDataGrid-row")
      .find("[data-field=status]")
      .contains("Downloading");

    // should remove the test torrent before exit
    removeTestTorrent();
  });

  it("should remove the torrent after cancel download - advanced mode", () => {
    cy.getByTestId("add-btn").click();
    cy.contains("Add Torrent");
    cy.getByTestId("download-dir").clear();
    cy.getByTestId("download-dir").type(DOWNLOAD_DIR);
    cy.getByTestId("torrent-link").type(TEST_TORRENT.URL);
    cy.getByTestId("advanced-mode").check();
    cy.contains("Next").click();
    cy.contains("Adding...");
    cy.getByTestId("torrent-table").contains(TEST_TORRENT.NAME);
    cy.contains("Cancel").click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(3000);
    cy.getByTestId("torrent-table")
      .contains(TEST_TORRENT.NAME)
      .should("not.exist");
  });

  it("test auto start - basic mode", () => {
    cy.getByTestId("add-btn").click();
    cy.contains("Add Torrent");
    cy.getByTestId("download-dir").clear();
    cy.getByTestId("download-dir").type(DOWNLOAD_DIR);
    cy.getByTestId("torrent-link").type(TEST_TORRENT.URL);
    cy.getByTestId("advanced-mode").uncheck();
    cy.getByTestId("auto-start").check();
    cy.contains("OK").click();
    cy.contains("Adding...");
    cy.contains("Successfully added!");
    cy.getByTestId("torrent-table")
      .contains(TEST_TORRENT.NAME)
      .closest(".MuiDataGrid-row")
      .find("[data-field=status]")
      .contains("Downloading");

    // should remove the test torrent before exit
    removeTestTorrent();
  });

  it("test disable auto start - basic mode", () => {
    cy.getByTestId("add-btn").click();
    cy.contains("Add Torrent");
    cy.getByTestId("download-dir").clear();
    cy.getByTestId("download-dir").type(DOWNLOAD_DIR);
    cy.getByTestId("torrent-link").type(TEST_TORRENT.URL);
    cy.getByTestId("advanced-mode").uncheck();
    cy.getByTestId("auto-start").uncheck();
    cy.contains("OK").click();
    cy.contains("Adding...");
    cy.contains("Successfully added!");
    cy.getByTestId("torrent-table").contains(TEST_TORRENT.NAME);
    cy.getByTestId("torrent-table")
      .contains(TEST_TORRENT.NAME)
      .closest(".MuiDataGrid-row")
      .find("[data-field=status]")
      .contains("Paused");

    // should remove the test torrent before exit
    removeTestTorrent();
  });

  it("test auto start - advanced mode", () => {
    cy.getByTestId("add-btn").click();
    cy.contains("Add Torrent");
    cy.getByTestId("download-dir").clear();
    cy.getByTestId("download-dir").type(DOWNLOAD_DIR);
    cy.getByTestId("torrent-link").type(TEST_TORRENT.URL);
    cy.getByTestId("advanced-mode").check();
    cy.contains("Next").click();
    cy.contains("Adding...");
    cy.getByTestId("torrent-table").contains(TEST_TORRENT.NAME);
    cy.contains("Paused");
    // cy.getByTestId("torrent-table").contains(TEST_TORRENT.NAME).closest('.MuiDataGrid-row').find('[data-field=status]').contains('Paused')
    cy.getByTestId("auto-start").check({ force: true });
    cy.contains("OK").click();
    cy.getByTestId("torrent-table")
      .contains(TEST_TORRENT.NAME)
      .closest(".MuiDataGrid-row")
      .find("[data-field=status]")
      .contains("Downloading");

    // should remove the test torrent before exit
    removeTestTorrent();
  });

  it("test disable auto start - advanced mode", () => {
    cy.getByTestId("add-btn").click();
    cy.contains("Add Torrent");
    cy.getByTestId("download-dir").clear();
    cy.getByTestId("download-dir").type(DOWNLOAD_DIR);
    cy.getByTestId("torrent-link").type(TEST_TORRENT.URL);
    cy.getByTestId("advanced-mode").check();
    cy.contains("Next").click();
    cy.contains("Adding...");
    cy.getByTestId("torrent-table").contains(TEST_TORRENT.NAME);
    cy.contains("Paused");
    // cy.getByTestId("torrent-table").contains(TEST_TORRENT.NAME).closest('.MuiDataGrid-row').find('[data-field=status]').contains('Paused')
    cy.getByTestId("auto-start").uncheck({ force: true });
    cy.contains("OK").click();
    cy.getByTestId("torrent-table")
      .contains(TEST_TORRENT.NAME)
      .closest(".MuiDataGrid-row")
      .find("[data-field=status]")
      .contains("Paused");

    // should remove the test torrent before exit
    removeTestTorrent();
  });

  it("test set defualt download dir", () => {
    const downloadDir = "/downloads/complete/defualt";
    cy.getByTestId("add-btn").click();
    cy.contains("Add Torrent");
    cy.getByTestId("download-dir").clear();
    cy.getByTestId("download-dir").type(downloadDir);
    cy.getByTestId("torrent-link").type(TEST_TORRENT.URL);
    cy.getByTestId("set-download-dir").check();
    cy.getByTestId("advanced-mode").uncheck();
    cy.getByTestId("auto-start").uncheck();
    cy.contains("OK").click();
    cy.contains("Adding...");
    cy.contains("Successfully added!");

    cy.getByTestId("add-btn").click();
    cy.contains("Add Torrent");
    cy.getByTestId("download-dir").should("have.value", downloadDir);
    cy.contains("Cancel").click();

    // should remove the test torrent before exit
    removeTestTorrent();
  });

  it("test add multiple torrents - basic mode", () => {
    cy.getByTestId("add-btn").click();
    cy.contains("Add Torrent");
    cy.getByTestId("download-dir").clear();
    cy.getByTestId("download-dir").type(DOWNLOAD_DIR);

    cy.getByTestId("torrent-link").type(TEST_TORRENT.URL);
    cy.getByTestId("torrent-link").type("{enter}");
    cy.getByTestId("torrent-link").type(TEST_TORRENT_2.URL);

    cy.getByTestId("advanced-mode").should("be.disabled");
    cy.getByTestId("advanced-mode").should("not.be.checked");

    cy.contains("OK").click();
    cy.getByTestId("torrent-table")
      .contains(TEST_TORRENT.NAME)
      .closest(".MuiDataGrid-row")
      .find("[data-field=status]")
      .contains("Downloading");

    // should remove the test torrent before exit
    removeTestTorrent(TEST_TORRENT.NAME);
    removeTestTorrent(TEST_TORRENT_2.NAME);
  });

  it("test add multiple torrents - advanced mode", () => {
    cy.getByTestId("add-btn").click();
    cy.contains("Add Torrent");
    cy.getByTestId("download-dir").clear();
    cy.getByTestId("download-dir").type(DOWNLOAD_DIR);

    cy.getByTestId("torrent-link").type(TEST_TORRENT.URL);
    cy.getByTestId("torrent-link").type("{enter}");
    cy.getByTestId("torrent-link").type(TEST_TORRENT_2.URL);

    // advanced mode -  should be unavailable for now
    cy.getByTestId("advanced-mode").should("be.disabled");
    cy.getByTestId("advanced-mode").should("not.be.checked");
  });
});

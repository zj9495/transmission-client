/// <reference types="cypress" />

import { addTestTorrent, removeTestTorrent, TEST_URL } from "./common"
import { TEST_TORRENT } from "../fixtures/constants"

context("test context menu", () => {
  before(() => {
    cy.visit(TEST_URL)
    cy.verifyConnected()
    addTestTorrent()
  })

  after(() => {
    removeTestTorrent()
  })

  it("should display contextmenu when right click torrent", () => {
    cy.contains("Start the checked torrents").should("be.hidden")

    cy.contains(TEST_TORRENT.NAME).rightclick()
    cy.contains("Start the checked torrents").should("not.be.hidden")

    // should close contextmenu when click other place
    cy.getByTestId("context-menu").find("div:first-child").click(-50, -50, { force: true })
    cy.contains("Start the checked torrents").should("be.hidden")
  })

  it("test disable menu item", () => {
    cy.contains(TEST_TORRENT.NAME).rightclick()
    cy.contains("Start the checked torrents").click()

    // start & recheck should be disable when torrent is downloading
    cy.contains(TEST_TORRENT.NAME).closest(".MuiDataGrid-row").find("[data-field=status]").contains("Downloading")
    cy.contains(TEST_TORRENT.NAME).rightclick()
    cy.getByTestId("context-menu-start").should("have.css", "pointer-events", "none")
    cy.getByTestId("context-menu-recheck").should("have.css", "pointer-events", "none")

    // pause torrent
    // cy.contains(TEST_TORRENT.NAME).rightclick()
    cy.contains("Pause the checked torrents").click()

    // pause & more peers should be disable when torrent is downloading
    cy.contains(TEST_TORRENT.NAME).closest(".MuiDataGrid-row").find("[data-field=status]").contains("Paused")
    cy.contains(TEST_TORRENT.NAME).rightclick()
    cy.getByTestId("context-menu-pause").should("have.css", "pointer-events", "none")
    cy.getByTestId("context-menu-more-peers").should("have.css", "pointer-events", "none")

    // resume download
    cy.contains("Start the checked torrents").click()
  })
})
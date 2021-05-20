/// <reference types="cypress" />

import { removeTestTorrent, addTestTorrent } from "./common"
import { TEST_TORRENT } from "../fixtures/constants"

context("test torrent list", () => {
  beforeEach(() => {
    cy.visit(`http://zj9495:zj9495@localhost:8888/transmission/web`)
    cy.verifyConnected()
  })

  it("should format ratio if ratio < 0", () => {
    addTestTorrent(false)

    cy.contains(TEST_TORRENT.NAME).closest(".MuiDataGrid-row").find("[data-field=uploadRatio]").contains("0")

    removeTestTorrent()
  })

  it("test the default display columns", () => {
    const COLUMNS = {
      DISPLAY: ["name", "totalSize", "percentDone", "leftUntilDone", "uploadRatio", "status", "seederCount", "leecherCount", "rateDownload", "rateUpload", "addedDate", "downloadDir"],
      HIDE: ["completeSize", "uploadedEver", "queuePosition", "trackers", "activityDate", "labels", "doneDate"]
    }

    cy.viewport(1920, 1080)

    COLUMNS.DISPLAY.forEach(name => {
      // should be display
      cy.get(`[data-field=${name}]`).should("be.exist")
    })
    COLUMNS.HIDE.forEach(name => {
      // should not be display
      cy.get(`[data-field=${name}]`).should("not.exist")
    })
  })
})
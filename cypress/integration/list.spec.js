/// <reference types="cypress" />

import { removeTestTorrent, addTestTorrent, TEST_URL, showAllColumns } from "./common"
import { TEST_TORRENT, COLUMNS } from "../fixtures/constants"
import { LANGUAGES } from "../../src/constants"

context("test torrent list", () => {
  beforeEach(() => {
    cy.visit(TEST_URL)
    cy.verifyConnected()
  })

  it("should format ratio if ratio < 0", () => {
    addTestTorrent(false)

    cy.contains(TEST_TORRENT.NAME).closest(".MuiDataGrid-row").find("[data-field=uploadRatio]").contains("0")

    removeTestTorrent()
  })

  it("test the default display columns", () => {

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

  it("test the columns width", () => {
    cy.viewport(3840, 1920)

    const SMAILL_WIDTH = '100px'
    const BIG_WIDTH = '500px'
    const url = `${TEST_URL}?locale=`
    
    // test for each language
    LANGUAGES.forEach(language => {
      cy.visit(url + language.code)
      cy.log(`visit: ${url + language.code}`)
      showAllColumns()

      // test the locale has been set correctly
      cy.get('#selected-language').contains(language.text)
      
      COLUMNS.ALL.forEach(name => {
        cy.get(`[data-field=${name}] .MuiDataGrid-colCellTitle`).click().then(($field) => {
          // get the column title currently width
          const oldWidth = $field.width()
          
          // set 500px to make sure the column title is not hidden
          cy.get(`[data-field=${name}]`).invoke('css', 'width', BIG_WIDTH)
          cy.get(`[data-field=${name}]`).invoke('css', 'min-width', BIG_WIDTH)
          cy.get(`[data-field=${name}]`).invoke('css', 'max-width', BIG_WIDTH)

          cy.log(`language: ${language.code}, fieldName: ${name}`)
          // column title width should not be changed
          cy.get(`[data-field=${name}] .MuiDataGrid-colCellTitle`).invoke('width').should('eq', oldWidth)
  
          cy.get(`[data-field=${name}]`).invoke('css', 'width', SMAILL_WIDTH)
          cy.get(`[data-field=${name}]`).invoke('css', 'min-width', SMAILL_WIDTH)
          cy.get(`[data-field=${name}]`).invoke('css', 'max-width', SMAILL_WIDTH)
        })
      })
    })
  })
})
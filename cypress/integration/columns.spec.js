/// <reference types="cypress" />

import { TEST_URL, showAllColumns } from "./common"
import { LANGUAGES } from "../../src/constants"
import { COLUMNS } from "../fixtures/constants"

context('test columns', () => {
  beforeEach(() => {
    cy.visit(TEST_URL)
    cy.verifyConnected()
  })

  LANGUAGES.forEach(language => {

    it(`test the columns width on ${language.code}`, () => {
      cy.visit(`${TEST_URL}?locale=${language.code}`)

      showAllColumns()
      cy.viewport(3840, 1920)
  
      COLUMNS.ALL.forEach(name => {
        const SMAILL_WIDTH = '100px'
        const BIG_WIDTH = '500px'
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
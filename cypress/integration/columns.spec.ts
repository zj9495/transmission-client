/// <reference types="cypress" />

import { TEST_URL, showAllColumns } from "./common";
import { COLUMNS, LANGUAGES } from "../fixtures/constants";

context("test columns", () => {
  context(
    "column header should not be omitted",
    {
      viewportWidth: 3840,
      viewportHeight: 1920,
    },
    () => {
      LANGUAGES.forEach((language) => {
        it(`test ${language.code} (${language.text})`, () => {
          cy.visit(`${TEST_URL}?locale=${language.code}`);

          showAllColumns();

          COLUMNS.ALL.forEach((name) => {
            const SMAILL_WIDTH = "100px";
            const BIG_WIDTH = "500px";
            cy.get(`[data-field=${name}] .MuiDataGrid-columnHeaderTitle`)
              .click()
              .then(($field) => {
                // get the column title currently width
                const oldWidth = $field.width();

                // set 500px to make sure the column title is not hidden
                cy.get(`[data-field=${name}]`).invoke(
                  "css",
                  "width",
                  BIG_WIDTH
                );
                cy.get(`[data-field=${name}]`).invoke(
                  "css",
                  "min-width",
                  BIG_WIDTH
                );
                cy.get(`[data-field=${name}]`).invoke(
                  "css",
                  "max-width",
                  BIG_WIDTH
                );

                cy.log(`language: ${language.code}, fieldName: ${name}`);
                // column title width should not be changed
                cy.get(`[data-field=${name}] .MuiDataGrid-columnHeaderTitle`)
                  .invoke("width")
                  .should("eq", oldWidth);

                cy.get(`[data-field=${name}]`).invoke(
                  "css",
                  "width",
                  SMAILL_WIDTH
                );
                cy.get(`[data-field=${name}]`).invoke(
                  "css",
                  "min-width",
                  SMAILL_WIDTH
                );
                cy.get(`[data-field=${name}]`).invoke(
                  "css",
                  "max-width",
                  SMAILL_WIDTH
                );
              });
          });
        });
      });
    }
  );
});

/* eslint-disable @typescript-eslint/no-empty-function */
/// <reference types="cypress" />

import { TEST_URL } from "./common"

context('theme', () => {
  beforeEach(() => {
    cy.visitWithoutLocalStorage(TEST_URL)
  })

  it('should use the auto theme at first boot', () => {
    cy.getByTestId("theme-toggle-button").find("[data-test-id=auto]").should('be.exist');
  })

  it('should use the last theme when reloading', () => {
    cy.getByTestId("theme-toggle-button").click();
    cy.getByTestId("theme-toggle-button").find("[data-test-id=light]").should('be.exist');
    cy.waitForWritteState()
    
    cy.reload();
    cy.getByTestId("theme-toggle-button").find("[data-test-id=light]").should('be.exist');

    cy.getByTestId("theme-toggle-button").click();
    cy.getByTestId("theme-toggle-button").find("[data-test-id=dark]").should('be.exist');
    cy.waitForWritteState()

    cy.reload();
    cy.getByTestId("theme-toggle-button").find("[data-test-id=dark]").should('be.exist');
  })

  it('should use the system theme on the auto theme', () => {
    const DAKR_THEME_SWITCH = {
      ENABLED: true,
      DISABLED: false
    }

    cy.visit(TEST_URL, {
      onBeforeLoad: (window) => {
        window.localStorage.clear()
        cy.stub(window, 'matchMedia')
        .returns({
          matches: DAKR_THEME_SWITCH.ENABLED,
          addListener: () => {},
          addEventListener: () => {}
        })
      }
    })

    cy.getByTestId("theme-toggle-button").find("[data-test-id=auto]").should('be.exist');
    cy.get("body").invoke("css", "background-color").should("eq", "rgb(48, 48, 48)");

    cy.clearLocalStorage();
    cy.visit(TEST_URL, {
      onBeforeLoad: (window) => {
        cy.stub(window, 'matchMedia')
        .returns({
          matches: DAKR_THEME_SWITCH.DISABLED,
          addListener: () => {},
          addEventListener: () => {}
        })
      }
    })

    cy.getByTestId("theme-toggle-button").find("[data-test-id=auto]").should('be.exist');
    cy.get("body").invoke("css", "background-color").should("eq", "rgb(250, 250, 250)");
  })
})
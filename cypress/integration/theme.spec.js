/* eslint-disable @typescript-eslint/no-empty-function */
/// <reference types="cypress" />

import { TEST_URL } from "./common"

context('app', () => {
  beforeEach(() => {
    cy.visit(TEST_URL)
    cy.verifyConnected()
  })

  it('should use the auto theme at first boot', () => {
    cy.clearLocalStorage();
    cy.reload();
    cy.getByTestId("theme-toggle-button").find("[data-test-id=auto]").should('be.exist');
  })

  it('should use the last theme when reloading', () => {
    cy.clearLocalStorage();
    cy.reload();

    cy.getByTestId("theme-toggle-button").click();
    cy.getByTestId("theme-toggle-button").find("[data-test-id=light]").should('be.exist');
    cy.reload();
    cy.getByTestId("theme-toggle-button").find("[data-test-id=light]").should('be.exist');

    cy.getByTestId("theme-toggle-button").click();
    cy.getByTestId("theme-toggle-button").find("[data-test-id=dark]").should('be.exist');
    cy.reload();
    cy.getByTestId("theme-toggle-button").find("[data-test-id=dark]").should('be.exist');
  })

  it('should use the system theme on the auto theme', () => {
    const DAKR_THEME_SWITCH = {
      ENABLED: true,
      DISABLED: false
    }

    cy.clearLocalStorage();
    cy.visit(TEST_URL, {
      onBeforeLoad: (window) => {
        cy.stub(window, 'matchMedia')
      .withArgs('(prefers-color-scheme: dark)')
      .returns({
        matches: DAKR_THEME_SWITCH.ENABLED,
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
        .withArgs('(prefers-color-scheme: dark)')
        .returns({
          matches: DAKR_THEME_SWITCH.DISABLED,
          addEventListener: () => {}
        })
      }
    })

    cy.getByTestId("theme-toggle-button").find("[data-test-id=auto]").should('be.exist');
    cy.get("body").invoke("css", "background-color").should("eq", "rgb(250, 250, 250)");
  })
})
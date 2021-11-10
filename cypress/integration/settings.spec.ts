/// <reference types="cypress" />

import { TEST_URL } from "./common";

context("test Settings page", () => {
  beforeEach(() => {
    cy.visit(TEST_URL);
    cy.verifyConnected();
  });
  it("should show Settings page", () => {
    cy.getByTestId("settings-button").click();
    cy.contains("Config");
  });
});

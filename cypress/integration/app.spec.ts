/// <reference types="cypress" />

import { TEST_URL } from "./common";

context("app", () => {
  beforeEach(() => {
    cy.visit(TEST_URL);
  });

  it("boot", () => {
    cy.verifyConnected();
  });
});

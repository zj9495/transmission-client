/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    /**
     * Custom command to verify has connected to server.
     * @example cy.verifyConnected()
     */
    verifyConnected(): Chainable<any>;

    /**
     * Custom command to get element by date-test-id.
     * @example cy.getByTestId("torrent-link") // equals => cy.get("[data-test-id=torrent-link]")
     */
    getByTestId<E extends Node = HTMLElement>(
      selector: string,
      options?: Partial<Loggable & Timeoutable & Withinable & Shadow>
    ): Chainable<JQuery<E>>;

    /**
     * Custom command to clear localStorage before visit url.
     * @example cy.visitWithoutLocalStorage("http://localhost:9091/transmission/web")
     */
    visitWithoutLocalStorage(
      url: string,
      options?: Partial<VisitOptions>
    ): Chainable<AUTWindow>;

    /**
     * Custom command to wait for redux-persist to have written state.
     * @example cy.waitForWritteState() // equals => cy.wait(300)
     */
    waitForWritteState(): Chainable<Subject>;
  }
}

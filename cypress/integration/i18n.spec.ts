/// <reference types="cypress" />

import { TEST_URL } from "./common";
import { LANGUAGES } from "../fixtures/constants";

context("i18n", () => {
  describe("test switch language", () => {
    before(() => {
      cy.visit(TEST_URL);
      cy.getByTestId("settings-button").click();
    });
    LANGUAGES.forEach((language) => {
      it(`switch to ${language.code} (${language.text})`, () => {
        cy.get("#select-language").click();
        cy.getByTestId("language-menu").contains(language.text).click();
        cy.get("#select-language").contains(language.text);
        cy.get("#torrent-table .MuiDataGrid-columnHeaderTitle").contains(
          language.strings["torrent.fields.name"]
        );
        cy.get("#torrent-table .MuiDataGrid-columnHeaderTitle").contains(
          language.strings["torrent.fields.totalSize"]
        );
      });
    });
  });

  describe("test get the locale from url params", () => {
    LANGUAGES.forEach((language) => {
      language.codes.forEach((locale) => {
        const url = `${TEST_URL}?locale=${locale}`;
        it(`should use ${language.code} (${language.text}) for http://ip:port/transmission/web?locale=${locale}`, () => {
          cy.visitWithoutLocalStorage(url);
          cy.getByTestId("settings-button").click();

          cy.get("#select-language").contains(language.text);
          cy.get("#torrent-table .MuiDataGrid-columnHeaderTitle").contains(
            language.strings["torrent.fields.name"]
          );
          cy.get("#torrent-table .MuiDataGrid-columnHeaderTitle").contains(
            language.strings["torrent.fields.totalSize"]
          );
        });
      });
    });
  });

  describe("should use the browser's language as the default language", () => {
    LANGUAGES.forEach((language) => {
      language.codes.forEach((locale) => {
        it(`should use ${language.code} (${language.text}) if browser's locale is ${locale} `, () => {
          cy.visit(TEST_URL, {
            onBeforeLoad: (window) => {
              window.localStorage.clear();
              // 'window:before:load:' will be fired before 'onBeforeLoad', so use setTimeout to hack it
              setTimeout(() => {
                Object.defineProperty(window.navigator, "language", {
                  value: locale,
                  configurable: true,
                });
              });
            },
          });
          cy.getByTestId("settings-button").click();

          cy.get("#select-language").contains(language.text);
          cy.get("#torrent-table .MuiDataGrid-columnHeaderTitle").contains(
            language.strings["torrent.fields.name"]
          );
          cy.get("#torrent-table .MuiDataGrid-columnHeaderTitle").contains(
            language.strings["torrent.fields.totalSize"]
          );
        });
      });
    });
  });
});

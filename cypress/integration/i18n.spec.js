/// <reference types="cypress" />

import langs from "../../src/i18n/lang"

context('i18n', () => {
  beforeEach(() => {
    cy.visit(`http://zj9495:zj9495@localhost:8888/transmission-client`)
    cy.verifyConnected()
  })

  it('test default language', () => {
    const defaultLanguageInfo = {
      code: "en",
      text: "English",
      name: "Name",
      totalSize: "Size"
    }

    cy.get('#selected-language').contains(defaultLanguageInfo.text)
    cy.get('#torrent-table .MuiDataGrid-colCellTitle').contains(defaultLanguageInfo.name)
    cy.get('#torrent-table .MuiDataGrid-colCellTitle').contains(defaultLanguageInfo.totalSize)
  })

  it('test switch language', () => {
    const TEST_LANGS = [
      {
        code: "en",
        text: "English",
        name: langs.en['torrent.fields.name'],
        totalSize: langs.en['torrent.fields.totalSize']
      },
      {
        code: "zh-CN",
        text: "中文 - 简体",
        name: langs.zh_CN['torrent.fields.name'],
        totalSize: langs.zh_CN['torrent.fields.totalSize']
      },
      {
        code: "zh-TW",
        text: "中文 - 繁体",
        name: langs.zh_TW['torrent.fields.name'],
        totalSize: langs.zh_TW['torrent.fields.totalSize']
      },
      {
        code: "de",
        text: "Deutsch",
        name: langs.de['torrent.fields.name'],
        totalSize: langs.de['torrent.fields.totalSize']
      },
      {
        code: "es",
        text: "Español",
        name: langs.es['torrent.fields.name'],
        totalSize: langs.es['torrent.fields.totalSize']
      },
      {
        code: "fr",
        text: "Français",
        name: langs.fr['torrent.fields.name'],
        totalSize: langs.fr['torrent.fields.totalSize']
      },
      {
        code: "hu",
        text: "Magyar",
        name: langs.hu['torrent.fields.name'],
        totalSize: langs.hu['torrent.fields.totalSize']
      },
      {
        code: "it",
        text: "Italiano",
        name: langs.it['torrent.fields.name'],
        totalSize: langs.it['torrent.fields.totalSize']
      },
      {
        code: "ko",
        text: "Korean",
        name: langs.ko['torrent.fields.name'],
        totalSize: langs.ko['torrent.fields.totalSize']
      },
      {
        code: "nl",
        text: "Nederlands",
        name: langs.nl['torrent.fields.name'],
        totalSize: langs.nl['torrent.fields.totalSize']
      },
      {
        code: "pt-BR",
        text: "Português - Brasil",
        name: langs.pt_BR['torrent.fields.name'],
        totalSize: langs.pt_BR['torrent.fields.totalSize']
      },
      {
        code: "pt-PT",
        text: "Português - Portugal",
        name: langs.pt_PT['torrent.fields.name'],
        totalSize: langs.pt_PT['torrent.fields.totalSize']
      },
      {
        code: "ro",
        text: "Romanian",
        name: langs.ro['torrent.fields.name'],
        totalSize: langs.ro['torrent.fields.totalSize']
      },
      {
        code: "ru",
        text: "Русский",
        name: langs.ru['torrent.fields.name'],
        totalSize: langs.ru['torrent.fields.totalSize']
      },
      {
        code: "uk",
        text: "українська мова",
        name: langs.uk['torrent.fields.name'],
        totalSize: langs.uk['torrent.fields.totalSize']
      },
    ]
    TEST_LANGS.forEach(item => {
      cy.get('#switch-language').click()
      cy.get('#language-menu li[role="menuitem"]').contains(item.text).click()
      cy.get('#selected-language').contains(item.text)
      cy.get('#torrent-table .MuiDataGrid-colCellTitle').contains(item.name)
      cy.get('#torrent-table .MuiDataGrid-colCellTitle').contains(item.totalSize)
    })
  })
})
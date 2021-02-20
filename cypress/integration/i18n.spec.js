/// <reference types="cypress" />

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
      totalSize: "Total size"
    }

    cy.get('#selected-language').contains(defaultLanguageInfo.text)
    cy.get('#torrent-table .MuiDataGrid-colCellTitle').contains(defaultLanguageInfo.name)
    cy.get('#torrent-table .MuiDataGrid-colCellTitle').contains(defaultLanguageInfo.totalSize)
  })

  it('test switch language', () => {
    const langs = [
      {
        code: "en",
        text: "English",
        name: "Name",
        totalSize: "Total size"
      },
      {
        code: "zh-CN",
        text: "中文 - 简体",
        name: "名称",
        totalSize: "总大小"
      },
      {
        code: "zh-TW",
        text: "中文 - 繁体",
        name: "名稱",
        totalSize: "大小"
      },
      {
        code: "de",
        text: "Deutsch",
        name: "Name",
        totalSize: "Größe"
      },
      {
        code: "es",
        text: "Español",
        name: "Nombre",
        totalSize: "Tamaño"
      },
      {
        code: "fr",
        text: "Français",
        name: "Nom",
        totalSize: "Taille totale"
      },
      {
        code: "hu",
        text: "Magyar",
        name: "Név",
        totalSize: "Méret"
      },
      {
        code: "it",
        text: "Italiano",
        name: "Nome",
        totalSize: "Dimensione totale"
      },
      {
        code: "ko",
        text: "Korean",
        name: "이름",
        totalSize: "총 크기"
      },
      {
        code: "nl",
        text: "Nederlands",
        name: "Naam",
        totalSize: "Totale grootte"
      },
      {
        code: "pt-BR",
        text: "Português - Brasil",
        name: "Nome",
        totalSize: "Tamanho"
      },
      {
        code: "pt-PT",
        text: "Português - Portugal",
        name: "Nome",
        totalSize: "Tamanho total"
      },
      {
        code: "ro",
        text: "Romanian",
        name: "Nume",
        totalSize: "Mărime totală"
      },
      {
        code: "ru",
        text: "Русский",
        name: "Название",
        totalSize: "Размер"
      },
      {
        code: "uk",
        text: "українська мова",
        name: "Назва",
        totalSize: "Розмір"
      },
    ]
    langs.forEach(item => {
      cy.get('#switch-language').click()
      cy.get('#language-menu li[role="menuitem"]').contains(item.text).click()
      cy.get('#selected-language').contains(item.text)
      cy.get('#torrent-table .MuiDataGrid-colCellTitle').contains(item.name)
      cy.get('#torrent-table .MuiDataGrid-colCellTitle').contains(item.totalSize)
    })
  })
})
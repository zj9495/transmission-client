/* eslint-disable global-require */
export const DOWNLOAD_DIR = "/downloads/complete";
export const TEST_TORRENT = {
  URL:
    "https://pt.hdupt.com/download.php?id=30675&passkey=b4ab64d2f26b9134e00899443f2dd209",
  NAME:
    "Daft Punk - TRON Legacy - The Complete Edition (2020) Mp3 320kbps [PMEDIA]",
};
export const TEST_TORRENT_2 = {
  URL:
    "https://pt.hdupt.com/download.php?id=15264&passkey=b4ab64d2f26b9134e00899443f2dd209",
  NAME: "Eminem-Revival-2017-NOiR",
};

export const COLUMNS = {
  DISPLAY: [
    "name",
    "totalSize",
    "percentDone",
    "leftUntilDone",
    "uploadRatio",
    "status",
    "seederCount",
    "leecherCount",
    "rateDownload",
    "rateUpload",
    "addedDate",
    "downloadDir",
  ],
  HIDE: [
    "completeSize",
    "uploadedEver",
    "queuePosition",
    "trackers",
    "activityDate",
    "labels",
    "doneDate",
  ],
  ALL: [],
};

COLUMNS.ALL = [...COLUMNS.DISPLAY, ...COLUMNS.HIDE];

export const LANGUAGES = [
  {
    code: "en",
    codes: ["en", "en_US", "en_AU", "en_CA", "en_GB"],
    text: "English",
    strings: require("../../src/i18n/strings/en.json"),
  },
  {
    code: "zh-CN",
    codes: ["zh", "zh_CN"],
    text: "中文 - 简体",
    strings: require("../../src/i18n/strings/zh-Hans.json"),
  },
  {
    code: "zh-TW",
    codes: ["zh_TW", "zh_HK"],
    text: "中文 - 繁体",
    strings: require("../../src/i18n/strings/zh-Hant.json"),
  },
  {
    code: "de",
    codes: ["de", "de_DE", "de_AT"],
    text: "Deutsch",
    strings: require("../../src/i18n/strings/de.json"),
  },
  {
    code: "es",
    codes: ["es", "es_ES", "es_MX"],
    text: "Español",
    strings: require("../../src/i18n/strings/es.json"),
  },
  {
    codes: ["fr", "fr_FR", "fr_CA"],
    code: "fr",
    text: "Français",
    strings: require("../../src/i18n/strings/fr.json"),
  },
  {
    codes: ["hu", "hu_HU"],
    code: "hu",
    text: "Magyar",
    strings: require("../../src/i18n/strings/hu.json"),
  },
  {
    code: "it",
    codes: ["it", "it_IT", "it_CH"],
    text: "Italiano",
    strings: require("../../src/i18n/strings/it.json"),
  },
  {
    code: "ko",
    codes: ["ko", "ko_KR"],
    text: "Korean",
    strings: require("../../src/i18n/strings/ko.json"),
  },
  {
    code: "nl",
    codes: ["nl", "nl_NL", "nl_BE"],
    text: "Nederlands",
    strings: require("../../src/i18n/strings/nl.json"),
  },
  {
    code: "pl",
    codes: ["pl"],
    text: "Polska - Polski",
    strings: require("../../src/i18n/strings/pl.json"),
  },
  {
    code: "pt-BR",
    codes: ["pt_BR"],
    text: "Português - Brasil",
    strings: require("../../src/i18n/strings/pt_BR.json"),
  },
  {
    code: "pt-PT",
    codes: ["pt_PT"],
    text: "Português - Portugal",
    strings: require("../../src/i18n/strings/pt.json"),
  },
  {
    code: "ro",
    codes: ["ro", "ro_RO"],
    text: "Romanian",
    strings: require("../../src/i18n/strings/ro.json"),
  },
  {
    code: "ru",
    codes: ["ru", "ru_RU"],
    text: "Русский",
    strings: require("../../src/i18n/strings/ru.json"),
  },
  {
    code: "uk",
    codes: ["uk", "uk_UA"],
    text: "українська мова",
    strings: require("../../src/i18n/strings/uk.json"),
  },
];

/* eslint-disable global-require */
import { IStatusColor } from "./types";

export const APP_ROUTES = {
  base: "/",
  signIn: "/sign-in",
  list: "/list/:torrentStatus",
  allList: "list/all",
};

export const LANGUAGES = [
  {
    code: "en",
    text: "English",
    strings: require("src/i18n/strings/en.json"),
  },
  {
    code: "zh-CN",
    text: "中文 - 简体",
    strings: require("src/i18n/strings/zh-Hans.json"),
  },
  {
    code: "zh-TW",
    text: "中文 - 繁体",
    strings: require("src/i18n/strings/zh-Hant.json"),
  },
  {
    code: "de",
    text: "Deutsch",
    strings: require("src/i18n/strings/de.json"),
  },
  {
    code: "es",
    text: "Español",
    strings: require("src/i18n/strings/es.json"),
  },
  {
    code: "fr",
    text: "Français",
    strings: require("src/i18n/strings/fr.json"),
  },
  {
    code: "hu",
    text: "Magyar",
    strings: require("src/i18n/strings/hu.json"),
  },
  {
    code: "it",
    text: "Italiano",
    strings: require("src/i18n/strings/it.json"),
  },
  {
    code: "ko",
    text: "Korean",
    strings: require("src/i18n/strings/ko.json"),
  },
  {
    code: "nl",
    text: "Nederlands",
    strings: require("src/i18n/strings/nl.json"),
  },
  {
    code: "pl",
    text: "Polska - Polski",
    strings: require("src/i18n/strings/pl.json"),
  },
  {
    code: "pt-BR",
    text: "Português - Brasil",
    strings: require("src/i18n/strings/pt_BR.json"),
  },
  {
    code: "pt-PT",
    text: "Português - Portugal",
    strings: require("src/i18n/strings/pt.json"),
  },
  {
    code: "ro",
    text: "Romanian",
    strings: require("src/i18n/strings/ro.json"),
  },
  {
    code: "ru",
    text: "Русский",
    strings: require("src/i18n/strings/ru.json"),
  },
  {
    code: "uk",
    text: "українська мова",
    strings: require("src/i18n/strings/uk.json"),
  },
];

export const DEFAULT_LANGUAGE = LANGUAGES[0];

export const GITHUB_REPO = "https://github.com/zj9495/transmission-client";

export const STATUS_COLORS: IStatusColor = {
  3: "disabled",
  4: "primary",
};

export const STATUS_TYPES = {
  paused: 0,
  checkwait: 1,
  check: 2,
  downloadwait: 3,
  download: 4,
  seedwait: 5,
  seed: 6,
};

export const PRIORITY_HIGH = 1;
export const PRIORITY_NORMAL = 0;
export const PRIORITY_LOW = -1;

export const INVALID_STATUS = -1;

export const STORAGE_KEYS = {
  LOCALE: "LOCALE",
  THEME: "THEME",
};

export const REFRESH_INTERVAL = 5000;

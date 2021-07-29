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
    langFile: require("src/i18n/lang/en.json"),
  },
  {
    code: "zh-CN",
    text: "中文 - 简体",
    langFile: require("src/i18n/lang/zh_CN.json"),
  },
  {
    code: "zh-TW",
    text: "中文 - 繁体",
    langFile: require("src/i18n/lang/zh_TW.json"),
  },
  {
    code: "de",
    text: "Deutsch",
    langFile: require("src/i18n/lang/de.json"),
  },
  {
    code: "es",
    text: "Español",
    langFile: require("src/i18n/lang/es.json"),
  },
  {
    code: "fr",
    text: "Français",
    langFile: require("src/i18n/lang/fr.json"),
  },
  {
    code: "hu",
    text: "Magyar",
    langFile: require("src/i18n/lang/hu.json"),
  },
  {
    code: "it",
    text: "Italiano",
    langFile: require("src/i18n/lang/it.json"),
  },
  {
    code: "ko",
    text: "Korean",
    langFile: require("src/i18n/lang/ko.json"),
  },
  {
    code: "nl",
    text: "Nederlands",
    langFile: require("src/i18n/lang/nl.json"),
  },
  {
    code: "pl",
    text: "Polska - Polski",
    langFile: require("src/i18n/lang/pl.json"),
  },
  {
    code: "pt-BR",
    text: "Português - Brasil",
    langFile: require("src/i18n/lang/pt_BR.json"),
  },
  {
    code: "pt-PT",
    text: "Português - Portugal",
    langFile: require("src/i18n/lang/pt_PT.json"),
  },
  {
    code: "ro",
    text: "Romanian",
    langFile: require("src/i18n/lang/ro.json"),
  },
  {
    code: "ru",
    text: "Русский",
    langFile: require("src/i18n/lang/ru.json"),
  },
  {
    code: "uk",
    text: "українська мова",
    langFile: require("src/i18n/lang/uk.json"),
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

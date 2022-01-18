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
    strings: () => import("src/i18n/strings/en.json"),
  },
  {
    code: "zh-CN",
    text: "中文 - 简体",
    strings: () =>
      import(
        /* webpackChunkName: "zh-Hans.json" */ "src/i18n/strings/zh-Hans.json"
      ),
  },
  {
    code: "zh-TW",
    text: "中文 - 繁体",
    strings: () =>
      import(
        /* webpackChunkName: "zh-Hant.json" */ "src/i18n/strings/zh-Hant.json"
      ),
  },
  {
    code: "de",
    text: "Deutsch",
    strings: () =>
      import(/* webpackChunkName: "de.json" */ "src/i18n/strings/de.json"),
  },
  {
    code: "es",
    text: "Español",
    strings: () =>
      import(/* webpackChunkName: "es.json" */ "src/i18n/strings/es.json"),
  },
  {
    code: "fr",
    text: "Français",
    strings: () =>
      import(/* webpackChunkName: "fr.json" */ "src/i18n/strings/fr.json"),
  },
  {
    code: "hu",
    text: "Magyar",
    strings: () =>
      import(/* webpackChunkName: "hu.json" */ "src/i18n/strings/hu.json"),
  },
  {
    code: "it",
    text: "Italiano",
    strings: () =>
      import(/* webpackChunkName: "it.json" */ "src/i18n/strings/it.json"),
  },
  {
    code: "ko",
    text: "Korean",
    strings: () =>
      import(/* webpackChunkName: "ko.json" */ "src/i18n/strings/ko.json"),
  },
  {
    code: "nl",
    text: "Nederlands",
    strings: () =>
      import(/* webpackChunkName: "nl.json" */ "src/i18n/strings/nl.json"),
  },
  {
    code: "pl",
    text: "Polska - Polski",
    strings: () =>
      import(/* webpackChunkName: "pl.json" */ "src/i18n/strings/pl.json"),
  },
  {
    code: "pt-BR",
    text: "Português - Brasil",
    strings: () =>
      import(
        /* webpackChunkName: "pt_BR.json" */ "src/i18n/strings/pt_BR.json"
      ),
  },
  {
    code: "pt-PT",
    text: "Português - Portugal",
    strings: () =>
      import(/* webpackChunkName: "pt.json" */ "src/i18n/strings/pt.json"),
  },
  {
    code: "ro",
    text: "Romanian",
    strings: () =>
      import(/* webpackChunkName: "ro.json" */ "src/i18n/strings/ro.json"),
  },
  {
    code: "ru",
    text: "Русский",
    strings: () =>
      import(/* webpackChunkName: "ru.json" */ "src/i18n/strings/ru.json"),
  },
  {
    code: "uk",
    text: "українська мова",
    strings: () =>
      import(/* webpackChunkName: "uk.json" */ "src/i18n/strings/uk.json"),
  },
];

export const DEFAULT_LANGUAGE = {
  code: "en",
  text: "English",
  strings: require("src/i18n/strings/en.json"),
};

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

export const REFRESH_INTERVAL = 5000;

export const TORRENT_ERROR = {
  None: 0,
  TrackerWarning: 1,
  TrackerError: 2,
  LocalError: 3,
};

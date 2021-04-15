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
  },
  {
    code: "zh-CN",
    text: "中文 - 简体",
  },
  {
    code: "zh-TW",
    text: "中文 - 繁体",
  },
  {
    code: "de",
    text: "Deutsch",
  },
  {
    code: "es",
    text: "Español",
  },
  {
    code: "fr",
    text: "Français",
  },
  {
    code: "hu",
    text: "Magyar",
  },
  {
    code: "it",
    text: "Italiano",
  },
  {
    code: "ko",
    text: "Korean",
  },
  {
    code: "nl",
    text: "Nederlands",
  },
  {
    code: "pt-BR",
    text: "Português - Brasil",
  },
  {
    code: "pt-PT",
    text: "Português - Portugal",
  },
  {
    code: "ro",
    text: "Romanian",
  },
  {
    code: "ru",
    text: "Русский",
  },
  {
    code: "uk",
    text: "українська мова",
  },
];

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

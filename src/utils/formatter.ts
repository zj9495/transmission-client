import moment from "moment";
import { find } from "lodash";

import store from "src/store";
import { LANGUAGES, DEFAULT_LANGUAGE } from "src/constants";

export const formatBytes = (
  number: number,
  bytes: number,
  units: string[],
  digits = 2
): string => {
  let unitsIndex = 0;
  number /= bytes;
  while (number / bytes >= 1 && unitsIndex < units.length - 1) {
    unitsIndex++;
    number /= bytes;
  }
  return Number(number.toFixed(digits)) + units[unitsIndex];
};

export const formatSize = (number: number, allowZero = false): string => {
  const { session } = store.getState().rpc;
  const { sizeBytes, sizeUnits } = session.units;
  if (!allowZero && !number) {
    return " ";
  }
  return formatBytes(number, sizeBytes, sizeUnits);
};

export const formatSpeed = (number: number, allowZero = false): string => {
  const { session } = store.getState().rpc;
  const { speedBytes, speedUnits } = session.units;
  if (!allowZero && !number) {
    return " ";
  }
  return formatBytes(number, speedBytes, speedUnits);
};

export const formatUnixTimeStamp = (timeStamp: number): string => {
  if (!timeStamp) {
    return " ";
  }
  return moment.unix(timeStamp).format("YYYY-MM-DD HH:mm:ss");
};

export const formatLeftTime = (second: number): string => {
  if (second === Number.POSITIVE_INFINITY) {
    return "--:--:--";
  }
  let seconds: number | string = Math.floor(second % 60);
  let minutes: number | string = Math.floor((second / 60) % 60);
  const hours: number = Math.floor(second / 60 / 60);

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}:${seconds}`;
};

export const formatLocale = (
  locale = "",
  useDefaultLang = true
): string | undefined => {
  if (!locale && !useDefaultLang) {
    // eslint-disable-next-line unicorn/no-useless-undefined
    return undefined;
  }
  if (["zh_HK", "zh-HK"].includes(locale)) {
    return "zh-TW";
  }
  const [lang, country] = locale.split(/-|_/);
  locale = `${lang}-${country}`;
  let localeConfig =
    find(LANGUAGES, (o) => o.code === lang || o.code === locale) ||
    find(LANGUAGES, (o) => o.code.startsWith(lang));
  if (useDefaultLang && !localeConfig) {
    localeConfig = DEFAULT_LANGUAGE;
  }
  return localeConfig?.code;
};

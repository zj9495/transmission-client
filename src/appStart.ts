/* eslint-disable class-methods-use-this */
import { LicenseInfo } from "@material-ui/x-grid";

import store from "src/store";
import { setLocale, toggleTheme } from "src/store/actions/rpc";
import { DEFAULT_LANGUAGE, STORAGE_KEYS } from "src/constants";
import { formatLocale } from "src/utils/formatter";
import qs from "query-string";

class AppStart {
  setupLicense() {
    LicenseInfo.setLicenseKey(process.env.REACT_APP_MUIX_LICENSE_KEY as string);
  }
  setupLocale() {
    const localeFromQs = qs.parse(window.location.search).locale as string;
    const localeFromStorage = window.localStorage[STORAGE_KEYS.LOCALE];
    const localeFromStore = store.getState().rpc.locale;
    const localeFromNavigator = formatLocale(navigator.language, false);
    const locale =
      formatLocale(localeFromQs, false) ||
      localeFromStore ||
      localeFromStorage ||
      localeFromNavigator ||
      DEFAULT_LANGUAGE.code;
    setLocale(locale)(store.dispatch);
    if (localeFromQs) {
      const url = window.location.href.replace(`locale=${localeFromQs}`, "");

      window.history.replaceState(
        {
          url,
          title: "",
        },
        "",
        url
      );
    }
  }
  setupTheme() {
    const themeFromStorage = window.localStorage[STORAGE_KEYS.THEME];
    if (themeFromStorage) {
      toggleTheme(themeFromStorage)(store.dispatch, store.getState);
    }
  }
  start() {
    this.setupLicense();
    this.setupLocale();
    this.setupTheme();
  }
}

export default new AppStart();

/* eslint-disable class-methods-use-this */
import { LicenseInfo } from "@mui/x-data-grid-pro";

import store from "src/store";
import { setLocale } from "src/store/actions/app";
import { getLocale } from "src/store/selector/app";
import { DEFAULT_LANGUAGE } from "src/constants";
import { formatLocale } from "src/utils/formatter";
import qs from "query-string";

class AppStart {
  setupLicense() {
    LicenseInfo.setLicenseKey(process.env.REACT_APP_MUIX_LICENSE_KEY as string);
  }
  setupLocale() {
    const localeFromQs = qs.parse(window.location.search).locale as string;
    const localeFromStore = getLocale(store.getState());
    const localeFromNavigator = formatLocale(navigator.language, false);
    const locale =
      formatLocale(localeFromQs, false) ||
      localeFromStore ||
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
  start() {
    this.setupLicense();
    this.setupLocale();
  }
}

export default new AppStart();

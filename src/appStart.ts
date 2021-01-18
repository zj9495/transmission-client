import { LicenseInfo } from "@material-ui/x-grid";

class AppStart {
  // eslint-disable-next-line class-methods-use-this
  setupLicense() {
    LicenseInfo.setLicenseKey(process.env.REACT_APP_MUIX_LICENSE_KEY as string);
  }
  start() {
    this.setupLicense();
  }
}

export default new AppStart();

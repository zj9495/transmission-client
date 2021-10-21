import { LicenseInfo } from "@mui/x-data-grid-pro";

import appStart from "./appStart";

const MOCK_ENV = {
  REACT_APP_MUIX_LICENSE_KEY: "MOCK_KEY",
};
const OLD_ENV = process.env;

describe("test appStart", () => {
  beforeEach(() => {
    jest.resetModules(); // most important - it clears the cache
    process.env = { ...OLD_ENV, ...MOCK_ENV }; // make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // restore old env
  });
  test("should correct initialize", () => {
    const setupLicenseSpy = jest.spyOn(appStart, "setupLicense");

    appStart.start();

    expect(setupLicenseSpy).toHaveBeenCalled();
    setupLicenseSpy.mockRestore();
  });

  test("should correct setup @mui/x-data-grid-pro license key", () => {
    const setLicenseKeySpy = jest.spyOn(LicenseInfo, "setLicenseKey");

    appStart.setupLicense();

    expect(setLicenseKeySpy).toHaveBeenCalled();
    expect(setLicenseKeySpy).toHaveBeenCalledWith(
      MOCK_ENV.REACT_APP_MUIX_LICENSE_KEY
    );
    setLicenseKeySpy.mockRestore();
  });
});

import {
  formatBytes,
  formatSize,
  formatSpeed,
  formatUnixTimeStamp,
  formatLeftTime,
} from "./formatter";
import store from "../store";

describe.each`
  number                                   | bytes   | units                       | digits       | expected
  ${1}                                     | ${1000} | ${["kB", "MB", "GB", "TB"]} | ${undefined} | ${"0kB"}
  ${1210657698}                            | ${1000} | ${["kB", "MB", "GB", "TB"]} | ${undefined} | ${"1.21GB"}
  ${1000}                                  | ${1000} | ${["kB", "MB", "GB", "TB"]} | ${undefined} | ${"1kB"}
  ${3096}                                  | ${1000} | ${["kB", "MB", "GB", "TB"]} | ${undefined} | ${"3.1kB"}
  ${1000000}                               | ${1000} | ${["kB", "MB", "GB", "TB"]} | ${undefined} | ${"1MB"}
  ${1000000000}                            | ${1000} | ${["kB", "MB", "GB", "TB"]} | ${undefined} | ${"1GB"}
  ${9827387134}                            | ${1000} | ${["kB", "MB", "GB", "TB"]} | ${undefined} | ${"9.83GB"}
  ${1000000000000}                         | ${1000} | ${["kB", "MB", "GB", "TB"]} | ${undefined} | ${"1TB"}
  ${1000000000000000}                      | ${1000} | ${["kB", "MB", "GB", "TB"]} | ${undefined} | ${"1000TB"}
  ${10000000000000000}                     | ${1000} | ${["kB", "MB", "GB", "TB"]} | ${undefined} | ${"10000TB"}
  ${1}                                     | ${1024} | ${["kB", "MB", "GB", "TB"]} | ${undefined} | ${"0kB"}
  ${3096}                                  | ${1024} | ${["kB", "MB", "GB", "TB"]} | ${undefined} | ${"3.02kB"}
  ${1024}                                  | ${1024} | ${["kB", "MB", "GB", "TB"]} | ${undefined} | ${"1kB"}
  ${1024 * 1024}                           | ${1024} | ${["kB", "MB", "GB", "TB"]} | ${undefined} | ${"1MB"}
  ${1024 * 1024 * 1024}                    | ${1024} | ${["kB", "MB", "GB", "TB"]} | ${undefined} | ${"1GB"}
  ${9827387134}                            | ${1024} | ${["kB", "MB", "GB", "TB"]} | ${undefined} | ${"9.15GB"}
  ${1024 * 1024 * 1024 * 1024}             | ${1024} | ${["kB", "MB", "GB", "TB"]} | ${undefined} | ${"1TB"}
  ${1024 * 1024 * 1024 * 1024 * 1024}      | ${1024} | ${["kB", "MB", "GB", "TB"]} | ${undefined} | ${"1024TB"}
  ${1024 * 1024 * 1024 * 1024 * 1024 * 10} | ${1024} | ${["kB", "MB", "GB", "TB"]} | ${undefined} | ${"10240TB"}
`(
  "test formatBytes($number, $bytes, $units, $digits)",
  ({ number, bytes, units, digits, expected }) => {
    test(`returns ${expected}`, () => {
      expect(formatBytes(number, bytes, units, digits)).toBe(expected);
    });
  }
);
describe.each`
  number
  ${Math.floor(Math.random() * 1001)}
  ${Math.floor(Math.random() * 1001)}
  ${Math.floor(Math.random() * 1000001)}
  ${Math.floor(Math.random() * 1000001)}
  ${Math.floor(Math.random() * 1000000001)}
  ${Math.floor(Math.random() * 1000000001)}
  ${Math.floor(Math.random() * 1000000000001)}
  ${Math.floor(Math.random() * 1000000000001)}
  ${Math.floor(Math.random() * 1000000000000001)}
  ${Math.floor(Math.random() * 1000000000000001)}
  ${Math.floor(Math.random() * 10000000000000001)}
  ${Math.floor(Math.random() * 10000000000000001)}
`("random test formatBytes", ({ number }) => {
  const units = ["kB", "MB", "GB", "TB"];

  let expected: string;
  if (number < 1000000) {
    expected = `${Number((number / 1000).toFixed(2))}kB`;
  } else if (number < 1000000000) {
    expected = `${Number((number / 1000000).toFixed(2))}MB`;
  } else if (number < 1000000000000) {
    expected = `${Number((number / 1000000000).toFixed(2))}GB`;
  } else {
    expected = `${Number((number / 1000000000000).toFixed(2))}TB`;
  }
  test(`${number} returns ${expected}`, () => {
    expect(formatBytes(number, 1000, units)).toBe(expected);
  });
});

test("formatSize", () => {
  store.getState = jest.fn().mockReturnValue({
    rpc: {
      session: {
        units: {
          sizeBytes: 1000,
          sizeUnits: ["kB", "MB", "GB", "TB"],
        },
      },
    },
  });

  expect(formatSize(1000)).toBe("1kB");
});

test("formatSize format zero", () => {
  store.getState = jest.fn().mockReturnValue({
    rpc: {
      session: {
        units: {
          sizeBytes: 1000,
          sizeUnits: ["kB", "MB", "GB", "TB"],
        },
      },
    },
  });

  expect(formatSize(0, true)).toBe("0kB");
  expect(formatSize(0)).toBe(" ");
});

test("formatSpeed", () => {
  store.getState = jest.fn().mockReturnValue({
    rpc: {
      session: {
        units: {
          speedBytes: 1000,
          speedUnits: ["kB/s", "MB/s", "GB/s", "TB/s"],
        },
      },
    },
  });

  expect(formatSpeed(1000)).toBe("1kB/s");
});

test("formatSpeed format zero", () => {
  store.getState = jest.fn().mockReturnValue({
    rpc: {
      session: {
        units: {
          speedBytes: 1000,
          speedUnits: ["kB/s", "MB/s", "GB/s", "TB/s"],
        },
      },
    },
  });

  expect(formatSpeed(0, true)).toBe("0kB/s");
  expect(formatSpeed(0)).toBe(" ");
});

if (!process.env.CI) {
  describe.each`
    timeStamp     | expected
    ${0}          | ${" "}
    ${1610249550} | ${"2021-01-10 11:32:30"}
    ${1608518614} | ${"2020-12-21 10:43:34"}
    ${1609340446} | ${"2020-12-30 23:00:46"}
  `("test formatUnixTimeStamp($timeStamp)", ({ timeStamp, expected }) => {
    test(`returns ${expected}`, () => {
      expect(formatUnixTimeStamp(timeStamp)).toBe(expected);
    });
  });
}

describe.each`
  ms                          | expected
  ${1}                        | ${"0:00:01"}
  ${10}                       | ${"0:00:10"}
  ${100}                      | ${"0:01:40"}
  ${1000}                     | ${"0:16:40"}
  ${10000}                    | ${"2:46:40"}
  ${100000}                   | ${"27:46:40"}
  ${1000000}                  | ${"277:46:40"}
  ${621658}                   | ${"172:40:58"}
  ${4047585}                  | ${"1124:19:45"}
  ${4694212}                  | ${"1303:56:52"}
  ${309051}                   | ${"85:50:51"}
  ${439418}                   | ${"122:03:38"}
  ${350371}                   | ${"97:19:31"}
  ${628029}                   | ${"174:27:09"}
  ${Number.POSITIVE_INFINITY} | ${"--:--:--"}
`("test formatLeftTime($ms)", ({ ms, expected }) => {
  test(`returns ${expected}`, () => {
    expect(formatLeftTime(ms)).toBe(expected);
  });
});

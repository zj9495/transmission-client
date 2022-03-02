import React from "react";
import { screen } from "@testing-library/react";
import mediaQuery from "css-mediaquery";
import { DataGridPro } from "@mui/x-data-grid-pro";

import renderWithProviders from "src/components/renderWithProviders";

import AppStatusBar from "./index";

function createMatchMedia(width: number) {
  return (query: string) => ({
    matches: mediaQuery.match(query, { width }),
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  });
}
describe("test AppStatusBar", () => {
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.matchMedia = createMatchMedia(window.innerWidth);
  });
  it("renders AppStatusBar", () => {
    const state = {
      session: {
        locale: "en-US",
        stats: {
          downloadSpeed: 102400,
          uploadSpeed: 204800,
        },
        session: {
          downloadDirFreeSpace: 536870912000,
          version: "MOCK_VERSION",
          rpcVersion: 10,
        },
      },
    };
    renderWithProviders(
      <DataGridPro
        columns={[]}
        rows={[]}
        components={{ Footer: AppStatusBar }}
      />,
      state
    );
    expect(screen.getByTestId("download-speed").textContent).toBe("100kB/s");
    expect(screen.getByTestId("seed-speed").textContent).toBe("200kB/s");
    expect(screen.getByTestId("free-space").textContent).toBe("500GB");
    expect(
      screen.getByText("Transmission Version:MOCK_VERSION")
    ).toBeInTheDocument();
    expect(screen.getByTestId("rpc-version").textContent).toBe("10");
  });
});

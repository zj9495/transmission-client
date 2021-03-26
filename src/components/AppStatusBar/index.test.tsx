import React from "react";
import { screen } from "@testing-library/react";
import renderWithProviders from "src/components/renderWithProviders";

import AppStatusBar from "./index";

test("renders AppStatusBar", () => {
  const state = {
    app: { open: false },
    rpc: {
      locale: "en-US",
      stats: {
        downloadSpeed: 100000,
        uploadSpeed: 200000,
      },
      session: {
        downloadDirFreeSpace: 500000000000,
        version: "MOCK_VERSION",
        rpcVersion: 10,
      },
    },
  };
  renderWithProviders(<AppStatusBar />, state);
  expect(screen.getByTestId("download-speed").textContent).toBe("100kB/s");
  expect(screen.getByTestId("seed-speed").textContent).toBe("200kB/s");
  expect(screen.getByTestId("free-space").textContent).toBe("500GB");
  expect(
    screen.getByText("Transmission Version:MOCK_VERSION")
  ).toBeInTheDocument();
  expect(screen.getByTestId("rpc-version").textContent).toBe("10");
});
